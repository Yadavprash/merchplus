"use client"
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  description: string;
  price: string;
  images: FileList | null;
}

export default function AddProduct() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    images: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ?? value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    
    if (formData.images) {
      Array.from(formData.images).forEach((file) => {
        data.append('images', file);
      });
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Product uploaded successfully!');
      } else {
        alert('Failed to upload product: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the product.');
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Images:
          <input type="file" name="images" multiple onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
}
