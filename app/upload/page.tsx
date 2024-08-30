// app/upload/page.tsx
"use client"
import { useState } from 'react';

const UploadPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState('');
  const [categoryid, setCategoryid] = useState('');
  const [styles, setStyles] = useState<{ name: string; price: string }[]>([]);
  const [images, setImages] = useState<File[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Convert FileList to Array
    }
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedStyles = [...styles];
    updatedStyles[index] = { ...updatedStyles[index], [e.target.name]: e.target.value };
    setStyles(updatedStyles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('sizes', sizes);
    formData.append('categoryid', categoryid);

    styles.forEach((style, index) => {
      formData.append('styles', JSON.stringify(style));
    });

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      // Handle success (e.g., show a success message, clear form, etc.)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Sizes (JSON)</label>
          <input
            id="sizes"
            type="text"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="categoryid" className="block text-sm font-medium text-gray-700">Category ID</label>
          <input
            id="categoryid"
            type="text"
            value={categoryid}
            onChange={(e) => setCategoryid(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="styles" className="block text-sm font-medium text-gray-700">Styles</label>
          {styles.map((style, index) => (
            <div key={index} className="mb-4">
              <input
                name="name"
                type="text"
                placeholder="Style Name"
                value={style.name}
                onChange={(e) => handleStyleChange(e, index)}
                className="mr-2 p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                name="price"
                type="text"
                placeholder="Style Price"
                value={style.price}
                onChange={(e) => handleStyleChange(e, index)}
                className="p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setStyles([...styles, { name: '', price: '' }])}
            className="text-blue-500"
          >
            Add Style
          </button>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
