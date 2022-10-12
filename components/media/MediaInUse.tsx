import { useQuery, useReactiveVar } from "@apollo/client"
import { GetMediaItems } from "../../graphql/queries/__generated__/GetMediaItems";
import useModal from "../../hooks/useModal";
import Modal from "../common/Modal";
import MediaUploader from "./MediaUploader"
import MediaLibraryItem from "./MediaLibraryItem"
import { GET_MEDIA_ITEMS } from "../../graphql/queries/mediaItems";
import { ModalContext } from "../../context/modalContext";
import { useContext } from "react";
import MediaPreview from "./MediaPreview";
import Button from "../common/Button";

interface MediaInUseProps {
  item: any
  usageReport: any[]
}

const MediaInUse: React.FunctionComponent<MediaInUseProps> = ({item, usageReport}) => {

  const { handleModal } = useContext(ModalContext)
  const handlePreviewModal = () => {
    handleModal({
      size: 'lg',
      title: `Media preview`,
      content: <MediaPreview item={item} />
    })
  }
  return (
    <>
      <p className="mb-2">You cannot delete <span className="font-bold">{item.fileName}</span> as it is currently in use in the following content items:</p>
      <ul role="list" className="list-disc list-inside mb-2">
      {/* <ul role="list" className=""> */}
        { usageReport[1].map((i, idx) => (
          <li key={idx} className="relative">
            {i.title}
          </li>
        ))}
      </ul>
      <Button onClick={handlePreviewModal}>Go back</Button>
    </>
  )
}

export default MediaInUse