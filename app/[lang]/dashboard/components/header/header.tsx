"use client";

import { HeaderView } from "./header.view";
import { useHeaderViewModel } from "./header.view-model";

export function Header() {
  const { homePath, isDashboardRoute } = useHeaderViewModel();

  return (
    <HeaderView homePath={homePath} isDashboardRoute={isDashboardRoute} />
  );
}
