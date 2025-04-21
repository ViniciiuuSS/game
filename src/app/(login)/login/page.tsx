"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center p-10 justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">Login</h1>
      <button onClick={() => signIn("google")} className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 w-full">
        <FcGoogle size={40} /> Entrar com Google
      </button>
    </div>
  );
}
