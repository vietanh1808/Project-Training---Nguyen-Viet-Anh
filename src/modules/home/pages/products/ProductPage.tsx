import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { BsPower } from 'react-icons/bs';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import FormFilter from '../../components/FormFilter';
import { MdDelete } from 'react-icons/md';
import '../../scss/products.css';
import { ICategory, IFormFilter, IProduct, IVendor } from '../../../../models/product';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../../common/redux/thunk';
import { setProductsAction, setRecordsTotalAction } from '../redux/productReducer';
import { ROUTES } from '../../../../configs/routes';
import { formatterPrice } from '../../utils';
import { API_PATHS } from '../../../../configs/api';
import ReactPaginate from 'react-paginate';

const initFilter: IFormFilter = {
  page: 0,
  count: 0,
  search: '',
  stock_status: '',
  availability: '',
  sort: '',
  order_by: 'ASC',
  search_type: '',
  vendor: '',
  category: '',
};

const ProductPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const productsStore = useSelector((state: AppState) => state.products);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [direction, setDirection] = useState('ASC');
  const [formFilter, setFormFilter] = useState<IFormFilter>(initFilter);
  const [formDelete, setFormDelete] = useState<{ id: string; delete: number }[]>([]);
  const [pagination, setPagination] = useState<{ pageCount: number; itemOffset: number; currentPage: number }>({
    pageCount: 0,
    itemOffset: 1,
    currentPage: 0,
  });
  const [numberItem, setNumberItem] = useState(10);
  const [vendors, setVendors] = useState<IVendor[]>([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const productObject = await dispatch(
      fetchThunk(API_PATHS.productList, 'post', { ...formFilter, page: 1, count: numberItem }),
    );
    dispatch(setProductsAction(productObject.data));
    dispatch(setRecordsTotalAction(productObject.recordsTotal));

    const newProducts: IProduct[] = [];
    productObject.data.map((p: any) => {
      newProducts.push({
        ...p,
        price: +p.price,
        arrivalDate: +p.arrivalDate,
        enabled: +p.enabled,
        weight: +p.weight,
        created: +p.created,
        vendorID: +p.vendorID,
        amount: +p.amount,
        participateSale: +p.participateSale,
      });
    });
    setProducts(newProducts);

    const cateObject = await dispatch(fetchThunk(API_PATHS.categoryList));
    setCategorys(cateObject.data);

    setFormFilter({ ...formFilter, count: numberItem, page: 1 });

    setLoading(false);
  }, []);

  const onClickPage = (event: any) => {
    setPagination({ ...pagination, itemOffset: event.selected, currentPage: event.selected });
  };

  const updateProduct = async (sortName?: string) => {
    setLoading(true);
    const dataObject = await dispatch(
      fetchThunk(API_PATHS.productList, 'post', {
        ...formFilter,
        sort: sortName || '',
        order_by: direction,
        page: pagination.currentPage + 1,
        count: numberItem,
      }),
    );
    if (dataObject.data) {
      setProducts(dataObject.data);
      dispatch(setRecordsTotalAction(dataObject.recordsTotal));
      setFormDelete([]);
    } else {
      console.log('Failed: ', dataObject);
    }
    setLoading(false);
  };

  const handleChangeForm = (e: any) => {
    switch (e.currentTarget.id) {
      case 'searchInput':
        setFormFilter({ ...formFilter, search: e.target.value });
        break;
      case 'categorySelect':
        setFormFilter({ ...formFilter, category: e.target.value });
        break;
      case 'stockSelect':
        setFormFilter({ ...formFilter, stock_status: e.target.value });
        break;
      case 'searchInCheckbox':
        // eslint-disable-next-line no-case-declarations
        const type: string = formFilter.search_type;
        // eslint-disable-next-line no-case-declarations
        const value: string = e.currentTarget.value;
        setFormFilter({
          ...formFilter,
          search_type: type.includes(value) ? type.replace(value + ',', '') : type + value + ',',
        });
        break;
      case 'availableSelect':
        setFormFilter({ ...formFilter, availability: e.target.value });
        break;
      case 'vendorInput':
        setFormFilter({ ...formFilter, vendor: e.target.value });
        break;
    }
  };

  const onAddProduct = () => {};

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setPagination({ ...pagination, currentPage: 0 });
    updateProduct();
  };

  const handleClickRow = (name: string, id?: string) => (e: any) => {
    switch (name) {
      case 'rowEnableIcon':
        // if (products) {
        //   const item = products.find(p => p.id == id)
        //   setProducts([...products, {...item, enabled: 1-(+item?.enabled)}])
        // }
        break;
      case 'rowCheckbox':
      case 'rowDeleteButton':
        // eslint-disable-next-line no-case-declarations
        const item = formDelete.find((f) => f.id === id);
        setFormDelete(item ? formDelete.filter((f) => f.id !== id + '') : [...formDelete, { id: id + '', delete: 1 }]);
        break;
      case 'rowCheckAllCheckbox':
        formDelete.length < products.length
          ? setFormDelete(products.map((p) => ({ id: p.id + '', delete: 1 })))
          : setFormDelete([]);
        break;
    }
  };

  const fetchVendors = async () => {
    const data = await dispatch(fetchThunk(API_PATHS.vendorList));
    setVendors(data.data);
  };

  const handleChangeSelect = (data: any) => {
    setFormFilter({ ...formFilter, vendor: data.value });
  };

  const onClickThead = async (name: string) => {
    setLoading(true);
    setDirection((prev) => {
      if (prev === 'ASC') return 'DESC';
      else return 'ASC';
    });
    const data = await dispatch(
      // eslint-disable-next-line no-constant-condition
      fetchThunk(API_PATHS.productList, 'post', { ...formFilter, sort: name, order_by: direction }),
    );
    console.log(data);
    if (data.data) {
      setProducts(data.data);
    }
    // eslint-disable-next-line no-constant-condition
    setFormFilter({ ...formFilter, sort: name, order_by: direction });
    setLoading(false);
  };

  const handleDelete = async () => {
    if (formDelete.length) {
      const dataObject = await dispatch(fetchThunk(API_PATHS.productDelete, 'post', { params: formDelete }));
      if (dataObject.data) {
        updateProduct();
      }
    }
  };

  useEffect(() => {
    updateProduct();
  }, [pagination.currentPage]);

  useEffect(() => {
    updateProduct();
    setPagination({ ...pagination, pageCount: Math.ceil(productsStore.recordsTotal / numberItem) });
  }, [numberItem, productsStore.recordsTotal]);

  useEffect(() => {
    fetchProducts();
    fetchVendors();
  }, []);

  // --------------------- FORM TABLE PRODUCT ---------------------
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
          <FormFilter
            onChangeSelect={handleChangeSelect}
            vendor={vendors}
            onSearch={handleSearch}
            categorys={categorys}
            onChangeItem={handleChangeForm}
          />
          <Button href={ROUTES.createProduct} onClick={onAddProduct} className=" mt-3 mb-3">
            Add Product
          </Button>
          <table className="table table-hover table-sm text-nowrap">
            <thead>
              <tr>
                <th>
                  <Form.Check type={'checkbox'} onClick={handleClickRow('rowCheckAllCheckbox', '')} />
                </th>
                <th onClick={() => onClickThead('sku')}>
                  SKU{' '}
                  {formFilter.sort === 'sku' && (
                    <span> {formFilter.order_by === 'ASC' ? <BsArrowDown /> : <BsArrowUp />} </span>
                  )}{' '}
                </th>
                <th onClick={() => onClickThead('name')}>
                  Name{' '}
                  {formFilter.sort === 'name' && (
                    <span> {formFilter.order_by === 'ASC' ? <BsArrowDown /> : <BsArrowUp />} </span>
                  )}{' '}
                </th>
                <th onClick={() => onClickThead('category')}>
                  Category{' '}
                  {formFilter.sort === 'category' && (
                    <span> {formFilter.order_by === 'ASC' ? <BsArrowDown /> : <BsArrowUp />} </span>
                  )}{' '}
                </th>
                <th onClick={() => onClickThead('price')}>
                  Price{' '}
                  {formFilter.sort === 'price' && (
                    <span> {formFilter.order_by === 'ASC' ? <BsArrowDown /> : <BsArrowUp />} </span>
                  )}{' '}
                </th>
                <th onClick={() => onClickThead('amount')}>
                  In stock{' '}
                  {formFilter.sort === 'amount' && (
                    <span> {formFilter.order_by === 'ASC' ? <BsArrowDown /> : <BsArrowUp />} </span>
                  )}{' '}
                </th>
                <th onClick={() => onClickThead('vendor')}>
                  Vendor{' '}
                  {formFilter.sort === 'vendor' && (
                    <span> {formFilter.order_by === 'ASC' ? <BsArrowDown /> : <BsArrowUp />} </span>
                  )}{' '}
                </th>
                <th onClick={() => onClickThead('arrivalDate')}>
                  Arrival Date{' '}
                  {formFilter.sort === 'arrivalDate' && (
                    <span> {formFilter.order_by === 'ASC' ? <BsArrowDown /> : <BsArrowUp />} </span>
                  )}{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  style={{ opacity: formDelete.findIndex((f) => f.id === product.id) !== -1 ? 0.5 : 1 }}
                  key={product.id}
                >
                  <td>
                    <Form.Check type={'checkbox'}>
                      <Form.Check.Input
                        type={'checkbox'}
                        onChange={handleClickRow('rowCheckbox', product.id)}
                        checked={[...formDelete].some((f) => f.id === product.id)}
                      />
                      <Form.Check.Label>
                        |{' '}
                        <a href="#" onClick={handleClickRow('rowEnableIcon', product.id)}>
                          <BsPower color={product.enabled === 1 ? '#72b25b' : ''} />
                        </a>{' '}
                        |
                      </Form.Check.Label>
                    </Form.Check>
                  </td>
                  <td>{product.sku}</td>
                  <td>
                    <div className="col-10 text-truncate">
                      <a href={ROUTES.detailProduct + `/${product.id}`}>{product.name}</a>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{formatterPrice.format(+product.price)}</td>
                  <td>{product.amount}</td>
                  <td>
                    <div className="col-7 text-truncate">{product.vendor}</div>
                  </td>
                  <td>{moment(+product.arrivalDate).format('MMM Do, YYYY')}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        handleClickRow('rowDeleteButton', product.id);
                      }}
                    >
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
            <div style={{ paddingLeft: 10 }}>{productsStore.recordsTotal} items</div>
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
              disabled={formDelete.length === 0}
              onClick={handleDelete}
              style={{ marginLeft: 20, backgroundColor: '#f0ad4e', border: '#f0ad4e' }}
            >
              {'Delete Selected'}
            </Button>
            <Button style={{ marginLeft: 10, backgroundColor: '#f0ad4e', border: '#f0ad4e' }}>Export all: CSV</Button>
          </Col>
        </Row>
      </nav>
    </div>
  );
};

export default ProductPage;
