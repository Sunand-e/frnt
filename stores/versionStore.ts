import create from "zustand";

interface VersionState {
  currentVersion: any
  newVersion: any
  checkForUpdate: any
}

const useVersionStore = create<VersionState>((set) => ({
  currentVersion: null,
  newVersion: null,

  checkForUpdate: async () => {
    try {
      const response = await fetch("/version.json");
      const data = await response.json();

      set((state: VersionState) => {
        if (!state.currentVersion) {
          return { currentVersion: data.version };
        } else if (data.version !== state.currentVersion) {
          return { newVersion: data.version };
        }
        return state;
      });
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  },

  // resetNewVersion: () => set({ currentVersion: newVersion, newVersion: null }),
}));

export default useVersionStore;
