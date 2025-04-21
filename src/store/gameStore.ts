import { create } from "zustand";

interface GameStore {
  score: number;
  id: string | null;
  lastSavedScore: number;
  setScore: (score: number) => void;
  setId: (id: string) => void;
  loadScore: (id: string) => Promise<void>;
  saveScore: () => Promise<void>;
  startAutoSave: () => void;
  stopAutoSave: () => void;
}

let autoSaveInterval: NodeJS.Timeout | null = null;

const dispatchAutoSaveEvent = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("autosave"));
  }
};

export const useGameStore = create<GameStore>((set, get) => ({
  score: 0,
  id: null,
  lastSavedScore: 0,

  setId: (id: string) => set({ id }),

  loadScore: async (id: string) => {
    try {
      const response = await fetch(`/storege?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Falha ao carregar score");
      }
      const data = await response.json();
      set({ score: data.score, id: data.id, lastSavedScore: data.score });
    } catch (error) {
      console.error("Erro ao carregar score:", error);
    }
  },

  saveScore: async () => {
    const store = get();
    const { score, id, lastSavedScore } = store;

    if (score === lastSavedScore && id) return;

    const payload = {
      score,
      id,
    };

    try {
      const response = await fetch("/storege", {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar score");
      }

      const data = await response.json();

      if (!id && data.id) {
        set({ id: data.id });
      }

      set({ lastSavedScore: score });

      if (id) {
        dispatchAutoSaveEvent();
      }
    } catch (error) {
      console.error("Erro ao salvar score:", error);
    }
  },

  startAutoSave: () => {
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
    }

    autoSaveInterval = setInterval(() => {
      const store = get();

      if (store.score !== store.lastSavedScore || !store.id) {
        store.saveScore();
      }
    }, 15000);
  },

  stopAutoSave: () => {
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
      autoSaveInterval = null;
    }
  },

  setScore: (score: number) => {
    const store = get();
    set({ score });

    if (!store.id) {
      store.saveScore();
    }
  },
}));
