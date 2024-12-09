"use client";

import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

export default function Navbar() {
  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
    },
    {
      label: "Tasks",
      icon: "pi pi-fw pi-calendar",
    },
    {
      label: "Settings",
      icon: "pi pi-fw pi-cog",
    },
  ];

  return (
    <nav className="min-h-screen p-3 bg-white">
      <h1>Lists</h1>
      <section className="p-4"></section>
    </nav>
  );
}
