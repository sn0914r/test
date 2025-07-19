"use client"

import { useState } from "react" // Import React and useState
import HistoryCard from "./HistoryCard"
import "./History.css" // Import the new CSS file

export default function History() {
  const fakeData = [
    { id: 1, title: "Product Launch", date: "22-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 2, title: "Inventory Update", date: "23-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 3, title: "Customer Order #123", date: "24-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 4, title: "Marketing Campaign", date: "25-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 5, title: "System Maintenance", date: "26-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 6, title: "New User Registered", date: "27-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 7, title: "Product Price Adjustment", date: "28-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 8, title: "Security Patch Applied", date: "29-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 9, title: "Database Backup", date: "30-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 10, title: "New Feature Rollout", date: "31-01-2023", img: "/cloud-server-upgrade.png" },
    { id: 11, title: "Server Upgrade", date: "01-02-2023", img: "/cloud-server-upgrade.png" },
    { id: 12, title: "Content Moderation", date: "02-02-2023", img: "/cloud-server-upgrade.png" },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Display 6 items per page

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = fakeData.slice(indexOfFirstItem, indexOfLastItem)

  // Calculate total pages
  const totalPages = Math.ceil(fakeData.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="history-page-container">
      <h2 className="history-title">View History</h2>
      <p className="history-description">This is the history page where you can view past actions and events.</p>
      <div className="history-cards-grid">
        {currentItems.map((item) => (
          <HistoryCard key={item.id} title={item.title} date={item.date} imgSrc={item.img} id={item.id} />
        ))}
      </div>

      {totalPages > 1 && ( // Only show pagination if there's more than one page
        <div className="pagination-container">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
            aria-label="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
              aria-current={currentPage === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
            aria-label="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
