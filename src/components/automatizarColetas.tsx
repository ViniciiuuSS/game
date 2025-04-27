"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useGameStore } from "@/store/gameStore";
import { useEffect } from "react";
import { Tooltip } from "flowbite-react";

export default function AutomatizarColetas() {
  const { score, automatizarColetas, precoAutomatizarColetas, statusAutoButtons } = useGameStore();
  useEffect(() => {
    const buttons = document.querySelectorAll(".retro-button");
    buttons.forEach((button) => {
      const classesLists = button.classList[2];
      switch (classesLists) {
        case "red-button":
          if (statusAutoButtons.A && !button.classList.contains("add")) {
            button.classList.add("active");
          }
          break;
        case "yellow-button":
          if (statusAutoButtons.B && !button.classList.contains("add")) {
            button.classList.add("active");
          }
          break;
        case "blue-button":
          if (statusAutoButtons.X && !button.classList.contains("add")) {
            button.classList.add("active");
          }
          break;
        case "green-button":
          if (statusAutoButtons.Y && !button.classList.contains("add")) {
            button.classList.add("active");
          }
          break;
      }
    });
  }, [statusAutoButtons]);
  return (
    <div className="container-buttons flex flex-row gap-4">
      <Tooltip content={statusAutoButtons.A ? "Botão Automaziado" : "Clique para Aumentar a coleta"}>
        <div>
          <button className="retro-button text-lg red-button" onClick={() => automatizarColetas("A", false)} disabled={score < precoAutomatizarColetas.A || statusAutoButtons.A}>
            <ArrowPathIcon className="w-15 h-5 text-green-300" /> A
          </button>
        </div>
      </Tooltip>
      <Tooltip content={statusAutoButtons.B ? "Botão Automaziado" : "Clique para Aumentar a coleta"}>
        <div>
          <button className="retro-button text-lg yellow-button" onClick={() => automatizarColetas("B", false)} disabled={score < precoAutomatizarColetas.B || statusAutoButtons.B}>
            <ArrowPathIcon className="w-15 h-5 text-green-300" /> B
          </button>
        </div>
      </Tooltip>
      <Tooltip content={statusAutoButtons.X ? "Botão Automaziado" : "Clique para Aumentar a coleta"}>
        <div>
          <button className="retro-button text-lg blue-button" onClick={() => automatizarColetas("X", false)} disabled={score < precoAutomatizarColetas.X || statusAutoButtons.X}>
            <ArrowPathIcon className="w-15 h-5 text-green-300" /> X
          </button>
        </div>
      </Tooltip>
      <Tooltip content={statusAutoButtons.Y ? "Botão Automaziado" : "Clique para Aumentar a coleta"}>
        <div>
          <button className="retro-button text-lg green-button" onClick={() => automatizarColetas("Y", false)} disabled={score < precoAutomatizarColetas.Y || statusAutoButtons.Y}>
            <ArrowPathIcon className="w-15 h-5 text-green-300" /> Y
          </button>
        </div>
      </Tooltip>
    </div>
  );
}
