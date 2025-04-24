import React from "react";
import AButton from "@/components/(controle)/AButton";
import BButton from "@/components/(controle)/BButton";
import XButton from "@/components/(controle)/XButton";
import YButton from "@/components/(controle)/YButton";
import AutomatizarColetas from "./automatizarColetas";
import AumentarColetas from "./aumentarColetas";
export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="button-grid mt-25 h-full">
        <AButton />
        <BButton />
        <YButton />
        <XButton />
      </div>
      <div className="button-shop mt-10 h-full flex flex-col gap-4 items-center justify-center p-4">
        <p className="text-lg text-retro">Aumentar coletas</p>
        <AumentarColetas />
        <p className="text-lg text-retro">Automatizar coletas</p>
        <AutomatizarColetas />
      </div>
    </div>
  );
}
