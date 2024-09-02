import axios from "axios";

export async function getAccessToken() {
  const response = await axios.get(
    `${process.env.DARAJA_API_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      auth: {
        username: process.env.CONSUMER_KEY || "",
        password: process.env.CONSUMER_SECRET || "",
      },
    }
  );
  return response.data.access_token;
}

export async function initiateMpesaPayment(
  accessToken: string,
  phoneNumber: string,
  amount: number
) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14);
  const password = Buffer.from(`${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`).toString(
    "base64"
  );

  const response = await axios.post(
    `${process.env.DARAJA_API_BASE_URL}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: process.env.SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: "OrderPayment",
      TransactionDesc: "Payment for order",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}
