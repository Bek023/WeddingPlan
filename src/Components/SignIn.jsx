import React, { useRef } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useAuthComponents } from '../Utils/zustand';
import style from "./Style/SignIn.module.css";
import users from '../Utils/data';


function SignIn() {
    const { setComp } = useAuthComponents();
    const formRef = useRef(null);

    const onFinish = () => {
        const { username, password } = formRef.current.getFieldsValue();
        if(username == users[0].name && password == users[0].password){
            message.success("Siz muvaffaqiyatli kirdingiz!");

        } else {
            message.error("Noto'g'ri username yoki parol!");
        }
    }
    const onFinishFailed = () => {
        message.error("Iltimos barcha maydonlarni to'ldiring!");
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={style.block}
            ref={formRef}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Iltimos usernameni kiriring!' }]}


            >
                <Input  className={style.inp} placeholder='username' />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Iltimos parolni kiriring!' }]}
             
            >
                <Input.Password   className='inp2' placeholder='parol' />
            </Form.Item>

            <Form.Item label={null}>
                <Button htmlType="submit" className={style.btn}>
                    Kirish
                </Button>
            </Form.Item>
            <p>Agar accountingiz bo`lmasa ro`yxatdan o`ting. <span onClick={() => setComp(2)} style={{ cursor: 'pointer', textDecoration: "underline" }}>Ro`yxatdan o`tish</span></p>
        </Form>
    );
}
export default SignIn;