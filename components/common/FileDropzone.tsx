import {CSSProperties, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const activeStyle: CSSProperties = {
  borderColor: '#2196f3'
};

const acceptStyle: CSSProperties = {
  borderColor: '#00e676'
};

const rejectStyle: CSSProperties = {
  borderColor: '#ff1744'
};

export interface FileDropzoneProps {
  accept;
  dropZoneContent;
  onClick?;
  onDrop;
  multiple;
}

const FileDropzone = ({
  accept,
  dropZoneContent,
  onClick = null,
  onDrop = (acceptedFiles, fileRejections, event) => null,
  multiple=true,
}) => {
  
  const handleDrop = (acceptedFiles, fileRejections, event) => {
    console.log('runtings')
    onDrop(acceptedFiles, fileRejections, event)
  }
  
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    multiple,
    onDrop: handleDrop
  });

  const style = useMemo(() => ({
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  
  return (
    <div className="container mb-4">
      <div {...getRootProps({
        style,
        className: "flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
        ...(onClick && { onClick })
      })}>
        <input {...getInputProps()} />
        <div className="space-y-1 text-center">
          {dropZoneContent}
        </div>
      </div>
    </div>
    
  );
}

export default FileDropzone