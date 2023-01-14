import { useContext, useState } from "react";
import Button from "../Button";
import MediaLibrary from "../../media/MediaLibrary";
import AudioPlayer from "../audio/AudioPlayer";
import { handleModal } from "../../../stores/modalStore";
const AudioSelector = ({url, onSelect, buttonContainerClass=''}) => {

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