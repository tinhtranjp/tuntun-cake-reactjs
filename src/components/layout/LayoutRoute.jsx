import { Outlet } from "react-router-dom"
import { Layout } from "../page"

function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default LayoutRoute
