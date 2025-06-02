import  { useState } from 'react';
import Navigation from '../Sidenav/sidenav';
import createToast from "../../utils/toast";
import { useNavigate } from 'react-router-dom';
import "./donate.css"

const Donate = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("userData"));
  console.log("datas",data)
  const [formData, setFormData] = useState({
    name: data.name,
    foodType: '',
    quantity: '',
    cookingTime: '',
    address: data.address,
    phone: data.phone,
    donorToAdminMsg: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const response = await fetch('https://backend-food-amber.vercel.app/api/v1/doner/doner/donate', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donation: formData })
      });

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      createToast(data.message, 'success');
      navigate('/pending-donations');

    } catch (error) {
      console.error('Error submitting form:', error);
      createToast(error.message, 'error');
       
    }
  };

  return (
    <main>
      <Navigation />
      <div className="donate-main-wrapper">
        <div className="donate-header bg-white shadow-sm p-3">
          <h5 className="m-0 color-theme d-inline-block">Donate</h5>
        </div>

        <div className="donate-form-container border m-4 my-3 p-4 bg-white rounded-2 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="foodType" className="form-label">Food Type:</label>
              <input
                type="text"
                className="form-control"
                id="foodType"
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
             
            <div className="form-group mb-2">
              <label htmlFor="cookingTime" className="form-label">Cooking Time:</label>
              <input
                type="datetime-local"
                className="form-control"
                id="cookingTime"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="address" className="form-label">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="donorToAdminMsg" className="form-label">Message for Admin:</label>
              <textarea
                className="form-control"
                id="donorToAdminMsg"
                name="donorToAdminMsg"
                value={formData.donorToAdminMsg}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Donate</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Donate;
