import {
  useEffect,
  useState,
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';
import ScormAgain from 'scorm-again'


export const PackageIFrame = ({properties}) => {

  ScormAgain && console.log('ScormAgain loaded');

  window.API = new window.Scorm12API({});

  window.API.on('LMSSetValue.cmi.*', function(CMIElement, value) {
    API.storeData(true);
    console.log(API.renderCommitCMI(true))
  });

  let dataFromLms = { // this data is passed from the LMS
    cmi: {
      core: {
        entry: 'ab-initio',
        student_id: '@jcputney',
        student_name: 'Jonathan Putney',
      }
    }
  };
  window.API.loadFromJSON(dataFromLms, '');

  var unloaded = false;
  function unloadHandler() {
    if (!unloaded && !API.isTerminated()) {
      API.LMSSetValue('cmi.core.exit', 'suspend'); //Set exit to whatever is needed
      API.LMSCommit(''); //save all data that has already been set
      // API.LMSTerminate(''); //close the SCORM API connection properly
      unloaded = true;
      return false;
    }
    return false;
  }

  window.onbeforeunload = unloadHandler;
  window.onunload = unloadHandler;
  
  return (
    <iframe width="100%" height="100%" src="/scorm/scormdriver/indexAPI.html"></iframe>
  )
}

export default PackageIFrame