import Link from "next/link";
import classNames from "../../../utils/classNames";
import TooltipIfClamped from "../floating-ui/TooltipIfClamped";
import { useTableContext } from "../tables/tableContext";

interface ItemWithImageProps {
  rounded?: 'none' | 'md' | 'full';
  imgDivClass?: string;
  title: string;
  objectFit?: 'fill' | 'cover' | 'contain';
  placeholder?: string;
  secondary?: string;
  image?: { id: string };
  imageSrc?: string;
  icon?: JSX.Element;
  href?: string;
}

const roundedClasses = {
  none: 'rounded-none',
  md: 'rounded-md',
  full: 'rounded-full',
};

const objectFitClasses = {
  fill: 'object-fill',
  cover: 'object-cover',
  contain: 'object-contain',
};

const iconSizeOptions = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const ConditionalLinkWrapper: React.FC<{ href?: string; children: React.ReactNode }> = ({ href, children }) => (
  href ? <Link href={href}>{children}</Link> : <>{children}</>
);

const ItemWithImage: React.FC<ItemWithImageProps> = ({
  rounded = 'full',
  imgDivClass = '',
  title,
  objectFit = 'cover',
  placeholder,
  secondary,
  image,
  imageSrc,
  icon,
  href,
}) => {

  const rowSizing = useTableContext(s => s.rowSizing)

  const imageAltText = `${title} - ${secondary}`;

  const iconSizeClass = iconSizeOptions[rowSizing] || iconSizeOptions.md;

  return (
    <ConditionalLinkWrapper href={href}>
      <div className="flex items-center max-w-xs text-main">
        <div className={classNames(
          iconSizeClass,
          'flex justify-center items-center shrink-0 overflow-hidden',
          imgDivClass,
          roundedClasses[rounded]
        )}>
          {image || imageSrc ? (
            <img
              className={classNames(iconSizeClass, objectFitClasses[objectFit])}
              src={imageSrc || `/uploaded_images/${image?.id}?w=50`}
              alt={imageAltText}
              loading="lazy" // Example of performance optimization
            />
          ) : (
            icon || (
              <img
              className={classNames(iconSizeClass, objectFitClasses[objectFit])}
                src={placeholder || '/images/placeholder-image.png'}
                alt={imageAltText}
                loading="lazy"
              />
            )
          )}
        </div>
        <div className="ml-4 w-full">
          <TooltipIfClamped className={classNames(
            "font-medium text-gray-900",
            !!secondary ? 'line-clamp-1' : 'line-clamp-2'
          )}>{title}</TooltipIfClamped>
          {secondary && (
            <TooltipIfClamped className=" text-gray-500 line-clamp-1 break-words w-full">{secondary}</TooltipIfClamped>
          )}
        </div>
      </div>
    </ConditionalLinkWrapper>
  );
};

export default ItemWithImage;