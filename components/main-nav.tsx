"use client";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname.startsWith(`/${params.storeId}/billboards`),
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname.startsWith(`/${params.storeId}/categories`),
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname.startsWith(`/${params.storeId}/products`),
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname.startsWith(`/${params.storeId}/sizes`),
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname.startsWith(`/${params.storeId}/colors`),
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname.startsWith(`/${params.storeId}/orders`),
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-serif font-semibold transition-colors hover:text-primary",
            route.active
              ? "text-primary dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
