"use client";

import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { AlertComponent } from "./alert";

export function Score() {
  const { score, id, loadScore, startAutoSave, stopAutoSave } = useGameStore();
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

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex flex-col items-center justify-center gap-2">
        {showAlert && <AlertComponent message="Moedas coletadas!" />}
        <div className="text-lg font-semibold text-center">
          <span className="text-yellow-400 dark:text-yellow-200">
            <GiTwoCoins size={20} />
          </span>
          <span className="text-yellow-400 dark:text-yellow-200">{score}</span>
        </div>
      </div>
    </div>
  );
}
