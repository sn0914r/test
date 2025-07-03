import { useState } from "react";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { Container } from "react-bootstrap";
import "./WhyChooseUs.css"

export default function WhyChooseUs() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

// 
//     {
//       id: 1,
//       src: "",
//       alt: "Modern Architecture Design",
//     },
//     {
//       id: 2,
//       src: "/placeholder.svg?height=300&width=400",
//       alt: "Construction Quality Control",
//     },
//     {
//       id: 3,
//       src: "/placeholder.svg?height=300&width=400",
//       alt: "Premium Materials",
//     },
//     {
//       id: 4,
//       src: "/placeholder.svg?height=300&width=400",
//       alt: "Engineering Supervision",
//     },
//     {
//       id: 5,
//       src: "why_choose_us/vastu.png",
//       alt: "Vastu Compliant Plans",
//     },
//     {
//       id: 6,
//       src: "/placeholder.svg?height=300&width=400",
//       alt: "Finished Project",
//     },
//   ];

  const features = [
    {
      title: "Vastu-Compliant Plans",
      description:
        "All our designs follow traditional principles for positive energy",
    },
    {
      title: "Professional Engineering Supervision",
      description:
        "Qualified engineering every aspect of construction for quality assurance",
    },
    {
      title: "Branded Materials Only",
      description:
        "We use only authentic branded materials from trusted manufacturers",
    },
    {
        title: "End-to-End Project Responsibility",
        description:
        "Complete Project management from planning to final handover"
    },
    {
        title: "tranparent pricing",
        description:
        "No hidden costs or surprises - complete transparency in all transactions"
    }
  ];

  return (
    <>
      <Container className="why-choose-us-section py-5" id="services">
        <div className="text-center mb-5">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Discover what makes us different from the rest
          </p>
        </div>

        <div className="row">
          {/* Image Gallery Section */}
          {/* <div className="col-12 col-xl-6 mb-4 mb-xl-0">
            <div className="image-gallery">
              <div className="row g-3">
                {galleryImages.map((image) => (
                  <div key={image.id} className="col-4">
                    <div
                      className="gallery-item"
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        title={image.alt}
                        className="gallery-image"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Features Section */}
          <div className="col-12 justify-content-center">
            <div className="features-content">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">
                    <FiCheckCircle size={24} />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Image Modal */}
      {/* {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="image-modal-close"
              onClick={closeImageModal}
              aria-label="Close image"
            >
              <FiX size={24} />
            </button>
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              className="modal-full-image"
            />
          </div>
        </div>
      )} */}
    </>
  );
}
