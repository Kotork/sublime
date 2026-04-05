import { useMemo } from "react";
import { usePathContext } from "../../infrastructure/routing/use-path-context";
import { buildNavigation, createIsActive } from "../use-cases/build-navigation";

export function useSidebarNavigation() {
  const { pathname, organizationId, projectId } = usePathContext();
  const dict = getDictionary(lang as Locale);

  return useMemo(() => {
    const navigation = buildNavigation(
      pathname,
      dict,
      organizationId,
      projectId
    );
    const isActive = createIsActive(pathname, navigation);

    return {
      navigation,
      isActive,
    };
  }, [dict, organizationId, projectId, pathname]);
}
