"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { Heading } from "@/components/shared/heading";
import { ApiList } from "@/components/shared/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/create`)}
        >
          <Plus className="mr-2 size-4" />
          Create Category
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Categories." />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
