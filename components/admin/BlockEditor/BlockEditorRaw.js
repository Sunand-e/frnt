import { useRef, useState } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editor-js-tools";

const BlockEditor = ({ data, setData, instanceRef, className='' }) => {

  const handleChange = async () => {
    const data = await instanceRef.current?.save();
    data && setData(data);
  };

  return (
    <>
      <EditorJs
        className={`${className} width-full`}
        // onChange={handleSave}
        instanceRef={(instance) => (instanceRef.current = instance)}
        data={data}
        tools={EDITOR_JS_TOOLS}
        onChange={handleChange}
      />
    </>
  );
};

export default BlockEditor;
