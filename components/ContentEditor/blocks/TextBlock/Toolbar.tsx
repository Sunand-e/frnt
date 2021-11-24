import { ColorPickerToolbarDropdown } from "@udecode/plate-font-ui";
import { ImageToolbarButton } from "@udecode/plate-image-ui";
import { LinkToolbarButton } from "@udecode/plate-link-ui";
import { ToolbarButtonsAlign, ToolbarButtonsBasicElements, ToolbarButtonsBasicMarks, ToolbarButtonsList, ToolbarButtonsTable } from "./ToolbarButtons";
import { Image } from '@styled-icons/material-rounded/Image'
import { Link } from '@styled-icons/material-rounded/Link'
import { FormatColorText } from '@styled-icons/material-rounded/FormatColorText'
import { Check } from '@styled-icons/material-rounded/Check'
import { FontDownload } from '@styled-icons/material-rounded/FontDownload'
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import TextTypeDropdown from "../common/TextTypeDropdown";

export const Toolbar = () => {


  return (
    <>
      <TextTypeDropdown />
      <ToolbarButtonsBasicElements />
      <ToolbarButtonsList />
      <ToolbarButtonsBasicMarks />
      <ColorPickerToolbarDropdown pluginKey={MARK_COLOR} selectedIcon={<Check />} icon={<FormatColorText />} />
      <ColorPickerToolbarDropdown pluginKey={MARK_BG_COLOR} selectedIcon={<Check />} icon={<FontDownload />} />

      <ToolbarButtonsAlign />
      <LinkToolbarButton icon={<Link />} />
      <ImageToolbarButton icon={<Image />} />
      <ToolbarButtonsTable />
    </>
  )
}
