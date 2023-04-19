import create from 'zustand'

type EditorViewState = {
  activeSettingsPanel: string,
  isSettingsPaneOpen: boolean,
  activeSidebarPanel: string,
  visibleSidebarPanels: Array<string>,
  activeModuleType: string
}

export const useEditorViewStore = create<EditorViewState>(set => ({
  activeSettingsPanel: 'course',
  isSettingsPaneOpen: false,
  activeSidebarPanel: 'structure',
  visibleSidebarPanels: ['structure'],
  activeModuleType: null
}))