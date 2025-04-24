"use client";

import { useGameStore } from "@/store/gameStore";

export default function AButton() {
  const { score, setScore, envButtons } = useGameStore();

  return (
    <button
      className="retro-button red-button A-button"
      onClick={() => {
        setScore(score + envButtons.A);
      }}
    >
      A
    </button>
  );
}
