import React from 'react';

const ImageUpload = (props) => {
  const disableButton = () => {
    if (props.images < 20) return false;
    return true;
  };
  return (
    <div className='field image-field'>
      <button
        className='ui button image-upload'
        as='label'
        htmlFor='file'
        type='button'
        onClick={() => props.fileInputRef.current.click()}
        disabled={disableButton()}
      >
        <p>
          <i className='image icon huge'></i>
        </p>
      </button>

      <input
        ref={props.fileInputRef}
        type='file'
        hidden
        onChange={props.handleFileChange}
        multiple
        accept='.jpeg,.png,.jpg'
      />
    </div>
  );
};

export default ImageUpload;
