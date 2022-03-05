import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContext,
  Alert,
  Card,
  Col,
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

interface Props {
  show?: boolean;
  onClick?: () => void;
}
interface CustomeProps {
  children: any;
  eventKey: any;
}

function CustomToggle({ children, eventKey }: CustomeProps) {
  const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom!'));
  const { activeEventKey } = React.useContext(AccordionContext);

  return (
    <div style={{ color: activeEventKey === eventKey ? 'purple' : 'black' }} onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

const SideBar = (props: Props) => {
  const [active, setActive] = useState(false);

  const { show, onClick } = props;

  useEffect(() => {
    setActive(!show);
  }, [show]);

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Alert style={{ width: 300 }} show={show}>
            <Col className="sidebar-sticky">
              <Accordion defaultActiveKey="0" flush>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <BsFillTagsFill /> Catalog
                      </Accordion.Header>
                      <Accordion.Body>
                        <Nav.Link eventKey="first">Product</Nav.Link>
                        <Nav.Link eventKey="third">Product tabs</Nav.Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Nav.Item>
                  <Nav.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <BsFillPeopleFill /> User
                      </Accordion.Header>
                      <Accordion.Body>
                        <Nav.Link eventKey="second">User List</Nav.Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Nav.Item>
                </Nav>
              </Accordion>
            </Col>
          </Alert>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ProductPage />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
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
