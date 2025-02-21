import Editor from "../../../inputs/Editor";

const Link = ({ 
  buttonText="Click Here",
  url="/",
  editable=true,
  onUpdateHeading=(instance: any) => {},
  onUpdateDesc=(instance: any) => {},
  onMenuHidden=null,
  onMenuShow=null,
  content=null,
  editorClass='p-1'
}) => {
  return (
    <div className="flex items-center p-6 bg-white shadow-md rounded-lg">
      <div className="flex-1">
        <Editor editable={editable} isHeading={true} content={content?.heading_content} editorClass={editorClass} onMenuShow={onMenuShow} onMenuHidden={onMenuHidden} onUpdate={onUpdateHeading} placeholder={"Enter heading here..."} />
        <Editor editable={editable} content={content?.description_content} editorClass={editorClass} onMenuShow={onMenuShow} onMenuHidden={onMenuHidden} onUpdate={onUpdateDesc} />
      </div>
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-main text-white px-4 py-2 rounded"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default Link;
