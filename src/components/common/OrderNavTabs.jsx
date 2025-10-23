import { styled } from "@mui/material/styles"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Box } from "@mui/material"

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
})

const AntTab = styled((props) => (
  <Tab
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  "&:hover": { color: "#40a9ff" },
  "&.Mui-selected": {
    color: "#1890ff",
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const LabelStyled = styled(Box)(({ theme }) => ({
  padding: "4px 12px",
  backgroundColor: "#333",
  color: "#fff",
  borderRadius: "6px",
  fontSize: 13,
  display: "inline-block",
}))

export default function OrderNavTabs({ data = [], value, onChange }) {
  return (
    <AntTabs
      value={value}
      onChange={onChange}
      aria-label="Purchase type tabs"
    >
      {data.map((stt) => (
        <AntTab
          key={stt.value}
          value={stt.value}
          label={
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <span style={{ color: value === stt.value ? stt.activeColor : "inherit" }}>{stt.label}</span>
              <LabelStyled
                sx={{
                  color: value === stt.value ? "#fff" : stt.activeColor,
                  backgroundColor: value === stt.value ? stt.activeColor : stt.inActiveColor,
                }}
              >
                {stt.count}
              </LabelStyled>
            </Box>
          }
        />
      ))}
    </AntTabs>
  )
}
