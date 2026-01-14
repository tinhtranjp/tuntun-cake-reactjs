import HeaderForm from "@/components/common/HederForm"
import { useProductGetDetail } from "@/service/product/queries"
import { useNavigate, useParams } from "react-router-dom"
import VariantSortDnd from "./VariantSortDnd"
import { pvApi } from "@/service/product-variant/pvApi"
import { toast } from "sonner"

function VariantReorder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useProductGetDetail(id)

  const handleSortIndex = async (payload) => {
    try {
      await pvApi.reorder(payload)
      toast.success("Cập nhật thành công")
      navigate(-1)
    } catch (error) {}
  }

  if (!data) return <div>Loading...</div>

  return (
    <div>
      <HeaderForm
        title={"Cập nhật vị trí variant"}
        isBack
        marginBottom={10}
      />
      <VariantSortDnd
        onSave={handleSortIndex}
        options={data.pvDetails}
      />
    </div>
  )
}

export default VariantReorder
