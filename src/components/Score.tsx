"use client";

import { useGameStore } from "@/store/gameStore";
import { useEffect } from "react";

export function Score() {
  const { score, id, loadScore } = useGameStore();

  // Carrega o score se houver um ID salvo no localStorage
  useEffect(() => {
    const savedId = localStorage.getItem("gameId");
    if (savedId && !id) {
      loadScore(savedId);
    }
  }, [id, loadScore]);

  // Salva o ID no localStorage quando ele muda
  useEffect(() => {
    if (id) {
      localStorage.setItem("gameId", id);
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex items-center justify-center">
        <div className="text-lg font-semibold text-center">
          Pontuação: <span className="text-blue-600 dark:text-blue-400">{score}</span>
        </div>
      </div>
    </div>
  );
}
