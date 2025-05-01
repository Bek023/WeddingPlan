import image from '../assets/images/register-first-img.jpg';
import h_shape from '../assets/images/f-shape-1.png';
import f_shape from '../assets/images/f-shape-2.png';
import flowers1 from "../assets/images/shape1.png";
import flowers2 from "../assets/images/shape4.png";
import flowers3 from "../assets/images/shape-2-bottom.png";
import flowers4 from "../assets/images/shape3-left-bottom.png";
import style from './style/Sign.module.css';
import { useAuthComponents } from '../Utils/zustand';


export default function SignPage({ }) {
    const { comp} = useAuthComponents();

    
    return (
        <>
            <section className={style.block}>
                <div className={style.bgBlock}>
                    <img src={flowers1} alt="" className={style.flower1} />
                    <img src={flowers2} alt="" className={style.flower2} />
                    <img src={flowers3} alt="" className={style.flower3} />
                    <img src={flowers4} alt="" className={style.flower4} />
                    <div className={style.innerBlock}>
                        <div className={style.ingBlock}>
                            <img src={image} />
                        </div>
                        <div className={style.SignBlock}>
                            <img src={h_shape} alt="" />
                            {true && comp.component()}

                            <img src={f_shape} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}