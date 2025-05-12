import { useEffect, useState } from "react";
import TextInput from "../inputs/TextInput"

const GlobalFilter = ({
  globalFilter, 
  setGlobalFilter
}) => {

  const [inputValue, setInputValue] = useState(globalFilter ?? '');

  useEffect(() => {
    setInputValue(globalFilter ?? '');
  }, [globalFilter]);

  return (
    <div>
      <TextInput
        inputAttrs={{
          value: inputValue,
          onChange: (e: any) => setInputValue(e.target.value),
          onBlur: (e: any) => setGlobalFilter(e.target.value),
          onKeyDown: (e: any) => {if (e.key === 'Enter') setGlobalFilter(e.target.value);}
        }}
        placeholder="Search..."
      />
    </div>
  )
};

export default GlobalFilter;
