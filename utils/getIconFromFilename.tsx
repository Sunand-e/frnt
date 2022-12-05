import { FilePdf, FileEarmarkFill } from '@styled-icons/bootstrap'
import { Microsoftexcel, Microsoftpowerpoint } from '@styled-icons/simple-icons'
import { FileDoc } from '@styled-icons/boxicons-solid/FileDoc'

export function getIconFromFilename(filename) {

  const extension = filename?.split('.').pop()
  
  const extensionToIconMap = new Map([
    [["xls", "xlsx"], Microsoftexcel],
    [["doc", "docx"], FileDoc],
    [["pdf"], FilePdf],
    [["ppt, pptx"], Microsoftpowerpoint]
  ])

  for (const [extensions, IconComponent] of extensionToIconMap) {
    if(extensions.includes(extension)) {
      return IconComponent
    }
  }
  return FileEarmarkFill
}