import TextInput from "../inputs/TextInput"

const GlobalFilter = ({
  globalFilter, 
  setGlobalFilter
}) => (
  <div>
    <TextInput
    inputAttrs={{      
      value: globalFilter ?? '',
      onChange:e => setGlobalFilter(e.target.value)}
    }
     placeholder="Search..."
    />
  </div>
)

export default GlobalFilter