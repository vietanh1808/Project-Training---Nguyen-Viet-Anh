import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Form, Button, Spinner, Modal } from 'react-bootstrap';
import UserFormFilter from '../../components/UserFormFilter';
import { MdDelete } from 'react-icons/md';
import '../../scss/products.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../../common/redux/thunk';
import PageNumber from '../../components/PageNumber';
import { ROUTES } from '../../../../configs/routes';
import { API_PATHS } from '../../../../configs/api';
import { setDeleteUserAction, setRecordsTotalAction, setUsersAction } from '../redux/userReducer';
import { ICountryParams, IFormFilterUser, IUsersParams, IDeleteUserParams } from '../../../../models/userData';
import { idSearchForm, titleTable } from '../../contants';
import { formatterDate } from '../../utils';
import ReactPaginate from 'react-paginate';

const initFilter: IFormFilterUser = {
  page: 1,
  count: 10,
  search: '',
  memberships: [],
  types: [],
  status: [],
  country: '',
  state: '',
  address: '',
  phone: '',
  date_type: 'R',
  date_range: ['1900-01-01', null],
  sort: '',
  order_by: 'DESC',
  tz: 7,
};
const UserPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const usersStore = useSelector((state: AppState) => state.users);
  const [loading, setLoading] = useState(false);
  const [sortby, setSortby] = useState('ASC');
  const [listCheckRow, setListCheckRow] = useState<Array<any>>([]);
  const [myUsers, setMyUsers] = useState<IUsersParams[]>([]);
  const [country, setCountry] = useState<ICountryParams[]>([]);
  const [formFilter, setFormFilter] = useState<IFormFilterUser>(initFilter);
  const [pagination, setPagination] = useState<{ pageCount: number; itemOffset: number; currentPage: number }>({
    pageCount: 0,
    itemOffset: 1,
    currentPage: 0,
  });
  const [deleteData, setDeleteData] = useState<IDeleteUserParams[]>([]);
  const [showModals, setShowModals] = useState<{ delete: boolean }>({ delete: false });
  const [numberItem, setNumberItem] = useState(10);

  const updateUser = async (sortName?: string) => {
    setLoading(true);
    const userObject = await dispatch(
      fetchThunk(API_PATHS.userList, 'post', {
        ...formFilter,
        sort: sortName || '',
        order_by: sortby,
        page: pagination.currentPage + 1,
        count: numberItem,
      }),
    );
    setMyUsers(userObject.data);
    setLoading(false);
    setSortby((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
  };

  const onClickPage = (event: any) => {
    setPagination({ ...pagination, itemOffset: event.selected, currentPage: event.selected });
  };

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const userObject = await dispatch(fetchThunk(API_PATHS.userList, 'get'));
    await dispatch(setDeleteUserAction([]));

    dispatch(setUsersAction(userObject.data));
    dispatch(setRecordsTotalAction(userObject.recordsTotal));
    setMyUsers(userObject.data.slice(0, numberItem));
    setLoading(false);
  }, []);

  const fetchCountry = useCallback(async () => {
    const countryObject = await dispatch(fetchThunk(API_PATHS.commonCountry));
    setCountry(countryObject.data);
  }, []);

  const handleChangeForm = useCallback((e: any) => {
    switch (e.currentTarget.id) {
      case idSearchForm.userActivity.radio:
        setFormFilter({ ...formFilter, date_type: e.currentTarget.value });
        break;
      case idSearchForm.phone:
        setFormFilter({ ...formFilter, phone: e.currentTarget.value });
        break;
      case idSearchForm.address:
        setFormFilter({ ...formFilter, address: e.currentTarget.value });
        break;
      case idSearchForm.state:
        setFormFilter({ ...formFilter, state: e.currentTarget.value });
        break;
      case idSearchForm.country:
        setFormFilter({ ...formFilter, country: e.currentTarget.value });
        break;
      case idSearchForm.status:
        setFormFilter({ ...formFilter, status: e.currentTarget.value });
        break;
      case idSearchForm.keywords:
        setFormFilter({ ...formFilter, search: e.currentTarget.value });
        break;
    }
  }, []);

  const onChangeSelectMember = useCallback((data: any) => {
    setFormFilter({ ...formFilter, memberships: data.map((element: any) => element.value) });
  }, []);

  const onChangeSelectType = useCallback((data: any) => {
    setFormFilter({ ...formFilter, types: data.map((element: any) => element.value) });
  }, []);

  const handleDatePicker = useCallback((item: any) => {
    const start = item.selection.startDate.getTime() - 1000;
    const end = item.selection.endDate.getTime() - 1000;
    setFormFilter({ ...formFilter, date_range: [formatterDate(start), formatterDate(end)] });
  }, []);

  const handleSearch = useCallback(async (form: IFormFilterUser) => {
    const dataObject = await dispatch(fetchThunk(API_PATHS.userList, 'post', form));
    setMyUsers(dataObject.data);
    dispatch(setRecordsTotalAction(dataObject.recordsTotal));
  }, []);

  const handleClickRow = async (e: any) => {
    switch (e.currentTarget.id) {
      case 'rowDeleteButton':
      case 'rowCheckbox':
        // eslint-disable-next-line no-case-declarations
        const index = deleteData.findIndex((user) => user.id == e.currentTarget.value);
        if (index === -1) {
          setDeleteData([...deleteData, { delete: 1, id: e.currentTarget.value }]);
        } else {
          const data = [...deleteData];
          data.splice(index, 1);
          setDeleteData(data);
        }

        break;
      case 'rowCheckAllCheckbox':
        if (e.currentTarget.checked) {
          if (deleteData.length < numberItem) {
            setDeleteData(myUsers.map((u) => ({ id: u.profile_id, delete: 1 })));
          } else if (deleteData.length === numberItem) {
            setDeleteData([]);
          }
        } else {
          setDeleteData([]);
        }
        break;
    }
  };

  const handleDeleteUser = async () => {
    const dataObject = await dispatch(fetchThunk(API_PATHS.userDelete, 'post', { params: deleteData }));
    setShowModals({ ...showModals, delete: !showModals.delete });
    fetchUser();
  };

  useEffect(() => {
    setListCheckRow(
      Array.from({ length: myUsers.length }, (_, i) => {
        return false;
      }),
    );
  }, [myUsers]);

  useEffect(() => {
    fetchUser();
    fetchCountry();
  }, []);

  useEffect(() => {
    updateUser();
  }, [pagination.currentPage]);

  useEffect(() => {
    updateUser();
    setPagination({ ...pagination, pageCount: Math.ceil(usersStore.recordsTotal / numberItem) });
  }, [numberItem, usersStore.recordsTotal]);

  return (
    <div style={{ padding: 10, marginBottom: 30 }}>
      {loading ? (
        <Spinner
          className="d-flex justify-content-center align-items-center align-self-center"
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Modal show={showModals.delete} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Cảnh báo!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Bạn có chắc muốn xóa ?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShowModals({ ...showModals, delete: !showModals.delete })} variant="secondary">
                Thoát
              </Button>
              <Button onClick={handleDeleteUser} variant="primary">
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          <UserFormFilter
            onChangeDatePicker={handleDatePicker}
            onChangeSelectMember={onChangeSelectMember}
            onChangeSelectType={onChangeSelectType}
            onChangeItem={handleChangeForm}
            country={country}
            userFilter={formFilter}
            onSearch={handleSearch}
          />
          <Button href={ROUTES.createUser} className="mt-3 mb-3">
            Add User
          </Button>
          <table className="table table-hover table-sm text-nowrap">
            <thead>
              <tr>
                <th>
                  <Form.Check type={'checkbox'} id="rowCheckAllCheckbox" onClick={handleClickRow} />
                </th>
                <th onClick={() => updateUser('vendor')}>{titleTable.email}</th>
                <th onClick={() => updateUser('firstName')}>{titleTable.name}</th>
                <th onClick={() => updateUser('access_level')}>{titleTable.accessLevel}</th>
                <th>Products</th>
                <th>Orders </th>
                <th>Wishlist </th>
                <th onClick={() => updateUser('created')}>{titleTable.created}</th>
                <th onClick={() => updateUser('last_login')}>{titleTable.lastLogin}</th>
              </tr>
            </thead>
            <tbody>
              {myUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check type={'checkbox'}>
                      <Form.Check.Input
                        id="rowCheckbox"
                        type={'checkbox'}
                        onChange={handleClickRow}
                        value={user.profile_id}
                        checked={deleteData.find((d) => d.id === user.profile_id) ? true : false}
                      />{' '}
                      |
                    </Form.Check>
                  </td>
                  <td>
                    <div className="col-10 text-truncate">
                      <a href={ROUTES.detailUser + `/${user.profile_id}`}>{user.vendor}</a>
                    </div>
                  </td>
                  <td>{user.fistName + ' ' + user.lastName}</td>
                  <td>{user.access_level}</td>
                  <td>{user.product}</td>
                  <td>{user.order.order_as_buyer}</td>
                  <td>{user.wishlist}</td>
                  <td>{moment(+user.created).format('MMM Do, YYYY, hh:mm a')}</td>
                  <td>{moment(+user.last_login).format('MMM Do, YYYY, hh:mm a')}</td>
                  <td>
                    <Button value={user.profile_id} id="rowDeleteButton" onClick={handleClickRow}>
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex flex-row align-items-center mb-3 p-1">
            <ReactPaginate
              onPageChange={onClickPage}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              pageCount={pagination.pageCount}
              initialPage={pagination.currentPage}
              nextLabel=">"
              previousLabel="<"
              activeClassName="active"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
            />
            <div style={{ paddingLeft: 10 }}>{usersStore.recordsTotal} items</div>
            <Form.Select
              style={{ width: 80, marginRight: 10, marginLeft: 10 }}
              value={numberItem}
              onChange={(e) => setNumberItem(+e.currentTarget.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </Form.Select>
            <div>per page</div>
          </div>
        </>
      )}
      <nav className="navbar fixed-bottom " style={{ backgroundColor: '#323259', boxShadow: '0 0 13 0 #b18aff' }}>
        <Row>
          <Col>
            <Button
              disabled={deleteData.length === 0}
              onClick={() => {
                setShowModals({ ...showModals, delete: !showModals.delete });
              }}
              style={{ marginLeft: 20, backgroundColor: '#f0ad4e', border: '#f0ad4e' }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </nav>
    </div>
  );
};

export default UserPage;
