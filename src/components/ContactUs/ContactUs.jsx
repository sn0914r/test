import { useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig.js"
import "./ContactUs.css";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = useCallback((e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  //   const add_message = async (name, email, subject, message)=>{
  //     try{
  //       const now = new Date();
  //       const formated_date = now.toLocaleString("en-IN", {
  //         timeZone: "Asia/Kolkata",
  //         weekday: "short",
  //         month: "short",
  //         day: "2-digit",
  //         year: "numeric",
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         hour12: true
  //       })

  //       await addDoc(collection(db, "messages"), {
  //         name, email, subject, message, dateTime: formated_date
  //       })

  //       console.log("messages document added");
  //       alert('Thank you for your message! We\'ll get back to you soon.');
  //     }catch(error){
  //       alert("Error sending message:", error)
  //       console.warn("Error sending message:", error)
  //     }
  //   }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
    // const { name, email, subject, message } = formData;
    // add_message(name, email, subject, message);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  });

  return (
    <Presenter
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}

function Presenter({ formData, handleSubmit, handleChange }) {
  return (
    <section id="contact" className="section contact-section pt-5">
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="section-title text-center mb-4 fs-1">Contact Us</h1>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="contact-form">
              <h3 className="mb-4">Send Us a Message</h3>

              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <div className="mb-3">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="cta-button">
                  Send Message
                </button>
              </form>
            </div>
          </Col>
          <Col lg={4} className="my-3">
            <div className="contact-info">
              <h3 className="mb-4 text-center">Contact Information</h3>
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h5>Email</h5>
                  <p>email.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FiPhone />
                </div>
                <div>
                  <h5>Phone</h5>
                  <p>9441390642</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMapPin />
                </div>
                <div>
                  <h5>Address</h5>
                  <p>
                    38/113-3
                    <br />
                    54-1 Bypass Main Road
                    <br/>
                    Mubarak Nagar Rayachoty
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
