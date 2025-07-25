import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false)

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image)
    try {
    const response = await axios.post(`${url}/api/food/add`, formData);
    toast(response.data.message)
    setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });
    setImage(false);
} catch (error) {
    toast(error.message)
}
  }

  return (
    <div className="screen">
      <div className="container">
        <form onSubmit={onSubmitHandler} className="flex-col form-section">
          {/* Image Upload Section */}
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload preview"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          {/* Product Name Input */}
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              name="name"
              placeholder="Type here"
              required
            />
          </div>

          {/* Product Description */}
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea
              value={data.description}
              onChange={onChangeHandler}
              name="description"
              rows="6"
              placeholder="Write content here"
              required
            />
          </div>

          {/* Category + Price Side-by-Side */}
          <div className="add-category-price-row">
            <div className="add-category flex-col">
              <p>Category</p>
              <select
                value={data.category}
                onChange={onChangeHandler}
                name="category"
                required
              >
                <option value="">Select a category</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="add-price flex-col">
              <p>Price</p>
              <input
                value={data.price}
                onChange={onChangeHandler}
                type="number"
                name="price"
                placeholder="₹150"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="add-btn">
            ADD
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add