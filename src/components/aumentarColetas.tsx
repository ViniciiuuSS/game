"use client";

import { useGameStore } from "@/store/gameStore";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AumentarColetas() {
  const { score, aumentarColetas, precoAumentarColetas, statusButtons } = useGameStore();

  return (
    <div className="container-buttons flex flex-row gap-4 justify-center items-center">
      <div>
        <button className="retro-button add text-lg red-button" disabled={score < precoAumentarColetas.A} onClick={() => aumentarColetas("A")}>
          <PlusIcon className="w-15 h-5 text-green-300" /> A
        </button>
      </div>
      <button className="retro-button add text-lg yellow-button" disabled={score < precoAumentarColetas.B || !statusButtons.B} onClick={() => aumentarColetas("B")}>
        <PlusIcon className="w-15 h-5 text-green-300" /> B
      </button>
      <button className="retro-button add text-lg blue-button" disabled={score < precoAumentarColetas.X || !statusButtons.X} onClick={() => aumentarColetas("X")}>
        <PlusIcon className="w-15 h-5 text-green-300" /> X
      </button>
      <button className="retro-button add text-lg green-button" disabled={score < precoAumentarColetas.Y || !statusButtons.Y} onClick={() => aumentarColetas("Y")}>
        <PlusIcon className="w-15 h-5 text-green-300" /> Y
      </button>
    </div>
  );
}
