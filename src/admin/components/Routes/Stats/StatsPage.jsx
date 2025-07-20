"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import StatsCard from "./StatsCard"
import {
  FaBox,
  FaHandPointer,
  FaLink,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH,
} from "react-icons/fa"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import "./StatsPage.css"

// Mock Data - More comprehensive to support all features
const mockProducts = [
  {
    id: 1,
    name: "Nothing 2A",
    category: "Phones",
    clicks: 345,
    imageUrl: "/nothing-phone-2a.png",
    affiliateLink: "https://example.com/nothing2a",
    description: "A sleek and powerful smartphone.",
  },
  {
    id: 2,
    name: "XYZ Phone",
    category: "Phones",
    clicks: 0,
    imageUrl: "/generic-smartphone.png",
    affiliateLink: "https://example.com/xyzphone",
    description: "An entry-level smartphone.",
  },
  {
    id: 3,
    name: "Wireless Earbuds Pro",
    category: "Audio",
    clicks: 120,
    imageUrl: "/placeholder-0vzxl.png",
    affiliateLink: "https://example.com/earbuds",
    description: "High-fidelity wireless earbuds with noise cancellation.",
  },
  {
    id: 4,
    name: "Smartwatch X",
    category: "Wearables",
    clicks: 80,
    imageUrl: "/smartwatch-lifestyle.png",
    affiliateLink: "https://example.com/smartwatch",
    description: "Track your fitness and notifications.",
  },
  {
    id: 5,
    name: "Portable Charger 10000mAh",
    category: "Accessories",
    clicks: 210,
    imageUrl: "/placeholder-x41mc.png",
    affiliateLink: "https://example.com/charger",
    description: "Keep your devices charged on the go.",
  },
  {
    id: 6,
    name: "Gaming Mouse RGB",
    category: "Peripherals",
    clicks: 95,
    imageUrl: "/gaming-mouse.png",
    affiliateLink: "https://example.com/gamingmouse",
    description: "Precision gaming mouse with customizable RGB lighting.",
  },
  {
    id: 7,
    name: "Ergonomic Keyboard",
    category: "Peripherals",
    clicks: 40,
    imageUrl: "/ergonomic-keyboard.png",
    affiliateLink: "https://example.com/keyboard",
    description: "Comfortable typing experience for long hours.",
  },
  {
    id: 8,
    name: "4K Monitor 27-inch",
    category: "Displays",
    clicks: 150,
    imageUrl: "/placeholder-h4u8f.png",
    affiliateLink: "https://example.com/4kmonitor",
    description: "Stunning visuals for work and play.",
  },
  {
    id: 9,
    name: "Webcam HD",
    category: "Accessories",
    clicks: 25,
    imageUrl: "/classic-webcam.png",
    affiliateLink: "",
    description: "Essential for video calls.",
  }, // Missing affiliate link
  {
    id: 10,
    name: "USB-C Hub",
    category: "Accessories",
    clicks: 60,
    imageUrl: "",
    affiliateLink: "https://example.com/usbc",
    description: "Expand your laptop's connectivity.",
  }, // Missing image
  {
    id: 11,
    name: "Bluetooth Speaker Mini",
    category: "Audio",
    clicks: 0,
    imageUrl: "/bluetooth-speaker.png",
    affiliateLink: "https://example.com/speaker",
    description: "Compact and powerful sound.",
  }, // Zero clicks
  {
    id: 12,
    name: "Laptop Stand",
    category: "Accessories",
    clicks: 15,
    imageUrl: "/minimalist-laptop-stand.png",
    affiliateLink: "https://example.com/laptopstand",
    description: "Elevate your laptop.",
  }, // Short description
  {
    id: 13,
    name: "VR Headset Pro",
    category: "Gaming",
    clicks: 200,
    imageUrl: "/vr-headset.png",
    affiliateLink: "https://example.com/vrheadset",
    description: "Immersive virtual reality experience.",
  },
  {
    id: 14,
    name: "Smart Home Hub",
    category: "Smart Home",
    clicks: 70,
    imageUrl: "/smart-home-hub.png",
    affiliateLink: "https://example.com/smarthome",
    description: "Control all your smart devices from one place.",
  },
  {
    id: 15,
    name: "Noise Cancelling Headphones",
    category: "Audio",
    clicks: 180,
    imageUrl: "/noise-cancelling-headphones.png",
    affiliateLink: "https://example.com/headphones",
    description: "Enjoy your music without distractions.",
  },
]

