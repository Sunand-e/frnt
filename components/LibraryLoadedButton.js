import { useReactiveVar } from '@apollo/client';
import { libraryStatusVar } from "../graphql/cache";

export default function LibraryLoadedButton() {
  const libraryStatus = useReactiveVar(libraryStatusVar);
  return (
    <button onClick={() => libraryStatusVar('loadeddd')} className="bg-red-500">Current status: {libraryStatus}</button>
  )
}