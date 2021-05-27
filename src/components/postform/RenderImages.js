import React from 'react';

const RenderImages = (props) => {
  return (
    <div className='two wide grid'>
      <img
        className='image-preview'
        src={URL.createObjectURL(props.file)}
        alt={props.index}
        onClick={props.customClick}
      />
    </div>
  );
};

export default RenderImages;
