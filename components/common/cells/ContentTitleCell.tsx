import { getIconFromFilename } from "../../../utils/getIconFromFilename";
import { resourceTypes } from "../../resources/resourceTypes";
import { contentTypes } from "../contentTypes";
import useGetThumbnail from "../items/useGetThumbnail";
import ItemWithImage from "./ItemWithImage";

const ContentTitleCell = ({ item, itemWithImageProps = {} }) => {
  const type = contentTypes[item.itemType];
  const { src } = useGetThumbnail(item, 50);
  const { contentType, itemType } = item;
  let icon = type?.icon ? <type.icon className="p-1" /> : null;
  let rounded = "full";

  if (itemType === "resource" && typeof contentType === "string") {
    const IconComponent =
      contentType === "document"
        ? getIconFromFilename(item.document?.fileName)
        : resourceTypes[contentType as keyof typeof resourceTypes]?.icon;

    if (IconComponent) {
      icon = <IconComponent className="p-1" />;
    }
    rounded = !src && contentType === "document" ? "none" : "full";
  }

  const cellProps = {
    image: item.image,
    imageSrc: src,
    icon,
    rounded,
    title: item.title,
    ...itemWithImageProps,
  };

  return <ItemWithImage {...cellProps} />;
};

export default ContentTitleCell;
