/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import XCircleIcon from '@heroicons/react/20/solid/XCircleIcon'
import { clearModal, closeModal, useModalStore } from '../../stores/modalStore'

const sizeMap = new Map<any,any>([
  ['sm', 'sm:max-w-sm'],
  ['md', 'sm:max-w-md'],
  ['lg', 'sm:max-w-screen-lg'],
  ['xl', 'sm:max-w-xl'],
])

export default function Modal() {
  const { modalActive, modalTitle, modalButtons, modalSize, modalContent, modalRef } = useModalStore()

  useEffect(() => {
    const close = (e) => {
      if(e.key === 'Escape'){
        closeModal()
      }
    }
    window.addEventListener('keydown', close)

    return () => {
      window.removeEventListener('keydown', close)
    }
  
  },[])
  return (
    <Transition.Root show={modalActive} as={Fragment}>
      {/* <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto" onClose={() => false} ref={modalRef}> */}
      <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto" style={{zIndex:12000}} onClose={() => false} ref={modalRef}>
        <div className="items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => clearModal()}
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={`inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeMap?.get(modalSize)} sm:w-full sm:p-6`}>
              <>
                <div className="flex justify-between mb-4">
                  <h1 className={'text-main-secondary'}>{modalTitle}</h1><span onClick={closeModal}><XCircleIcon className="fill-current text-main-secondary w-8"/></span>
                </div>
                <div>
                  {modalContent}
                </div>
                {modalButtons}
              </>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
