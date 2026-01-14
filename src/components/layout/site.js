import ViewQuiltIcon from "@mui/icons-material/ViewQuilt"
import CakeIcon from "@mui/icons-material/Cake"
import EventNoteIcon from "@mui/icons-material/EventNote"
import GridViewIcon from "@mui/icons-material/GridView"
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic"
export const menuNavbarAdmin = [
  {
    id: 1,
    label: "Order",
    Icon: ViewQuiltIcon,
    subMenu: [
      {
        id: 11,
        label: "Gọi món",
        href: "/order-list",
      },
      {
        id: 12,
        label: "Lịch sử order",
        href: "/order-history",
      },
    ],
  },
  {
    id: 2,
    label: "Sản phẩm",
    Icon: CakeIcon,
    subMenu: [
      {
        id: 21,
        label: "Danh sách sản phẩm",
        href: "/product-list",
      },
      {
        id: 22,
        label: "Thêm sản phẩm",
        href: "/product/add",
      },
      {
        id: 23,
        label: "Xử lý hàng hóa",
        href: "/product/purchase",
      },
      {
        id: 24,
        label: "Trạng thái đơn hàng",
        href: "/product/purchase/status",
      },
      {
        id: 25,
        label: "Hoá đơn nhập hàng",
        href: "/product/purchase/order",
      },
    ],
  },
  {
    id: 3,
    label: "Thể loại",
    Icon: GridViewIcon,
    subMenu: [
      {
        id: 31,
        label: "Thêm thể loại",
        href: "/category/add",
      },
      {
        id: 32,
        label: "Sắp xếp",
        href: "/category/reoder",
      },
    ],
  },
  {
    id: 4,
    label: "Thuộc tính",
    Icon: AutoAwesomeMosaicIcon,
    subMenu: [
      {
        id: 41,
        label: "Danh sách thuộc tính",
        href: "/options-list",
      },
    ],
  },
  {
    id: 5,
    label: "Công thức",
    Icon: EventNoteIcon,
    subMenu: [
      {
        id: 51,
        label: "Danh sách công thức",
        href: "/recipe-list",
      },
      {
        id: 52,
        label: "Thêm công thức",
        href: "/recipe/add",
      },
    ],
  },
]
