'use client';

import React, { useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { uploadImage } from '@/api/imageUpload';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      setUploading(true);

      if (!image) {
        alert('Please select an image to upload');
        return;
      }

      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `/public/${fileName}`;

      const { error } = await supabase.storage
        .from('banner_image')
        .upload(filePath, image);

      if (error) {
        throw error;
      }

      const { publicURL, error: urlError } = supabase.storage
        .from('banner_image')
        .getPublicUrl(filePath);

      if (urlError) {
        throw urlError;
      }

      setUrl(publicURL);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {url && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}

export { ImageUploader };