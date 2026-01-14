import { useDashBoard } from "@/service/product/queries"
import { Box } from "@mui/material"
import DashboardPage from "./DashboardPage"
import { useSearchParams } from "react-router-dom"
import dayjs from "dayjs"
import { useMemo } from "react"

function OverView() {
  const [searchParams] = useSearchParams()
  const startDateParam = searchParams.get("startDate")
  const endDateParam = searchParams.get("endDate")

  const startDate = startDateParam ? dayjs(startDateParam) : null
  const endDate = endDateParam ? dayjs(endDateParam) : null

  const filters = useMemo(
    () => ({
      startDate,
      endDate,
    }),
    [startDate, endDate],
  )
  const { data } = useDashBoard(filters)

  return (
    <Box className="min-h-screen w-full relative">
      {/* Radial Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `
           radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Dashboard Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <DashboardPage summary={data} />
      </Box>
    </Box>
  )
}

export default OverView
