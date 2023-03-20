import {useCallback, useState} from 'react';
import axios, { Method } from 'axios';
import { client } from '../graphql/client';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Dot } from '../components/common/misc/Dot';
import getJWT from '../utils/getToken';

interface UseUploadAndNotifyProps {
  additionalParams?: {[key: string]: any};
  method?: Method,
  refetchQuery?;
  onComplete?;
}

const useUploadAndNotify = ({
  additionalParams={},
  method="POST",
  refetchQuery=null,
  onComplete=null,
} : UseUploadAndNotifyProps) => {
  
  const token = getJWT();
  const [dismissed, setDismissed] = useState(false);

  const uploadFileAndNotify = useCallback(async (file, fileParameterName, endpoint) => {
    const toastId = uuidv4()

    const data = new FormData()

    for(const param in additionalParams) {
      data.append(param, additionalParams[param])
    }
    
    data.append(fileParameterName, file, file.name)

    return await axios.request({
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
        } else {
          const text = <>
            Uploading 
            <span className='font-bold'> {file.name}
              <Dot>.</Dot>
              <Dot>.</Dot>
              <Dot>.</Dot>
            </span>
          </>

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
    }).then(response => {
      
      const text = (
        <>Uploaded <span className='font-bold'>{file.name}</span>.</>
      )
      
      if(toast.isActive(toastId)) {
        toast.update(toastId, {
          progress: 1,
          hideProgressBar: false,
          // autoClose: 1000
        })
      }

      setTimeout(() => {
        toast(text, {
          toastId: toastId+'done',
          hideProgressBar: true,
          autoClose: 2500
        })
      }, 1000)
      /* REFETCH QUERY TO UPDATE UI */ 
      onComplete && onComplete(response)
      client.refetchQueries({
        include: [refetchQuery]
      })
      return response.data
    })
  },[method])

  return {
    uploadFileAndNotify
  }
}

export default useUploadAndNotify