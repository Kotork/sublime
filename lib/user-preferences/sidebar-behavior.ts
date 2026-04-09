export const SIDEBAR_BEHAVIORS = [
  "expanded",
  "collapsed",
  "expand_on_hover",
] as const;

export type SidebarBehavior = (typeof SIDEBAR_BEHAVIORS)[number];

export const DEFAULT_SIDEBAR_BEHAVIOR: SidebarBehavior = "expand_on_hover";
