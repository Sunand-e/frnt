import {CSSProperties, useContext, useMemo, useRef} from 'react';
import {useDropzone} from 'react-dropzone';
import { ModalContext } from '../../context/modalContext';
import axios from 'axios';
import { mediaItemsVar } from '../../graphql/cache';
import { client } from '../../graphql/client';
import { GET_MEDIA_ITEMS } from '../../graphql/queries/allQueries';
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

const FileUploader = (props) => {

  
  const handleDrop = (acceptedFiles) => {
    
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMjAyOWJkNjMtZjFlZi1mODRmLWY2NGYtZmM2ZWRhODNhZTVmIiwicnNrIjoiNWQifQ.CepICi0497fgxaNfo9kp5ZQ8DmaHOqUgKGYx29VozJo'
    const tenantId = '5957f90c-e7bc-47fc-8bb9-5b93fc763b2f'
    
    for (const file of acceptedFiles) {
      const toastId = uuidv4()
      console.log('file.name')
      console.log(file.name)
      console.log(file.size)
      console.log(file.type)
      // mediaItemsVar([...mediaItemsVar(), file] )

      const data = new FormData()

      data.append('tenant_id', tenantId)
      data.append('title', 'Test title text')
      data.append('alt_text', 'Test alt text')
  
      data.append('file', file, file.name)
      axios.request({
        method: "post", 
        url: "/uploads/upload_media",
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
          include: [GET_MEDIA_ITEMS]
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
    accept: [
      'image/jpeg',
      'image/pjpeg',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/x-icon',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/mspowerpoint',
      'application/powerpoint',
      'application/vnd.ms-powerpoint',
      'application/x-mspowerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/mspowerpoint',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      'application/vnd.oasis.opendocument.text',
      'application/excel',
      'application/vnd.ms-excel',
      'application/x-excel',
      'application/x-msexcel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/octet-stream',
      'application/zip',
      'audio/mpeg3',
      'audio/x-mpeg-3',
      'video/mpeg',
      'video/x-mpeg',
      'audio/m4a',
      'audio/ogg,',
      'audio/wav',
      'audio/x-wav',
      'video/mp4',
      'video/x-m4v',
      'video/quicktime',
      'video/x-ms-asf',
      'video/x-ms-wmv',
      'application/x-troff-msvideo',
      'video/avi',
      'video/msvideo',
      'video/x-msvideo',
      'audio/mpeg',
      'video/mpeg',
      'video/ogg',
      'video/3gpp',
      'audio/3gpp',
      'video/3gpp2',
      'audio/3gpp2'
    ],
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

  
  // const query = gql`
  //   mutation Upload(
  //     $input: String!
  //   ) {
  //     upload @rest(input: $input, type: "Person", method: "POST" path: "") {
  //       input {
  //         g
  //       }
  //     }
  //   }
  // `

  const { closeModal } = useContext(ModalContext);
  
  return (
    <div className="container mb-4">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click this box to select files</p>
      </div>
      {/* {files} */}
      {/* <Button onClick={() => handleDrop()}>Cancel</Button> */}

    </div>
    
  );
}

export default FileUploader