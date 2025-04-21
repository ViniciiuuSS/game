import { create } from "zustand";

interface GameStore {
  score: number;
  id: string | null;
  setScore: (score: number) => void;
  setId: (id: string) => void;
  loadScore: (id: string) => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  score: 0,
  id: null,

  setId: (id: string) => set({ id }),

  loadScore: async (id: string) => {
    try {
      const response = await fetch(`/storege?id=${id}`);
      if (!response.ok) {
        throw new Error("Falha ao carregar score");
      }
      const data = await response.json();
      set({ score: data.score, id: data.id });
    } catch (error) {
      console.error("Erro ao carregar score:", error);
    }
  },

  setScore: (score: number) => {
    set({ score });

    const store = get();
    const payload = {
      score,
      id: store.id,
    };

    fetch("/storege", {
      method: store.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao salvar score");
        }
        return response.json();
      })
      .then((data) => {
        // Se não tiver ID, atualiza com o ID retornado
        if (!store.id && data.id) {
          set({ id: data.id });
        }
      })
      .catch((error) => {
        console.error("Erro ao salvar score:", error);
      });
  },
}));
