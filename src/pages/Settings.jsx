import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import toast from 'react-hot-toast';
import { updateProfile,getProfile } from "../context/services/profile";
import CustomLoader from '../components/loader';
import Context from "../context/AppContext";
export default function Settings() {
  const {refetchProfile} = useContext(Context)
  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getProfile();
      if (response?.data.success) {
        setFormData({
          address_line_1: response?.data.profile?.address_line_1,
          address_line_2: response?.data?.profile?.address_line_2,
          country: response?.data?.profile?.country,
          state: response?.data?.profile?.state,
          city: response?.data?.profile?.city,
          pincode: response?.data?.profile?.pincode
        });
        setLoading(false);
      }
        setLoading(false);
      
    };
    fetchData();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (!value) {
      setErrors({ ...errors, [name]: "This field is required" });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log("Updated Profile:", formData);
      try {
        setLoading(true);
        const response = await updateProfile(formData);
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          console.log("Profile Updated");
          refetchProfile()
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred.");
        console.error("Update profile error:", error);
      }finally{
        setLoading(false);
      }
      
    } else {
      console.log("Errors:", newErrors);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between">
        <NavBar />
        <Outlet />
        <div className="flex flex-col items-center py-10">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            {/* Address Line 1 */}
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="address_line_1"
              >
                Address Line 1
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="address_line_1"
                type="text"
                placeholder="1234 Main St"
                name="address_line_1"
                value={formData.address_line_1}
                onChange={handleChange}
                required
              />
              {errors.address_line_1 && (
                <p className="text-red-500 text-xs italic">
                  {errors.address_line_1}
                </p>
              )}
            </div>

            {/* Address Line 2 */}
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="address_line_2"
              >
                Address Line 2
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="address_line_2"
                type="text"
                placeholder="Apartment, studio, or floor"
                name="address_line_2"
                value={formData.address_line_2}
                onChange={handleChange}
              />
              {errors.address_line_2 && (
                <p className="text-red-500 text-xs italic">
                  {errors.address_line_2}
                </p>
              )}
            </div>

            {/* Country */}
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="country"
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              {errors.country && (
                <p className="text-red-500 text-xs italic">{errors.country}</p>
              )}
            </div>

            {/* State */}
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="state"
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              {errors.state && (
                <p className="text-red-500 text-xs italic">{errors.state}</p>
              )}
            </div>

            {/* City */}
            <div className="flex flex-wrap  mb-6">
              {/* City */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="city"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                {errors.city && (
                  <p className="text-red-500 text-xs italic">{errors.city}</p>
                )}
              </div>

              {/* Pincode */}
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="pincode"
                >
                  Pincode
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="pincode"
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs italic">
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                style={{ backgroundColor: "rgb(89 168 69)" }}
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
       style={{position: "absolute", bottom: "0"}}   className="flex flex-col md:flex-row justify-between gap-[24px] bg-primary-brand w-full px-[16px] md:px-[128px] py-[24px]"
      >
        <div className="flex flex-col md:flex-row gap-[12px] md:gap-[24px]">
          <Link className="text-text text-[16px] font-[500]" to="/about">
            About
          </Link>
          <Link className="text-text text-[16px] font-[500]" to="/root/product">
            Product
          </Link>
          <Link className="text-text text-[16px] font-[500]" to="/root">
            Store
          </Link>
          <Link className="text-text text-[16px] font-[500]" to="/howitworks">
            How it works?
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-[12px] md:gap-[24px]">
          <Link
            className="text-text text-[16px] font-[500]"
            to="/privacypolicy"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-text text-[16px] font-[500]"
            to="/termcondition"
          >
            Terms & Conditions
          </Link>
          <Link className="text-text text-[16px] font-[500]" to="/contact">
            Contact
          </Link>
          <Link className="text-text text-[16px] font-[500]" to="/settings">
            Settings
          </Link>
        </div>
      </div>
      {loading && <CustomLoader/>}

    </>
  );
}
