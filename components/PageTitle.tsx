import { useEffect } from "react"
// import { useReactiveVar } from '@apollo/client';
import { viewVar } from "../graphql/cache"
import { PageTitleProps } from "./PageTitleProps.d"

export default function PageTitle({title, subtitle}: PageTitleProps): JSX.Element {

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