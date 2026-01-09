import {
  getResultPrice,
  useDeleteItemById,
  useItems,
  useOnChangeItemQuantity,
  useOrderById,
  useResetAllOrder,
  useTotalAmount,
  useUpdateOrderDetails,
} from "@/store/OrderStore"
import { Box, Button, Divider, Stack, Typography } from "@mui/material"
import InputQuantity from "./InputQuantity"
import { useEffect, useRef, useState } from "react"
import { useOrderCreate } from "@/service/order/mutation"
import ProductModal from "./ProductModal"
import TableImage from "@/components/table/TableImage"
import ActionQuantity from "./ActionQantity"
import { toast } from "sonner"

function TotalOrder() {
  const [isOrder, setIsOrder] = useState(true)
  const [showPriceModal, setPriceModal] = useState(false)
  const [selectedId, setSelectedId] = useState(false)

  const orderDetails = useItems()
  const deleteItemById = useDeleteItemById()
  const changeQty = useOnChangeItemQuantity()
  const updateDetails = useUpdateOrderDetails()

  const currentOrder = useOrderById(selectedId)

  const totalAmount = useTotalAmount()
  const [prevLength, setPrevLength] = useState(orderDetails.length)
  const buttomRef = useRef(null)
  const orderMutation = useOrderCreate()
  const resetOrder = useResetAllOrder()

  useEffect(() => {
    if (orderDetails.length > 0) {
      // Lấy ID của item cuối cùng
      const lastItemId = orderDetails[orderDetails.length - 1].id

      // Mỗi khi item cuối thay đổi (dù length không đổi) → scroll
      if (buttomRef.current) {
        buttomRef.current.scrollIntoView({ behavior: "smooth" })
      }

      setPrevLength(lastItemId)
    }
  }, [orderDetails])

  useEffect(() => {
    if (!currentOrder) {
      setPriceModal(false)
    }
  }, [currentOrder])

  const handleChangePrice = (od) => {
    setSelectedId(od?.id)
    setPriceModal(true)
  }

  const changeDiscountAmout = (newAmount) => {
    const updateOrder = {
      ...currentOrder,
      discountAmount: newAmount,
    }
    updateDetails(currentOrder?.id, updateOrder)
  }

  const changeDiscountPercent = (newPercent) => {
    const updateOrder = {
      ...currentOrder,
      discountPercent: newPercent,
    }
    updateDetails(currentOrder?.id, updateOrder)
  }

  const handleOrder = async () => {
    const order = {
      preOrderFlag: false,
      scheduledDate: null,
      deposit: 0,
      note: "",
      status: isOrder ? "done" : "return",
      orderDetails,
    }

    // Nếu là trả hàng, hỏi confirm
    const proceed = isOrder || window.confirm("Bạn đang thực hiện hành động trả hàng, bạn có muốn tiếp tục không ?")

    if (!proceed) return

    let message = isOrder ? "Đặt hàng thành công !" : "Trả hàng thành công !"

    try {
      await orderMutation.mutateAsync(order)
      toast.success(message, {
        position: "bottom-center",
      })

      resetOrder()
    } catch (error) {
      // Có thể log error nếu muốn
      console.error(error)
    }
  }

  const isShowResultPrice = (order) => {
    return (order?.discountAmount ?? 0) > 0 || (order?.discountPercent ?? 0) > 0
  }

  return (
    <Box>
      <Stack
        flexDirection={"row"}
        alignItems={"baseline"}
        justifyContent={"space-between"}
      >
        <Typography
          variant="h6"
          mb={2}
        >
          Thanh toán
        </Typography>
        <Button
          onClick={() => setIsOrder((prev) => !prev)}
          variant="outlined"
          color={isOrder ? "primary" : "error"}
          size="small"
        >
          {isOrder ? "Đặt hàng" : "Trả hàng"}
        </Button>
      </Stack>
      <Stack
        gap={2}
        sx={{ maxHeight: "calc(100vh - 350px)", minHeight: "calc(100vh - 350px)", overflowY: "auto", pr: 1 }}
      >
        {orderDetails &&
          orderDetails.map((od) => (
            <Stack
              key={od.id}
              direction="row"
              gap={2}
              mb={1}
              sx={{ cursor: "pointer" }}
              onClick={() => handleChangePrice(od)}
            >
              <Box
                component="img"
                src={od.productImage}
                alt={od.itemName}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = "/no_image.jpeg"
                }}
                sx={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <Stack sx={{ flex: 1 }}>
                <Typography variant="caption">{od.itemName}</Typography>
                {isShowResultPrice(od) && (
                  <Typography
                    variant="caption"
                    color="#1976D2"
                  >
                    Size : {od.size}
                  </Typography>
                )}
                {od.discountAmount > 0 && (
                  <Typography
                    variant="caption"
                    color="success"
                  >
                    Giảm giá : {od.discountAmount.toLocaleString("vi-VN")} ₫
                  </Typography>
                )}
                {od.discountPercent > 0 && (
                  <Typography
                    variant="caption"
                    color="success"
                  >
                    Giảm giá : {od.discountPercent} %
                  </Typography>
                )}
                <Stack
                  direction="row"
                  alignItems={"center"}
                  gap={1}
                  justifyContent="space-between"
                >
                  <Stack>
                    {!isShowResultPrice(od) && (
                      <Typography
                        variant="caption"
                        color="#1976D2"
                      >
                        Size : {od.size}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        cursor: "pointer",
                        textDecoration: isShowResultPrice(od) ? "line-through" : "none",
                        color: isShowResultPrice(od) ? "#555" : isOrder ? "#357a38" : "#c92127",
                      }}
                    >
                      {od.price.toLocaleString("vi-VN")} ₫
                    </Typography>
                    {isShowResultPrice(od) && (
                      <Typography
                        variant="caption"
                        sx={{ cursor: "pointer" }}
                        color={isOrder ? "#357a38" : "#c92127"}
                      >
                        {getResultPrice(od).toLocaleString("vi-VN")} ₫
                      </Typography>
                    )}
                  </Stack>
                  <ActionQuantity
                    onClick={(e) => e.stopPropagation()}
                    changeQty={changeQty}
                    currentQtt={od?.quantity}
                    deleteItemById={deleteItemById}
                    id={od?.id}
                  />
                </Stack>
              </Stack>
            </Stack>
          ))}

        <div ref={buttomRef} />
      </Stack>
      <Stack
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        sx={{ visibility: orderDetails.length === 0 ? "hidden" : "visible" }}
      >
        <Typography
          variant="h6"
          mt={2}
          color="#333"
        >
          {isOrder ? "Tổng cộng :" : "Số tiền hoàn trả :"}
        </Typography>
        <Typography
          variant="h6"
          mt={2}
          textAlign="right"
          color="#c92127"
        >
          {totalAmount.toLocaleString("vi-VN")} ₫
        </Typography>
      </Stack>
      <Button
        variant="contained"
        fullWidth
        sx={{ my: 2, mt: 4 }}
        disabled={orderDetails.length === 0}
        onClick={handleOrder}
        loading={orderMutation.isPending}
        loadingIndicator="Loading…"
        color={isOrder ? "primary" : "error"}
      >
        {isOrder ? "Thanh toán" : "Trả hàng"}
      </Button>
      <ProductModal
        onClose={() => setPriceModal(false)}
        open={showPriceModal}
        title={currentOrder?.itemName}
        color={"#444"}
        width={650}
      >
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          divider={
            <Divider
              orientation="horizontal"
              flexItem
            />
          }
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            mb={1}
          >
            <TableImage
              alt={currentOrder?.itemName}
              src={currentOrder?.productImage}
              height={70}
              width={70}
            />
            <Box>
              <Typography>Mã sản phẩm : {currentOrder?.sku}</Typography>
              <Typography>Size : {currentOrder?.size}</Typography>
              <Typography>Giá bán : {currentOrder?.price?.toLocaleString("vn-VN")} ₫</Typography>
            </Box>
          </Stack>
          <Box>
            <Typography mb={1}>Số lượng : </Typography>
            <ActionQuantity
              changeQty={changeQty}
              currentQtt={currentOrder?.quantity}
              deleteItemById={deleteItemById}
              id={currentOrder?.id}
              width="80px"
            />
          </Box>

          <Stack gap={1}>
            <Typography>Khuyến mãi (amout) :</Typography>{" "}
            <InputQuantity
              value={currentOrder?.discountAmount}
              onChange={(newQty) => changeDiscountAmout(newQty)}
              min={0}
              max={currentOrder?.price}
              size="small"
              width="80px"
              isNumber
              isDisable={currentOrder?.discountPercent > 0}
            />
          </Stack>
          <Stack gap={1}>
            <Typography>Khuyến mãi (%) :</Typography>
            <InputQuantity
              value={currentOrder?.discountPercent}
              onChange={(newQty) => changeDiscountPercent(newQty)}
              min={0}
              max={100}
              size="small"
              width="80px"
              isDisable={currentOrder?.discountAmount > 0}
            />
          </Stack>
          <Typography>
            Giá sau khi giảm :{" "}
            <Typography
              component={"span"}
              color="#c92127"
            >
              {getResultPrice(currentOrder).toLocaleString("vi-VN")} ₫
            </Typography>
          </Typography>
        </Stack>
      </ProductModal>
    </Box>
  )
}

export default TotalOrder
