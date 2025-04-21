import React from "react";
import AButton from "@/components/(controle)/AButton";
import BButton from "@/components/(controle)/BButton";
import XButton from "@/components/(controle)/XButton";
import YButton from "@/components/(controle)/YButton";
import { Score } from "@/components/Score";
export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex top-0 left-0 w-full">
        <Score />
      </div>
      <div className="button-grid mt-20 h-full">
        <AButton />
        <BButton />
        <YButton />
        <XButton />
      </div>
    </div>
  );
}
