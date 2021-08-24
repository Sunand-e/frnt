import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PrimaryNavItem = ({ item, index, iconClasses, itemClasses, innerRef }) => {
  return (
    // <li className={current === item.title ? styles.current : ''} key={index}>
    <>
    <li ref={innerRef} className={``} key={index}>
      {item?.onClick ?
        (<span onClick={item.onClick}>{item.title}</span>)
        : (
          <Link href={item.urlPath}>
            <a
              // href={item.urlPath} 
              className={`${itemClasses} h-12 flex items-center px-4 transition-colors duration-100 text-base`}
              >
              <div className={`${iconClasses} rounded-full flex-none w-8 h-8 flex items-center justify-center mr-4`}>
                <FontAwesomeIcon className="text-xl" icon={{ prefix: 'fas', iconName: item.icon }} />
              </div>
              <span className="mr-8 whitespace-nowrap">
                {item.title}
              </span>
              <FontAwesomeIcon className="ml-auto h-4" icon={{ prefix: 'fas', iconName: 'chevron-right' }} />
            </a>
          </Link>
        )}
        {/* <div className="absolute w-10 bg-main h-10 top-10 left-10">
        This element is for 'Amazon' style submenu
        </div> */}
    </li>
    </>
  );
};
