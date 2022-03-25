import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContext,
  Alert,
  Card,
  Col,
  Collapse,
  Container,
  Nav,
  Offcanvas,
  Row,
  Tab,
  useAccordionButton,
} from 'react-bootstrap';
import '../scss/dashboard.css';
import ProductPage from '../pages/products/ProductPage';
import UserPage from '../pages/users/UserPage';
import { BsJustify, BsFillPeopleFill, BsFillTagsFill } from 'react-icons/bs';
import { ROUTES } from '../../../configs/routes';

interface Props {
  show?: boolean;
  onClick?: () => void;
}
const SideBar = (props: Props) => {
  const [active, setActive] = useState(false);

  const { show, onClick } = props;

  useEffect(() => {
    setActive(!show);
  }, [show]);

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="manageProduct">
        <Row>
          <Col sm={show ? 3 : 1}>
            <Collapse in={show}>
              <Accordion defaultActiveKey="0" flush>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <BsFillTagsFill /> Catalog
                      </Accordion.Header>
                      <Accordion.Body>
                        <Nav.Link eventKey="manageProduct">Product</Nav.Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Nav.Item>
                  <Nav.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <BsFillPeopleFill /> User
                      </Accordion.Header>
                      <Accordion.Body>
                        <Nav.Link eventKey="manageUser">User List</Nav.Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Nav.Item>
                </Nav>
              </Accordion>
            </Collapse>
          </Col>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="manageProduct">
                <ProductPage />
              </Tab.Pane>
              <Tab.Pane eventKey="manageUser">
                <UserPage />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default SideBar;
