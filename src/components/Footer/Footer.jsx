
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import "./Footer.css";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-dark text-light pt-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <div className="footer-logo">SR Constructions</div>
            <p className="mb-4">
                Building dreams with quality, integrity,and expertise for over 7 years in Rayachoty
            </p>
            <div className="social-links d-flex gap-3">
              <a href="#" className="social-link" aria-label="Facebook">
                <FiFacebook />
              </a>
              {/* <a href="#" className="social-link" aria-label="Twitter">
                <FiTwitter />
              </a> */}
              {/* <a href="https://www.linkedin.com/in/vinod-kumar-4b0b532ab" className="social-link" aria-label="LinkedIn">
                <FiLinkedin />
              </a> */}
              <a href="https://www.instagram.com/nivinex_agency?igsh=bjh6cWdwbDN5N2dj" className="social-link" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              {['home', 'about', 'services', 'projects'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className="text-light text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section);
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-3">Services</h5>
            <ul className="list-unstyled">
              <li><span className="text-light">Web Development</span></li>
              <li><span className="text-light">E-Commerce</span></li>
              <li><span className="text-light">SEO Optimization</span></li>
            </ul>
          </Col> */}

          <Col lg={3} md={12}>
            <h5 className="text-white mb-3">Contact Info</h5>
            <ul className="list-unstyled">
              <li><span className="text-light">srconstructions@gmail.com</span></li>
              <li><span className="text-light">9441390642</span></li>
            </ul>
          </Col>
          <Col lg={3} md={12}>
            <h5 className="text-white mb-3">Our Address</h5>
            <ul className="list-unstyled">
              <li><span className="text-light">38/113-3</span></li>
              <li><span className="text-light">54-1 Bypass Main Road</span></li>
              <li><span className="text-light">Mubarak Nagar Rayachoty</span></li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        <Row>
          <Col xs={12} md={6} className="text-center">
            <p className="mb-0">
              {/* © {currentYear} Nivix. All rights reserved. | */}
               Built with passion for digital excellence.
            </p>
          </Col>
          <Col xs={12} md={6} className='text-center'>
              <p className="mb-0">Designed by <a href="https://nivinex.vercel.app">Nivinex</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
