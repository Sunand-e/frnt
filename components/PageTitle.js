import { useEffect } from "react"
// import { useReactiveVar } from '@apollo/client';
import { viewVar } from "../graphql/cache"

export default function PageTitle({title, subtitle}) {

  useEffect(() => {
    viewVar({
      ...viewVar(),
      title, 
      subtitle
    })
  },[])

  return (
    <></>
  )
}