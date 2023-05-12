import React, { createContext } from 'react';

const ImageUploadContext = createContext(null);

export const ImageUploadProvider = ({ children }) => {
  const handleImageUpload = (url) => {
    // Logika atau tindakan yang ingin Anda lakukan dengan URL gambar di sini
    console.log('URL Gambar:', url);
    // Misalnya, Anda dapat menyimpan URL gambar ke state global, mengirimkannya ke server, atau melakukan tindakan lain sesuai kebutuhan aplikasi Anda.
  };

  return (
    <ImageUploadContext.Provider value={handleImageUpload}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export default ImageUploadContext;