import create from 'zustand'
import { StructureItems } from '../../courses/CourseStructureEditor/MultipleContainers'

type EditorViewState = {
  activeSettingsPanel: string,
  isSettingsPaneOpen: boolean,
  activeSidebarPanel: string,
  visibleSidebarPanels: Array<string>,
  activeModuleType: string
  items: StructureItems
}

export const useEditorViewStore = create<EditorViewState>(set => ({
  activeSettingsPanel: 'course',
  isSettingsPaneOpen: false,
  activeSidebarPanel: 'structure',
  visibleSidebarPanels: ['structure'],
  activeModuleType: null,
  activeModuleId: null,
  items: null
}))