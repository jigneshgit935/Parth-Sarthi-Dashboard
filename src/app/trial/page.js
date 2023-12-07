'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddBlog() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    imageUrl: [],
  });

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append('myimages', image);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/image/uploadimages`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data.imageUrl);
        return data.imageUrl;
      } else {
        console.error('Failed to upload the image.');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const uploadBlog = async () => {
    if (
      !product.title ||
      !product.description ||
      product.imageUrl.length === 0
    ) {
      toast(
        'Please fill in all required fields and select at least one image.'
      );
      return;
    }

    try {
      const uploadedImageUrls = [];
      for (const image of product.imageUrl) {
        const imgUrl = await uploadImage(image);
        if (imgUrl !== null) {
          uploadedImageUrls.push(imgUrl);
        }
      }

      const productData = {
        title: product.title,
        description: product.description,
        imageUrl: uploadedImageUrls,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/product`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast('Blog post created successfully');
      } else {
        console.error(response);
        toast('Failed to create the blog post');
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
    }
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div className="w-full h-screen">
      <div className="">
        <h1 className="text-3xl text-center">Add Product</h1>
        <form className="w-[800px] mx-auto mt-10">
          {/* Title input */}
          <div className="flex flex-col py-3">
            <label className="text-xl">Product Name</label>
            <input
              className="px-3 py-2 border outline-none rounded-md"
              type="text"
              placeholder="Product Title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </div>

          {/* Description textarea */}
          <div className="flex flex-col py-3">
            <label className="text-xl">Product Description</label>
            <textarea
              className="px-3 py-2 border outline-none rounded-md"
              placeholder="Product Description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>

          {/* Image input */}
          <div className="flex flex-col py-3">
            <label className="text-xl">Product Image</label>
            <input
              type="file"
              multiple
              onChange={(e) => {
                const selectedImages = Array.from(e.target.files || []); // Get the selected image files
                setProduct({ ...product, imageUrl: selectedImages });
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-700 w-full py-2 mt-8"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default form submission
              uploadBlog();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
