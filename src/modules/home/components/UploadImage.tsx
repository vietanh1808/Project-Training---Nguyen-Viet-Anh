import React, { Component, useEffect, useState, useRef } from 'react';
import { Figure } from 'react-bootstrap';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { BsFillCameraFill } from 'react-icons/bs';

interface Props {
  onChange: (fileList: any[]) => void;
  children?: JSX.Element;
  values: any[];
}

const maxNumber = 69;
const UploadImage = (props: Props) => {
  const [files, setFiles] = useState(props.values);
  const [images, setImages] = React.useState([]);

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <div>
      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={{ border: 'dashed', borderWidth: 1, width: 100, height: 100 }}
              onClick={(e: any) => {
                e.preventDefault();
                onImageUpload();
              }}
            >
              <BsFillCameraFill size={50} />
            </button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onImageRemove(index);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
export default UploadImage;
