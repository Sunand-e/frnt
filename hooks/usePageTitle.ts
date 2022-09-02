import { useEffect } from "react";
import { pageTitleVar } from "../graphql/cache";

function usePageTitle(data) {
  useEffect(() => {
    pageTitleVar(data)
  },[data])
}

export default usePageTitle