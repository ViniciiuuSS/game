"use client";

import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { DarkThemeToggle } from "flowbite-react";

export function NavbarComponent() {
  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 animate-fade-in">Anotador</span>
        </Link>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 animate-fade-in" id="navbar-sticky">
          <ul className="flex items-center flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Tooltip content={"Tema"} className="flex items-center justify-center">
                <DarkThemeToggle />
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
