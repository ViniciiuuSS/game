"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useGameStore } from "@/store/gameStore";

export default function AutomatizarColetas() {
  const { score, automatizarColetas, precoAutomatizarColetas, statusAutoButtons } = useGameStore();
  console.log(statusAutoButtons)
  return (
    <div className="container-buttons flex flex-row gap-4">
        <button className="retro-button text-lg red-button" onClick={() => automatizarColetas("A", false)} disabled={score < precoAutomatizarColetas.A || statusAutoButtons.A}><ArrowPathIcon className="w-15 h-5 text-green-300" /> A</button>
        <button className="retro-button text-lg yellow-button" onClick={() => automatizarColetas("B", false)} disabled={score < precoAutomatizarColetas.B || statusAutoButtons.B}><ArrowPathIcon className="w-15 h-5 text-green-300" /> B</button>
        <button className="retro-button text-lg green-button" onClick={() => automatizarColetas("X", false)} disabled={score < precoAutomatizarColetas.X || statusAutoButtons.X}><ArrowPathIcon className="w-15 h-5 text-green-300" /> X</button>
        <button className="retro-button text-lg blue-button" onClick={() => automatizarColetas("Y", false)} disabled={score < precoAutomatizarColetas.Y || statusAutoButtons.Y}><ArrowPathIcon className="w-15 h-5 text-green-300" /> Y</button>
    </div>
  );
}
