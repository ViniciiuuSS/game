import React from "react";
import AButton from "@/components/(controle)/AButton";
import BButton from "@/components/(controle)/BButton";
import XButton from "@/components/(controle)/XButton";
import YButton from "@/components/(controle)/YButton";

export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="button-grid">
        <AButton />
        <BButton />
        <YButton />
        <XButton />
      </div>
    </div>
  );
}
