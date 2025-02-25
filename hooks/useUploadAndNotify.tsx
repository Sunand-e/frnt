import axios, { Method } from 'axios';
import { DocumentNode } from 'graphql';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import BlinkingEllipsis from '../components/common/misc/BlinkingEllipsis';
import { client } from '../graphql/client';

interface UseUploadAndNotifyProps {
  additionalParams?: {[key: string]: any},
  method?: Method,
  refetchQueries?: DocumentNode[],
  onComplete?
}

const useUploadAndNotify = ({
  additionalParams={},
  method="POST",
  refetchQueries=[],
  onComplete=null,
} : UseUploadAndNotifyProps) => {

  const uploadFilesAndNotify = useCallback(async (endpoint, fileParams, params={}) => {

    const toastId = uuidv4()

    const data = new FormData()

    for(const param in additionalParams) {
      data.append(param, additionalParams[param])
    }

    for(const param in params) {
      data.append(param, params[param])
    }
    
    let filenames = []

    for(const param in fileParams) {
      data.append(param, fileParams[param], fileParams[param].name)
      filenames.push(fileParams[param].name)
    }

    const filenamesSpan = <>
      {filenames.map((filename, index) => (
        <><span className='font-bold'>{filename}</span>{index < filenames.length-1 && ', '}</>
      ))}
    </>
    
    return await axios.request({
      method,
      url: endpoint,
      data, 
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total
        // check if we already displayed a toast
        if(progress === 1) {
        } else {
          const text = <>
            Uploading { filenamesSpan }
            <span className='font-bold'> 
              <BlinkingEllipsis />
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
        <>
          Uploaded: { filenamesSpan }.
        </>
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
      if(refetchQueries.length) {
        client.refetchQueries({
          include: refetchQueries
        })
        // the following seems to work better than the above:
        refetchQueries.forEach((query) => {
          client.query({
            query,
            fetchPolicy: 'network-only'
          })
        })
      }

      return response.data
    })
  },[method, additionalParams])

  return {
    uploadFilesAndNotify
  }
}

export default useUploadAndNotify