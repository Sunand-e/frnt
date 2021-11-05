import { usePlateStore } from "@udecode/plate-core";

const ShowStore = () => {
  // const store = {
  //   tt: ['a']
  // }
  const store = usePlateStore();
// const wstore = {
//   a: 'b',
//   c: 'd',
//   e: 'f'
// }
  // const newobj = Object.entries(wstore);

  return (
    <>
      <h2>Store</h2>
      <pre>
        {JSON.stringify(store,null,2)}
      </pre>
    </>
  )
}

export default ShowStore