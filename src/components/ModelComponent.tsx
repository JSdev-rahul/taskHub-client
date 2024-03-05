import React, { useState } from "react"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"

interface ModelComponentProps {
  children: JSX.Element
  isModelOpen: boolean
  closeModel: () => void
  ModelTitle: string
}
const ModelComponent: React.FC<ModelComponentProps> = ({
  children,
  ModelTitle,
  isModelOpen,
  closeModel,
}) => {
  const onCloseModal = () => {
    closeModel()
  }
  return (
    <>
      <div>
        <div className="">
          <Modal open={isModelOpen} onClose={() => onCloseModal()} center>
            <div
              className="flex justify-center text-lg "
              style={{
                borderBottom: "1px solid gray",
              }}
            >
              {ModelTitle}
            </div>

            {children}
          </Modal>
        </div>
      </div>
    </>
  )
}

export default ModelComponent
