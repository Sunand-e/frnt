import create from 'zustand'

type EditorViewState = {
  activeSettingsPanel: string,
  isSettingsPaneOpen: boolean,
}

export const useEditorViewStore = create<EditorViewState>(set => ({
  activeSettingsPanel: 'a',
  isSettingsPaneOpen: false
}))