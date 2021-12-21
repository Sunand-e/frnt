import {
  useEffect,
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

export const PackageIFrame = ({properties}) => {

  const [unloaded, setUnloaded] = useState(false)

  const scormData = useReactiveVar(scormDataVar)

  useEffect(() => {
    // ScormAgain && console.log('ScormAgain loaded');
    ScormAgain;
    
    const settings = {
      // lmsCommitUrl: '/d'
    }

    const API = window.API = new window.Scorm12API(settings);

    API.on('LMSSetValue.cmi.*', function(CMIElement, value) {
      console.log('CMIElement')
      console.log(CMIElement, value)
      API.storeData(true);
      const data = API.renderCommitCMI(true)
      // localStorage.setItem('scormdata', JSON.stringify(data))
      scormDataVar(data)

    });

    let dataFromLms = { // this data is passed from the LMS
      cmi: {
        core: {
          // entry: 'ab-initio',
          student_id: '@moxley',
          student_name: 'Mrk Oxley',
        }
      }
    };

    let storedScormData = JSON.parse(localStorage.getItem('scormdata'))
    
    // dataFromLms = storedScormData || dataFromLms
    dataFromLms = storedScormData || dataFromLms

    API.loadFromJSON(dataFromLms, '');

    const unloadHandler = () => {
      if (!unloaded && !API.isTerminated()) {
        API.LMSSetValue('cmi.core.exit', 'suspend'); //Set exit to whatever is needed
        API.LMSCommit(''); //save all data that has already been set
        API.LMSTerminate(''); //close the SCORM API connection properly
        setUnloaded(true);
      }
    }

    window.addEventListener('beforeunload', unloadHandler)
    window.addEventListener('unload', unloadHandler)

    return () => {
      unloadHandler()
      window.removeEventListener('beforeunload', unloadHandler)
      window.removeEventListener('unload', unloadHandler)
    }
  },[])

  return (
    // <iframe width="100%" height="100%" src="/scorm/scormdriver/indexAPI.html"></iframe>
    // <iframe width="100%" height="100%" src="/scorm/rise-quiz/scormdriver/indexAPI.html"></iframe>
    // '/private/scorm-data/#{scorm.id}/#{params[:content_item_id]}'
    // <iframe width="100%" height="100%" src="/scorm/rise-quiz/scormdriver/indexAPI.html?moduleId=abcdef-123456&contentItemId=1234-5678"></iframe>
    <iframe width="100%" height="100%" src="/scorm/rise-quiz/scormdriver/indexAPI.html?moduleId=abcdef-123456&contentItemId=1234-5678"></iframe>
    // <iframe width="100%" height="100%" src="/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html"></iframe>
  )
}

export default PackageIFrame