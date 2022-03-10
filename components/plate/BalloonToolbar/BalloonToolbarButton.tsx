import {
  getPreventDefaultHandler,
  isMarkActive,
  toggleMark,
  usePlateEditorState,
  withPlateProvider,
} from '@udecode/plate-core';
import { MarkToolbarButtonProps, ToolbarButton } from '@udecode/plate';


/**
 * Toolbar button to toggle the mark of the leaves in selection.
 */

type BalloonToolbarButtonProps = Exclude<MarkToolbarButtonProps, "type">

export const MarkToolbarButton = withPlateProvider(
  ({ type, clear, ...props }: BalloonToolbarButtonProps) => {
    const editor = usePlateEditorState()!;

    return (
      <ToolbarButton
        onMouseDown={
          editor
            ? getPreventDefaultHandler(toggleMark, editor, { clear })
            : undefined
        }
        {...props}
      />
    );
  }
);