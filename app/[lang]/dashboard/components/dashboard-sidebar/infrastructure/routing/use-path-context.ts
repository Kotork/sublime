import { useParams, usePathname } from "next/navigation";

type Params = {
  organizationId?: string | string[];
  projectId?: string | string[];
};

export function usePathContext() {
  const pathname = usePathname();
  const params = useParams<Params>();
  const organizationIdParam = params?.organizationId;
  const organizationId = Array.isArray(organizationIdParam)
    ? organizationIdParam[0]
    : organizationIdParam;

  const projectIdParam = params?.projectId;
  const projectId = Array.isArray(projectIdParam)
    ? projectIdParam[0]
    : projectIdParam;

  return {
    pathname,
    organizationId,
    projectId,
  };
}
