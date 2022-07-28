import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';
import ScormAgain from 'scorm-again'
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { currentContentItemVar, scormDataVar } from '../../../../graphql/cache';
import { useFullscreen } from "rooks";
import { CREATE_SCO_ATTEMPT, GET_LATEST_SCO_ATTEMPT, UPDATE_SCO_ATTEMPT } from '../../../../graphql/queries/scoAttempts';

declare global {
  interface Window {
    API:any;
    Scorm12API:any;
  }
}



export const IFrameWithRef = ({ iframeRef, ...props }) => {
  return <PackageIFrame {...props} ref={iframeRef} />;
}

export const PackageIFrame = React.forwardRef(({block}, ref) => {
  
  const [createScoAttempt, createScoAttemptResponse] = useMutation(
    CREATE_SCO_ATTEMPT
  );

  const [updateScoAttempt, updateScoAttemptResponse] = useMutation(
    UPDATE_SCO_ATTEMPT
  );

  const { loading, data, error } = useQuery(
    GET_LATEST_SCO_ATTEMPT,
    {
      variables: {
        scormModuleId: block.properties.moduleId,
        courseId: currentContentItemVar().id
      }
    }
  );
  
  const [attemptId, setAttemptId] = useState(null)

  useEffect(() => {
    data && setAttemptId(data?.userLatestScoAttempt.id)
  },[data])


  const scormData = useReactiveVar(scormDataVar)
  const [localScormData, setLocalScormData] = useState(null)

  const saveData = useCallback((data) => {
    if(!data) return
    // alert('saving data, ' + attemptId)
    if(!attemptId) {
    // alert('creating')
    /* DO A LOAD OF DEBUGGING HERE */
    /* DO A LOAD OF DEBUGGING HERE */
      /* DO A LOAD OF DEBUGGING HERE */
      /* DO A LOAD OF DEBUGGING HERE */
      /* DO A LOAD OF DEBUGGING HERE */
      /* DO A LOAD OF DEBUGGING HERE */
      
      createScoAttempt({
        variables: {
          scormModuleId: block.properties.moduleId,
          contentItemId: currentContentItemVar().id,
          attempt: 1,
          data
        }
      }).then(res => {
        // alert('CREATED')
        console.log('SRSESESESESESESESESEESEEEEEEEEEEEEEEEEEEEEEEEEEEEEEsresresresres')
        console.log(res)
        // alert(res.data?.createUserScoAttempt?.id)
        setAttemptId(res.data?.createUserScoAttempt.id)
      })
    } else {
      // alert('updating')
      updateScoAttempt({
        variables: {
          id: attemptId,
          data,
        }
      }).then(res => {
        // alert('UPDATED')
        console.log('resresresresresresresresresresresresresresresresresresresresresresresresresresresresresres')
        console.log(res)
      })
    }
  },[attemptId])

  useEffect(() => {
    localScormData && saveData(localScormData)
  }, [saveData, localScormData])


  useEffect(() => {
    // ScormAgain && console.log('ScormAgain loaded');
    ScormAgain;
    
    const settings = {
      // lmsCommitUrl: '/d'
    }

    if(!window.API) {

      const API = window.API = new window.Scorm12API(settings);

      API.on('LMSSetValue.cmi.*', function(CMIElement, value) {
        // alert(JSON.stringify(CMIElement,null,2) + ' ' +  value)
        API.storeData(true);

        const data = API.renderCommitCMI(true)

        scormDataVar(data)

        if(CMIElement === 'cmi.core.exit' && value==='suspend') {
          // document.querySelector('#debug_panel').innerHTML = '<pre>SCORM package sent exit status</pre>'
          window.API = null
          // setReload(true)
        } else {
          document.querySelector('#debug_panel').innerHTML = '<pre>'+JSON.stringify(data,null,2)+'</pre>'
        }

        setLocalScormData(data)
  
      });
  
      let initialData = { // this data is passed from the LMS
        cmi: {
          core: {
            // entry: 'ab-initio',
            student_id: '@moxley',
            student_name: 'Mark Oxley',
          }
        }
      };
      
      // dataFromLms = storedScormData || dataFromLms
      const dataFromLms = scormData || initialData
  
      API.loadFromJSON(dataFromLms, '');
  
      const unloadHandler = () => {
  
        // console.log('%c SCORMunloadHandler', 'background: #222; color: #bada55');
  
        // if (!unloaded && !API.isTerminated()) {
        //   API.LMSSetValue('cmi.core.exit', 'suspend'); //Set exit to whatever is needed
        //   API.LMSCommit(''); //save all data that has already been set
        //   API.LMSTerminate(''); //close the SCORM API connection properly
        //   setUnloaded(true);
        // }
      }
  
      window.addEventListener('beforeunload', unloadHandler)
      window.addEventListener('unload', unloadHandler)
  
      return () => {
        unloadHandler()
        window.removeEventListener('beforeunload', unloadHandler)
        window.removeEventListener('unload', unloadHandler)
      }
    }

  },[])

  return (
    <>
      {/* <iframe width="100%" height="100%" src={properties.url}></iframe> */}
    {/* <iframe src="/scorm/rise-quiz/scormdriver/indexAPI.html?moduleId=abcdef-123456&contentItemId=1234-5678"></iframe> */}
    <iframe ref={ref} src={block.properties.url}></iframe>
    
    </>
    // <iframe width="100%" height="100%" src="/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html"></iframe>
  )
})

export default React.memo(IFrameWithRef)