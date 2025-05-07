import React, { useRef, useState } from 'react';
import { Button, Modal, Form, Input, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import style from './style/Profile.module.css';

import { useData, useModal, load } from '../Utils/zustand';
import avatar from "../assets/images/Login_bg.jpg"

const normFile = e => (Array.isArray(e) ? e : e?.fileList || []);

const SetEdit = () => {
    const formProfile = useRef(null);
    const { data, updateUser } = useData();
    const { open, setOpen, closeOpen } = useModal();
    const { SetLoading, RemoveLoading } = load();

    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'default.png',
            status: 'done',
            url: data[0]?.image ||avatar,
        },
    ]);

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const checkPassword = async (values) => {
        SetLoading();

        // const oldPassword = values.OldPassword;
        const newPassword = values.user.password;

        // if (oldPassword !== data[0]?.password) {
        //     message.error("Eski parol noto'g'ri");
        //     RemoveLoading();
        //     return;
        // }

        if (newPassword.length < 8) {
            message.error("Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak");
            RemoveLoading();
            return;
        }

        const updatedData = {
            fullname: values.user.name,
            email: values.user.email,
            password: newPassword,
        };

        const imageFile = fileList[0]?.originFileObj || null;

        const success = await updateUser(updatedData, imageFile);
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
                        }
                    }}
                    onFinish={checkPassword}
                >
                    <div className={style.form}>
                        <Form.Item label="" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload
                                listType="picture-circle"
                                fileList={fileList}
                                beforeUpload={() => false}
                                onChange={handleChange}
                                name="image"
                            >
                                {fileList.length >= 1 ? null : (
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                )}
                            </Upload>
                        </Form.Item>

                        <p>Full name</p>
                        <Form.Item name={['user', 'name']} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <p>Email</p>
                        <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>

                        {/* <p>Old password</p>
                        <Form.Item name="OldPassword" rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item> */}

                        <p>New password</p>
                        <Form.Item name={['user', 'password']} rules={[{ required: true }]}>
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
