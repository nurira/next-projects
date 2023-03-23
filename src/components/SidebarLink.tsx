"use client";

import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation";

export type Link = {
  label: string;
  link: string;
  icon: "Settings" | "User" | "Grid" | "Calendar";
};

const icons = { Settings, User, Grid, Calendar };

const SidebarLink = ({ link }: { link: Link }) => {
  const pathname = usePathname();
  let isActive = pathname === link.link;

  const Icon = icons[link.icon];
  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={`stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out 
        ${isActive && "stroke-violet-600"}`}
      />
    </Link>
  );
};

export default SidebarLink;
