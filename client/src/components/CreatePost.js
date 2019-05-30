import React, { useState, useRef } from 'react';
import MdImage from 'react-ionicons/lib/MdImage';
import MdSend from 'react-ionicons/lib/MdSend';
import MdClose from 'react-ionicons/lib/MdClose';

const CreatePost = () => {
  const [data, setData] = useState({
    allowResize: true,
    textHeight: '4rem',
    isFocused: false,
    images: [],
    imagePreviewUrls: []
  });

  const { isFocused, imagePreviewUrls, allowResize, textHeight } = data;
  let fileuploader;
  const textArea = useRef(null);

  const removeImage = image => {
    setData({
      ...data,
      imagePreviewUrls: data.imagePreviewUrls.filter(i => i !== image)
    });
  };

  const handleClick = e => {
    fileuploader.click();

    if (isFocused) document.body.onfocus = setFocus;
  };

  const setFocus = () => {
    textArea.current.focus();
    setData({
      ...data,
      allowResize: true
    });

    document.body.onfocus = null;
  };

  const onFileChange = e => {
    e.preventDefault();
    const filesList = e.target.files;

    if (filesList.length === 0) return;

    if (filesList.length > 8) {
      alert('Too many images. Please choose 8 or less.');
      return;
    }

    let arr = [...data.imagePreviewUrls];
    let imgs = [...data.images];

    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];

      const reader = new FileReader();
      reader.onload = upload => {
        arr.push(upload.target.result);
        imgs.push(filesList[i]);
        setData({
          ...data,
          imagePreviewUrls: arr,
          images: imgs
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className='create-post'
      style={{
        boxShadow: isFocused === true ? '0 1rem 2rem rgba(0,0,0, 0.2)' : 'none',
        transform: isFocused === true ? 'scale(1.01)' : 'scale(1)'
      }}
    >
      <img
        src={require('../img/profile.jpg')}
        alt=''
        className='create-post__img'
      />
      <form>
        <div className='create-post__container'>
          <textarea
            className='create-post__text'
            placeholder="What's happening?"
            name=''
            cols='30'
            rows='10'
            ref={textArea}
            style={{ height: textHeight }}
            onFocus={() => {
              setData({
                ...data,
                textHeight: '10rem',
                isFocused: true
              });
            }}
            onBlur={() => {
              setData({
                ...data,
                textHeight: allowResize === true ? '4rem' : '10rem',
                isFocused: allowResize === true ? false : true
              });
            }}
          />
        </div>
      </form>
      <div className='create-post__toolbar'>
        <input
          type='file'
          ref={el => (fileuploader = el)}
          id='file'
          style={{ display: 'none' }}
          multiple
          accept='image/*'
          onChange={onFileChange}
        />
        <p />
        <div className='create-post__toolbar-container'>
          <div
            className='create-post__toolbar-icon-container'
            onClick={() => {
              handleClick();
            }}
            onMouseEnter={() => {
              setData({ ...data, allowResize: false });
            }}
            onMouseLeave={() => {
              setData({ ...data, allowResize: true });
            }}
          >
            <MdImage className='create-post__toolbar-icon' />
          </div>

          <div
            className='create-post__toolbar-icon-container'
            onMouseEnter={() => {
              setData({ ...data, allowResize: false });
            }}
            onMouseLeave={() => {
              setData({ ...data, allowResize: true });
            }}
          >
            <MdSend
              className='create-post__toolbar-icon'
              style={{ marginLeft: '3px' }}
            />
          </div>
        </div>
      </div>

      <div className='create-post__images'>
        {imagePreviewUrls.map((imagePreviewUrl, key) => {
          return (
            <div key={imagePreviewUrl} className='create-post__image-container'>
              <img
                alt='previewImg'
                src={imagePreviewUrl}
                className='create-post__image'
              />
              <MdClose
                onClick={() => {
                  removeImage(imagePreviewUrl);
                }}
                className='create-post__image-delete'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatePost;
