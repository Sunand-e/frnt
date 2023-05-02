import { useCallback } from 'react';
import useUpdateLesson from '../../../hooks/lessons/useUpdateLesson';
import { useRouter } from '../../../utils/router';
import { useBlockStore } from '../../common/ContentEditor/useBlockStore';
import { useSaveContentButton } from '../../common/ContentEditor/useSaveContentButton';
import ScormView from './ScormView';

const ScormModuleEdit = () => {

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

  useSaveContentButton({typeName: 'SCORM Module', isDirty, onSave: handleSave})

  return (
    <ScormView isEditing={true} />
  );
};

export default ScormModuleEdit
