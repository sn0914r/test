import Header from "../admin/components/Header/Header";

import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="admin-page">
      <Header />
      <main className="admin-main container">
        <Outlet />
      </main>
    </div>
  );
}
