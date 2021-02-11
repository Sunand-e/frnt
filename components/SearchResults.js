import ItemGrid from "./ItemGrid";
import contentTypes from "../contentTypes"

export default function SearchResults({tags, items, searchParams}) {
  console.log('searchParams');
  console.log(searchParams);
  console.log('items');
  console.log(items);

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

  if(searchParams.type) {
    filteredItems = filteredItems.filter(item => {

      const typeObj = contentTypes.find(type => {
        return type.slug === searchParams.type
      });

      return item.__typename === typeObj.name.replace(' ', '');

    });
  }

  if(searchParams.tag) {
    console.log(searchParams.tag);
    filteredItems = filteredItems.filter(item => {
      const hasTag = ({slug}) => slug === searchParams.tag;
      
      return item.contentTagss && item.contentTagss.nodes.some(hasTag);
    });
  }

  console.log(toTitleCase(searchParams.type.replace(/_/g, ' ')).replace(' ', ''));
  // sortedFilteredItems = items.

  let searchString = "";

  if(searchParams.text) {
    searchString += `"${searchParams.text}" in `
    if(searchParams.type) {
      searchString += `${searchParams.type}s`
    } else {
      searchString += `all items`
    }
  } else {
    if(searchParams.type) {
      searchString += `${searchParams.type}s`
    } else {
      searchString += 'Items'
    }
  }
  if(searchParams.tag) {
    searchString += `, tagged with '${searchParams.tag}'`
  }
  searchString += ':'
  const searchStringComp = <>Search &mdash; {searchString}</>

  return (
    <div className="">
      <h1 className="text-3xl mt-16 text-blue-dark">{searchStringComp}</h1>
      <ItemGrid items={filteredItems}></ItemGrid>

    </div>
  )
}
