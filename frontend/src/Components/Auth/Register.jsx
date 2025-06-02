 

import  { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import createToast from "../../utils/toast";
import { Context } from "../../main";
import "./Register.css";

const Register = () => {
    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            phone: "",
            password: "",
            role: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            name: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
            phone: Yup.string().matches(/^\d{10}$/, "Invalid phone number").required("Required"),
            password: Yup.string().min(8, "Must be at least 8 characters").required("Required"),
            role: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(
                    "https://backend-food-amber.vercel.app/api/v1/user/register",
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                createToast(data.message, "success");
                
                formik.resetForm();
                setIsAuthorized(true);
            } catch (error) {
                createToast(error.response.data.message, "error");
            }
        },
    });

    if (isAuthorized) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <div className="register">
                <div className="register-container" >
                    <div className="register-image">
                        <img src="./images/register.png" alt="register" />
                    </div>

                    <div className="register-form">
                        <h1>Register</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="register-input">
                                <MdOutlineMailOutline />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                            <div className="register-input">
                                <FaRegUser />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.name && formik.errors.name ? (
                                <div className="error">{formik.errors.name}</div>
                            ) : null}
                            <div className="register-input">
                                <FaPhoneFlip />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="error">{formik.errors.phone}</div>
                            ) : null}
                            <div className="register-input">
                                <RiLock2Fill />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}
                            <div className="register-input">
                                <FaPencilAlt />
                                <select
                                    id="role"
                                    name="role"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Role</option>
                                    <option value="doner">Donor</option>
                                    <option value="agent">Agent</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {formik.touched.role && formik.errors.role ? (
                                <div className="error">{formik.errors.role}</div>
                            ) : null}
                            <button type="submit">Register</button>
                        </form>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Register;

