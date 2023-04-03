import create from 'zustand'

type EditorViewState = {
  currentSettingsPanel: string,
  isSettingsPanelOpen: boolean,
}

export const useEditorViewStore = create<EditorViewState>(set => ({
  currentSettingsPanel: 'a',
  isSettingsPanelOpen: false
}))