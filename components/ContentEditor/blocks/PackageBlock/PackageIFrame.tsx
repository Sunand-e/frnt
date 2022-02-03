import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';
import ScormAgain from 'scorm-again'
import { useReactiveVar } from '@apollo/client';
import { scormDataVar } from '../../../../graphql/cache';

declare global {
  interface Window {
    API:any;
    Scorm12API:any;
  }
}

export const PackageIFrame = ({block}) => {

  const {properties} = block

  const scormData = useReactiveVar(scormDataVar)

  useEffect(() => {
    // ScormAgain && console.log('ScormAgain loaded');
    ScormAgain;
    
    const settings = {
      // lmsCommitUrl: '/d'
    }

    if(!window.API) {

      const API = window.API = new window.Scorm12API(settings);

      API.on('LMSSetValue.cmi.*', function(CMIElement, value) {
        API.storeData(true);
        const data = API.renderCommitCMI(true)
        scormDataVar(data)

        if(CMIElement === 'cmi.core.exit' && value==='suspend') {
          // document.querySelector('#debug_panel').innerHTML = '<pre>SCORM package sent exit status</pre>'
          window.API = null
          // setReload(true)
        } else {
          // document.querySelector('#debug_panel').innerHTML = '<pre>'+JSON.stringify(data,null,2)+'</pre>'
        }

        // localStorage.setItem('scormdata', JSON.stringify(data))
  
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
    <iframe src={block.properties.url}></iframe>
    
    </>
    // <iframe width="100%" height="100%" src="/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html"></iframe>
  )
}

export default React.memo(PackageIFrame)