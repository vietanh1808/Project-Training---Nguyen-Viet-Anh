import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Accordion, Dropdown, ButtonGroup, Table, Navbar } from 'react-bootstrap';
import { BsPower } from 'react-icons/bs';
import { AiOutlineRotateRight, AiOutlineSmallDash } from 'react-icons/ai';

const FormFilter = () => {
  return (
    <>
      <Form>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Col className="m-1" sm={6}>
                <Form.Control placeholder="Search keywords" />
              </Col>
              <Col className="m-1" sm={2}>
                <Form.Select defaultValue="Choose...">
                  <option value={''}>Any Category</option>
                  <option value={'1'}>1</option>
                  <option value={'2'}>2</option>
                </Form.Select>
              </Col>
              <Col className="m-1" sm={2}>
                <Form.Select defaultValue="Choose...">
                  <option value={''}>Any Stock status</option>
                  <option value={'1'}>1</option>
                  <option value={'2'}>2</option>
                </Form.Select>
              </Col>
              <Col className="m-1" sm={1}>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col>
                  <fieldset>
                    <Form.Group as={Row} className="" sm={2}>
                      <Form.Label column sm={2}>
                        Search in:
                      </Form.Label>
                      <Col>
                        <Form.Check
                          type="checkbox"
                          label="Name"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios1"
                        />
                        <Form.Check
                          type="checkbox"
                          label="SKU"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                        />
                        <Form.Check
                          type="checkbox"
                          label="Full description"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios3"
                        />
                      </Col>
                    </Form.Group>
                  </fieldset>
                </Col>
                <Col>
                  <Form.Group as={Row} sm={2}>
                    <Form.Label column sm={2}>
                      Availability
                    </Form.Label>
                    <Form.Select defaultValue="Choose...">
                      <option value={''}>Any Available Status</option>
                      <option value={'1'}>Only Enable</option>
                      <option value={'2'}>Only Disable</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} sm={2}>
                    <Form.Label column sm={2}>
                      Vendor
                    </Form.Label>
                    <Form.Control placeholder=""></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form>
    </>
  );
};

export default FormFilter;
