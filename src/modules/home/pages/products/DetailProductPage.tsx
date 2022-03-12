import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/api';
import { AppState } from '../../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import { fetchThunk } from '../../../common/redux/thunk';
import DetailProductForm from '../../components/DetailProductForm';
import { IBrand, ICategory, ICondition, IProduct, IProductDetail, IVendor } from '../../utils';

const DetailProductPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const params: any = useParams();

  const [product, setProduct] = useState<IProductDetail>();
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [conditions, setConditions] = useState<ICondition[]>([]);
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [vendors, setVendors] = useState<IVendor[] | any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBrand = async () => {
    setLoading(true);
    const brandObject: any = await dispatch(fetchThunk(API_PATHS.brandList));
    const newBrands: IBrand[] = [];

    Object.keys(brandObject.data).map((key: any) => {
      newBrands.push({ ...brandObject.data[key], id: +brandObject.data[key].id });
    });
    setBrands(newBrands);
    setLoading(false);
  };

  const fetchCondition = async () => {
    setLoading(true);
    const conditionObject: any = await dispatch(fetchThunk(API_PATHS.conditionList));
    const newConditions: ICondition[] = [];
    conditionObject.data.map((condition: any) => {
      newConditions.push({ ...condition, id: +condition.id ? +condition.id : null });
    });
    setConditions(newConditions);
    setLoading(false);
  };

  const fetchCategory = async () => {
    setLoading(true);
    const categoryObject: any = await dispatch(fetchThunk(API_PATHS.categoryList));
    const newCategorys: ICategory[] = [];
    categoryObject.data.map((category: any) => {
      newCategorys.push({ ...category, id: +category.id, parentId: +category.parentId, pos: +category.pos });
    });
    setCategorys(newCategorys);
    setLoading(false);
  };

  const fetchVendor = async () => {
    setLoading(true);
    const dataObject = await dispatch(fetchThunk(API_PATHS.vendorList));
    setVendors(dataObject.data);
    setLoading(false);
  };

  const fetchDetail = async () => {
    setLoading(true);
    const dataObject = await dispatch(fetchThunk(API_PATHS.productDetail, 'post', { id: params.id }));
    setProduct(dataObject.data);
    console.log(dataObject);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetail();
    fetchBrand();
    fetchCondition();
    fetchCategory();
    fetchVendor();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {loading ? (
        <Spinner className="" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <DetailProductForm
          conditions={conditions}
          categories={categorys}
          brands={brands}
          vendors={vendors}
          product={product}
          onLoading={loading}
        />
      )}
    </div>
  );
};

export default DetailProductPage;
