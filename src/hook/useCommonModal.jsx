import { useState } from "react"

export function useCommonModal() {
  const [modal, setModal] = useState({ open: false, title: "", content: null, actions: null })

  const closeModal = () => setModal({ open: false })

  return {
    modal,
    closeModal,
    setModal,
  }
}
