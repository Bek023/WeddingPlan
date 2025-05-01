import React, { useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useAuthComponents } from '../Utils/zustand';
import style from "./Style/SignIn.module.css";
const onFinish = values => {
    console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
function SignIn() {
    const { setComp } = useAuthComponents();


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
            <p>Agar accountingiz bo`lmasa ro`yxatdan o`ting. <span onClick={() => setComp(0)} style={{ cursor: 'pointer', textDecoration: "underline" }}>Ro`yxatdan o`tish</span></p>
        </Form>
    );
}
export default SignIn;