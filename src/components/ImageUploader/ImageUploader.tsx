import ImagePreview from './ImagePreview';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import React from 'react';
import styled from 'styled-components';

interface UploaderProps {
  fileUrl: any;
  alt: string;
  processImage: React.ChangeEventHandler<HTMLInputElement>;
  resetImg: () => void;
  multiple?: boolean;
  width: number | string;
  height: number | string;
}

const ImageUploader = (props: UploaderProps) => {
  const {
    fileUrl,
    alt,
    processImage,
    resetImg,
    multiple = false,
    width,
    height,
  } = props;

  const description = '이미지 업로드';

  return (
    <>
      <ImagePreview
        alt={alt}
        fileUrl={fileUrl}
        resetImg={resetImg}
        width={width}
        height={height}
      />
      <ButtonBlock>
        <Label htmlFor={`input-file-${alt}`}>
          <PhotoCameraIcon />
          <span>{description}</span>
        </Label>
        <Input
          id={`input-file-${alt}`}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={processImage}
        />
      </ButtonBlock>
    </>
  );
};

export default ImageUploader;

const ButtonBlock = styled.div`
  width: 100%;
  text-align: center;
`;

const Label = styled.label`
  margin: 0 auto;
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  color: white;
  background-color: #252c44;
  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: none;
`;
