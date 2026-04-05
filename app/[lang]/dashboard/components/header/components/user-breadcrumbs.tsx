"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { getLocaleFromPathname } from "@/lib/utils/pathname";

const UserBreadcrumbs = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return (
    <Breadcrumb className="flex items-center">
      <BreadcrumbList className="items-center">
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${locale}`}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden sm:block" />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${locale}/dashboard`}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default UserBreadcrumbs;
