import { useEffect } from "react";
import Menu from "../Components/Menu"
import { useComponents , load, useData} from "../Utils/zustand";

export default function Profile() {
    const { comp } = useComponents();
    const {loadStatus , SetLoading, RemoveLoading} = load();
    const {data , getData} = useData();


    return (

        <div style={{ display: "flex" }}>
            <Menu />
            <div style={{ width: "85%", height: "100vh", backgroundColor: "#f0f2f5", float: "right" }}>
                {comp.component()}
            </div>
        </div>

    )
}
