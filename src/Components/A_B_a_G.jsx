import React, { useEffect } from 'react';
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

    useEffect(() => {
        SetLoading();
        getCoupleData();
    }, []);
    useEffect(()=>{console.log(coupleData)},[coupleData])

    useEffect(() => {
        if (coupleData) {
            // Rasm bor bo‘lsa, uni Upload formatiga o‘tkazamiz
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

    const uploadProps = {
        beforeUpload: () => false,
        listType: 'picture-card',
        maxCount: 1,
    };

    return (
        <>
            <h1 className={style.title}>Couple About</h1>
            <div className={style.block}>
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
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="Bride's photo"
                                name="wife_img"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{ required: true }]}
                            >
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export { A_B_a_G };
