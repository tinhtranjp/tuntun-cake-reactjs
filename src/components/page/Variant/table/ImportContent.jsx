import ActionForm from "../components/ActionForm"

function ImportContent({ row, onClose }) {
  return (
    <ActionForm
      variant={row}
      onClose={onClose}
    />
  )
}

export default ImportContent
