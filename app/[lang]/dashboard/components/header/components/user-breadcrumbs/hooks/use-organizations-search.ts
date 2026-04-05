"use client";

import { useQuery } from "@tanstack/react-query";
import { Organization } from "@/types";

type OrganizationsResponse = {
  organizations: Pick<
    Organization,
    "id" | "name" | "subdomain" | "logo_url" | "owner_id"
  >[];
};

async function fetchOrganizations(search: string) {
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }

  const url = `/api/v1/organizations/search${
    params.size ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load organizations");
  }

  const data: OrganizationsResponse = await response.json();
  return data.organizations ?? [];
}

export function useOrganizationsSearch(search: string) {
  return useQuery({
    queryKey: ["organizations-search", search],
    queryFn: () => fetchOrganizations(search),
  });
}
