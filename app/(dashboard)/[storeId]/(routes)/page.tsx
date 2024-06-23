import { db } from "@/lib/db";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div className="space-y-2 p-4">
      <p>Store ID: {store?.id}</p>
      <p>Store Name: {store?.name}</p>
      <p>This is the DashboardPage</p>
    </div>
  );
};

export default DashboardPage;
