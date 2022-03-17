import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Dropdown, Form, InputGroup, Row, Spinner, Tab, Tabs, ToggleButton } from 'react-bootstrap';
import {
  IBrand,
  ICategory,
  ICondition,
  initProduct,
  IProduct,
  IProductDetail,
  IProductUpdate,
  IProductValidation,
  IShipping,
  IVendor,
} from '../../../models/product';
import { formatterTime, formatterPrice, validateProduct, validSubmitUpdate } from '../utils';
import { BsFillCameraFill, BsXCircleFill, BsFillCalendarFill } from 'react-icons/bs';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Select from 'react-select';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { FormattedMessage } from 'react-intl';

interface Props {
  product?: IProductDetail;
  brands: IBrand[];
  categories: ICategory[];
  conditions: ICondition[];
  vendors: IVendor[];
  shippings: IShipping[];
  onLoading?: boolean;
  onSubmit: (values?: IProductUpdate) => void;
}

const initZone = { id: null, price: null };
const memberships = [
  { id: 0, name: '' },
  { id: 4, name: 'General' },
];
const maxNumber = 69;
const initValidFiled: IProductValidation = {
  vendor_id: '',
  name: '',
  brand_id: '',
  condition_id: '',
  categories: '',
  description: '',
  price: '',
  quantity: '',
  imagesOrder: '',
};

