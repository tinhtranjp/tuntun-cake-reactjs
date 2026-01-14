import { useState, useEffect } from "react"
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view"
import { useLocation, useNavigate } from "react-router-dom"
export default function SidebarTree() {
  const location = useLocation()
  const [expanded, setExpanded] = useState([])
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()
  // Sync theo route
  useEffect(() => {
    setExpanded((prev) => {
      const newExpanded = [...prev]
      if (location.pathname.startsWith("/category") && !newExpanded.includes("category")) {
        newExpanded.push("category")
      }
      if (location.pathname.startsWith("/recipe") && !newExpanded.includes("recipe")) {
        newExpanded.push("recipe")
      }
      if (location.pathname.startsWith("/product") && !newExpanded.includes("product")) {
        newExpanded.push("product")
      }
      return newExpanded
    })

    setSelected(location.pathname.replace("/", ""))
  }, [location.pathname])
  return (
    <SimpleTreeView
      expandedItems={expanded}
      selectedItems={selected}
      onExpandedItemsChange={(event, items) => setExpanded(items)}
      onSelectedItemsChange={(event, itemId) => setSelected(itemId)}
      onItemClick={(event, itemId) => {
        const isRoot = ["category", "recipe", "product", "order"].includes(itemId)
        if (!isRoot) {
          navigate(`/${itemId}`)
        }
      }}
    >
      <TreeItem
        itemId="order"
        label="Order"
      >
        <TreeItem
          itemId="order-list"
          label="Gọi món"
        />
        <TreeItem
          itemId="order-history"
          label="Lịch sử order"
        />
      </TreeItem>
      <TreeItem
        itemId="category"
        label="Thể loại"
      >
        <TreeItem
          itemId="category-list"
          label="Danh sách thể loại"
        />
        <TreeItem
          itemId="category/add"
          label="Thêm thể loại"
        />
        <TreeItem
          itemId="category/reoder"
          label="Sắp xếp"
        />
      </TreeItem>
      <TreeItem
        itemId="recipe"
        label="Công thức"
      >
        <TreeItem
          itemId="recipe-list"
          label="Danh sách công thức"
        />
        <TreeItem
          itemId="recipe/add"
          label="Thêm công thức"
        />
      </TreeItem>
      <TreeItem
        itemId="product"
        label="Sản phẩm"
      >
        <TreeItem
          itemId="product-list"
          label="Danh sách sản phẩm"
        />
        <TreeItem
          itemId="product/add"
          label="Thêm sản phẩm"
        />
        <TreeItem
          itemId="product/purchase"
          label="Xử lý hàng hóa"
        />
        <TreeItem
          itemId="product/purchase/status"
          label="Trạng thái đơn hàng"
        />
      </TreeItem>
    </SimpleTreeView>
  )
}
