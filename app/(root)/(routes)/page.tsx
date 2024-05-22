"use client";

import { useEffect } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";

export default function Page() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className="p-4">
      <h1 className="font-serif text-2xl font-bold">Welcome to your app</h1>
      <p className="mt-2">
        This is the home page of your app. You can start building your app by
        editing the files in the <code>app</code> directory.
      </p>
    </div>
  );
}
