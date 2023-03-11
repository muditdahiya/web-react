import axios from "axios";
import React, { useState } from "react";
import { Alert } from "reactstrap";

type PostType = {
  name: String;
  email: String;
  subject: String;
  message: String;
};

const ContactUs = () => {
  const [contactData, setcontactData] = useState<PostType[]>([]);
  const [formMessage, setformMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/contactus", contactData)
      .then((res) => {
        if (res.data !== null) {
          setformMessage("Form submitted successfully!");
          setIsOpen(true);
        } else {
          setformMessage(
            "Form Submission Failed:Please check the information you have entered and try again."
          );
          setIsOpen(true);
        }
        console.log(res);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcontactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcontactData({ ...contactData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact us
        </h2>

        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>

        <div className="row">
          <div className="col-md-9 mb-md-0 mb-5">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      onChange={handleChange}
                    />
                    <label htmlFor="name" className=""></label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email"
                      onChange={handleChange}
                    />
                    <label htmlFor="email" className=""></label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                      placeholder="Subject"
                      onChange={handleChange}
                    />
                    <label htmlFor="subject" className=""></label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form">
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      className="form-control md-textarea"
                      placeholder="Your Message"
                      onChange={handleChangeTextArea}
                    ></textarea>
                    <label htmlFor="message"></label>
                  </div>
                </div>
              </div>
              <div className="text-center text-md-left">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <Alert
                color="success"
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
              >
                {formMessage}
              </Alert>
            </form>

            <div className="status"></div>
          </div>

          <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
              <li>
                <i className="fas fa-map-marker-alt fa-2x"></i>
                <p>Toronto, ON, Canada</p>
              </li>

              <li>
                <i className="fas fa-phone mt-4 fa-2x"></i>
                <p>+1 906-789-0864</p>
              </li>

              <li>
                <i className="fas fa-envelope mt-4 fa-2x"></i>
                <p>reactheroes@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContactUs;
