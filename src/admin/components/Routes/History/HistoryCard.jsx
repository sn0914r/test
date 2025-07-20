import { NavLink } from "react-router-dom"
import "./HistoryCard.css" // Import the new CSS file

export default function HistoryCard({ imgSrc, title, date, editedDate, id }) {
  const formattedDate = date ? new Date(date.toDate()).toLocaleDateString() : "N/A";
  const formattedDateEdited = editedDate ? new Date(editedDate.toDate()).toLocaleDateString() : "N/A";
  return (
    <div className="history-card">
      <div className="card-image-wrapper">
        <img src={imgSrc || "/placeholder.svg"} alt={title} className="card-image" loading="lazy" />
      </div>
      <div className="card-content">
        <h5 className="card-title">{title}</h5>
        <p className="card-date">Created At: {formattedDate}</p>
        <p className="card-date">Last Edited At: {formattedDateEdited}</p>
        <NavLink to={`/admin-page/add-product/${id}`} className="card-edit-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Edit
        </NavLink>
      </div>
    </div>
  )
}
