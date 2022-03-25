import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import { BsPower, BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { AiOutlineRotateRight, AiOutlineSmallDash } from 'react-icons/ai';
import { ICategory, IVendor } from '../../../models/product';
import Select from 'react-select';

interface Props {
  categorys: ICategory[];
  onSearch?: (e?: any) => void;
  onChangeItem?: (item: any) => void;
  vendor: IVendor[];
  onChangeSelect: (data: any) => void;
}

const FormFilter = (props: Props) => {
  const { categorys, onSearch, onChangeItem, vendor, onChangeSelect } = props;
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
              <option value={'0'}>Any Category</option>
              {categorys.map((cate, index) => (
                <option value={cate.id} key={index}>
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
                  <Form.Check
                    id="searchInCheckbox"
                    onChange={onChangeItem}
                    type="checkbox"
                    label="Name"
                    value={'name'}
                  />
                  <Form.Check id="searchInCheckbox" onChange={onChangeItem} type="checkbox" label="SKU" value={'sku'} />
                  <Form.Check
                    id="searchInCheckbox"
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
                  <option value={'all'}>Any Available Status</option>
                  <option value={'1'}>Only Enable</option>
                  <option value={'0'}>Only Disable</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Vendor</Form.Label>
                <Select
                  options={vendor.map((v) => ({ label: v.name, value: v.id }))}
                  onChange={onChangeSelect}
                  isSearchable
                />
              </Form.Group>
            </Col>
          </Row>
        </Collapse>
      </Form>
    </div>
  );
};

export default FormFilter;
