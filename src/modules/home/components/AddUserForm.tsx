import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { IFormAddUser, IFormUserValidate, IRoleParams } from '../../../models/userData';
import { idFieldFormUser } from '../contants';
import Select from 'react-select';

interface Props {
  formUpdate: IFormAddUser;
  onConfirm: (data: IFormAddUser) => void;
  validate?: IFormUserValidate;
  roles: IRoleParams[];
  setFormUpdate: React.Dispatch<React.SetStateAction<IFormAddUser>>;
}

const AddUserForm = (props: Props) => {
  const { formUpdate, validate, onConfirm, roles, setFormUpdate } = props;
  return (
    <div style={{ backgroundColor: '#1b1b38', color: '#fff' }}>
      <div className="p-5">
        <div className="header"></div>
        <div className="body">
          <hr />

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
                Password <span className="text-danger">*</span>
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  type="password"
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
                Confirm Password <span className="text-danger">*</span>
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  type="password"
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
                z
                <Form.Select
                  onChange={(e) => setFormUpdate({ ...formUpdate, paymentRailsType: e.currentTarget.value })}
                >
                  <option value="inidvidutal">Inidvidutal</option>
                  <option value="business">Business</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                PaymentRails ID
              </Form.Label>
              <Col sm="5">
                <p>{}</p>
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
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Access level
              </Form.Label>
              <Col sm="5">
                <Form.Select
                  value={formUpdate.access_level}
                  onChange={(e) => setFormUpdate({ ...formUpdate, access_level: e.currentTarget.value })}
                >
                  <option value="10">Vendor</option>
                  <option value="100">Admin</option>
                </Form.Select>
              </Col>
            </Form.Group>
            {formUpdate.access_level === '100' && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Access level
                </Form.Label>
                <Col sm="5">
                  <Select
                    options={roles.map((r) => ({ id: r.id, label: r.name, value: r.id }))}
                    onChange={(data) => setFormUpdate({ ...formUpdate, roles: data.map((d: any) => d.value) || [] })}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        borderBottom: '1px dotted pink',
                        color: state.isSelected ? 'red' : 'blue',
                        padding: 20,
                      }),
                    }}
                    isMulti
                  />
                </Col>
              </Form.Group>
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
                    onConfirm(formUpdate);
                  }}
                  style={{ marginLeft: 20, backgroundColor: '#f0ad4e', border: '#f0ad4e' }}
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
