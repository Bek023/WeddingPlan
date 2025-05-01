import { useAuthComponents } from '../Utils/zustand';
import style from './Style/SignAbout.module.css';


export default function SignAbout({ }) {
    const {comp , setComp}= useAuthComponents();





    return (
        <>
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
                <button >Ro`yxatdan o`tish</button>
                <button onClick={()=>setComp(1)}>Kirish</button>
            </div>
        </>
    )
}