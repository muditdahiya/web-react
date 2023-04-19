import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const About: React.FC = () => {
  const [aboutContent, setAboutContent] = useState<{
    title: string;
    content: string;
    content2: string;
    content3: string;
    content4: string;
  }>();

  useEffect(() => {
    fetchAboutContent();
    console.log("Test");
  }, []);

  function fetchAboutContent() {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/about`,
    }).then((res) => {
      setAboutContent(res.data);
    });
  }
  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 10, offset: 2 }}>
          <h1>{aboutContent?.title}</h1>
          <p>{aboutContent?.content}</p>
          <p>{aboutContent?.content2}</p>
          <p>{aboutContent?.content3}</p>
          <p>{aboutContent?.content4}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
