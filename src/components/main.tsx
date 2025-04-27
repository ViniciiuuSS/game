"use client";
import React from "react";
import AButton from "@/components/(controle)/AButton";
import BButton from "@/components/(controle)/BButton";
import XButton from "@/components/(controle)/XButton";
import YButton from "@/components/(controle)/YButton";
import AutomatizarColetas from "./automatizarColetas";
import AumentarColetas from "./aumentarColetas";
import { useGameStore } from "@/store/gameStore";
import { SpinnerComponent } from "./spinner";
import { BadgeComponent } from "./badge";

export default function Main() {
  const { loadGame } = useGameStore();

  if (!loadGame) {
    return <SpinnerComponent />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="button-grid mt-25 h-full">
        <AButton />
        <BButton />
        <YButton />
        <XButton />
      </div>
      <div className="button-shop mt-10 h-full flex flex-col gap-2 items-center justify-center p-4">
        <div className="flex flex-row justify-center items-center">
          <BadgeComponent />
        </div>
        <p className="text-lg text-retro">Aumentar coletas</p>
        <AumentarColetas />
        <p className="text-lg text-retro">Automatizar coletas</p>
        <AutomatizarColetas />
      </div>
    </div>
  );
}
