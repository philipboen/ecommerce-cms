"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { Heading } from "@/components/shared/heading";
import { ApiList } from "@/components/shared/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/create`)}
        >
          <Plus className="mr-2 size-4" />
          Create Product
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Products." />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
