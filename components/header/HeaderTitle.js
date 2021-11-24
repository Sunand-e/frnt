import { useEffect } from "react"
import { useReactiveVar } from '@apollo/client';
import { pageVar } from "../graphql/cache"

export default function PageTitle({title, subtitle}) {
  
  const page = useReactiveVar(cartItemsVar);
  useEffect(() => {
    pageVar(title)
  },[])

  return (
    <div className="mb-4">
      <h1 className="font-bold text-4xl text-main-dark">{title}</h1>
    </div>
  )
}