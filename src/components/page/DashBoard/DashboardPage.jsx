import { Box, Card, CardContent, Typography, Stack, Grid } from "@mui/material"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import AddBoxIcon from "@mui/icons-material/AddBox"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn"
import EditIcon from "@mui/icons-material/Edit"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import RangeDate from "@/components/table/RangeDate"
import { useSearchParams } from "react-router"
import dayjs from "dayjs"
/* ===== Utils ===== */
const formatMoney = (v) => new Intl.NumberFormat("vi-VN").format(v || 0) + " ₫"

/* ===== Dashboard Page ===== */
export default function DashboardPage({ summary }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const startDateParam = searchParams.get("startDate")
  const endDateParam = searchParams.get("endDate")

  const startDate = startDateParam ? dayjs(startDateParam) : null
  const endDate = endDateParam ? dayjs(endDateParam) : null
  if (!summary) return null

  const { orders, purchases, newProductCount } = summary
  const profit = orders.amount - (purchases.amount + orders.returned.amount)

  const orderPieData = [
    { name: "Bán", value: orders.sold.amount },
    { name: "Trả", value: orders.returned.amount },
  ]
  const handleChangeDate = (key, value) => {
    const newParams = Object.fromEntries(searchParams.entries())
    if (value) newParams[key] = value.format("YYYY-MM-DD")
    else delete newParams[key]
    setSearchParams(newParams, { replace: true })
  }

  return (
    <Box p={3}>
      <Stack
        direction={"row"}
        gap={4}
        alignItems={"baseline"}
        justifyContent={"space-between"}
        mb={4}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Dashboard
        </Typography>
        <RangeDate
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={(d) => handleChangeDate("startDate", d)}
          onChangeEndDate={(d) => handleChangeDate("endDate", d)}
        />
      </Stack>
      {/* ===== KPI ===== */}
      <Grid
        container
        spacing={3}
        mb={4}
      >
        <Grid
          xs={12}
          md={3}
          sx={{ minWidth: "250px" }}
        >
          <GradientCard
            title="Doanh thu"
            value={formatMoney(orders.amount)}
            gradient="linear-gradient(135deg,#43cea2,#185a9d)"
            icon={<TrendingUpIcon fontSize="large" />}
          />
        </Grid>

        <Grid
          xs={12}
          md={3}
          sx={{ minWidth: "250px" }}
        >
          <GradientCard
            title="Chi phí"
            value={formatMoney(purchases.amount + orders.returned.amount)}
            gradient="linear-gradient(135deg,#ff512f,#dd2476)"
            icon={<TrendingDownIcon fontSize="large" />}
          />
        </Grid>

        <Grid
          xs={12}
          md={3}
          sx={{ minWidth: "250px" }}
        >
          <GradientCard
            title="Lợi nhuận"
            value={formatMoney(profit)}
            gradient="linear-gradient(135deg,#11998e,#38ef7d)"
            icon={<TrendingUpIcon fontSize="large" />}
          />
        </Grid>
        <Grid
          xs={12}
          md={3}
          sx={{ minWidth: "250px" }}
        >
          <GradientCard
            title="Tổng đơn hàng đã bán"
            value={orders.total}
            gradient="linear-gradient(135deg,#36d1dc,#5b86e5)"
            icon={<ShoppingCartIcon fontSize="large" />}
          />
        </Grid>
        <Grid
          xs={12}
          md={3}
          sx={{ minWidth: "250px" }}
        >
          <GradientCard
            title="Sản phẩm mới"
            value={newProductCount}
            gradient="linear-gradient(135deg,#7f00ff,#e100ff)"
            icon={<AddBoxIcon fontSize="large" />}
          />
        </Grid>
      </Grid>

      {/* ===== CHARTS ===== */}

      {/* Pie Order */}

      <Stack
        direction={"row"}
        spacing={2}
      >
        <Card sx={{ height: 380, width: 550 }}>
          <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Typography
              fontWeight={600}
              mb={2}
            >
              Tỷ lệ bán / trả hàng
            </Typography>
            <Box sx={{ flex: 1 }}>
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={orderPieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    label={(d) => `${d.name}: ${formatMoney(d.value)}`}
                  >
                    <Cell fill="#4caf50" />
                    <Cell fill="#ff9800" />
                  </Pie>
                  <Tooltip formatter={(v) => formatMoney(v)} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* Bar Purchase */}

        <Card sx={{ height: 380, flex: "1" }}>
          <CardContent>
            <Typography
              variant="h6"
              mb={4}
            >
              Nhập hàng
            </Typography>
            <Stack
              gap={2}
              direction={"row"}
              flexWrap="wrap"
            >
              <PurchaseCard
                title="Nhập"
                count={purchases.imported.count}
                amount={purchases.imported.amount}
                gradient="linear-gradient(135deg,#42a5f5,#1e88e5)"
                icon={<Inventory2Icon />}
              />
              <PurchaseCard
                title="Trả"
                count={purchases.returned.count}
                amount={-purchases.returned.amount}
                gradient="linear-gradient(135deg,#ffb74d,#fb8c00)"
                icon={<AssignmentReturnIcon />}
              />
              <PurchaseCard
                title="Điều chỉnh"
                count={purchases.edited.count}
                amount={purchases.edited.amount}
                gradient="linear-gradient(135deg,#ef5350,#e53935)"
                icon={<EditIcon />}
              />
              <PurchaseCard
                title="Cập nhật"
                count={purchases.updated.count}
                showAmount={false}
                gradient="linear-gradient(135deg,#7e57c2,#5e35b1)"
                icon={<AddBoxIcon />}
              />
              {/* Tổng */}
              <PurchaseCard
                title="Tổng chi phí"
                count={purchases.total}
                amount={purchases.amount}
                gradient="linear-gradient(135deg,#9ccc65,#7cb342)"
                icon={<MonetizationOnIcon />}
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

const PurchaseCard = ({ title, count, amount, showAmount = true, gradient, icon }) => (
  <Card
    sx={{
      background: gradient,
      color: "#fff",
      borderRadius: 3,
      height: 120,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      px: 3,
      minWidth: "200px",
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        variant="body2"
        sx={{ opacity: 0.9 }}
      >
        {title}
      </Typography>
      {icon}
    </Stack>
    <Stack
      direction="row"
      spacing={2}
      mt={1}
      alignItems="center"
    >
      <Typography variant="h6">{count} đơn</Typography>
      {showAmount && <Typography variant="h6">{formatMoney(amount)}</Typography>}
    </Stack>
  </Card>
)
const GradientCard = ({ title, value, icon, gradient }) => (
  <Card
    sx={{
      height: "100%",
      color: "#fff",
      background: gradient,
    }}
  >
    <CardContent>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            variant="body2"
            sx={{ opacity: 0.9 }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
          >
            {value}
          </Typography>
        </Box>
        {icon}
      </Stack>
    </CardContent>
  </Card>
)
