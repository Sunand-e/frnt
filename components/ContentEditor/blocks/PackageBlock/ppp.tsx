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
import { useFullscreen } from "rooks";
import { UPSERT_SCO_ATTEMPT, GET_LATEST_SCO_ATTEMPT } from '../../../../graphql/queries/scoAttempts';
import { useRouter } from '../../../../utils/router';
import Button from '../../../Button';
import { GetUser } from '../../../../graphql/queries/__generated__/GetUser';

declare global {
  interface Window {
    API:any;
    Scorm12API:any;
  }
}


const USER_ID_FOR_SCORM = gql`
query GetUserDataForScorm {
  user {
    fullName
    id
  }
}
`
export const IFrameWithRef = ({ iframeRef, ...props }) => {
  return <PackageIFrame {...props} ref={iframeRef} />;
}

export const PackageIFrame = React.forwardRef(({block}, ref) => {
  
  const router = useRouter()

  const { id:courseId } = router.query

  const [upsertScoAttempt, upsertScoAttemptResponse] = useMutation(
    UPSERT_SCO_ATTEMPT
  );

  const { loading, data, error } = useQuery(
    GET_LATEST_SCO_ATTEMPT,
    {
      variables: {
        scormModuleId: block.properties.moduleId,
        courseId
      }
    }
  );
  
  const [attempt, setAttempt] = useState(1)

  useEffect(() => {
    data && setAttempt(data?.latestScoAttempt?.attempt ?? 1)
  },[data])


  const [localScormData, setLocalScormData] = useState(null)

  const saveData = useCallback((data) => {
      upsertScoAttempt({
        variables: {
          attempt: 1,
          contentItemId: courseId,
          scormModuleId: block.properties.moduleId,
          data,
        }
      }).then(res => {
        // alert('UPDATED')
        console.log('resresresresresresresresresresresresresresresresresresresresresresresresresresresresresres')
        console.log(res)
      })
  },[])

  useEffect(() => {
    alert(JSON.stringify(data,null,2))
    // localScormData && !editMode && saveData(localScormData)
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

        const scormData = API.renderCommitCMI(true)

        if(CMIElement === 'cmi.core.exit' && value==='suspend') {
          // document.querySelector('#debug_panel').innerHTML = '<pre>SCORM package sent exit status</pre>'
          window.API = null
          // setReload(true)
        } else {
          // alert(CMIElement)
          // alert(value)
          document.querySelector('#debug_panel').innerHTML = '<pre>'+JSON.stringify(data,null,2)+'</pre>'
        }

        setLocalScormData(scormData)
  
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
      const dataFromLms = initialData
  
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

  const reload = () => {
    // alert('reload')
    // ref.location.reload()
  }
  return (
    <>
      {/* <iframe width="100%" height="100%" src={properties.url}></iframe> */}
    {/* <iframe src="/scorm/rise-quiz/scormdriver/indexAPI.html?moduleId=abcdef-123456&contentItemId=1234-5678"></iframe> */}
    {/* <Button onClick={reload}>Start new attempt</Button> */}
    <iframe ref={ref} src={block.properties.url}></iframe>
    
    </>
    // <iframe width="100%" height="100%" src="/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html"></iframe>
  )
})

export default React.memo(IFrameWithRef)
