import { useData, useMealsStore, useGallary } from "../Utils/zustand";
import style from "./Style/Profile.module.css";
import SetEdit from "./SetEdit";
import { useLayoutEffect } from "react";

export const UserProfile = () => {
    const { data, getData } = useData();
    const { getMeals } = useMealsStore();
    const { getGallaries } = useGallary();

    useLayoutEffect(() => {
        getData();
        getMeals();
        getGallaries();
    }, []);



    return (
        <>
            {data && data.length > 0 ? (
                <div className={style.container}>
                    <div className={style.header}>
                        <h1>Profile</h1>
                        <SetEdit />
                    </div>
                    <div className={style.profile}>


                        <div className={style.info}>
                            <h2> {data[0].fullname}</h2>
                            <p><span>E-mail:</span> {data[0].email}</p>
                            <p><span>Username:</span> {data[0].username}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className={style.loading}>Ma'lumotlar yuklanmoqda...</p>
            )}

            <div style={{ width: "100%", height: "2px", backgroundColor: "#FB62F6", marginTop: "20px" }}></div>
        </>
    );
};
