import "./Hero.css"
export default function Hero() {
  const handleSmoothScroll = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="hero-simple-section" id="home">
      {/* Animated Background Image */}
      <div className="hero-simple-bg">
        <div className="bg-image bg-image-1">
            <img src="hero-img-1.jpeg" alt="image of house" className="w-100 h-100" />
        </div>
        <div className="bg-image bg-image-2">
            <img src="hero-img-2.jpg" alt="image of house" className="w-100 h-100" />
        </div>
        <div className="bg-image bg-image-3">
            <img src="hero-img-3.jpg" alt="image of house" className="w-100 h-100" />
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="hero-simple-overlay"></div>

      {/* Hero Content */}
      <div className="hero-simple-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="hero-simple-text">
                <h1 className="hero-simple-heading">
                  Your Dream Home,
                  <span className="heading-highlight">Engineering to Perfection</span>
                </h1>

                <p className="hero-simple-subheading">
                  Trusted Construction Company in Rayachoty with 7+ Years of Excellence
                </p>

                <div className="hero-simple-cta p-4">
                  <button
                    className="cta-primary"
                    onClick={() => handleSmoothScroll("#portfolio")}
                    aria-label="View our projects"
                  >
                    View Our Projects
                  </button>
                  <button
                    className="cta-secondary"
                    onClick={() => handleSmoothScroll("#contact")}
                    aria-label="Contact us"
                  >
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
