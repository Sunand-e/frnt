
// src/TipTap.jsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import useUpdateCapability from '../../hooks/roles/useUpdateCapability';
import { useDebouncedCallback } from 'use-debounce';
import { useCallback, useEffect, useState } from 'react';

const CapabilityReachEntry = ({cap, type, value='', containerClass='', onUpdate=null}) => {

  const { updateCapability } = useUpdateCapability(cap.id)

  const debouncedUpdate = useDebouncedCallback((values) => {
    updateCapability(values)
  },1000)


  const updateCapDetails = ({editor}) => {
    if(editor) {
      const newVals = {
        id: cap.id,
        details: {
          ...cap.details,
          [type]: editor?.getJSON()
        }
      }
      debouncedUpdate(newVals)  
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    onUpdate: updateCapDetails,
    content: cap?.details?.[type]
  })


  // useEffect(() => {
  //   if(editor && cap && !editor?.isDestroyed) {
  //     console.log(cap.name+' capdeets')
  //   } 
  // },[editor, cap])
  
  return (
    <div className='flex w-full mb-2 space-x-2 text-xl'>
      <span>{type}</span>
      { editor && cap &&  
        <div className='border border-blue-300 w-full text-left'>
          <EditorContent editor={editor} className={`h-full`} />
        </div>
      }
    </div>
  )
}


export default CapabilityReachEntry
