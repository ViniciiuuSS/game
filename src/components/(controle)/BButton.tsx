"use client";
import { useGameStore } from "@/store/gameStore";

export default function BButton() {
  const { score, setScore, precoHabilitarColetas, envButtons, statusButtons, setStatusButtons } = useGameStore();
  
  return (
    <button 
      className="retro-button B-button yellow-button" 
      disabled={score < precoHabilitarColetas.B && !statusButtons.B} 
      onClick={() => { 
        const newScore = score + envButtons.B;
        if (!statusButtons.B) {
          setScore(newScore - precoHabilitarColetas.B);
        } else {
          setScore(newScore);
        }
        setStatusButtons({ B: true });
      }} >
      B
    </button>
  );
}
