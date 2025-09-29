import NotFound from "@/components/layout/NotFound"
import UpdateCategory from "@/components/page/Category/UpdateCategory"
import {
  AddCategory,
  Category,
  Home,
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
} from "@components/page"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter, Route, Routes } from "react-router"
import { Toaster } from "sonner"
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
              {/* ----------- category start ---------- */}
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/category-list"
                element={<Category />}
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
                element={<ReoderCategory />}
              />
              {/* ----------- category end ---------- */}

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

              {/* ----------- product end ---------- */}
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
