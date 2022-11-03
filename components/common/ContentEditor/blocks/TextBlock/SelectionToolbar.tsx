import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import React from 'react';
import { FormatBold } from '@styled-icons/material/FormatBold';
import { FormatItalic } from '@styled-icons/material/FormatItalic';
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined';
import {
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  usePlateEditorRef,
  MARK_COLOR,
  MARK_BG_COLOR,
  ELEMENT_H3,
  ELEMENT_H2,
  ELEMENT_H1,
} from '@udecode/plate-headless';
import {
  MarkToolbarButton,
  ColorPickerToolbarDropdown,
  BlockToolbarButton,
  BalloonToolbar,
} from '@udecode/plate-ui';
// import TextTypeDropdown from '../common/TextTypeDropdown';
import FontSizeDropdown from '../common/FontSizeDropdown';
import { H1, H2, H3 } from '@styled-icons/remix-editor';
import { FormatColorText } from '@styled-icons/material-rounded/FormatColorText';
import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import { FontDownload } from '@styled-icons/material-rounded/FontDownload';

export const SelectionToolbar = () => {
    // const editor = usePlateEditorState()!;
  const editor = usePlateEditorRef()!;

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
      theme={theme}
      arrow={arrow}
    >
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H1)}
        icon={<H1 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H2)}
        icon={<H2 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H3)}
        icon={<H3 />}
      />
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
      <MarkToolbarButton
        type={getPluginType(editor, MARK_COLOR)}
        icon={<ColorPickerToolbarDropdown
          pluginKey={MARK_COLOR}
          icon={<FormatColorText />}
          selectedIcon={<CheckIcon />}
          tooltip={{ content: 'Text color' }}
        />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BG_COLOR)}
        icon={<ColorPickerToolbarDropdown
          pluginKey={MARK_BG_COLOR}
          icon={<FontDownload />}
          selectedIcon={<CheckIcon />}
          tooltip={{ content: 'Highlight color' }}
        />}
      />
    </BalloonToolbar>
  );
}