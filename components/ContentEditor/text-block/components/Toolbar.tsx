import { ToolbarColorPicker } from "@udecode/plate-font-ui";
import { ToolbarImage } from "@udecode/plate-image-ui";
import { ToolbarLink } from "@udecode/plate-link-ui";
import { ToolbarButtonsAlign, ToolbarButtonsBasicElements, ToolbarButtonsBasicMarks, ToolbarButtonsList, ToolbarButtonsTable } from "./ToolbarButtons";
import { Image } from '@styled-icons/material-rounded/Image'
import { Link } from '@styled-icons/material-rounded/Link'
import { FormatColorText } from '@styled-icons/material-rounded/FormatColorText'
import { FontDownload } from '@styled-icons/material-rounded/FontDownload'
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";

export const Toolbar = () => (
  <>
    <ToolbarButtonsBasicElements />
    <ToolbarButtonsList />
    <ToolbarButtonsBasicMarks />
    <ToolbarColorPicker pluginKey={MARK_COLOR} icon={<FormatColorText />} />
    <ToolbarColorPicker pluginKey={MARK_BG_COLOR} icon={<FontDownload />} />
    <ToolbarButtonsAlign />
    <ToolbarLink icon={<Link />} />
    <ToolbarImage icon={<Image />} />
    <ToolbarButtonsTable />
  </>
)
