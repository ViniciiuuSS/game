"use client";

import Link from "next/link";
import { Score } from "./Score";

export function NavbarComponent() {
  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 animate-fade-in"><span className="text-retro">Idle Retro</span></span>
        </Link>
       <Score />
      </div>
    </nav>
  );
}
