import { toast } from "sonner"

export function handleApiError(error, defaultMessage = "Có lỗi xảy ra") {
  if (!error || !error.status) {
    toast.error(defaultMessage)
    return
  }

  switch (error.status) {
    case 400:
      toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại")
      break
    case 401:
      toast.error("Bạn chưa đăng nhập")
      break
    case 403:
      toast.error("Bạn không có quyền thực hiện thao tác này")
      break
    case 404:
      toast.error("Dữ liệu không tồn tại")
      break
    case 409:
      toast.error("Dữ liệu đã tồn tại")
      break
    case 500:
      toast.error("Máy chủ gặp sự cố, vui lòng thử lại sau")
      break
    default:
      toast.error(defaultMessage)
  }
}
