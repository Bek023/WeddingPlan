import React, { useRef } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useAuthComponents, load, useData } from '../Utils/zustand';
import style from "./Style/SignIn.module.css";
import axios from "../Utils/Axios";
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const { setComp } = useAuthComponents();
    const { loadStatus, SetLoading, RemoveLoading } = load();
    const { data, getData } = useData();
    const formRef = useRef(null);
    const navigate = useNavigate()

    const onFinish = async () => {
        SetLoading();
        const { username, password } = formRef.current.getFieldsValue();
        try {
            const response = await axios.post("/login", {
                username,
                password,
            });
            console.log(response.data);
            const { remember_token } = response.data;

            if (remember_token) {
                localStorage.setItem("remember_token", remember_token);
                localStorage.setItem("user", JSON.stringify(username));
            }
            getData();
            RemoveLoading();
            navigate("/");
            message.success("Muvaffaqiyatli tizimga kirdingiz!");
            console.log("Login success:", response.data);
        } catch (error) {
            RemoveLoading();
            const msg = error.response?.data?.message || "Login xatoligi!";
            message.error(msg);
            console.error("Login error:", error.response?.data || error.message);
        }
    };


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
