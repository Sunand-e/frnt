import { ContentType } from "../components/common/contentTypes";

export function getContentTypeStringWithCount(
  type: ContentType, 
  count: number, 
  typePrefix: string | null = null,
  showCount: boolean = true
): string {
  let typeLabel;
  if (type.name === 'content') {
    typeLabel = count === 1 ? 'item' : 'items';
  } else {
    typeLabel = count === 1 ? type.name : type.plural;
  }
  return `${showCount && `${count} `}${typePrefix || ''} ${typeLabel}`;
}