import {CSSProperties, useContext, useMemo, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import { ModalContext } from '../context/modalContext';
import axios from 'axios';
import { client } from '../graphql/client';
import { GET_MEDIA_ITEMS } from '../graphql/queries/allQueries';
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

const FileUploader = ({accept, dropZoneText, endpoint, refetchQuery, fileParameterName, additionalParams={}}) => {
  
  const handleDrop = (acceptedFiles) => {
    
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMjAyOWJkNjMtZjFlZi1mODRmLWY2NGYtZmM2ZWRhODNhZTVmIiwicnNrIjoiNWQifQ.CepICi0497fgxaNfo9kp5ZQ8DmaHOqUgKGYx29VozJo'
    const tenantId = '5957f90c-e7bc-47fc-8bb9-5b93fc763b2f'
    
    for (const file of acceptedFiles) {
      const toastId = uuidv4()

      const data = new FormData()

      data.append('tenant_id', tenantId)

      for(const param in additionalParams) {
        data.append(param, additionalParams[param])
      }
  
      data.append('title', file.name)
      data.append(fileParameterName, file, file.name)
      axios.request({
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
              progress: progress
            })
          }

        }
      }).then (data => {
        toast.done(toastId.current)
         /* REFETCH MEDIA ITEM QUERY TO UPDATE UI */ 
        client.refetchQueries({
          include: [refetchQuery]
        })
      })
    }
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