"use client";
import { useGameStore } from "@/store/gameStore";

export default function YButton() {
  const { score, setScore, precoHabilitarColetas, envButtons, statusButtons, setStatusButtons } = useGameStore();
  return (
    <button
      className="retro-button green-button Y-button"
      disabled={score < precoHabilitarColetas.Y && !statusButtons.Y}
      onClick={() => {
        const newScore = score + envButtons.Y;
        if (!statusButtons.Y) {
          setScore(newScore - precoHabilitarColetas.Y);
        } else {
          setScore(newScore);
        }
        setStatusButtons({ Y: true });
      }}
    >
      Y
    </button>
  );
}
