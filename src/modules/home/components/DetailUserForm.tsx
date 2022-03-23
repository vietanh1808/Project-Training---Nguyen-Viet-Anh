import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { IFormUpdateUser, IFormUserValidate, IRoleParams, IUserDetailParams } from '../../../models/userData';
import { idFieldFormUser } from '../contants';

interface Props {
  userDetail?: IUserDetailParams;
  roles: IRoleParams[];
  status: any;
  formUpdate: IFormUpdateUser;
  onUpdate: (data: IFormUpdateUser) => void;
  validate?: IFormUserValidate;
  setFormUpdate: React.Dispatch<React.SetStateAction<IFormUpdateUser>>;
  loading?: boolean;
  onAdd: (data: IFormUpdateUser) => void;
}

const DetailUserForm = (props: Props) => {
  const { userDetail, roles, status, formUpdate, validate, onUpdate, setFormUpdate, loading, onAdd } = props;

  return (
    <div style={{ backgroundColor: '#1b1b38', color: '#fff' }}>
      <div className="p-5">
        <div className="header">
          <h1> {userDetail?.email} </h1>
        </div>
        <div className="body">
          <hr />

          <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="info" title="Info">
              {/*-------------- Section 1 --------------*/}
              {userDetail && (
                <Form className="mx-auto w-50">
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Orders placed as a buyer
                    </Form.Label>
                    <Col sm="5">
                      <p> {userDetail?.order_as_buyer} </p>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Vendor Income
                    </Form.Label>
                    <Col sm="5">
                      <p>
                        {'$ '} {userDetail?.income}{' '}
                      </p>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Vendor Expense
                    </Form.Label>
                    <Col sm="5">
                      <p>
                        {'$ '} {userDetail?.expense}{' '}
                      </p>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Earning balance
                    </Form.Label>
                    <Col sm="5">
                      <p> {userDetail?.earning} </p>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Products listed as vendor
                    </Form.Label>
                    <Col sm="5">
                      <p> {userDetail?.products_total} </p>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Joined
                    </Form.Label>
                    <Col sm="5">
                      <p> {moment(+(userDetail?.joined || new Date())).format('MMM DD, YYYY, hh:mm A')} </p>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Last login
                    </Form.Label>
                    <Col sm="5">
                      <p> {moment(+(userDetail?.last_login || new Date())).format('MMM DD, YYYY, hh:mm A')} </p>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Language
                    </Form.Label>
                    <Col sm="5">
                      <p> {userDetail?.language} </p>
                    </Col>
                  </Form.Group>
                </Form>
              )}
              {/* ------------- Section 2 ------------ */}
              <div
                className="seperated-space mx-auto"
                style={{ width: '100%', height: 20, backgroundColor: '#323259', display: 'block' }}
              ></div>
              <h1 className="m-3">Email & Paswword</h1>
              <Form className="mx-auto w-50">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    First Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      id={idFieldFormUser.fistName}
                      onChange={(e) => setFormUpdate({ ...formUpdate, firstName: e.currentTarget.value })}
                      value={formUpdate.firstName}
                    />
                  </Col>
                  {!!validate?.firstName && (
                    <small className="text-danger">
                      <FormattedMessage id={validate.firstName} />
                    </small>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Last Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      id={idFieldFormUser.lastName}
                      onChange={(e) => setFormUpdate({ ...formUpdate, lastName: e.currentTarget.value })}
                      value={formUpdate.lastName}
                    />
                  </Col>
                  {!!validate?.lastName && (
                    <small className="text-danger">
                      <FormattedMessage id={validate?.lastName} />
                    </small>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      id={idFieldFormUser.email}
                      onChange={(e) => setFormUpdate({ ...formUpdate, email: e.currentTarget.value })}
                      value={formUpdate.email}
                    />
                  </Col>
                  {!!validate?.email && (
                    <small className="text-danger">
                      <FormattedMessage id={validate?.email} />
                    </small>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Password {!userDetail && <span className="text-danger">* </span>}
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      type={'password'}
                      id={idFieldFormUser.password}
                      onChange={(e) => setFormUpdate({ ...formUpdate, password: e.currentTarget.value })}
                      value={formUpdate.password}
                    />
                  </Col>
                  {!!validate?.password && (
                    <small className="text-danger">
                      <FormattedMessage id={validate?.password} />
                    </small>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Confirm Password
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      type={'password'}
                      value={formUpdate.confirm_password}
                      onChange={(e) => setFormUpdate({ ...formUpdate, confirm_password: e.currentTarget.value })}
                      id={idFieldFormUser.confirmPassword}
                    />
                  </Col>
                  {!!validate?.confirm_password && (
                    <small className="text-danger">
                      <FormattedMessage id={validate?.confirm_password} />
                    </small>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Type
                  </Form.Label>
                  <Col sm="5">
                    {userDetail ? (
                      <p>{userDetail.paymentRailsType}</p>
                    ) : (
                      <Form.Select
                        value={formUpdate.paymentRailsType}
                        onChange={(e) => setFormUpdate({ ...formUpdate, paymentRailsType: e.currentTarget.value })}
                      >
                        <option value="inidvidual">Inidvidual</option>
                        <option value="business">Business</option>
                      </Form.Select>
                    )}
                  </Col>
                  {!!validate?.paymentRailsType && (
                    <small className="text-danger">
                      <FormattedMessage id={validate?.paymentRailsType} />
                    </small>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    PaymentRails ID
                  </Form.Label>
                  <Col sm="5">
                    <p>{userDetail?.paymentRailsId}</p>
                  </Col>
                </Form.Group>
              </Form>
              {/* ------------- Section 3 ------------ */}
              <div
                className="seperated-space mx-auto"
                style={{ width: '100%', height: 20, backgroundColor: '#323259', display: 'block' }}
              ></div>
              <h1 className="m-3">Access information</h1>
              <Form className="mx-auto w-50">
                {userDetail && (
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Access level
                    </Form.Label>
                    <Col sm="5">
                      {userDetail ? (
                        <p>{userDetail?.access_level} </p>
                      ) : (
                        <Form.Select
                          value={formUpdate.access_level}
                          onChange={(e) => setFormUpdate({ ...formUpdate, access_level: e.currentTarget.value })}
                        >
                          <option value="10">Vendor</option>
                          <option value="100">Admin</option>
                        </Form.Select>
                      )}
                    </Col>
                  </Form.Group>
                )}
                {userDetail && (
                  <>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Account status <span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="5">
                        <Form.Select
                          value={formUpdate.status}
                          onChange={(e) => setFormUpdate({ ...formUpdate, status: e.currentTarget.value })}
                          id={idFieldFormUser.status}
                        >
                          {Object.keys(status).map((s) => (
                            <option key={s} value={s}>
                              {status[s]}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      {!!validate?.status && (
                        <small className="text-danger">
                          <FormattedMessage id={validate?.status} />
                        </small>
                      )}
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Status comment (reason)
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          onChange={(e) => setFormUpdate({ ...formUpdate, statusComment: e.currentTarget.value })}
                          id={idFieldFormUser.comment}
                          value={formUpdate.statusComment}
                        />
                      </Col>
                    </Form.Group>
                  </>
                )}

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Membership
                  </Form.Label>
                  <Col sm="5">
                    <Form.Select
                      onChange={(e) => setFormUpdate({ ...formUpdate, membership_id: e.currentTarget.value })}
                      value={formUpdate.membership_id}
                      id={idFieldFormUser.membership}
                    >
                      <option value="">Ignore Memberships</option>
                      <option value="4">General</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                {userDetail && (
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Pending membership
                    </Form.Label>
                    <Col sm="5">
                      <p>{userDetail?.pending_membership_id}</p>
                    </Col>
                  </Form.Group>
                )}

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Require to change password on next log in
                  </Form.Label>
                  <Col sm="5">
                    <Form.Check
                      onChange={(e) =>
                        setFormUpdate({ ...formUpdate, forceChangePassword: e.currentTarget.checked ? 1 : 0 })
                      }
                      id={idFieldFormUser.requirePassword}
                      value={formUpdate.forceChangePassword}
                      checked={formUpdate.forceChangePassword + '' === '1'}
                    />
                  </Col>
                </Form.Group>
              </Form>
              {/* ------------- Section 4 ------------ */}
              <div
                className="seperated-space mx-auto"
                style={{ width: '100%', height: 20, backgroundColor: '#323259', display: 'block' }}
              ></div>
              <h1 className="m-3">Tax information</h1>
              <Form className="mx-auto w-50">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Tax exempt
                  </Form.Label>
                  <Col sm="5">
                    <Form.Check
                      onChange={(e) => setFormUpdate({ ...formUpdate, taxExempt: e.currentTarget.checked ? 1 : 0 })}
                      id={idFieldFormUser.taxExempt}
                      value={formUpdate.taxExempt}
                      checked={formUpdate.taxExempt + '' === '1'}
                    />
                  </Col>
                </Form.Group>
              </Form>
              <nav
                className="navbar mb-3"
                style={{
                  backgroundColor: '#323259',
                  boxShadow: '0 0 13px 0 #b18aff',
                  position: 'sticky',
                  bottom: 0,
                  border: '1 solid #1b1b38',
                  borderWidth: '0 0 1px 1px',
                  zIndex: 100,
                }}
              >
                <Row>
                  <Col>
                    <Button
                      onClick={(e) => {
                        return userDetail ? onUpdate(formUpdate) : onAdd(formUpdate);
                      }}
                      style={{ marginLeft: 20, backgroundColor: '#f0ad4e', border: '#f0ad4e' }}
                    >
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </nav>
            </Tab>
            {userDetail && (
              <Tab eventKey="AddressBook" title="Address book">
                Address book
              </Tab>
            )}
            {userDetail && (
              <Tab eventKey="MyShopSettings" title="My Shop Settings">
                My Shop Settings
              </Tab>
            )}
            {userDetail && (
              <Tab eventKey="FinancialDetails" title="Financial Details">
                Financial Details
              </Tab>
            )}
            {userDetail && (
              <Tab eventKey="Wishlist" title="Wishlist">
                Wishlist
              </Tab>
            )}
            {userDetail && (
              <Tab eventKey="SavedCreditCards" title="Saved credit cards">
                Saved credit cards
              </Tab>
            )}
            {userDetail && (
              <Tab eventKey="PayoutInformation" title="Payout Information">
                Payout Information
              </Tab>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DetailUserForm;
