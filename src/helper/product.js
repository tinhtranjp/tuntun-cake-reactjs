const getValue = (value) => {
  switch (value) {
    case "ACTIVE":
      return "Đang Bán"
    case "INACTIVE":
      return "Ngừng Bán"
    case "OUT_OF_STOCK":
      return "Hết Hàng"
    case "DISCONTINUED":
      return "Ngừng Sản Xuất"
    case "IMPORTED":
      return "Mua Ngoài"
    case "SELF_MADE":
      return "Tự Làm"
    case "RAW_MATERIAL":
      return "Nguyên Liệu"
    default:
      return value
  }
}

export const mappedStringToObj = (status) => {
  if (!status) return []

  return status.map((s) => ({
    label: getValue(s.toLocaleUpperCase()),
    value: s.toLocaleUpperCase(),
  }))
}
