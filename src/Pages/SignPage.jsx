import image from '../assets/register-first-img.jpg';
import h_shape from '../assets/f-shape-1.png';
import f_shape from '../assets/f-shape-2.png';
import style from './style/Sign.module.css';


export default function SignPage({ }) {
    return (
        <>
            <section className={style.block}>
                <div className={style.bgBlock}>
                    <div className={style.ingBlock}>
                        <img src={image} />
                    </div>
                    <div className={style.SignBlock}>
                        <img src={h_shape} alt="" />
                        <div className={style.formBlock}>

                            <h1>To‘yingizga birinchi qadam – chiroyli taklifnoma bilan!</h1>

                            <p>Biz bilan birga siz:</p>

                            <ul>
                                <li>Oson va tez taklifnoma yaratasiz</li>
                                <li>Ko‘plab dizaynlarni tanlaysiz</li>
                                <li>Har bir mehmonni quvontirasiz!</li>
                            </ul>



                            <p>
                                Davom etish uchun hisobingizga kiring yoki yangi foydalanuvchi sifatida ro‘yxatdan o‘ting
                            </p>
                        </div>
                        <div className={style.btns}>
                            <button>Ro`yxatdan o`tish</button>
                            <button>Kirish</button>
                        </div>
                        <img src={f_shape} alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}