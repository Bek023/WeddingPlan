import React, { useEffect, useState } from 'react';
import style from './Style/A_B_a_G.module.css';
import {
    Button,
    Form,
    Input,
    Upload,
    message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useCoupleStore, load } from '../Utils/zustand';

const normFile = e => Array.isArray(e) ? e : e?.fileList;

const A_B_a_G = () => {
    const [form] = Form.useForm();
    const {
        coupleData,
        getCoupleData,
        updateCoupleData,
    } = useCoupleStore();
    const { SetLoading, RemoveLoading } = load();

    const [husbandFileList, setHusbandFileList] = useState([]);
    const [wifeFileList, setWifeFileList] = useState([]);

    useEffect(() => {
        SetLoading();
        getCoupleData();
    }, []);

    useEffect(() => {
        if (coupleData) {
            const husbandImgList = coupleData.husband_img
                ? [{
                    uid: '-1',
                    name: 'husband_img.jpg',
                    status: 'done',
                    url: coupleData.husband_img,
                }]
                : [];

            const wifeImgList = coupleData.wife_img
                ? [{
                    uid: '-2',
                    name: 'wife_img.jpg',
                    status: 'done',
                    url: coupleData.wife_img,
                }]
                : [];

            setHusbandFileList(husbandImgList);
            setWifeFileList(wifeImgList);

            form.setFieldsValue({
                husband_name: coupleData.husband_name,
                wife_name: coupleData.wife_name,
                husband_about: coupleData.husband_about,
                wife_about: coupleData.wife_about,
                husband_img: husbandImgList,
                wife_img: wifeImgList,
            });
        }
        RemoveLoading();
    }, [coupleData]);

    const handleSubmit = async (values) => {
        SetLoading();
        const success = await updateCoupleData(values);
        if (success) message.success('Successfully updated');
        RemoveLoading();
    };

    const uploadProps = (fileList, setFileList) => ({
        beforeUpload: () => false,
        fileList,
        onChange: ({ fileList: newFileList }) => {
            const latestFile = newFileList.slice(-1); 
            setFileList(latestFile);
            form.setFieldsValue({ [setFileList === setHusbandFileList ? 'husband_img' : 'wife_img']: latestFile });
        },
        listType: 'picture-card',
        maxCount: 1,
    });

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <h1 className={style.title}>Couple About</h1>
            <div className={style.block}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ maxWidth: 700 }}
                    >
                        <div className={style.from}>
                            <div>
                                <Form.Item label="Name of Groom" name="husband_name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Name of Bride" name="wife_name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="About of Groom" name="husband_about" rules={[{ required: true }]}>
                                    <Input.TextArea maxLength={150} rows={3} />
                                </Form.Item>
                                <Form.Item label="About of Bride" name="wife_about" rules={[{ required: true }]}>
                                    <Input.TextArea maxLength={150} rows={3} />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Groom's photo"
                                    name="husband_img"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    rules={[{ required: true }]}
                                >
                                    <Upload {...uploadProps(husbandFileList, setHusbandFileList)}>
                                        {husbandFileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                                <Form.Item
                                    label="Bride's photo"
                                    name="wife_img"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    rules={[{ required: true }]}
                                >
                                    <Upload {...uploadProps(wifeFileList, setWifeFileList)}>
                                        {wifeFileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item style={{ marginLeft: "50%" }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        </>
    );
};

export { A_B_a_G };