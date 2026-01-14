import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const getDefaultImg = (images = []) => {
  return images.find((i) => i.orderBy === 0)?.url || ""
}

export const formatDate = (date) => {
  if (!date) return undefined

  const d = new Date(date)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")

  return `${yyyy}-${mm}-${dd}`
}

export const formatUtcToLocal = (value, format = "DD-MM-YYYY HH:mm:ss") => {
  if (!value) return ""

  const d = dayjs.utc(value)
  return d.isValid() ? d.local().format(format) : value
}
