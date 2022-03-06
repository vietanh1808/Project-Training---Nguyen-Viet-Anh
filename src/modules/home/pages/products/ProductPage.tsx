import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Accordion,
  Dropdown,
  ButtonGroup,
  Table,
  Navbar,
  Spinner,
  Pagination,
} from 'react-bootstrap';
import { BsPower } from 'react-icons/bs';
import { AiOutlineRotateRight, AiOutlineSmallDash } from 'react-icons/ai';
import FormFilter from '../../components/FormFilter';
import { MdDelete } from 'react-icons/md';
import '../../scss/products.css';
import { formatterPrice, ICategory, IFormFilter, IProduct } from '../../utils';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../../common/redux/thunk';
import { setProductsAction } from '../redux/productReducer';
import PageNumber from '../../components/PageNumber';
import { ROUTES } from '../../../../configs/routes';

const numberItem = 5;
const initFilter: IFormFilter = {
  keyword: '',
  category: '',
  stock: '',
  name: false,
  sku: false,
  description: false,
  vendor: '',
  available: '',
};

const ProductPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const productsStore = useSelector((state: AppState) => state.products.data);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(-1);
  const [currentItem, setCurrentItem] = useState<IProduct[]>([]);
  const [numberPage, setNumberPage] = useState(0);
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [direction, setDirection] = useState('ascending');
  const [formFilter, setFormFilter] = useState<IFormFilter>(initFilter);
  const [listCheckRow, setListCheckRow] = useState<Array<any>>([]);

  const fetchProducts = async () => {
    setLoading(true);
    const productObject = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/list'));
    dispatch(setProductsAction(productObject.data));
    const cateObject = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/categories/list'));
    setCategorys(cateObject.data);
    const newProducts: IProduct[] = [];
    productObject.data.slice(0, 20).map((p: any) => {
      newProducts.push({
        ...p,
        id: +p.id,
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
    setCurrentPage(0);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --------------- Handle Pagination ---------------
  useEffect(() => {
    const item = products.slice(numberItem * currentPage, numberItem * (currentPage + 1));
    setCurrentItem(item);
  }, [currentPage]);

  useEffect(() => {
    setNumberPage(Math.ceil(products.length / numberItem));
    const item = products.slice(numberItem * currentPage, numberItem * (currentPage + 1));
    setCurrentItem(item);
    setCurrentPage(0);
    setListCheckRow(
      Array.from({ length: products.length }, (_, i) => {
        return false;
      }),
    );
  }, [products]);

  const onClickPage = (index?: number | null) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (index) {
      setCurrentPage(index);
      return;
    }
    const len = products.length;
    switch (e.currentTarget.id) {
      case 'prev':
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
        return;
      case 'next':
        setCurrentPage((prev) => (prev < len - 1 ? prev + 1 : prev));
        return;
    }
  };
  // --------------- End of Handle Pagination ---------------

  const handleChangeForm = (e: any) => {
    switch (e.currentTarget.id) {
      case 'searchInput':
        setFormFilter({ ...formFilter, keyword: e.target.value });
        break;
      case 'categorySelect':
        setFormFilter({ ...formFilter, category: e.target.value });
        break;
      case 'stockSelect':
        setFormFilter({ ...formFilter, stock: e.target.value });
        break;
      case 'nameCheckbox':
        setFormFilter({ ...formFilter, name: e.target.checked });
        break;
      case 'skuCheckbox':
        setFormFilter({ ...formFilter, sku: e.target.checked });
        break;
      case 'descriptionCheckbox':
        setFormFilter({ ...formFilter, description: e.target.checked });
        break;
      case 'availableSelect':
        setFormFilter({ ...formFilter, available: e.target.value });
        break;
      case 'vendorInput':
        setFormFilter({ ...formFilter, vendor: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (JSON.stringify(formFilter) === JSON.stringify(initFilter)) {
      const cloneProducts: IProduct[] = [];
      let newP: any = {};
      productsStore.map((p) => {
        newP = { ...p };
        cloneProducts.push(newP);
      });
      setProducts(cloneProducts.slice(0, 20));
      setLoading(false);
      return;
    }
    let filter = null;
    const filterItem = productsStore.slice(0, 20).filter((product, index) => {
      filter = null;
      if (formFilter.available) {
        // Search By Availability Select
        if (!filter) filter = true;
        if (product.enabled === 1 && 'enable' === formFilter.available) {
          filter = filter && true;
        } else if (product.enabled === 0 && 'disable' === formFilter.available) {
          filter = filter && true;
        } else {
          filter = false;
        }
      }

      if (formFilter.keyword) {
        // Search By Keywords Input
        if (!filter) filter = true;

        if (product.sku.includes(formFilter.keyword.trim())) {
          // Search by SKU checkbox
          filter = filter && true;
        } else if (formFilter.name === true) {
          if (product.name.includes(formFilter.keyword.trim())) {
            // Search by name checkbox
            filter = filter && true;
          }
        } else if (formFilter.description === true) {
          if (product.description.includes(formFilter.keyword.trim())) {
            // Search by description checkbox
            filter = filter && true;
          }
        } else {
          filter = false;
        }
      }

      if (formFilter.category) {
        // Search by Category
        if (!filter) filter = true;
        if (formFilter.category === product.category) {
          filter = filter && true;
        } else {
          filter = false;
        }
      }

      if (formFilter.stock) {
        // Search by Stock
        if (!filter) filter = true;
        if (formFilter.stock === 'in' && product.amount > 0) {
          filter = filter && true;
        } else if (formFilter.stock === 'low' && product.amount <= 10) {
          filter = filter && true;
        } else if (formFilter.stock === 'out' && product.amount === 0) {
          filter = filter && true;
        } else {
          filter = false;
        }
      }

      if (formFilter.vendor) {
        // Search by Vendor
        if (!filter) filter = true;
        if (product.vendor.includes(formFilter.vendor.trim())) {
          filter = filter && true;
        } else {
          filter = false;
        }
      }
      return filter;
    });
    setProducts(filterItem);
    setLoading(false);
  };

  const sortByKey = (key: string) => {
    setLoading(true);
    const cloneProducts = Array.from(products);
    const sortItem = cloneProducts.sort((a: any, b: any) => {
      const nameA = a[key].toString().toUpperCase() || '';
      const nameB = b[key].toString().toUpperCase() || '';
      if (nameA < nameB) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (nameA > nameB) {
        return direction === 'ascending' ? 1 : -1;
      }
      // names must be equal
      return 0;
    });
    setProducts(sortItem);
    setLoading(false);
  };

  const handleClickThead = (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
    setDirection((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
    switch (e.currentTarget.innerText.toLocaleLowerCase()) {
      case 'sku':
        sortByKey('sku');
        break;
      case 'name':
        sortByKey('name');
        break;
      case 'category':
        sortByKey('category');
        break;
      case 'price':
        sortByKey('price');
        break;
      case 'in stock':
        sortByKey('amount');
        break;
      case 'vendor':
        sortByKey('vendor');
        break;
      case 'arrival date':
        sortByKey('arrivalDate');
        break;
      default:
        break;
    }
  };

  const handleClickRow = (index: number) => (e: any) => {
    let cloneArray: any = [];
    if (index) {
      index = index + currentPage * numberItem;
    }
    switch (e.currentTarget.id) {
      case 'rowCheckbox':
        if (e.target.checked) {
          cloneArray = [...listCheckRow];
          cloneArray.splice(index, 1, true);
          setListCheckRow(cloneArray);
        } else {
          cloneArray = [...listCheckRow];
          cloneArray.splice(index, 1, false);
          setListCheckRow(cloneArray);
        }
        break;
      case 'rowEnableIcon':
        setLoading(true);
        cloneArray = [...products];
        cloneArray.splice(index, 1, { ...cloneArray[index], enabled: 1 - cloneArray[index]['enabled'] });
        setProducts(cloneArray);
        dispatch(setProductsAction(cloneArray));
        setLoading(false);
        break;
      case 'rowDeleteButton':
        cloneArray = products.filter((p: any, index: number) => {
          return !listCheckRow[index];
        });

        setProducts(cloneArray);
        dispatch(setProductsAction(cloneArray));
        break;
      case 'rowCheckAllCheckbox':
        e.target.checked
          ? setListCheckRow(
              Array.from({ length: products.length }, (_, i) => {
                return true;
              }),
            )
          : setListCheckRow(
              Array.from({ length: products.length }, (_, i) => {
                return false;
              }),
            );
        break;
    }
  };
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
          <FormFilter onSearch={handleSearch} categorys={categorys} onChangeItem={handleChangeForm} />
          <Button className=" mt-3 mb-3">Add Product</Button>
          <table className="table table-hover table-sm text-nowrap">
            <thead>
              <tr>
                <th>
                  <Form.Check type={'checkbox'} id="rowCheckAllCheckbox" onClick={handleClickRow(-1)} />
                </th>
                <th onClick={handleClickThead}>SKU</th>
                <th onClick={handleClickThead}>Name</th>
                <th onClick={handleClickThead}>Category</th>
                <th onClick={handleClickThead}>Price</th>
                <th onClick={handleClickThead}>In stock</th>
                <th onClick={handleClickThead}>Vendor</th>
                <th onClick={handleClickThead}>Arrival Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItem.map((product, index) => (
                <>
                  <tr key={product.id}>
                    <td>
                      <Form.Check type={'checkbox'}>
                        <Form.Check.Input
                          id="rowCheckbox"
                          type={'checkbox'}
                          onChange={handleClickRow(index)}
                          checked={listCheckRow[index + numberItem * currentPage]}
                        />
                        <Form.Check.Label>
                          |{' '}
                          <a id="rowEnableIcon" href="#" onClick={handleClickRow(index)}>
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
                      <Button id="rowDeleteButton" onClick={handleClickRow(index)}>
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          <PageNumber numberPage={numberPage} currentPage={currentPage} onClickPage={onClickPage} />
        </>
      )}
      <nav className="navbar fixed-bottom shadow" style={{ backgroundColor: '#323259' }}>
        <Row>
          <Col>
            <Button style={{ marginLeft: 20, backgroundColor: '#f0ad4e', border: '#f0ad4e' }}>Save Changes</Button>
            <Button style={{ marginLeft: 10, backgroundColor: '#f0ad4e', border: '#f0ad4e' }}>Export all: CSV</Button>
          </Col>
        </Row>
      </nav>
    </div>
  );
};

export default ProductPage;
