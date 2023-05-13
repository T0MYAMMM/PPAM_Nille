import React, { createContext } from 'react';

const ImageUploadContext = createContext(null);

export const ImageUploadProvider = ({ children, handleImageUpload }) => {
  return (
    <ImageUploadContext.Provider value={handleImageUpload}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export default ImageUploadContext;