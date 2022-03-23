import React, { useState } from 'react';
import { Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import Select from 'react-select';
import { ICountryParams, IFormFilterUser } from '../../../models/userData';
import { idSearchForm } from '../contants';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface Props {
  country?: ICountryParams[];
  onSearch: (form: IFormFilterUser) => void;
  onChangeItem?: (item: any) => void;
  userFilter: IFormFilterUser;
  onChangeDatePicker: (item: any) => void;
  onChangeSelectMember?: (data: any) => void;
  onChangeSelectType?: (data: any) => void;
}

interface ISelectFilter {
  label: string;
  value: string;
  id?: string;
}
interface ISelectFilters {
  label: string;
  options: ISelectFilter[];
}

const optionsMember: ISelectFilter[] = [{ label: 'General', value: 'M_4', id: idSearchForm.membership }];
const optionsMemberPending: ISelectFilter[] = [{ label: 'Pending', value: 'P_4', id: idSearchForm.membership }];
const optionsUserType: ISelectFilter[] = [
  { label: 'Administrator', value: '1', id: idSearchForm.userType },
  { label: 'Content management', value: '3', id: idSearchForm.userType },
  { label: 'Coupons management', value: '2', id: idSearchForm.userType },
  { label: 'Vendor', value: '5', id: idSearchForm.userType },
  { label: 'View order reports', value: '6', id: idSearchForm.userType },
  { label: 'Volume discounts management', value: '4', id: idSearchForm.userType },
];
const optionsUserPending: ISelectFilter[] = [
  { label: 'Registered Customer', value: 'C', id: idSearchForm.userType },
  { label: 'Anonymous Customer', value: 'N', id: idSearchForm.userType },
];

const UserFormFilter = (props: Props) => {
  const {
    country,
    onSearch,
    onChangeItem,
    userFilter,
    onChangeDatePicker,
    onChangeSelectMember,
    onChangeSelectType,
  } = props;
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  return (
    <div>
      <Form className="responsive" style={{ borderWidth: 1 }}>
        <Row>
          {/* ------------ Search keywords ------------ */}
          <Col className="m-1" sm={2}>
            <Form.Control
              id={idSearchForm.keywords}
              onChange={onChangeItem}
              placeholder="Search keywords"
              value={userFilter.search}
            />
          </Col>
          {/* ------------ All Memberships ------------ */}
          <Col className="m-1" sm={3}>
            <Select<ISelectFilter, true, ISelectFilters>
              options={[
                {
                  label: 'Memberships',
                  options: optionsMember,
                },
                {
                  label: 'Memberships Pending',
                  options: optionsMemberPending,
                },
              ]}
              closeMenuOnSelect={false}
              isMulti
              placeholder="All Memberships"
              value={userFilter.memberships.map((m) => ({
                value: m,
                label: m === 'M_4' ? 'Memberships' : 'Memberships Pending',
              }))}
              onChange={onChangeSelectMember}
              id={idSearchForm.membership}
            />
          </Col>
          {/* ------------ All  user type ------------ */}
          <Col className="m-1" sm={3}>
            <Select<ISelectFilter, true, ISelectFilters>
              value={userFilter.types.map((type) => {
                const oTlabel = optionsUserType.find((oT) => oT.value === type)?.label;
                const oTPlabel = optionsUserPending.find((oT) => oT.value === type)?.label;
                return {
                  value: type,
                  label: oTlabel || oTPlabel || '',
                  id: idSearchForm.userType,
                };
              })}
              options={[
                {
                  label: 'Memberships',
                  options: optionsUserType,
                },
                {
                  label: 'Memberships Pending',
                  options: optionsUserPending,
                },
              ]}
              closeMenuOnSelect={false}
              isMulti
              placeholder="All user type"
              onChange={onChangeSelectType}
              id={idSearchForm.userType}
            />
          </Col>
          {/* ------------ Status ------------ */}
          <Col className="m-1" sm={2}>
            <Form.Select id={idSearchForm.status} value={userFilter.status[0] || ''} onChange={onChangeItem}>
              <option value={''}>Any status</option>
              <option value={'E'}>Enable</option>
              <option value={'D'}>Disable</option>
              <option value={'U'}>Unapprove vendor</option>
            </Form.Select>
          </Col>
          <Col className="m-1" sm={1}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                onSearch(userFilter);
              }}
              variant="primary"
              type="submit"
            >
              Search
            </Button>
          </Col>
        </Row>
        <hr />
        <Collapse in={expand}>
          <Row>
            <Col as={Row} sm={4} className="m-2">
              <Form.Group>
                <Col>
                  {/* ------------- Country ------------- */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Country
                    </Form.Label>
                    <Col sm="8">
                      <Form.Select id={idSearchForm.country} value={userFilter.country} onChange={onChangeItem}>
                        <option value="">Select country</option>
                        {country?.map((c, index) => (
                          <option value={c.code} key={c.id}>
                            {c.country}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  {/* ------------- State ------------- */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      State
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control id={idSearchForm.state} value={userFilter.state} onChange={onChangeItem} />
                    </Col>
                  </Form.Group>
                  {/* ------------- Address ------------- */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Address
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control id={idSearchForm.address} onChange={onChangeItem} value={userFilter.address} />
                    </Col>
                  </Form.Group>
                  {/* ------------- Phone ------------- */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Phone
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control id={idSearchForm.phone} onChange={onChangeItem} value={userFilter.phone} />
                    </Col>
                  </Form.Group>
                </Col>
              </Form.Group>
            </Col>
            {/* ------------- User Activity ------------- */}
            <Col sm={5}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label sm="3" column>
                  User activity:
                </Form.Label>
                <Col>
                  <Form.Group defaultValue={'L'} defaultChecked={true} as={Row} className="mb-3">
                    <Col>
                      <Form.Check
                        id={idSearchForm.userActivity.radio}
                        value={'R'}
                        onChange={onChangeItem}
                        inline
                        label="Register"
                        name="group1"
                        type="radio"
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        id={idSearchForm.userActivity.radio}
                        value={'L'}
                        onChange={onChangeItem}
                        inline
                        label="Last logged in"
                        name="group1"
                        type="radio"
                      />
                    </Col>
                  </Form.Group>
                  <DateRange
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    onChange={onChangeDatePicker}
                    ranges={[
                      {
                        startDate: new Date(userFilter.date_range[0]),
                        endDate: new Date(userFilter.date_range[1]),
                        key: 'selection',
                      },
                    ]}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Collapse>
        <Button onClick={handleExpand}>
          {expand ? 'Collapse' : 'Expand'} {expand ? <BsArrowUp /> : <BsArrowDown />}
        </Button>
      </Form>
    </div>
  );
};

export default UserFormFilter;
