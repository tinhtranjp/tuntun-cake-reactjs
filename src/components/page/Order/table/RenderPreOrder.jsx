import { useOrderTogglePreOrder } from "@/service/order/mutation"
import { Checkbox } from "@mui/material"
import { useState } from "react"

function RenderPreOrder({ isPreOrder, id }) {
  const [preOrder, setPreOrder] = useState(isPreOrder)

  const mutation = useOrderTogglePreOrder()

  const handleChangeValue = async () => {
    try {
      setPreOrder((prev) => !prev)
      await mutation.mutateAsync(id)
    } catch (error) {}
  }
  return (
    <Checkbox
      checked={preOrder}
      onChange={handleChangeValue}
    />
  )
}

export default RenderPreOrder
