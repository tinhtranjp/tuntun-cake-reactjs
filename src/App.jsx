import NotFound from "@/components/layout/NotFound"
import UpdateCategory from "@/components/page/Category/UpdateCategory"
import {
  AddCategory,
  LayoutRoute,
  Login,
  Register,
  ReoderCategory,
  AddRecipe,
  Recipe,
  UpdateRecipe,
  Product,
  AddProduct,
  UpdateProduct,
  Import,
  PurchaseList,
  Order,
  OrderHistory,
  OverView,
  Analytic,
  Sale,
  ReoderCate,
  AddVariant,
  UpdateVariant,
  Option,
  OptionValue,
  VariantReorder,
} from "@components/page"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import Navbar from "./components/layout/Navbar"
import { Pushchased } from "./components/page"

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
  },
})
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* ----------- LayoutRoute ---------- */}
            <Route element={<LayoutRoute />}>
              {/* ----------- dashboard start ---------- */}
              <Route
                path="/overviews"
                element={<OverView />}
              />
              <Route
                path="/analytics"
                element={<Analytic />}
              />
              <Route
                path="/sales"
                element={<Sale />}
              />
              {/* ----------- dashboard end ---------- */}
              {/* ----------- category start ---------- */}
              <Route
                path="/"
                element={<OverView />}
              />
              <Route
                path="/category/add"
                element={<AddCategory />}
              />
              <Route
                path="/category/:id/update"
                element={<UpdateCategory />}
              />
              <Route
                path="/category/reoder"
                element={<ReoderCate />}
              />
              {/* ----------- category end ---------- */}
              {/* ----------- option start ---------- */}
              <Route
                path="/options-list"
                element={<Option />}
              />
              <Route
                path="/options/value/:id"
                element={<OptionValue />}
              />

              {/* ----------- option end ---------- */}
              {/* ----------- recipe start ---------- */}
              <Route
                path="/recipe-list"
                element={<Recipe />}
              />
              <Route
                path="/recipe/add"
                element={<AddRecipe />}
              />
              <Route
                path="/recipe/:id/update"
                element={<UpdateRecipe />}
              />
              <Route
                path="/recipe/reoder"
                element={<ReoderCategory />}
              />
              {/* ----------- recipe end ---------- */}
              {/* ----------- product start ---------- */}
              <Route
                path="/product-list"
                element={<Product />}
              />
              <Route
                path="/product/add"
                element={<AddProduct />}
              />
              <Route
                path="/product/:id/update"
                element={<UpdateProduct />}
              />
              <Route
                path="/product/purchase"
                element={<Import />}
              />
              <Route
                path="/product/purchase/status"
                element={<PurchaseList />}
              />
              <Route
                path="/product/purchase/order"
                element={<Pushchased />}
              />
              {/* ----------- product end ---------- */}
              {/* ----------- variant start ---------- */}
              <Route
                path="/variant/:id/add"
                element={<AddVariant />}
              />
              <Route
                path="/variant/:id/update"
                element={<UpdateVariant />}
              />

              <Route
                path="/variant/reorder/:id"
                element={<VariantReorder />}
              />
              {/* ----------- variant end ---------- */}
              {/* ----------- order start ---------- */}
              <Route
                path="/order-list"
                element={<Order />}
              />
              <Route
                path="/order-history"
                element={<OrderHistory />}
              />
              {/* ----------- order end ---------- */}
            </Route>

            {/* --------------------------------- */}
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/nav"
              element={<Navbar />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
        <CssBaseline />
      </ThemeProvider>
      <Toaster richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
