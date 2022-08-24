import {CSSProperties, useCallback, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import axios, { Method } from 'axios';
import { client } from '../graphql/client';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

interface UseUploadAndNotifyProps {
  additionalParams?: {[key: string]: any};
  method?: Method,
  refetchQuery?;
}

const useUploadAndNotify = ({
  additionalParams={},
  method="POST",
  refetchQuery=null
} : UseUploadAndNotifyProps) => {
  
  const token = localStorage.getItem('token');

  const uploadFileAndNotify = useCallback(async (file, fileParameterName, endpoint) => {
    const toastId = uuidv4()

    const data = new FormData()

    for(const param in additionalParams) {
      data.append(param, additionalParams[param])
    }
    // data.append('title', file.name)
    data.append(fileParameterName, file, file.name)

    await axios.request({
      method,
      url: endpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data, 
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total
        console.log('progress...' + progress)
        // check if we already displayed a toast
        if(progress === 1) {

          const text = `Uploaded ${file.name}.`

          if(!toast.isActive(toastId)) {
            toast(text, {
              toastId,
              autoClose: 3000
            })
          } else {
            // toast.update(toastId, {
            //   progress,
            //   hideProgressBar: true,
            // })
            toast.update(toastId, {
              progress,
              hideProgressBar: false,
              // autoClose: 1000
            })
          }

        } else {
          const text = `Uploading ${file.name}`

          if(!toast.isActive(toastId)) {
            toast(text, {
              toastId,
              progress,
            })
          } else {
            toast.update(toastId, {
              progress,
            })
          }
        }

      }
    }).then(data => {
      // alert('now')
      setTimeout(() => {
        // toast.done(toastId)
      }, 2000)
      /* REFETCH MEDIA ITEM QUERY TO UPDATE UI */ 
      client.refetchQueries({
        include: [refetchQuery]
      })
    })
  },[method])

  return {
    uploadFileAndNotify
  }
}

export default useUploadAndNotify