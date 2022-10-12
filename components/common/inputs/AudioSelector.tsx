import { useContext, useState } from "react";
import { ModalContext } from "../../../context/modalContext";
import Button from "../Button";
import MediaLibrary from "../../media/MediaLibrary";
import AudioPlayer from "../audio/AudioPlayer";
const AudioSelector = ({url, onSelect, buttonContainerClass=''}) => {

  const { handleModal } = useContext(ModalContext)

  const selectAudioModal = () => {
    handleModal({
      title: `Choose a file`,
      content: <MediaLibrary typeFilter={['audio']} onItemSelect={onSelect} />,
      size: 'lg'
    })
  }
  
  return (
    <>
    { url ? (
      <AudioPlayer onClose={() => onSelect(null)} url={url} />
    ) : (
      <div className={buttonContainerClass}>
        <Button onClick={selectAudioModal}>Select an audio file</Button>
      </div>
    )}
    </>
  )
}

export default AudioSelector