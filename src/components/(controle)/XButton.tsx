"use client";
import { useGameStore } from "@/store/gameStore";

export default function XButton() {
  const { score, setScore, precoHabilitarColetas, envButtons, statusButtons, setStatusButtons } = useGameStore();
  return (
    <button
      className="retro-button add blue-button X-button"
      disabled={score < precoHabilitarColetas.X && !statusButtons.X}
      onClick={() => {
        const newScore = score + envButtons.X;
        if (!statusButtons.X) {
          setScore(newScore - precoHabilitarColetas.X);
        } else {
          setScore(newScore);
        }
        setStatusButtons({ X: true });
      }}
    >
      X
    </button>
  );
}
