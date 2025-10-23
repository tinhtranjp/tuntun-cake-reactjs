import ViewQuiltIcon from "@mui/icons-material/ViewQuilt"
import CakeIcon from "@mui/icons-material/Cake"
import EventNoteIcon from "@mui/icons-material/EventNote"
import GridViewIcon from "@mui/icons-material/GridView"
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
    label: "Thể loại",
    Icon: GridViewIcon,
    subMenu: [
      {
        id: 21,
        label: "Danh sách thể loại",
        href: "/category-list",
      },
      {
        id: 22,
        label: "Thêm thể loại",
        href: "/category/add",
      },
      {
        id: 23,
        label: "Sắp xếp",
        href: "/category/reoder",
      },
    ],
  },
  {
    id: 3,
    label: "Công thức",
    Icon: EventNoteIcon,
    subMenu: [
      {
        id: 31,
        label: "Danh sách công thức",
        href: "/recipe-list",
      },
      {
        id: 32,
        label: "Thêm công thức",
        href: "/recipe/add",
      },
    ],
  },
  {
    id: 4,
    label: "Sản phẩm",
    Icon: CakeIcon,
    subMenu: [
      {
        id: 41,
        label: "Danh sách sản phẩm",
        href: "/product-list",
      },
      {
        id: 42,
        label: "Thêm sản phẩm",
        href: "/product/add",
      },
      {
        id: 43,
        label: "Xử lý hàng hóa",
        href: "/product/purchase",
      },
      {
        id: 44,
        label: "Trạng thái đơn hàng",
        href: "/product/purchase/status",
      },
      {
        id: 45,
        label: "Hoá đơn nhập hàng",
        href: "/product/purchase/order",
      },
    ],
  },
]
