'use client';

import React, { useState } from 'react';
import { uploadImage } from '@/api/imageUpload';

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        setImageUrl(url);
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />}
    </div>
  );
}

export { ImageUploader };