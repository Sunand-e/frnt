


function useUpdateGroup(id) {

  const { loading, error, group } = useGetGroup(id)

  return {
    group
  }
}

export default useUpdateGroup