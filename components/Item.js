import Link from "next/link";
import contentTypes from "../contentTypes";

function ItemTags({ tags }) {
// console.log(tags);
  return (
    <div className="flex">

      <span>Tags:</span>
      {
        tags.map(tag => {
          // console.log('tag')
          // console.log(tag)
          
          return (
            <a href="#" className="text-blue-dark font-semibold">{tag.name}</a>
            )}
        )
      }
    </div>
  )
}

export default function Item({ item }) {

  const imageSrc = item.featuredImage ? item.featuredImage.node.sourceUrl : '/item-placeholder.jpg';

  const typeObj = contentTypes.find(type => {
    return item.__typename === type.name.replace(' ', '');
  });

  console.log('item');
  console.log(item);

  return (
    <div className="flex flex-col overflow-hidden shadow-lg bg-main-semitransparent relative">
      <div className="bg-cover bg-center pb-1/2" style={{
        backgroundImage: `url(${imageSrc})`
      }}>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        {/* <h2 className="text-lg text-blue-dark mb-2 border-blue border-2 bg-white top-5 font-bold p-1 px-5"> */}
        <h2 className="text-lg text-blue mb-2 top-5 font-bold">
          {typeObj.name}
        </h2>
        <h2 className="text-xl text-blue-dark font-semibold mb-2">{item.title}</h2>
        {/* { item.contentTagss && <ItemTags tags={item.contentTagss.nodes} /> } */}
        {/* <div dangerouslySetInnerHTML={{
          __html: item.excerpt
        }}></div> */}
        <Link href={typeObj.slug + '/' + item.slug}>
          <a className="mt-auto bg-blue text-center p-2 text-white uppercase">{item.buttonText}</a>
        </Link>
      </div>
    </div>
  )

}
