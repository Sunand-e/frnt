import usePageTitle from '../../../hooks/usePageTitle'
import CreateEventForm from '../../../components/events/CreateEventForm'
import Button from "../../../components/Button";
import {useRouter} from "next/router";
import {useContext} from "react";
import {ModalContext} from "../../../context/modalContext";

const SelectEventTypePage = () => {


  usePageTitle({ title: 'Add New Event' })

  const router = useRouter()

  const { handleModal, closeModal } = useContext(ModalContext);

  const handleAddClick = (e) => {
    router.push('/admin/events/add');
  }

  return (
    <div className="w-full text-center p-8 bg-white shadow rounded-md">
      <Button onClick={handleAddClick} className="mr-4">Add Physical Event</Button>
      <Button onClick={handleAddClick}>Add Virtual Event</Button>
    </div>
  )
}

SelectEventTypePage.navState = {
  topLevel: 'events',
  secondary: 'events'
}

export default SelectEventTypePage
