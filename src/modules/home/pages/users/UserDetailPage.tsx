import { Action } from 'typesafe-actions';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import DetailUserForm from '../../components/DetailUserForm';
import { IFormUpdateUser, IFormUserValidate, IRoleParams } from '../../../../models/userData';
import { idFieldFormUser } from '../../contants';
import { validateAddVendor, validateVendor, validSubmitAddUser, validSubmitUpdateUser } from '../../utils';
import { Spinner } from 'react-bootstrap';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';

const initValidFiled = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirm_password: '',
  membership_id: '',
  forceChangePassword: 0,
  taxExempt: 0,
  id: '',
  roles: [],
  status: '',
  statusComment: '',
  paymentRailsType: '',
};

const UserDetailPage = () => {
  const params: any = useParams();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [userDetail, setUserDetail] = useState({
    access_level: '',
    companyName: '',
    default_card_id: '',
    earning: 0,
    email: '',
    expense: '',
    firstName: '',
    first_login: '',
    forceChangePassword: '',
    income: '',
    joined: '',
    language: '',
    lastName: '',
    last_login: '',
    membership_id: '',
    order_as_buyer: 0,
    order_as_buyer_total: '',
    paymentRailsId: '',
    paymentRailsType: '',
    pending_membership_id: '',
    products_total: '',
    profile_id: '',
    referer: '',
    roles: [],
    status: '',
    statusComment: '',
    taxExempt: '',
    vendor_id: '',
  });
  const [otherData, setOtherData] = useState<{ status: any; roles: IRoleParams[] }>({ status: {}, roles: [] });
  const [formUpdate, setFormUpdate] = useState<IFormUpdateUser>(initValidFiled);
  const [validate, setValidate] = useState<IFormUserValidate>({
    ...initValidFiled,
    forceChangePassword: '',
    taxExempt: '',
    roles: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const dataObject = await dispatch(fetchThunk(API_PATHS.userProfile, 'post', params));
    setUserDetail(dataObject.data.info);
    setOtherData({ status: dataObject.data.account_status, roles: dataObject.data.account_roles });
    setLoading(false);
  }, []);

  const handleAdd = useCallback(async (formValue: IFormUpdateUser) => {
    console.log(formValue);
    const validateP = validateAddVendor(formValue);
    setValidate(validateP);
    if (!validSubmitAddUser(validateP)) {
      return;
    }
    const data = await dispatch(fetchThunk(API_PATHS.userCreate, 'post', formValue));
    if (data.success === true) {
      dispatch(replace(ROUTES.dashboard));
    }
    console.log('data: ', data);
  }, []);

  const handleUpdate = useCallback(async (formValue: IFormUpdateUser) => {
    setLoading(true);
    const validateP = validateVendor(formValue);
    setValidate(validateP);
    if (!validSubmitUpdateUser(validateP)) {
      setLoading(false);
      return;
    }
    const data = await dispatch(fetchThunk(API_PATHS.userEdit, 'post', { params: [formValue] }));
    setUserDetail(data.data.info);
    setLoading(false);
  }, []);

  useEffect(() => {
    setFormUpdate({
      ...formUpdate,
      firstName: userDetail?.firstName || '',
      lastName: userDetail?.lastName || '',
      email: userDetail?.email || '',
      forceChangePassword: userDetail?.forceChangePassword === 'on' ? 1 : 0 || 0,
      taxExempt: userDetail?.taxExempt === 'on' ? 1 : 0 || 0,
      roles: userDetail?.roles.map((r) => +r) || [],
      id: params.id,
      paymentRailsType: userDetail?.paymentRailsType || 'individual',
    });
  }, [userDetail]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner
          className="d-flex justify-content-center align-items-center align-self-center"
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <DetailUserForm
          formUpdate={formUpdate}
          roles={otherData.roles}
          status={otherData.status}
          userDetail={userDetail}
          validate={validate}
          onUpdate={handleUpdate}
          setFormUpdate={setFormUpdate}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default UserDetailPage;
