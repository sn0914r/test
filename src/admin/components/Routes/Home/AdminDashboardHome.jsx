import { Link } from "react-router-dom"
import "./AdminDashboardHome.css"

export default function AdminDashboardHome() {
  return (
    <div className="admin-dashboard-home my-3">
      <h2 className="greeting-title">Welcome, Admin!</h2>
      <p className="greeting-description">
        Manage your e-commerce platform with ease. Select an option below to get started.
      </p>
      <div className="action-buttons-grid">
        <Link to="/admin-page/add-product" className="action-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <span>Add Product</span>
        </Link>
        <Link to="/admin-page/view-history" className="action-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v10" />
            <path d="M18.4 6.6a9 9 0 1 1-12.8 0" />
            <path d="M12 12l-4 4" />
            <path d="M12 12l4 4" />
          </svg>
          <span>View History</span>
        </Link>
        <Link to="/admin-page/view-stats" className="action-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
          <span>View Stats</span>
        </Link>
      </div>
    </div>
  )
}