const DetailProductForm = (props: Props) => {
  const { product, categories, conditions, brands, vendors, shippings, onSubmit } = props;
  const [images, setImages] = useState<any[]>([]);
  const [myProduct, setMyProduct] = useState<IProductDetail | undefined>(product);
  const [zones, setZones] = useState<any>(initZone);
  const [optionsVendor, setOptionsVendor] = useState<any[]>([]);
  const [formValue, setFormValue] = useState<IProductUpdate>(initProduct);
  const [validate, setValidate] = React.useState<IProductValidation>(initValidFiled);

  const onUploadImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    const cloneImgs = imageList.map((img) => {
      const a = { ...img };
      return a;
    });
    const imgsCheck = cloneImgs.filter((img) => !images.includes(img));
    setImages(imgsCheck);
  };

  const onRemoveShipping = (index: number) => (e: any) => {
    if (formValue?.shipping_to_zones) {
      const clone = [...formValue.shipping_to_zones];
      clone.splice(index, 1);
      setFormValue({ ...formValue, shipping_to_zones: clone });
    }

    if (myProduct) {
      const newClone = [...myProduct.shipping];
      newClone.splice(index, 1);
      setMyProduct({ ...myProduct, shipping: newClone });
    }
  };

  const onAddShipping = () => {
    // Update formValue
    if (zones.id && zones.price) {
      if (formValue?.shipping_to_zones) {
        const ships = [...formValue.shipping_to_zones];
        ships.push({ ...zones, id: +zones.id });
        setFormValue({ ...formValue, shipping_to_zones: ships });
      } else {
        const ships = [];
        ships.push({ ...zones, id: +zones.id });
        setFormValue({ ...formValue, shipping_to_zones: ships });
      }

      //  update UI
      const zone = shippings.find((s) => s.id == zones.id);
      if (myProduct?.shipping)
        setMyProduct({ ...myProduct, shipping: [...myProduct.shipping, { ...zones, zone_name: zone?.name || '' }] });

      setZones(initZone);
    }
  };

  const onCheckValue = useCallback(() => {
    console.log(formValue);
    const validateP = validateProduct(formValue);
    setValidate(validateP);

    if (!validSubmitUpdate(validateP)) {
      return;
    }

    onSubmit(formValue);
  }, [formValue, onSubmit]);

  const handleChangeDescription = (content: string) => {
    if (formValue?.description) setFormValue({ ...formValue, description: content });
  };

  useEffect(() => {
    if (product) {
      setMyProduct(product);
      setFormValue({
        ...product,
        vendor_id: +product.vendor_id,
        brand_id: +product.brand_id,
        condition_id: null,
        deleted_images: [],
        categories: product.categories.map((cate) => ({ ...cate, value: cate.name, label: cate.name })),
        sale_price_type: +product.sale_price_type,
        tax_exempt: +product.tax_exempt,
        price: +product.price,
        arrival_date: +product.arrival_date,
        quantity: +product.quantity,
        facebook_marketing_enabled: +product.facebook_marketing_enabled,
        google_feed_enabled: +product.google_feed_enabled,
        enabled: +product.enabled,
        participate_sale: +product.participate_sale,
        sale_price: +product.sale_price,
        og_tags_type: +product.og_tags_type,
        meta_desc_type: +product.meta_desc_type,
        enableOffers: -1,
        minimum_offer_price: -1,
        vendor: '',
        shipping_to_zones: [],
        imagesOrder: [],
      });
    } else {
      setMyProduct({
        ...initProduct,
        sort_description: '',
        code: '',
        weight: 0,
        cleanURL: '',
        shipping: [{ id: 0, zone_name: '', price: 0 }],
        images: [{ id: 0, thumbs: [''], file: '' }],
      });
    }
  }, [product]);

  useEffect(() => {
    setOptionsVendor(vendors.map((v) => ({ vendor_id: +v.id, label: v.name, value: v.name, name: v.name })));
  }, [vendors]);

  return (
    <div style={{ backgroundColor: '#1b1b38', color: '#fff' }}>
      <div className="p-5">
        <div className="header">
          <h1> {product?.name} </h1>
        </div>
        <div className="body">
          <hr />
          <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="info" title="Info">
              {/*-------------- Section 1 --------------*/}
              <Form className="mx-auto w-75">
                {/* Vendor */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Vendor <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Select
                      placeholder="Type Vendor name to select"
                      isSearchable={true}
                      options={optionsVendor}
                      value={optionsVendor.find((v) => v.id === formValue?.vendor_id)}
                      onChange={(e: any) => {
                        if (formValue) setFormValue({ ...formValue, vendor_id: e.vendor_id || 0, vendor: e.value });
                      }}
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          borderBottom: '1px dotted pink',
                          color: state.isSelected ? 'red' : 'blue',
                          padding: 20,
                        }),
                      }}
                    />
                    {!!validate.vendor_id && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.vendor_id} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Product Title */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Product Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      value={formValue?.name || ''}
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, name: e.currentTarget.value });
                      }}
                      defaultValue={product?.name}
                    />
                    {!!validate.name && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.name} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Brand */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Brand <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, brand_id: +e.currentTarget.value });
                      }}
                      value={brands.find((b) => b.id == formValue?.brand_id)?.id}
                    >
                      {brands.map((brand, index) => (
                        <option value={brand.id} key={index}>
                          {brand.name}
                        </option>
                      ))}
                    </Form.Select>
                    {!!validate.brand_id && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.brand_id} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Condition */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Condition <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select
                      defaultValue={conditions.find((c) => c.id === formValue?.condition_id)?.name}
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, condition_id: +e.currentTarget.value });
                      }}
                    >
                      {conditions.map((condition, index) => (
                        <option value={condition.id || ''} key={index}>
                          {condition.name === 'None' ? '' : condition.name}
                        </option>
                      ))}
                    </Form.Select>
                    {!!validate.condition_id && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.condition_id} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* SKU */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    SKU <span className="text-danger"></span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, sku: e.currentTarget.value });
                      }}
                      value={formValue?.sku || ''}
                      defaultValue={product?.sku}
                    />
                    {!!validate?.sku && (
                      <small className="text-danger">
                        <FormattedMessage id={validate?.sku} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Images */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Images <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10">
                    <ImageUploading multiple value={images} onChange={onUploadImg} maxNumber={maxNumber}>
                      {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
                        // write your building UI
                        <div className=" d-flex flex-row flex-wrap">
                          {myProduct?.images.map((image, index) => (
                            <div className="" key={index}>
                              <img src={image.thumbs[0]} style={{ width: 100, height: 100, marginLeft: 10 }} />
                              <button
                                style={{ border: 'none' }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const imgs = [...myProduct.images];
                                  imgs.splice(index, 1);
                                  setMyProduct({ ...myProduct, images: imgs });
                                  if (formValue?.deleted_images)
                                    setFormValue({
                                      ...formValue,
                                      deleted_images: [...formValue.deleted_images, product?.images[index]],
                                      imagesOrder: [...images, ...imgs],
                                    });
                                }}
                              >
                                <BsXCircleFill />
                              </button>
                            </div>
                          ))}
                          <div className="d-flex flex-row-reverse flex-wrap ">
                            <button
                              style={{ border: 'dashed', borderWidth: 1, width: 100, height: 100, marginLeft: 10 }}
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
                                <img src={image.dataURL} style={{ width: 100, height: 100, marginLeft: 10 }} />
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
                    {!!validate.imagesOrder && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.imagesOrder} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Category */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10" style={{ zIndex: 3 }}>
                    <Select
                      value={formValue?.categories}
                      isMulti
                      options={categories.map((cate) => ({ value: cate.name, label: cate.name, category_id: cate.id }))}
                      className="basic-multi-select"
                      placeholder="Select Category"
                      onChange={(data) => {
                        if (formValue) setFormValue({ ...formValue, categories: [...data] });
                      }}
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          borderBottom: '1px dotted pink',
                          color: state.isSelected ? 'red' : 'blue',
                          padding: 20,
                        }),
                      }}
                    />
                    {!!validate.categories && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.categories} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Description */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Col style={{ zIndex: 1 }} sm="10">
                    <SunEditor setContents={formValue?.description} onChange={handleChangeDescription} />
                    {!!validate.description && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.description} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Available for Sale */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Available for sale <span className="text-danger"></span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Check
                      type="switch"
                      label={formValue?.enabled === 1 ? 'Yes' : 'No'}
                      checked={formValue?.enabled === 1}
                      onChange={() => {
                        if (formValue?.enabled) setFormValue({ ...formValue, enabled: 1 - formValue.enabled });
                      }}
                    />
                    {!!validate.enabled && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.enabled} />
                      </small>
                    )}
                  </Col>
                </Form.Group>
              </Form>
              {/* --------------- End of Section 1 --------------- */}

              {/* --------------- Section 2 --------------- */}
              <div
                className="seperated-space mx-auto"
                style={{ width: '100%', height: 20, backgroundColor: '#323259', display: 'block' }}
              ></div>
              <h1 className="m-3">Prices & Inventory</h1>
              <Form className="mx-auto w-75">
                {/* Memberships */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Memberships
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, memberships: [e.currentTarget.value] });
                      }}
                      defaultValue={''}
                    >
                      {memberships.map((mem, index) => (
                        <option value={mem.id} key={index}>
                          {' '}
                          {mem.name}{' '}
                        </option>
                      ))}
                    </Form.Select>
                    {!!validate.memberships && (
                      <small className="text-danger">
                        <FormattedMessage id={validate?.memberships.length} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Tax Class */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Tax class
                  </Form.Label>
                  <Col className="d-flex flex-row justify-content-around">
                    <div>Default</div>
                    <Form.Check
                      onChange={() => {
                        if (formValue?.tax_exempt) setFormValue({ ...formValue, tax_exempt: 1 - formValue.tax_exempt });
                      }}
                      type="checkbox"
                      label="Tax Exempt"
                    />
                    {!!validate?.tax_exempt && (
                      <small className="text-danger">
                        <FormattedMessage id={validate?.tax_exempt} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Price */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Price <span className="text-danger">*</span>
                  </Form.Label>
                  <Col>
                    <div className="d-flex flex-row justify-content-around">
                      <InputGroup style={{ width: 200 }}>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          type="number"
                          value={formValue?.price || ''}
                          onChange={(e) => {
                            if (formValue) setFormValue({ ...formValue, price: +e.currentTarget.value });
                          }}
                        />
                      </InputGroup>
                      <div className="d-flex flex-row justify-content-around align-items-center">
                        <Form.Check
                          type="checkbox"
                          checked={formValue?.participate_sale === 1}
                          onChange={() => {
                            if (typeof formValue?.participate_sale === 'number')
                              setFormValue({ ...formValue, participate_sale: 1 - formValue.participate_sale });
                            else setFormValue({ ...formValue, participate_sale: 0 });
                          }}
                          label="Sale"
                        />
                        <InputGroup hidden={formValue?.participate_sale === 0} style={{ width: 200, marginLeft: 10 }}>
                          <Form.Select
                            onChange={(e) => {
                              if (formValue) setFormValue({ ...formValue, sale_price_type: +e.currentTarget.value });
                            }}
                          >
                            <option value="$">$</option>
                            <option value="%">%</option>
                          </Form.Select>
                          <Form.Control
                            type="number"
                            value={formValue?.sale_price || ''}
                            onChange={(e) => {
                              if (formValue) setFormValue({ ...formValue, sale_price: +e.currentTarget.value });
                            }}
                          />
                        </InputGroup>
                      </div>
                    </div>
                    {!!validate.price && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.price} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Arrival date */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Arrival date
                  </Form.Label>
                  <Col className="">
                    <InputGroup style={{ width: 400 }}>
                      <InputGroup.Text>
                        <BsFillCalendarFill />
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        onChange={(e) => {
                          if (formValue)
                            setFormValue({ ...formValue, arrival_date: new Date(e.currentTarget.value).getTime() });
                        }}
                        value={formatterTime(formValue?.arrival_date) || ''}
                      />
                    </InputGroup>
                    {!!validate.arrival_date && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.arrival_date} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Quantity in stock */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Quantity in stock <span className="text-danger">*</span>
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, quantity: +e.currentTarget.value });
                      }}
                      value={formValue?.quantity || ''}
                    />
                    {!!validate.quantity && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.quantity} />
                      </small>
                    )}
                  </Col>
                </Form.Group>
              </Form>
              {/* --------------- End of Section 2 --------------- */}
              {/* --------------- Section 3 --------------- */}
              <div
                className="seperated-space mx-auto"
                style={{ width: '100%', height: 20, backgroundColor: '#323259', display: 'block' }}
              ></div>
              <h1 className="m-3">Prices & Inventory</h1>
              <Form className="mx-auto w-75">
                {/* Continental U.S. */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Continental U.S. <span className="text-danger">*</span>
                  </Form.Label>
                  <Col sm="10" className="">
                    <InputGroup className="mb-3" style={{ width: 400 }}>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        onChange={(e) => {
                          setZones({ ...zones, price: +e.currentTarget.value });
                        }}
                        type="number"
                        value={zones.price || ''}
                      />
                    </InputGroup>
                    {myProduct?.shipping.map((ship, index) => (
                      <div className="d-flex flex-row justify-content-start mb-3" key={index}>
                        <Form.Label column sm="2">
                          {ship.zone_name === 'Continental U.S.' ? 'Everywhere Else' : ship.zone_name}
                        </Form.Label>
                        <InputGroup style={{ width: 400 }}>
                          <InputGroup.Text>$</InputGroup.Text>
                          <Form.Control disabled type="number" value={ship.price} />
                          <Button onClick={onRemoveShipping(index)} variant="danger">
                            Remove
                          </Button>
                        </InputGroup>
                      </div>
                    ))}
                    <div className="d-flex flex-row justify-content-start mb-3">
                      <Form.Select
                        onChange={(e) => {
                          setZones({ ...zones, id: e.currentTarget.value });
                        }}
                        style={{ width: 400 }}
                      >
                        {shippings.map((shipping, index) => (
                          <option value={shipping.id + ''} key={index}>
                            {shipping.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Button onClick={onAddShipping} style={{ marginLeft: 10 }}>
                        Add Shipping Location
                      </Button>
                    </div>
                    {!!validate.shipping_to_zones && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.shipping_to_zones} />
                      </small>
                    )}
                  </Col>
                </Form.Group>
              </Form>
              {/* --------------- End of Section 3 --------------- */}
              {/* --------------- Section 4 --------------- */}
              <div
                className="seperated-space mx-auto"
                style={{ width: '100%', height: 20, backgroundColor: '#323259', display: 'block' }}
              ></div>
              <h1 className="m-3">Marketing</h1>
              <Form className="mx-auto w-75">
                {/* Open Graph meta tags */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Open Graph meta tags
                  </Form.Label>
                  <Col sm="10" className="">
                    <Form.Select
                      onChange={(e) => {
                        if (typeof formValue?.og_tags_type === 'number')
                          setFormValue({ ...formValue, og_tags_type: +e.currentTarget.value });
                        else setFormValue({ ...formValue, og_tags_type: 0 });
                      }}
                      className="mb-3"
                    >
                      <option value="">Autogeneration</option>
                      <option value={myProduct?.og_tags}>Custom</option>
                    </Form.Select>
                    <Form.Control
                      hidden={formValue?.og_tags_type === 0}
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, og_tags: e.currentTarget.value });
                      }}
                      value={formValue?.og_tags || ''}
                    />
                    {!!validate.og_tags && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.og_tags} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Meta description */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Meta description
                  </Form.Label>
                  <Col sm="10" className="">
                    <Form.Select
                      onChange={(e) => {
                        if (typeof formValue?.meta_desc_type === 'number')
                          setFormValue({ ...formValue, meta_desc_type: +e.currentTarget.value });
                        else setFormValue({ ...formValue, meta_desc_type: 0 });
                      }}
                      className="mb-3"
                    >
                      <option value="">Autogeneration</option>
                      <option value={myProduct?.meta_description}>Custom</option>
                    </Form.Select>
                    <Form.Control
                      hidden={formValue?.meta_desc_type === 0}
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, meta_description: e.currentTarget.value });
                      }}
                      value={formValue?.meta_description || ''}
                    />

                    {!!validate.meta_description && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.meta_description} />
                      </small>
                    )}
                  </Col>
                </Form.Group>
                {/* Meta keywords */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Meta keywords
                  </Form.Label>
                  <Col sm="10" className="">
                    <Form.Control
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, meta_keywords: e.currentTarget.value });
                      }}
                      value={formValue?.meta_keywords || ''}
                    />
                    {!!validate.meta_keywords && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.meta_keywords} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Product page title */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Product page title
                  </Form.Label>
                  <Col sm="10" className="">
                    <Form.Control
                      onChange={(e) => {
                        if (formValue) setFormValue({ ...formValue, product_page_title: e.currentTarget.value });
                      }}
                      value={formValue?.product_page_title}
                    />
                    <Form.Text hidden={formValue?.product_page_title?.trim() !== ''} muted>
                      Leave blank to use product name as Page Title.
                    </Form.Text>
                    {!!validate.product_page_title && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.product_page_title} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Add to Facebook product feed */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Add to Facebook product feed
                  </Form.Label>
                  <Col sm="10" className="">
                    <Form.Check
                      label={formValue?.facebook_marketing_enabled === 1 ? 'Yes' : 'No'}
                      type="switch"
                      checked={formValue?.facebook_marketing_enabled === 1}
                      onChange={() => {
                        if (typeof formValue?.facebook_marketing_enabled === 'number')
                          setFormValue({
                            ...formValue,
                            facebook_marketing_enabled: 1 - formValue.facebook_marketing_enabled,
                          });
                      }}
                    />
                    {!!validate.facebook_marketing_enabled && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.facebook_marketing_enabled} />
                      </small>
                    )}
                  </Col>
                </Form.Group>

                {/* Add to Google product feed */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Add to Google product feed
                  </Form.Label>
                  <Col sm="10" className="">
                    <Form.Check
                      checked={formValue?.google_feed_enabled === 1}
                      label={formValue?.google_feed_enabled === 1 ? 'Yes' : 'No'}
                      type="switch"
                      onChange={() => {
                        if (typeof formValue?.google_feed_enabled === 'number')
                          setFormValue({
                            ...formValue,
                            google_feed_enabled: 1 - formValue.google_feed_enabled,
                          });
                      }}
                    />
                    {!!validate.google_feed_enabled && (
                      <small className="text-danger">
                        <FormattedMessage id={validate.google_feed_enabled} />
                      </small>
                    )}
                  </Col>
                </Form.Group>
              </Form>
              {/* --------------- End of Section 4 --------------- */}
            </Tab>
            <Tab eventKey="attachments" title="Attachments">
              Tab Attachment Here
            </Tab>
          </Tabs>

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
                  onClick={onCheckValue}
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

export default memo(DetailProductForm);
