import {FileEarmarkFill} from '@styled-icons/bootstrap/FileEarmarkFill'
import {FilePdf} from '@styled-icons/boxicons-solid/FilePdf'
import {Microsoftpowerpoint} from '@styled-icons/simple-icons/Microsoftpowerpoint'
import {Microsoftexcel} from '@styled-icons/simple-icons/Microsoftexcel'
import {FileDoc} from '@styled-icons/boxicons-solid/FileDoc'

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