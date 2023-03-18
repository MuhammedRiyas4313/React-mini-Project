import React, { useEffect, useState } from "react";
import "./EditUser.css";
import "../../clients/Login/assets/material-icon/css/material-design-iconic-font.min.css";
import adminAxios from "../../../Axios/adminAxios.js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditUser() {
    const { id } = useParams();
    console.log(id, 22);
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();
    const token = useSelector((state) => state.Admin.Token);
    console.log(token, "-token");
    useEffect(() => {
        adminAxios
            .get(`user_edit?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const data = res.data.result;
                setName(data.name);
                setPhone(data.phone);
            });
    }, []);

    const handleEditUser = async (e) => {
        e.preventDefault();
        if(name == '' || phone == ''){
            Toast.fire({
                icon: "error",
                title: "All fields required !",
            })
            return;
        }else if(phone.length < 10 ){
            Toast.fire({
                icon: "error",
                title: "Phone should be 10 digits !",
            })
            return;
        }
        adminAxios
            .post(
                "/edit_user_post",
                { name, phone, id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                Toast.fire({
                    icon: "success",
                    title: "Updated successfully !",
                }).then((res)=>{
                    navigate("/admin/client_table");
                })
               
            });
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    return (
        <div>
            <section className="sign-in">
                <div className="container_login" style={{ marginTop: "100px" }}>
                    <div className="signIn-content">
                        <div className="signIn-form">
                            <h2 className="form-title"></h2>
                            <form method="POST" className="register-form" onSubmit={handleEditUser} id="login-form">
                                <div className="form-group">
                                    <label for="your_name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="your_number">
                                        <i class="fa-sharp fa-solid fa-address-book"></i>
                                    </label>
                                    <input
                                        type="number"
                                        name="phone"
                                        id="pass"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                        placeholder="Your Dial number"
                                    />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signIn" id="signIn" className="form-submit" value="Update" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EditUser;
