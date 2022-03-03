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
import { formatterPrice, IProduct } from '../../utils';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../../common/redux/thunk';
import { setProductsAction } from '../redux/productReducer';
import PageNumber from '../../components/PageNumber';

const numberItem = 3;

const ProductPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  // const products = useSelector((state: AppState) => state.products.data);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(-1);
  const [currentItem, setCurrentItem] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    const dataObject = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/list'));
    // dispatch(setProductsAction(dataObject.data));
    setProducts(dataObject.data.slice(0, 20));
    setCurrentPage(0);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const item = products.slice(numberItem * currentPage, numberItem * (currentPage + 1));
    setCurrentItem(item);
  }, [currentPage]);

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

  return (
    <Container>
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
          <FormFilter />
          <Button className=" mt-3 mb-3">Add Product</Button>
          <Table style={{}} className="table table-striped table-hover table-sm text-nowrap">
            <thead>
              <tr>
                <th>
                  <Form.Check type={'checkbox'} />
                </th>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>In stock</th>
                <th>Vendor</th>
                <th>Arrival Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItem.map((product, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check type={'checkbox'}>
                      <Form.Check.Input type={'checkbox'} />
                      <Form.Check.Label>
                        | <BsPower /> |
                      </Form.Check.Label>
                    </Form.Check>
                  </td>
                  <td>{product.sku}</td>
                  <td>
                    <div className="col-10 text-truncate">{product.name}</div>
                  </td>
                  <td>{product.category}</td>
                  <td>{formatterPrice.format(+product.price)}</td>
                  <td>{product.amount}</td>
                  <td>
                    <div className="col-4 text-truncate">{product.vendor}</div>
                  </td>
                  <td>{moment(+product.arrivalDate).format('MMM Do, YYYY')}</td>
                  <td>
                    <Button>
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <PageNumber
            numberPage={Math.ceil(products.length / numberItem)}
            currentPage={currentPage}
            onClickPage={onClickPage}
          />
          {/* <Navbar fixed="bottom" bg="dark" className="shadow-lg d-block p-3 mb-3 bg-dark rounded">
            <Row>
              <Col>
                <Button style={{ marginLeft: 20 }}>Save Changes</Button>
                <Button style={{ marginLeft: 10 }}>Export all: CSV</Button>
              </Col>
            </Row>
          </Navbar> */}
        </>
      )}
    </Container>
  );
};

export default ProductPage;
function rotate(): import('csstype').Property.Transform | undefined {
  throw new Error('Function not implemented.');
}