// Generate mock daily clicks data for the last 30 days
const generateDailyClicks = () => {
  const data = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const clicks = Math.floor(Math.random() * 200) + 50 // Clicks between 50 and 250
    data.push({
      date: date.toISOString().split("T")[0], // YYYY-MM-DD
      clicks: clicks,
    })
  }
  return data
}

const mockDailyClicks = generateDailyClicks()

const PIE_COLORS = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5", "#059669", "#047857"] // Green shades

export default function StatsPage() {
  const [clicksFilter, setClicksFilter] = useState("last7days") // 'today', 'last7days', 'last30days'
  const [topProductsFilter, setTopProductsFilter] = useState("overall") // 'overall', 'last7days', 'last30days'
  const [isDesktop, setIsDesktop] = useState(false) // New state for desktop view

  const [isClicksDropdownOpen, setIsClicksDropdownOpen] = useState(false)
  const [isTopProductsDropdownOpen, setIsTopProductsDropdownOpen] = useState(false)

  const clicksDropdownRef = useRef(null)
  const topProductsDropdownRef = useRef(null)

  // Effect to determine if it's a desktop view
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    // Set initial value
    checkIsDesktop()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsDesktop)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsDesktop)
    }
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clicksDropdownRef.current && !clicksDropdownRef.current.contains(event.target)) {
        setIsClicksDropdownOpen(false)
      }
      if (topProductsDropdownRef.current && !topProductsDropdownRef.current.contains(event.target)) {
        setIsTopProductsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const filteredClicksData = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let startDate
    if (clicksFilter === "today") {
      startDate = new Date(today)
    } else if (clicksFilter === "last7days") {
      startDate = new Date(today)
      startDate.setDate(today.getDate() - 6) // Last 7 days including today
    } else {
      // last30days
      startDate = new Date(today)
      startDate.setDate(today.getDate() - 29) // Last 30 days including today
    }

    return mockDailyClicks.filter((d) => {
      const date = new Date(d.date)
      date.setHours(0, 0, 0, 0)
      return date >= startDate && date <= today
    })
  }, [clicksFilter])

  const totalProducts = mockProducts.length
  const totalAffiliateLinkClicksOverall = mockProducts.reduce((sum, p) => sum + p.clicks, 0)

  const todayClicks =
    filteredClicksData.find((d) => {
      const date = new Date(d.date)
      date.setHours(0, 0, 0, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date.getTime() === today.getTime()
    })?.clicks || 0

  const productsPerCategory = useMemo(() => {
    const categoryMap = {}
    mockProducts.forEach((p) => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1
    })
    return Object.keys(categoryMap).map((category) => ({
      name: category,
      value: categoryMap[category],
    }))
  }, [])

  const topClickedProducts = useMemo(() => {
    let dataToFilter = mockProducts
    if (topProductsFilter === "last7days") {
      // In a real app, you'd filter mockProducts based on clicks in the last 7 days
      // For this mock, we'll just take a subset or re-sort based on a hypothetical recent clicks
      dataToFilter = mockProducts.filter((p) => p.clicks > 50) // Example: products with more than 50 clicks
    } else if (topProductsFilter === "last30days") {
      dataToFilter = mockProducts.filter((p) => p.clicks > 100) // Example: products with more than 100 clicks
    }
    // 'today' filter for top products is complex with current mock data, so 'overall' is default
    return [...dataToFilter].sort((a, b) => b.clicks - a.clicks).slice(0, 5) // Top 5 products
  }, [topProductsFilter])

  // Calculate dynamic height for the bar chart based on number of products
  const barChartHeight = useMemo(() => {
    const baseHeightPerItem = 50 // Height for each bar + its spacing
    const xAxisHeight = 100 // Fixed height for X-axis labels
    const chartPadding = 50 // Additional padding for top/bottom margins, legend, etc.
    const minHeight = 300 // Minimum height to ensure usability even with few items

    const calculatedHeight = topClickedProducts.length * baseHeightPerItem + xAxisHeight + chartPadding
    return Math.max(calculatedHeight, minHeight)
  }, [topClickedProducts])

  const productsNeedingAttention = useMemo(() => {
    return mockProducts.filter(
      (p) => p.clicks === 0 || !p.imageUrl || !p.affiliateLink || (p.description && p.description.length < 20), // Example: very short description
    )
  }, [])

  const getFilterLabel = (filterValue) => {
    switch (filterValue) {
      case "today":
        return "Daily"
      case "last7days":
        return "Weekly"
      case "last30days":
        return "Monthly"
      case "overall":
        return "Overall"
      default:
        return "Filter"
    }
  }

  const topProduct = useMemo(() => {
    return mockProducts.reduce((prev, current) => (prev.clicks > current.clicks ? prev : current))
  }, [])

  const leastClicked = useMemo(() => {
    return mockProducts.reduce((prev, current) => (prev.clicks < current.clicks ? prev : current))
  }, [])

  return (
    <div className="stats-page-container">
      <div className="stats-header">
        <h2 className="stats-page-title">Dashboard Statistics</h2>
        <p className="stats-page-description">A quick overview of your product performance and key metrics.</p>
      </div>

      <div className="stats-cards-grid">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          description="Currently available in your inventory"
          icon={FaBox}
        />
        <StatsCard
          title="Total Clicks (Overall)"
          value={totalAffiliateLinkClicksOverall}
          description="All-time clicks across all products"
          icon={FaLink}
        />
        <StatsCard
          title="Today's Clicks"
          value={todayClicks}
          description="User interactions on product pages today"
          icon={FaHandPointer}
        />
        <StatsCard
          title="Top Product (Overall)"
          value={topProduct.name}
          description={`${topProduct.clicks} clicks`}
          icon={FaArrowUp}
        />
        <StatsCard
          title="Least Clicked (Overall)"
          value={leastClicked.name}
          description={`${leastClicked.clicks} clicks`}
          icon={FaArrowDown}
        />
      </div>

      {isDesktop ? (
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header-with-filter">
              <h3 className="chart-title">Clicks Over Time</h3>
              <div className="custom-dropdown-container" ref={clicksDropdownRef}>
                <button
                  className="chart-filter-button"
                  onClick={() => setIsClicksDropdownOpen(!isClicksDropdownOpen)}
                  aria-label="Open clicks filter menu"
                >
                  <FaEllipsisH className="h-4 w-4" />
                </button>
                {isClicksDropdownOpen && (
                  <div className="custom-dropdown-content">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setClicksFilter("today")
                        setIsClicksDropdownOpen(false)
                      }}
                    >
                      Daily
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setClicksFilter("last7days")
                        setIsClicksDropdownOpen(false)
                      }}
                    >
                      Weekly
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setClicksFilter("last30days")
                        setIsClicksDropdownOpen(false)
                      }}
                    >
                      Monthly
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="chart-subtitle">Showing data for: {getFilterLabel(clicksFilter)}</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredClicksData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> {/* Lighter grid */}
                <XAxis
                  dataKey="date"
                  tickFormatter={(dateStr) =>
                    new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="clicks" stroke="#10b981" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Products per Category</h3>
            <p className="chart-subtitle">Distribution of products across categories</p>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={productsPerCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {productsPerCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header-with-filter">
              <h3 className="chart-title">Top Clicked Products</h3>
              <div className="custom-dropdown-container" ref={topProductsDropdownRef}>
                <button
                  className="chart-filter-button"
                  onClick={() => setIsTopProductsDropdownOpen(!isTopProductsDropdownOpen)}
                  aria-label="Open top products filter menu"
                >
                  <FaEllipsisH className="h-4 w-4" />
                </button>
                {isTopProductsDropdownOpen && (
                  <div className="custom-dropdown-content">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setTopProductsFilter("overall")
                        setIsTopProductsDropdownOpen(false)
                      }}
                    >
                      Overall
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setTopProductsFilter("last7days")
                        setIsTopProductsDropdownOpen(false)
                      }}
                    >
                      Weekly
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setTopProductsFilter("last30days")
                        setIsTopProductsDropdownOpen(false)
                      }}
                    >
                      Monthly
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="chart-subtitle">Showing data for: {getFilterLabel(topProductsFilter)}</p>
            <ResponsiveContainer width="100%" height={barChartHeight}>
              <BarChart data={topClickedProducts} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> {/* Lighter grid */}
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill="url(#barGradient)" radius={[4, 4, 0, 0]} animationDuration={700} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="charts-placeholder-message">
          <p>Please use a desktop or larger screen to view the charts.</p>
        </div>
      )}

      <div className="attention-section">
        <h3 className="attention-title">
          <FaExclamationTriangle className="attention-icon" /> Products Needing Attention
        </h3>
        {productsNeedingAttention.length > 0 ? (
          <ul className="attention-list">
            {productsNeedingAttention.map((p) => (
              <li key={p.id} className="attention-item">
                <span className="product-name">{p.name}</span>
                <span className="attention-reasons">
                  {p.clicks === 0 && <span className="reason">Zero Clicks</span>}
                  {!p.imageUrl && <span className="reason">Missing Image</span>}
                  {!p.affiliateLink && <span className="reason">Missing Affiliate Link</span>}
                  {p.description && p.description.length < 20 && <span className="reason">Short Description</span>}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-attention-needed">All products look good!</p>
        )}
      </div>
    </div>
  )
}
