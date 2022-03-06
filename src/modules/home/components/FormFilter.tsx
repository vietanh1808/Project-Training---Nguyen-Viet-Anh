import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import { BsPower, BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { AiOutlineRotateRight, AiOutlineSmallDash } from 'react-icons/ai';
import { ICategory } from '../utils';

interface Props {
  categorys: ICategory[];
  onSearch?: (e?: any) => void;
  onChangeItem?: (item: any) => void;
}

const FormFilter = (props: Props) => {
  const { categorys, onSearch, onChangeItem } = props;
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  return (
    <div>
      <Form className="responsive" style={{ borderWidth: 1 }}>
        <Row>
          <Col className="m-1" sm={6}>
            <Form.Control id="searchInput" onChange={onChangeItem} placeholder="Search keywords" />
          </Col>
          <Col className="m-1" sm={2}>
            <Form.Select id="categorySelect" onChange={onChangeItem}>
              <option value={''}>Any Category</option>
              {categorys.map((cate, index) => (
                <option value={cate.name} key={index}>
                  {cate.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className="m-1" sm={2}>
            <Form.Select id="stockSelect" onChange={onChangeItem}>
              <option value={''}>Any Stock status</option>
              <option value={'in'}>In Stock</option>
              <option value={'low'}>Low Stock</option>
              <option value={'out'}>SOLD</option>
            </Form.Select>
          </Col>
          <Col className="m-1" sm={1}>
            <Button onClick={onSearch} variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Row>
        <Button onClick={handleExpand}>
          {expand ? 'Collapse' : 'Expand'} {expand ? <BsArrowUp /> : <BsArrowDown />}
        </Button>
        <Collapse in={expand}>
          <Row>
            <Col as={Row} sm={3} className="m-2">
              <Form.Group>
                <Form.Label>Search in:</Form.Label>
                <Col>
                  <Form.Check id="nameCheckbox" onChange={onChangeItem} type="checkbox" label="Name" value={'name'} />
                  <Form.Check id="skuCheckbox" onChange={onChangeItem} type="checkbox" label="SKU" value={'checkbox'} />
                  <Form.Check
                    id="descriptionCheckbox"
                    onChange={onChangeItem}
                    type="checkbox"
                    label="Full description"
                    value={'description'}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Availability</Form.Label>
                <Form.Select id="availableSelect" onChange={onChangeItem} defaultValue="Choose...">
                  <option value={''}>Any Available Status</option>
                  <option value={'enable'}>Only Enable</option>
                  <option value={'disable'}>Only Disable</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Vendor</Form.Label>
                <Form.Control id="vendorInput" onChange={onChangeItem} placeholder=""></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Collapse>
      </Form>
    </div>
  );
};

export default FormFilter;
