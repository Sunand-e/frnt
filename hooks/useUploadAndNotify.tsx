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
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data, 
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total
        // check if we already displayed a toast
        if(progress === 1) {
        } else {
          const text = <>
            Uploading { filenamesSpan }
            <span className='font-bold'> 
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

      client.refetchQueries({
        include: [refetchQuery]
      })
      // the following seems to work better than the above:
      client.query({
        query: refetchQuery,
        fetchPolicy: 'network-only'
      })

      return response.data
    })
  },[method, additionalParams])

  return {
    uploadFilesAndNotify
  }
}

export default useUploadAndNotify