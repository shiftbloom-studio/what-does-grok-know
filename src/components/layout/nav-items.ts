export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "/brain", label: "Brain" },
  { href: "/timeline", label: "Timeline" },
  { href: "/topics", label: "Topics" },
  { href: "/insights", label: "Insights" },
  { href: "/memories", label: "Memories" },
  { href: "/search", label: "Search" },
];
