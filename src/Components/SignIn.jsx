import React, { useRef } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useAuthComponents } from '../Utils/zustand';
import style from "./Style/SignIn.module.css";
import axios from "../Utils/Axios";

function SignIn() {
    const { setComp } = useAuthComponents();
    const formRef = useRef(null);

    const onFinish = async () => {
        const { username, password } = formRef.current.getFieldsValue();
        try {
            const response = await axios.post("/login", {
                username,
                password,
            });

            const { remember_token, user } = response.data;

            if (remember_token) {
                localStorage.setItem("remember_token", remember_token);
                localStorage.setItem("user", JSON.stringify(user));
            }

            message.success("Muvaffaqiyatli tizimga kirdingiz!");
            console.log("Login success:", response.data);
            
            setComp(0);
        } catch (error) {
            const msg = error.response?.data?.message || "Login xatoligi!";
            message.error(msg);
            console.error("Login error:", error.response?.data || error.message);
        }
    };

    // const onFinish = async ()=>{
    //     try{
    //         const res = await axios.get('/users');
    //         console.log(res);
    //     }catch{
    //         const msg = error.response?.data?.message || "Login xatoligi!";
    //                 message.error(msg);
    //                 console.error("Login error:", error.response?.data || error.message);
    //     }
    // };

    const onFinishFailed = () => {
        message.error("Iltimos barcha maydonlarni to'ldiring!");
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={style.block}
            ref={formRef}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Iltimos usernameni kiriting!' }]}
            >
                <Input className={style.inp} placeholder='Username' />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Iltimos parolni kiriting!' }]}
            >
                <Input.Password className='inp2' placeholder='Parol' />
            </Form.Item>

            <Form.Item label={null}>
                <Button htmlType="submit" className={style.btn}>
                    Kirish
                </Button>
            </Form.Item>

            <p>
                Agar accountingiz bo`lmasa ro`yxatdan o`ting.{" "}
                <span onClick={() => setComp(2)} style={{ cursor: 'pointer', textDecoration: "underline" }}>
                    Ro`yxatdan o`tish
                </span>
            </p>
        </Form>
    );
}

export default SignIn;
