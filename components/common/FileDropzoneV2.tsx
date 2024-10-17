import {CSSProperties, useCallback, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import { GET_MEDIA_ITEMS } from '../../graphql/queries/mediaItems';
import useUploadAndNotify from '../../hooks/useUploadAndNotify';

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
  linkText?;
  preventInteraction?;
  multiple;
}

const DropzoneContent = ({open=null, icon=null, fileHintText='', linkText='upload a file', openMediaLibrary=null}) => {

  const handleMediaLibraryClick = (e) => {
    e.stopPropagation()
    openMediaLibrary()
  }
  const openDialog = (e) => {
    e.stopPropagation()
    open()
  }
  return (
    <>
      {icon}
      <div className="flex w-full justify-center text-sm text-gray-600">
        { openMediaLibrary && (
          <>
            <button className="font-medium text-main hover:opacity-70 pl-1">Choose from media library</button>
            <span>{', '}</span>
          </>
        )}
        <button
          onClick={openDialog}
          className="pl-1 relative cursor-pointer rounded-md font-medium text-main focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-main"
        >
          <span className="hover:opacity-70">{linkText}</span>
        </button>

        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs text-gray-500">{ fileHintText }</p>
    </>
  )
}

const FileDropzoneV2 = ({
  accept,
  preventInteraction=false,
  openMediaLibrary=()=>null,
  icon=null,
  fileHintText='',
  linkText,
  onClick = null,
  onUpload=null,
  onDrop = (acceptedFiles, fileRejections, event) => null,
  multiple=true,
}) => {
  const refetchQuery = GET_MEDIA_ITEMS
  const endpoint = "/uploads/upload_media"


  const handleDrop = useCallback((acceptedFiles) => {
    uploadFilesAndNotify(endpoint, {file: acceptedFiles[0]}).then((data) => {
      onUpload(data.file)
    })
    // onDrop(acceptedFiles)
  },[endpoint])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({
    accept,
    multiple,
    onDrop: handleDrop,
    ...(preventInteraction && {
      noClick: true,
      noKeyboard: true
    })
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
  
  const { uploadFilesAndNotify } = useUploadAndNotify({
    refetchQueries: [refetchQuery],
  })

  
  return (
    <div className="container">
      <div {...getRootProps({
        style,
        className: "flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
        ...(onClick && { onClick })
      })}>
        <input {...getInputProps()} />
        <div className="space-y-1 text-center">
          <DropzoneContent
            open={open}
            icon={icon}
            fileHintText={fileHintText}
            linkText={linkText}
            openMediaLibrary={openMediaLibrary}
          />
        </div>
      </div>
    </div>
    
  );
}

export default FileDropzoneV2