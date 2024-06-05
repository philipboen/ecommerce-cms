"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store."
        />
        <Button onClick={()=> router.push(`/${params.storeId}/billboards/create`)}>
          <Plus className="mr-2 size-4" />
          Create Billboard
        </Button>
      </div>
      <Separator />
    </>
  );
};
