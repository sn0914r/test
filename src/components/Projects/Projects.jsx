import { useState } from "react";
import { FiMapPin, FiX } from "react-icons/fi";
import { Container, Row, Col } from "react-bootstrap";
import "./Project.css";

const projectsData = [
  {
    id: 1,
    name: "Single floor House",
    location: "Botlacheruvu, Rayachoty",
    image: "projects/project_one.avif",
    description:
      "A comprehensive e-commerce solution built with React and Node.js, featuring advanced product filtering, secure payment integration, and real-time inventory management. The platform handles over 10,000 products and serves thousands of customers daily.",
  },
  {
    id: 2,
    name: "Duplex House",
    location: "Abbavaram, Rayachoty",
    image: "/projects/project_two.webp",
    description:
      "A complete healthcare management system designed for clinics and hospitals. Features include patient records management, appointment scheduling, billing integration, and HIPAA-compliant data security measures.",
  },
  {
    id: 3,
    name: "Three story building",
    location: "Madhavaram, Rayachoty",
    image: "/projects/project_three.jpg",
    description:
      "Cross-platform mobile application for real estate listings with advanced search filters, virtual tours, mortgage calculators, and direct communication between buyers and agents. Built using React Native and Firebase.",
  },
//   {
//     id: 4,
//     name: "Financial Dashboard",
//     location: "Sydney, Australia",
//     image: "/placeholder.svg?height=300&width=400",
//     description:
//       "A sophisticated financial analytics dashboard for investment firms. Features real-time market data, portfolio tracking, risk assessment tools, and automated reporting capabilities with interactive charts and graphs.",
//   },
//   {
//     id: 5,
//     name: "Educational Learning Platform",
//     location: "Berlin, Germany",
//     image: "/placeholder.svg?height=300&width=400",
//     description:
//       "An interactive online learning platform with video streaming, progress tracking, quiz systems, and collaborative tools. Supports multiple languages and serves over 50,000 students worldwide.",
//   },
//   {
//     id: 6,
//     name: "Restaurant Chain Management",
//     location: "Tokyo, Japan",
//     image: "/placeholder.svg?height=300&width=400",
//     description:
//       "Comprehensive management system for restaurant chains including inventory management, staff scheduling, order processing, and analytics dashboard. Integrated with POS systems and delivery platforms.",
//   },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section className="projects-section py-2" id="projects">
        <Container>
          <div className="text-center mb-5">
            <h2 className="projects-title">Our Projects</h2>
            <p className="projects-subtitle">
              Discover our latest work and successful collaborations
            </p>
          </div>

          <Row className="g-4">
            {projectsData.map((project) => (
              <Col key={project.id} xs={12} md={6} lg={4}>
                <div
                  className="project-card"
                  onClick={() => openModal(project)}
                >
                  <div className="project-image-container">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="project-image"
                    />
                    <div className="project-overlay">
                      <span className="view-details">View Details</span>
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-name">{project.name}</h3>
                    <div className="project-location">
                      <FiMapPin size={16} />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center my-3">
            <button className="view-more-btn" onClick={()=>alert("working on it")}>View More Projects</button>
          </div>
        </Container>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>

            <div className="modal-content">
              <div className="modal-image-container">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.name}
                  className="modal-image"
                />
              </div>

              <div className="modal-details">
                <h3 className="modal-title">{selectedProject.name}</h3>
                <div className="modal-location">
                  <FiMapPin size={18} />
                  <span>{selectedProject.location}</span>
                </div>
                <p className="modal-description">
                  {selectedProject.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
