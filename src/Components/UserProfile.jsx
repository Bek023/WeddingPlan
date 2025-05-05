import { useEffect } from "react";
import { useData } from "../Utils/zustand";
import style from "./Style/Profile.module.css";

export const UserProfile = () => {
    const { data} = useData();


    return (
        <>
            <h1>Profile</h1>
            <div className={style.container}>
                <div className={style.header}>
                    {/* <SetEdit /> */}
                </div>
                <div className={style.profile}>
                    {/* <img src={img} alt="profile photo" /> */}
                    {data ? (
                        <div className={style.info}>
                            <h2>{data.fullname}</h2>
                            <p>{data.email}</p>
                        </div>
                    ) : (
                        <p>Ma'lumotlar yuklanmoqda...</p>
                    )}
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#ccc", marginTop: "20px" }}></div>
        </>
    );
};
