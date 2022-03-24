import {CSSProperties, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import { client } from '../graphql/client';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const baseStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle: CSSProperties = {
  borderColor: '#2196f3'
};

const acceptStyle: CSSProperties = {
  borderColor: '#00e676'
};

const rejectStyle: CSSProperties = {
  borderColor: '#ff1744'
};

const FileUploader = ({
  accept, 
  dropZoneText, 
  endpoint, 
  refetchQuery, 
  fileParameterName,
  onAllUploadsComplete = () => null,
  additionalParams={}
}) => {
  
  const token = localStorage.getItem('token');

  const uploadFileAndNotify = async (file) => {
    const toastId = uuidv4()

    const data = new FormData()

    for(const param in additionalParams) {
      data.append(param, additionalParams[param])
    }

    // data.append('title', file.name)
    data.append(fileParameterName, file, file.name)

    await axios.request({
      method: "post", 
      url: endpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data, 
      onUploadProgress: (p) => {

        const progress = p.loaded / p.total
        // check if we already displayed a toast
        if(!toast.isActive(toastId)) {
          toast('Upload in Progress', {
            toastId,
            progress
          })
        } else {
          toast.update(toastId, {
            progress: progress,
          })
        }

      }
    }).then(data => {
      toast.update(toastId, {
        render: "Upload completed",
      })
      toast.done(toastId.current)
      /* REFETCH MEDIA ITEM QUERY TO UPDATE UI */ 
      client.refetchQueries({
        include: [refetchQuery]
      })
    })
  }

  const handleDrop = (acceptedFiles) => {
    
    const uploadPromises = acceptedFiles.map(uploadFileAndNotify)

    Promise.all(uploadPromises).then(onAllUploadsComplete)
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept,
    onDrop: handleDrop
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
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
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{dropZoneText}</p>
      </div>
    </div>
    
  );
}

export default FileUploader