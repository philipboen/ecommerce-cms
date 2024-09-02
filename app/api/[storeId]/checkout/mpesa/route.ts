import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAccessToken, initiateMpesaPayment } from "@/lib/mpesa";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { name, phoneNumber, productIds } = await req.json();

  if (!name || !phoneNumber) {
    return new NextResponse("Name and Phone Number are required", {
      status: 400,
    });
  }

  if (!productIds || productIds.length === 0) {
    return new NextResponse("productIds is required", { status: 400 });
  }

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const amount = Math.round(
    129 *
      products.reduce((total, product) => total + product.price.toNumber(), 0)
  );

  try {
    const accessToken = await getAccessToken();

    const paymentResponse = await initiateMpesaPayment(
      accessToken,
      phoneNumber,
      amount
    );

    await db.order.create({
      data: {
        storeId: params.storeId,
        customerName: name,
        paymentMethod: "Mpesa",
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    return new NextResponse(JSON.stringify(paymentResponse), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify((error as any).response.data), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
