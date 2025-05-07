import React, { useRef, useState } from 'react';
import { Button, Modal, Form, Input, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import style from './style/Profile.module.css';

import { useData, useModal, load } from '../Utils/zustand';
import avatar from "../assets/images/Login_bg.jpg"



const SetEdit = () => {
    const formProfile = useRef(null);
    const { data, updateUser } = useData();
    const { open, setOpen, closeOpen } = useModal();
    const { SetLoading, RemoveLoading } = load();





    const checkPassword = async (values) => {
        SetLoading();

        const newPassword = values.user.password;

        if (newPassword.length < 8) {
            message.error("Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak");
            RemoveLoading();
            return;
        }

        const updatedData = {
            fullname: values.user.name,
            email: values.user.email,
            password: newPassword,
            username: values.user.username,
        };
        const success = await updateUser(updatedData);
        if (success) closeOpen();

        RemoveLoading();
    };

    return (
        <>
            <Button type="primary" onClick={setOpen}>Edit</Button>
            <Modal
                title="Edit Account"
                open={open}
                footer={null}
                onCancel={closeOpen}
                className={style.modal}
                width={370}
            >
                <Form
                    ref={formProfile}
                    layout="vertical"
                    style={{ maxWidth: 370 }}
                    initialValues={{
                        user: {
                            name: data[0]?.fullname,
                            email: data[0]?.email,
                            username: data[0].username,
                        }
                    }}
                    onFinish={checkPassword}
                >
                    <div className={style.form}>

                        <p>Full name</p>
                        <Form.Item name={['user', 'name']} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <p>Username</p>
                        <Form.Item name={['user', 'username']} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <p>Email</p>
                        <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>

                        <p>New password</p>
                        <Form.Item name={['user', 'password']} rules={[{ required: true }]} >
                            <Input.Password />
                        </Form.Item>

                        <div className={style.btnBlock}>
                            <Button htmlType="reset" onClick={closeOpen}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default SetEdit;
