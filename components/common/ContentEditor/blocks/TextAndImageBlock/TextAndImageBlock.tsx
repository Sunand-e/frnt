import React, { useMemo, FunctionComponent } from "react";
import classNames from "../../../../../utils/classNames";
import Image from "../../../image/Image";
import Editor from "../../../inputs/Editor";

export const TextAndImageBlock: FunctionComponent = ({ block }) => {
  const width = block?.properties?.width || "50%";

  return (
    <div className="flex flex-col space-y-7">
      {block.properties?.showText !== false && (
        <Editor
          editable={false}
          content={block.content}
          editorClass={classNames(
            'p-0'
          )}
          defaultAlignment={block.editorSettings?.defaultAlignment}
        />
      )}
      {block.properties?.showImage !== false && (
        <Image
          style={{ ...(block.imageSize === "custom" && { width }) }}
          className={classNames(
            'px-0',
            block.imageSize === "fullwidth" && "max-h-[30rem] h-[30rem]",
            block.imageSize === "default" || block.imageSize === undefined
              ? "max-w-[50%]"
              : "w-full"
          )}
          src={block.properties?.url ?? "/images/image-block-placeholder.jpg"}
        />
      )}
    </div>
  );
};

export default TextAndImageBlock;
