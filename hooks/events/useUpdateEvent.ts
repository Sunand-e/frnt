import useGetEvent from "./useGetEvent"

function useUpdateEvent(id) {

  const { loading, error, group } = useGetEvent(id)

  return {
    group
  }
}

export default useUpdateEvent