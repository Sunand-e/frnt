import { contentTypes } from "../components/common/contentTypes";
import { noDataDash } from "./commonTableCols";

export const getAssociatedContentString = (entity, keyPrefix) => {
  const parts = [];

  Object.keys(contentTypes).forEach(key => {
    const type = contentTypes[key];
    const pluralKey = type.pluralKey.charAt(0).toUpperCase() + type.pluralKey.slice(1);
    const count = entity[`${keyPrefix}${pluralKey}`]?.totalCount;

    if (count > 0) {
      parts.push(`${count} ${count !== 1 ? type.plural : type.name}`);
    }
  });

  return parts.join(', ') || noDataDash;
};