import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/api';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import DetailProductForm from '../../components/DetailProductForm';
import {
  IBrand,
  ICategory,
  ICondition,
  IProduct,
  IProductDetail,
  IVendor,
  IShipping,
  IProductUpdate,
} from '../../../../models/product';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';

const DetailProductPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const params: any = useParams();

  const [product, setProduct] = useState<IProductDetail>();
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [conditions, setConditions] = useState<ICondition[]>([]);
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState<IShipping[]>([]);

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
    if (categoryObject.success) setCategorys(newCategorys);
    setLoading(false);
  };

  const fetchVendor = async () => {
    setLoading(true);
    const dataObject = await dispatch(fetchThunk(API_PATHS.vendorList));
    setVendors(dataObject.data);
    setLoading(false);
  };

  const fetchDetail = async (id?: string) => {
    setLoading(true);
    const dataObject = await dispatch(fetchThunk(API_PATHS.productDetail, 'post', { id: id || params.id }));
    if (dataObject.success) setProduct(dataObject.data);
    setLoading(false);
  };

  const fetchShipping = async () => {
    setLoading(true);
    const dataObject = await dispatch(fetchThunk(API_PATHS.shippingList, 'post'));
    setShipping(dataObject.data);
    setLoading(false);
  };

  const handleSubmit = async (value: IProductUpdate, images: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(value));
    const dataObject = await dispatch(
      fetchThunk(API_PATHS.productCreate, 'post', formData, true, 'multipart/form-data'),
    );

    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        const formImages = new FormData();
        formImages.append('productId', value.id + '');
        formImages.append('order', value.imagesOrder.length + '');
        formImages.append('images[]', images[i].file);
        const imagesObject = await dispatch(
          fetchThunk(API_PATHS.uploadImage, 'post', formImages, true, 'multipart/form-data'),
        );
      }
    }
    setLoading(false);

    if (dataObject.data) {
      if (product) {
        dispatch(replace(ROUTES.manageProduct));
        return;
      }
      fetchDetail(dataObject.data);
    }
  };

  useEffect(() => {
    fetchDetail();
    fetchCategory();
    fetchVendor();
    fetchBrand();
    fetchCondition();
    fetchShipping();
  }, []);
  return (
    <div className="">
      {loading ? (
        <Spinner className="d-flex justify-content-center" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <DetailProductForm
          conditions={conditions}
          categories={categorys}
          brands={brands}
          vendors={vendors}
          product={product}
          shippings={shipping}
          onLoading={loading}
          onSubmit={handleSubmit}
          setProduct={setProduct}
        />
      )}
    </div>
  );
};

export default DetailProductPage;
