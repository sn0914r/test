import { Link } from "react-router-dom" // Import Link from react-router-dom
import "./NotFoundPage.css" // Import the external CSS file

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-message">
          <span className="animated-text">Oops! Page Not Found.</span>
        </p>
        <p className="not-found-description">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="go-home-button">
          {" "}
          {/* Use 'to' prop for react-router-dom Link */}
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
