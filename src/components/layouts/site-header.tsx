"use client";
import Link from "next/link";
import NavConnect from "./nav-connect";
import NavModeToggle from "./nav-mode-toggle";

export function SiteHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          MyDApp
        </Link>
        <nav className="flex space-x-6">
          {/* <Link href="/settings">Settings</Link> */}
          <NavConnect />
          <NavModeToggle />
        </nav>
      </div>
    </header>
  );
}
