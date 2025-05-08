import type { NavItem } from "@/components/layout/sidebar-nav";
import type { IconKeys } from "@/components/icons";

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: NavItem[];
};

export const siteConfig: SiteConfig = {
  name: "GastroKid Eval",
  description: "A comprehensive web application for managing medical evaluations in pediatric gastroenterology.",
  mainNav: [
    {
      title: "Dashboard",
      href: "/",
      icon: "LayoutDashboard" as IconKeys,
    },
    {
      title: "New Evaluation",
      href: "/evaluations/new",
      icon: "FilePlus2" as IconKeys,
    },
    {
      title: "Patient Records",
      href: "/patients",
      icon: "Users2" as IconKeys,
    },
    {
      title: "Lab Exams",
      href: "/lab-exams",
      icon: "Beaker" as IconKeys,
    },
    // Example of a settings link, can be expanded later
    // {
    //   title: "Settings",
    //   href: "/settings",
    //   icon: "Settings2" as IconKeys,
    // },
  ],
};
