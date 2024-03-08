import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import { iModelComponentProps } from "../utils/componentProps"

const ModelComponent: React.FC<iModelComponentProps> = ({
  children,
  ModelTitle,
  isModelOpen,
  closeModel,
}) => {
  const onCloseModal = () => {
    closeModel()
  }
  return (
    <div>
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
  )
}

export default ModelComponent
