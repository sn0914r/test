import "./Header.css"
import { NavLink, Link } from "react-router-dom"
import { useState } from "react"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="admin-header">
      <div className="header-container">
        <div className="header-left">
          
          <Link className="admin-heading text-decoration-none" to="/admin-page">ADMIN PANEL</Link>
        </div>

        <div className="header-center">
          <nav className={`navbar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <NavLink to="/admin-page/add-product" className="nav-link">
              Add Product
            </NavLink>
            <NavLink to="/admin-page/view-history" className="nav-link">
              View History
            </NavLink>
            <NavLink to="/admin-page/statistics" className="nav-link">
              Statistics
            </NavLink>
          </nav>
        </div>

        <div className="header-right">
          <div className="header-actions">
            <button
              className={`search-toggle ${isSearchOpen ? "active" : ""}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            <button className="notification-btn" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notification-dot"></span>
            </button>

            <div className="user-menu">
              <button className="user-avatar" aria-label="User menu">
                <span>A</span>
              </button>
            </div>

            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <div className={`search-overlay ${isSearchOpen ? "active" : ""}`}>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" autoFocus={isSearchOpen} />
          <button className="search-close" onClick={() => setIsSearchOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
