import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAxios from "../../../Axios/userAxios.js";

function UserHome() {
    const [name, setName] = useState("");
    const token = useSelector((store) => store.Client.Token);
    useEffect(() => {
        userAxios
            .get("/getDetails", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setName(res.data.name);
            });
    }, []);

    return (
        <div>
            <div className="p-3">
                <div className="m-5">
                    <div className="d-flex justify-content-center p-3">{name ? <b>Welcome {name}</b> : ""}</div>
                    <div className="d-flex justify-content-center">
                        <img
                            src="https://res.cloudinary.com/practicaldev/image/fetch/s--a0VqOvf_--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4a6t7pmm323uaz9rv1rf.png"
                            alt="...."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserHome;
