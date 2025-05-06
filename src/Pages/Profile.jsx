
import Menu from "../Components/Menu"
import { useComponents } from "../Utils/zustand";

export default function Profile() {
    const { comp } = useComponents();


    return (

        <div style={{ display: "flex" }}>
            <Menu />
            <div style={{ width:'100%', height: "100vh", backgroundColor: "#f0f2f5", float: "right" }}>
                {comp.component()}
            </div>
        </div>

    )
}
