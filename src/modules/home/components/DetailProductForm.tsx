import { FormControlLabel, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Form, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { IBrand, ICategory, ICondition, IProduct, IProductDetail, IVendor } from '../utils';
import { fileTypes } from '../contants';
import { BsFillCameraFill, BsXCircleFill } from 'react-icons/bs';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Select from 'react-select';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

interface Props {
  product: IProductDetail | undefined;
  brands: IBrand[];
  categories: ICategory[];
  conditions: ICondition[];
  vendors: IVendor[];
  onLoading?: boolean;
}

const maxNumber = 69;
const DetailProductForm = (props: Props) => {
  const { product, categories, conditions, brands, vendors, onLoading } = props;
  const [available, setAvailable] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [myProduct, setMyProduct] = useState<IProductDetail | undefined>(product);
  const [cateRender, setCateRender] = useState<{ product: Array<any>; cates: any[] }>({ product: [], cates: [] });

  const handleChangeAvailable = () => {
    if (myProduct) setMyProduct({ ...myProduct, participate_sale: 1 - myProduct?.participate_sale });
  };

  const onUploadImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    const cloneImgs = imageList.map((img) => {
      const a = { ...img };
      return a;
    });
    const imgsCheck = cloneImgs.filter((img) => !images.includes(img));
    setImages(imgsCheck);
  };

  const handleDelImage = (index: number) => (e: any) => {
    if (myProduct) {
      const cloneImgs = [...myProduct.images];
      cloneImgs.splice(index, 1);
      setMyProduct({ ...myProduct, images: cloneImgs });
    }
  };

  const handleSelectCate = (data: any) => {
    if (myProduct) {
      setMyProduct({ ...myProduct, categories: data.map((d: any) => ({ category_id: d.category_id, name: d.value })) });
    }
    setCateRender({ ...cateRender, product: data });
  };

  const handleChangeEditor = (content: any) => {
    if (myProduct) setMyProduct({ ...myProduct, description: content });
  };

  useEffect(() => {
    setMyProduct(product);
  }, [product]);

  useEffect(() => {
    if (myProduct) {
      setCateRender({
        product: myProduct.categories.map((cate) => ({
          value: cate.name,
          label: cate.name,
          category_id: cate.category_id,
        })),
        cates: categories.map((cate) => ({ value: cate.name, label: cate.name, category_id: cate.id })),
      });
    }
  }, [myProduct]);

  return (
    <>
      <div className="p-5">
        <div className="header">
          <h1> {product?.name} </h1>
        </div>
        <div className="body">
          <hr />
          <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="info" title="Info">
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Vendor <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control defaultValue={vendors.find((v) => v.id === product?.vendor_id)?.name} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Product Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="" defaultValue={product?.name} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Brand <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select>
                      <option value={''}>Other</option>
                      {brands.map((brand, index) => (
                        <option value={brand.name} key={index}>
                          {brand.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Condition <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select>
                      {conditions.map((condition, index) => (
                        <option value={condition.id || ''} key={index}>
                          {condition.name === 'None' ? '' : condition.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    SKU <span className="text-danger"></span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="" defaultValue={product?.sku} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Images <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <ImageUploading multiple value={images} onChange={onUploadImg} maxNumber={maxNumber}>
                      {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
                        // write your building UI
                        <div className=" d-flex flex-row flex-wrap">
                          {myProduct?.images.map((image, index) => (
                            <div className="" key={index}>
                              <img src={image.thumbs[0]} style={{ width: 100, height: 100, margin: 10 }} />
                              <button style={{ border: 'none' }} onClick={handleDelImage(index)}>
                                <BsXCircleFill />
                              </button>
                            </div>
                          ))}
                          <div className="d-flex flex-row-reverse flex-wrap ">
                            <button
                              style={{ border: 'dashed', borderWidth: 1, width: 100, height: 100, margin: 10 }}
                              onClick={(e: any) => {
                                e.preventDefault();
                                onImageUpload();
                              }}
                              {...dragProps}
                            >
                              <BsFillCameraFill size={50} />
                            </button>
                            {imageList.map((image, index) => (
                              <div key={index}>
                                <img src={image.dataURL} style={{ width: 100, height: 100 }} />
                                <button
                                  style={{ border: 'none' }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onImageRemove(index);
                                  }}
                                >
                                  <BsXCircleFill />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Select
                      value={cateRender.product}
                      isMulti
                      options={cateRender.cates}
                      className="basic-multi-select"
                      placeholder="Select Category"
                      onChange={handleSelectCate}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <SunEditor setContents={myProduct?.description} onChange={handleChangeEditor} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Available for sale <span className="text-danger"></span>
                  </Form.Label>
                  <Col sm="10">
                    <FormControlLabel
                      control={<Switch checked={myProduct?.participate_sale === 1} onChange={handleChangeAvailable} />}
                      label={myProduct?.participate_sale === 1 ? 'Yes' : 'No'}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="attachments" title="Attachments">
              Tab Attachment Here
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DetailProductForm;
