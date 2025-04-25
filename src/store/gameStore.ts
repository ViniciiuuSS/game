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
  statusAutoButtons: {
    "A": boolean;
    "B": boolean;
    "X": boolean;
    "Y": boolean;
  };
  buttonAutoInterval: {
    "A": number;
    "B": number;
    "X": number;
    "Y": number;
  };
  setScore: (score: number) => void;
  setId: (id: string) => void;
  loadScore: (id: string) => Promise<void>;
  saveScore: (saveStatusButtons: boolean) => Promise<void>;
  startAutoSave: () => void;
  stopAutoSave: () => void;
  aumentarColetas: (button: string) => void;
  automatizarColetas: (button:string, load: boolean) => void;
  setStatusButtons: (statusButtons: { [key: string]: boolean; }) => void;
  setAutoButtons: (button: "A" | "B" | "X" | "Y", load: boolean) => void;
}

let autoSaveInterval: NodeJS.Timeout | null = null;
let autoInterval: NodeJS.Timeout | null = null;

const dispatchAutoSaveEvent = (type:string ) => {
  if (typeof window !== "undefined") {
    switch(type){
      case "autosave":
        window.dispatchEvent(new Event("autosave"));
        break;
    }
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
  statusAutoButtons: {
    "A": false,
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
  buttonAutoInterval: {
    "A": 700,
    "B": 1400,
    "X": 2800,
    "Y": 5600,
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
      set({ score: data.score, id: data.id, lastSavedScore: data.score, statusButtons: data.statusButtons, statusAutoButtons: data.statusAutoButtons });
      const store = get();
      const statusAutoButtons = store.statusAutoButtons;
      Object.keys(statusAutoButtons).forEach((key) => {
        console.log(key)
        const newStatus = statusAutoButtons[key as keyof typeof statusAutoButtons];
        
        if (newStatus === true) {
          store.automatizarColetas(key, true);
        }        
      })
    } catch (error) {
      console.error("Erro ao carregar score:", error);
    }
  },

  saveScore: async (saveStatusButtons: boolean = false) => {
    const store = get();
    const { score, id, lastSavedScore, statusButtons, statusAutoButtons } = store;

    if ((score === lastSavedScore && id) || !saveStatusButtons) return;

    const payload = {
      score,
      id,
      statusButtons: saveStatusButtons ? statusButtons : undefined,
      statusAutoButtons: saveStatusButtons ? statusAutoButtons : undefined
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
        dispatchAutoSaveEvent("autosave");
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
  stopAutoInterval: () => {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
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
  automatizarColetas: (button: string, load:boolean = false) => 
  {
    const store = get();
    store.setAutoButtons(button as "A" | "B" | "X" | "Y", load);
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
      }
      
      statusButtonsStore[key as keyof typeof statusButtonsStore] = newStatus;
    });

    set({ statusButtons: statusButtonsStore });

    if (shouldSave) {
      store.saveScore(true);
    }
  },
  setAutoButtons: (button: "A" | "B" | "X" | "Y", load: boolean) => {
    let store = get();
    if (!store.statusAutoButtons[button] || load) {
      if(load){
        setInterval(() => {
          store = get();
          store.score += store.envButtons[button];
          set({ score: store.score });
        }, store.buttonAutoInterval[button]);
        return;
      }
      const precoAutomatizarColetas = store.precoAutomatizarColetas;
      const keyPreco = precoAutomatizarColetas[button];
  
      if (store.score >= keyPreco) {
        set({ score: store.score - keyPreco });
  
        store.statusAutoButtons[button] = true;
        setInterval(() => {
          store = get();
          store.score += store.envButtons[button];
          set({ score: store.score });
        }, store.buttonAutoInterval[button]);
        store.saveScore(true);
      }
    }
  },
}));
