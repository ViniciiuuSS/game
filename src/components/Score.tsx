"use client";

import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { AlertComponent } from "./alert";

export function Score() {
  const { score, id, loadGame, loadScore, startAutoSave, stopAutoSave } = useGameStore();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("gameId");
    if (savedId && !id) {
      loadScore(savedId);
    }
  }, [id, loadScore]);

  useEffect(() => {
    if (id) {
      localStorage.setItem("gameId", id);
    }
  }, [id]);

  useEffect(() => {
    const handleAutoSave = () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    };

    window.addEventListener("autosave", handleAutoSave);

    startAutoSave();

    return () => {
      stopAutoSave();
      window.removeEventListener("autosave", handleAutoSave);
    };
  }, []);

  if (!loadGame) {
    return;
  }

  return (
    <div className="w-full flex items-center justify-center">
      {showAlert && <AlertComponent message="Moedas coletadas!" />}
      <div className="text-lg font-semibold text-center flex items-center gap-2">
        <span className="text-yellow-400 dark:text-yellow-200">
          <GiTwoCoins size={20} />
        </span>
        <span className="text-yellow-400 dark:text-yellow-200">{score}</span>
      </div>
    </div>
  );
}
