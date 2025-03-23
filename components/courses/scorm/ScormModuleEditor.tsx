import { useCallback } from 'react';
import { useLessonContentFragment } from '../../../hooks/lessons/useLessonContentFragment';
import useUpdateLesson from '../../../hooks/lessons/useUpdateLesson';
import usePageTitle from '../../../hooks/usePageTitle';
import useWarningOnExit from '../../../hooks/useWarningOnExit';
import { useRouter } from '../../../utils/router';
import { useBlockStore } from '../../common/ContentEditor/useBlockStore';
import { useSaveContentButton } from '../../common/ContentEditor/useSaveContentButton';
import ScormView from './ScormView';

const ScormModuleEditor = () => {

  const router = useRouter()
  const { cid: id } = router.query
  const blocks = useBlockStore(state => state.blocks)
  const isDirty = useBlockStore(state => state.isDirty)
  const setIsDirty = useBlockStore(state => state.setIsDirty)
  const content = { blocks }

  const { updateLesson } = useUpdateLesson()

  const handleSave = useCallback(async () => {
    await updateLesson(id)({content}).then(res => {
      setIsDirty(false)
    })
  },[content, isDirty, updateLesson])

  useWarningOnExit(isDirty)
  useSaveContentButton({typeName: 'SCORM Module', isDirty, onSave: handleSave})

  const { complete, data: scormModule } = useLessonContentFragment(id)
  
  usePageTitle({ 
    title: scormModule?.title || 'Untitled SCORM Module', 
    editable:  scormModule?.title || 'Untitled SCORM Module', 
    onEdit: (title: string) => {
      updateLesson(id)({title})
    }
  })
  
  return (
    <ScormView isEditing={true} />
  );
};

export default ScormModuleEditor
