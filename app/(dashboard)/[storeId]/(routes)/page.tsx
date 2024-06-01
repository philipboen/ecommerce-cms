import { db } from "@/lib/db";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
    cacheStrategy: {
      ttl: 60,
      swr: 60,
    },
  });

  return (
    <div>
      <p>Store ID: {store?.id}</p>
      <p>Store Name: {store?.name}</p>
      <p>This is the DashboardPage</p>
    </div>
  );
};

export default DashboardPage;
