import React, { useState } from "react"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"

interface ModelComponentProps {
  children: JSX.Element
  isModelOpen: boolean
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditTodoItems: any
  setIsCreateNewUser: React.Dispatch<React.SetStateAction<boolean>>
}
const ModelComponent: React.FC<ModelComponentProps> = ({
  children,
  setIsModelOpen,
  isModelOpen,
  setEditTodoItems,
  setIsCreateNewUser,
}) => {
  const onOpenModal = () => setIsModelOpen(true)
  const onCloseModal = () => {
    setIsCreateNewUser(false)
    setEditTodoItems(null)
    setIsModelOpen(false)
  }
  return (
    <>
      <div>
        <button
          onClick={() => onOpenModal()}
          type="button"
          className="bg-primary shadow-2xl rounded-lg text-sm p-2 text-slate-50"
          data-hs-overlay="#hs-slide-down-animation-modal"
        >
          + Create ToDo
        </button>

        <div className="">
          <Modal open={isModelOpen} onClose={() => onCloseModal()} center>
            <div
              className="flex justify-center text-lg "
              style={{
                borderBottom: "1px solid gray",
              }}
            >
              Create New Todo
            </div>

            {children}
          </Modal>
        </div>
      </div>
    </>
  )
}

export default ModelComponent
