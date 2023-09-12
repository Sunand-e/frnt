import { StructureItems } from "../MultipleContainers";

export function getItemStructureFromSections(array) {
  const obj: StructureItems = {}
  for (const section of array) {
    const sectionItemIds = section.children?.map(child => child.id)
    obj[section.id as string] = sectionItemIds;
  }
  return obj
}