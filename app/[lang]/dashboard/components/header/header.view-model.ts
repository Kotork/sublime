import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { buildHeaderState, type HeaderState } from "./header.model";

export type HeaderViewModel = HeaderState;

export function useHeaderViewModel(): HeaderViewModel {
  const pathname = usePathname();

  return useMemo(() => buildHeaderState(pathname), [pathname]);
}
