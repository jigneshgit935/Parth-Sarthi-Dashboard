'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddBlog() {
  const checkLogin = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);

        if (response.ok) {
        } else {
          window.location.href = '/';
        }
      })
      .catch((error) => {
        window.location.href = '/';
      });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    image: null,
    imageUrl: [],
  });

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append('myimage', image);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/image/uploadimage`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        // You can handle the response data here or return it to the caller.
        return data.imageUrl;
      } else {
        // Handle the case where the request failed (e.g., server error)
        console.error('Failed to upload the image.');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
  const uploadBLog = async () => {
    checkLogin();
    if (!product.title || !product.description) {
      toast('Please fill in all required fields.');
      return;
    }

    let tempproduct = product;
    if (product.image) {
      let imgUrl = await uploadImage(product.image);
      tempproduct.imageUrl = imgUrl;
    }

    console.log('BEFORE UPLOADING ', product);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/product`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
        credentials: 'include',
      }
    );

    if (response.ok) {
      const data = await response.json();
      toast('Blog post created successfully');
    } else {
      console.log(response);
      toast('Failed to create the blog post');
    }
  };

  useEffect(() => {
    console.log(product);
  }, [product]);
  return (
    <div className="w-full h-screen ">
      <div className="">
        <h1 className="text-3xl text-center">Add Product</h1>
        <form className="w-[800px] mx-auto mt-10 ">
          <div className=" flex flex-col py-3">
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

          <div className="flex flex-col py-3">
            <label className="text-xl">Product Image</label>
            <input
              type="file"
              onChange={(e) => {
                const selectedImage = e.target.files?.[0]; // Get the selected image file
                if (selectedImage) {
                  setProduct({ ...product, image: selectedImage }); // Update the paragraphImage state with the URL
                }
              }}
            />
            <div></div>
          </div>

          <button
            type="submit"
            className="bg-blue-700 w-full py-2 mt-8"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default form submission
              uploadBLog();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
