import Header from "../admin/components/Header/Header"
import { Outlet, useLocation } from "react-router-dom"
import AdminDashboardHome from "../admin/components/Routes/Home/adminDashboardHome"
import "./AdminPage.css" 

export default function AdminPage() {
  const location = useLocation()
  // Check if the current path is exactly the base admin path (with or without trailing slash)
  const isRootAdminPath = location.pathname === "/admin-page" || location.pathname === "/admin-page/"

  return (
    <div className="admin-page">
      <Header />
      <main className="admin-main container">{isRootAdminPath ? <AdminDashboardHome /> : <Outlet />}</main>
    </div>
  )
}
