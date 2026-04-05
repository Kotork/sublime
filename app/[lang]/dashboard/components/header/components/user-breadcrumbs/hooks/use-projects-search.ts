"use client";

import { useQuery } from "@tanstack/react-query";

type Project = {
  id: string;
  name: string;
  type: string;
  state: string;
};

type ProjectsResponse = {
  projects: Project[];
};

async function fetchProjects(organizationId: string, search: string) {
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }

  const url = `/api/v1/organizations/${organizationId}/projects/search${
    params.size ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load projects");
  }

  const data: ProjectsResponse = await response.json();
  return data.projects ?? [];
}

export function useProjectsSearch(organizationId: string, search: string) {
  return useQuery({
    queryKey: ["projects-search", organizationId, search],
    queryFn: () => fetchProjects(organizationId, search),
    enabled: Boolean(organizationId),
  });
}







