import { create } from "zustand";

interface GameStore {
  score: number;
  id: string | null;
  lastSavedScore: number;
  precoHabilitarColetas: {
    "B": number;
    "X": number;
    "Y": number;
  };
  envButtons: {
    "A": number;
    "B": number;
    "X": number;
    "Y": number;
  };
  precoAumentarColetas: {
    "A": number;
    "B": number;
    "X": number;
    "Y": number;
  };
  precoAutomatizarColetas: {
    "A": number;
    "B": number;
    "X": number;
    "Y": number;
  };
  statusButtons: {
    "A": boolean;
    "B": boolean;
    "X": boolean;
    "Y": boolean;
  };
  setScore: (score: number) => void;
  setId: (id: string) => void;
  loadScore: (id: string) => Promise<void>;
  saveScore: (saveStatusButtons: boolean) => Promise<void>;
  startAutoSave: () => void;
  stopAutoSave: () => void;
  aumentarColetas: (button: string) => void;
  setStatusButtons: (statusButtons: { [key: string]: boolean; }) => void;
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
  precoHabilitarColetas: {
    "B": 100,
    "X": 300,
    "Y": 500,
  },
  statusButtons: {
    "A": true,
    "B": false,
    "X": false,
    "Y": false,
  },
  envButtons: {
    "A": 1,
    "B": 3,
    "X": 7,
    "Y": 5,
  },
  precoAumentarColetas: {
    "A": 25,
    "B": 50,
    "X": 75,
    "Y": 100,
  },
  precoAutomatizarColetas: {
    "A": 500,
    "B": 1000,
    "X": 2000,
    "Y": 1500,
  },
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
      set({ score: data.score, id: data.id, lastSavedScore: data.score, statusButtons: data.statusButtons });
    } catch (error) {
      console.error("Erro ao carregar score:", error);
    }
  },

  saveScore: async (saveStatusButtons: boolean = false) => {
    const store = get();
    const { score, id, lastSavedScore, statusButtons } = store;

    if ((score === lastSavedScore && id) || !saveStatusButtons) return;

    const payload = {
      score,
      id,
      statusButtons: saveStatusButtons ? statusButtons : undefined,
    };

    console.log('Dados sendo enviados para o banco:', payload);

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
      console.log('Resposta do servidor:', data);

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
        store.saveScore(true);
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
      store.saveScore(true);
    }
  },
  aumentarColetas: (button: string) => {
    const store = get();

    const envButtons = store.envButtons;
    envButtons[button as keyof typeof envButtons] = envButtons[button as keyof typeof envButtons] + 1;
    set({ envButtons });

    const precoAumentarColetas = store.precoAumentarColetas;
    const keyPreco = precoAumentarColetas[button as keyof typeof precoAumentarColetas];
    precoAumentarColetas[button as keyof typeof precoAumentarColetas] = keyPreco * 2;
    set({ precoAumentarColetas });
    set({ score: store.score - keyPreco });
  },
  setStatusButtons: (statusButtons: { [key: string]: boolean; }) => {
    const store = get();
    const statusButtonsStore = store.statusButtons;
    let shouldSave = false;

    Object.keys(statusButtons).forEach((key) => {
      const newStatus = statusButtons[key as keyof typeof statusButtons];
      const currentStatus = statusButtonsStore[key as keyof typeof statusButtonsStore];
      
      if (newStatus === true && currentStatus === false) {
        shouldSave = true;
        console.log(`Botão ${key} está sendo habilitado pela primeira vez`);
      }
      
      statusButtonsStore[key as keyof typeof statusButtonsStore] = newStatus;
    });

    set({ statusButtons: statusButtonsStore });

    if (shouldSave) {
      console.log('Status dos botões antes de salvar:', statusButtonsStore);
      store.saveScore(true);
    }
  },
}));
