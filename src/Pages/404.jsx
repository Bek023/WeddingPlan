import { useNavigate } from "react-router-dom"
import style from './style/404.module.css'

export default function NotFound() {
    const navigate = useNavigate();
    function nav(){
        navigate('/sign');
    }
    return (
        <>
            <div className={style.block}>

                <h1>404</h1>
                <h2>PAGE NOT FOUND</h2>
                <h3 onClick={nav}>HOME</h3>
            </div>
        </>
    )
}