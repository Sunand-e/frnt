import ItemGrid from "./ItemGrid";
import ItemCollection from "./ItemCollection";
import contentTypes from "../contentTypes"
import { useEffect } from "react";

export default function SearchResults({tags, items, searchParams}) {

  let filteredItems = [];
  
  const toTitleCase = (str) => (
    str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )
  )

  if(searchParams.text) {
    const textResultsObject = items.reduce(
      (filtered,item) => {
        if(item.title.toLowerCase().indexOf(searchParams.text.toLowerCase()) !== -1) {
          return {
            ...filtered,
            title: filtered.title.concat([item])
          }
        } else if(item.excerpt.toLowerCase().indexOf(searchParams.text.toLowerCase()) !== -1) {
          return {
            ...filtered,
            excerpt: filtered.excerpt.concat([item])
          }
        } else if(item.content.toLowerCase().indexOf(searchParams.text.toLowerCase()) !== -1) {
          return {
            ...filtered,
            content: filtered.content.concat([item])
          }
        } else {
          return filtered
        }
      },
      {
        title: [],
        excerpt: [],
        content: []
      }
    )

    filteredItems = textResultsObject.title.concat(textResultsObject.excerpt, textResultsObject.content)
  } else {
    filteredItems = items;
  }

  if(searchParams.type?.value) {
    filteredItems = filteredItems.filter(item => {

      const typeObj = contentTypes.find(type => {
        return type.slug === searchParams.type.value
      });

      return item.__typename === typeObj.name.replace(' ', '');

    });
  }

  if(searchParams.tag?.value) {
    filteredItems = filteredItems.filter(item => {
      const hasTag = ({slug}) => slug === searchParams.tag.value;
      
      return item.contentTagss && item.contentTagss.nodes.some(hasTag);
    });
  }

  let searchString = "";

  if(searchParams.text) {
    searchString += `"${searchParams.text}" in `
    if(searchParams.type?.value) {
      const type = contentTypes.find(type => type.slug === searchParams.type.value)
      searchString += `${type.pluralName}`
    } else {
      searchString += `all items`
    }
  } else {
    if(searchParams.type?.value) {
      const type = contentTypes.find(type => type.slug === searchParams.type.value)
      searchString += `${type.pluralName}`
    } else {
      searchString += 'Items'
    }
  }
  if(searchParams.tag?.value) {
    const tag = tags.find(tag => tag.slug === searchParams.tag.value)
    searchParams.text && (searchString += ',')
    searchString += ` tagged with '${tag.name}'`
  }
  searchString += ':'
  const searchStringComp = <>Search &mdash; {searchString}</>

  const resultCountString = `${filteredItems.length || 'No'} item${filteredItems.length !== 1 ? 's' : ''} found`
  const options = {
    heading: searchStringComp,
    subHeading: resultCountString,
    itemOptions: {
      showType: true
    }
  }
  return (
    <ItemCollection items={filteredItems} options={options}></ItemCollection>
  )
}
