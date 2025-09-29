import { Outlet } from "react-router"
import { Layout } from "../page"

function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default LayoutRoute
