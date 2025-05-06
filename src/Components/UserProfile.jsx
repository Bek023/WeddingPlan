import { useData } from "../Utils/zustand";
import style from "./Style/Profile.module.css";
import avatar from "../assets/images/Login_bg.jpg";
import SetEdit from "./SetEdit";
import { useEffect, useLayoutEffect, useState } from "react";

export const UserProfile = () => {
    const { data, getData } = useData();
    const [profilePhoto, setProfilePhoto] = useState(avatar);

    useLayoutEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            if (data[0].img) {
                setProfilePhoto(data[0].img);
            } else {
                setProfilePhoto(avatar);
            }
        }
    }, [data]);

    return (
        <>
            {data && data.length > 0 ? (
                <div className={style.container}>
                    <div className={style.header}>
                        <h1>Profile</h1>
                        <SetEdit />
                    </div>
                    <div className={style.profile}>

                        <img src={profilePhoto} alt="profile photo" />
                        <div className={style.info}>
                            <h2> {data[0].fullname}</h2>
                            <p>E-mail: {data[0].email}</p>
                            <p>Username: {data[0].username}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Ma'lumotlar yuklanmoqda...</p>
            )}

            <div style={{ width: "100%", height: "2px", backgroundColor: "#ccc", marginTop: "20px" }}></div>
        </>
    );
};
