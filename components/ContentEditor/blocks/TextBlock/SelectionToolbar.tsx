import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import React from 'react';
import { FormatBold } from '@styled-icons/material/FormatBold';
import { FormatItalic } from '@styled-icons/material/FormatItalic';
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined';
import {
  BalloonToolbar,
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
  usePlateEditorRef,
  ColorPickerToolbarDropdown,
  MARK_COLOR,
  MARK_BG_COLOR,
} from '@udecode/plate';
// import TextTypeDropdown from '../common/TextTypeDropdown';
import FontSizeDropdown from '../common/FontSizeDropdown';
import { FormatColorText } from '@styled-icons/material-rounded/FormatColorText';
import { CheckIcon } from '@heroicons/react/solid';
import { FontDownload } from '@styled-icons/material-rounded/FontDownload';
import { AlignToolbarButtons } from '../../../plate/Toolbar';

export const SelectionToolbar = () => {
  // const editor = usePlateEditorRef()!;
  const editor = usePlateEditorRef();

  const arrow = false;
  const theme = 'dark';
  const tooltip: any = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top',
  };

  return (
    <BalloonToolbar
      popperOptions={{
        placement: 'top',
      }}
      theme={theme}
      arrow={arrow}
    >
      <FontSizeDropdown />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
        tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
        tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
        tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
      />
      <ColorPickerToolbarDropdown
        pluginKey={MARK_COLOR}
        icon={<FormatColorText />}
        selectedIcon={<CheckIcon />}
        tooltip={{ content: 'Text color' }}
      />
      <ColorPickerToolbarDropdown
        pluginKey={MARK_BG_COLOR}
        icon={<FontDownload />}
        selectedIcon={<CheckIcon />}
        tooltip={{ content: 'Highlight color' }}
      />
      <AlignToolbarButtons />
    </BalloonToolbar>
  );
};