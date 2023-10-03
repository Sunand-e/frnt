import { useEffect } from "react";

import { closeModal } from "../../../../../stores/modalStore";
import classNames from "../../../../../utils/classNames";
import { ConditionalWrapper } from "../../../ConditionalWrapper";
import Editor from "../../../inputs/Editor";
import ImageSelectFromLibrary from "../../ImageSelectFromLibrary";
import useBlockEditor from "../../useBlockEditor";
import { useBlockStore } from "../../useBlockStore";
import ResizeableElement from "../common/ResizeableElement";

export const TextAndImageBlockEdit = ({ id }) => {
  // const block = useBlockStore(state => state.getBlock(id))
  const block = useBlockStore((state) => state.computed.getBlock(id));

  const { debouncedUpdateBlock } = useBlockEditor();
  const updateBlock = useBlockStore((state) => state.updateBlock);
  const blockRef = useBlockStore((state) => state.blockRefs.get(id));

  const defaultWidth = "50%";

  const handleContentChange = (newValue) => {
    debouncedUpdateBlock({
      ...block,
      content: newValue,
    });
  };

  useEffect(() => {
    !block.content && setTimeout(focus, 10);
  }, []);

  // Temporary(!!!) z-index fix for textAndImage blocks inside a carousel;
  const onMenuShow = (instance) => {
    if (blockRef) {
      const closestCarouselViewport = blockRef.closest(
        '[data-scope="carousel"][data-part="viewport"]'
      );
      const carouselControls = closestCarouselViewport.querySelector(
        '[data-part="control"]'
      );
      const carouselSlideGroup = closestCarouselViewport.querySelector(
        '[data-part="slide-group"]'
      );
      carouselControls.style.zIndex = "0";
      carouselSlideGroup.style.zIndex = "1";
    }
  };

  const onMenuHidden = (instance) => {
    if (blockRef) {
      const closestCarouselViewport = blockRef.closest(
        '[data-scope="carousel"][data-part="viewport"]'
      );
      const carouselControls = closestCarouselViewport.querySelector(
        '[data-part="control"]'
      );
      const carouselSlideGroup = closestCarouselViewport.querySelector(
        '[data-part="slide-group"]'
      );
      carouselControls.style.removeProperty("z-index");
      carouselSlideGroup.style.removeProperty("z-index");
    }
  };

  const selectImage = (image) => {
    const newBlock = {
      ...block,
      properties: {
        ...block.properties,
        url: image?.location,
        mediaId: image?.id,
      },
    };
    updateBlock(newBlock);
    closeModal();
  };
  return (
    <div className="flex flex-col space-y-7">
      {block.properties?.showText !== false && (
        <Editor
          onUpdate={handleContentChange}
          onMenuShow={onMenuShow}
          onMenuHidden={onMenuHidden}
          content={block.content}
          autofocus={false}
          defaultAlignment={block.editorSettings?.defaultAlignment}
          editorClass={classNames(
            'p-0'
          )}
        />
      )}

      {block.properties?.showImage !== false && (
        <ConditionalWrapper
          condition={block.imageSize !== "custom"}
          wrapper={(children) => (
            <div className="flex justify-center">{children}</div>
          )}
        >
          <ConditionalWrapper
            condition={block.imageSize === "custom"}
            wrapper={(children) => (
              <ResizeableElement block={block} defaultWidth={defaultWidth}>
                {children}
              </ResizeableElement>
            )}
          >
            <ImageSelectFromLibrary
              src={block.properties?.url}
              onSelect={selectImage}
              className={classNames(
                // NO CLASSNAME IF CUSTOM SIZED
                block.imageSize === "fullwidth" && "h-full max-h-[30rem]",
                block.imageSize === "default" || block.imageSize === undefined
                  ? "max-w-[50%]"
                  : "w-full"
              )}
            />
          </ConditionalWrapper>
        </ConditionalWrapper>
      )}
    </div>
  );
};

export default TextAndImageBlockEdit;
