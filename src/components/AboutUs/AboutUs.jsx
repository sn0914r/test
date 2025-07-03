import { useState, useEffect, useRef } from "react";
import { FiUsers, FiHome, FiCalendar } from "react-icons/fi";
import "./AboutUs.css"

const stats = [
  {
    icon: FiHome,
    number: 150,
    label: "Projects Completed",
    suffix: "+",
  },
  {
    icon: FiUsers,
    number: 25,
    label: "Team Members",
    suffix: "+",
  },
  {
    icon: FiCalendar,
    number: 8,
    label: "Years Experience",
    suffix: "+",
  },
];

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count}
      {suffix}
    </span>
  );
}

export default function AboutUs() {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDescriptionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-sr-section py-5 container" id="about">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="section-title">About SR Constructions</h2>
      </div>

      {/* Description */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8">
          <div
            ref={descriptionRef}
            className={`description-text-container ${
              isDescriptionVisible ? "animate-in" : ""
            }`}
          >
            <p className="description-text-plain">
              With over 8 years of excellence in construction and design, SR
              Constructions has been transforming dreams into reality. We
              specialize in creating spaces that blend traditional Vastu
              principles with modern architectural innovation. Our commitment to
              quality, attention to detail, and customer satisfaction has made
              us a trusted name in the construction industry.
            </p>
          </div>
        </div>
      </div>

      {/* Stats + Profile */}
      <div className="row align-items-center">
        {/* Statistics Section */}
        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
          <div className="stats-container">
            <div className="row g-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="col-12 col-lg-4">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Icon size={32} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-number-container">
                          <AnimatedCounter
                            target={stat.number}
                            suffix={stat.suffix}
                          />
                        </div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="col-12 col-xl-4">
          <div className="profile-section">
            <div className="profile-card-stack">
              <div className="profile-card profile-card-back"></div>
              <div className="profile-card profile-card-middle"></div>
              <div className="profile-card profile-card-front">
                <div className="profile-image-container">
                  <img
                    src="profile.jpg"
                    // height={200} width={200}
                    alt="SR Constructions Founder"
                    className="profile-image w-100 h-100"
                  />
                </div>
                <div className="profile-content">
                  <h3 className="profile-name">SR. SALMAN</h3>
                  <p className="profile-title">CIVIL ENGINEER</p>
                  <p className="profile-description">
                    Leading SR Constructions with a vision to create sustainable
                    and beautiful spaces that enhance lives and communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
