export default function StatsCard({ title, value, description, icon: Icon, className }) {
  return (
    <div className={`stats-card ${className || ""}`}>
      {" "}
      {/* Replaced Card with div, applied className directly */}
      <div className="stats-card-header">
        {" "}
        {/* Replaced CardHeader with div */}
        <div className="stats-card-title">{title}</div> {/* Replaced CardTitle with div */}
        {Icon && <Icon className="stats-card-icon" />}
      </div>
      <div className="stats-card-content">
        {" "}
        {/* Replaced CardContent with div */}
        <div className="stats-card-value">{value}</div>
        {description && <p className="stats-card-description">{description}</p>}
      </div>
    </div>
  )
}
