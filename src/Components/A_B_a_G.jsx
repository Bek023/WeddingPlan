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

const formItemLayout = {
    labelCol: { xs: { span: 30 }, sm: { span: 50 } },
    wrapperCol: { xs: { span: 50 }, sm: { span: 20 } },
};

const normFile = e => Array.isArray(e) ? e : e?.fileList;

const A_B_a_G = () => {
    const [form] = Form.useForm();
    const {
        coupleData,
        getCoupleData,
        updateCoupleData,
    } = useCoupleStore();
    const { SetLoading, RemoveLoading } = load()
    useEffect(() => {
        SetLoading();
        getCoupleData();
    }, []);

    useEffect(() => {
        SetLoading();
        if (coupleData) {
            form.setFieldsValue({
                husband_name: coupleData.husband_name,
                wife_name: coupleData.wife_name,
                husband_about: coupleData.husband_about,
                wife_about: coupleData.wife_about
            });
        }
        RemoveLoading()
    }, [coupleData]);

    const handleSubmit = async (values) => {
        SetLoading();
        const payload = {
            ...values,
        };

        const success = await updateCoupleData(payload);
        if (success) message.success('Successfully updated');

        RemoveLoading();
    };

    const uploadProps = {
        beforeUpload: () => false,
        listType: 'picture',
        maxCount: 1,
    };

    return (
        <>
            <h1 className={style.title}>Couple About</h1>
            <div className={style.block}>

                <Form
                    {...formItemLayout}
                    form={form}
                    variant={'filled'}
                    style={{ maxWidth: 700 }}

                    onFinish={handleSubmit}
                >
                    <div className={style.from}>
                        <div>


                            <Form.Item label="Name of Groom" name="husband_name" rules={[{ required: true }]}>
                                <Input style={{ width: 200, height: 50, fontSize: 22 }} />
                            </Form.Item>
                            <Form.Item label="Name of Bride" name="wife_name" rules={[{ required: true }]}>
                                <Input style={{ width: 200, height: 50, fontSize: 22 }} />
                            </Form.Item>
                            <Form.Item label="About of Groom" name="husband_about" rules={[{ required: true }]}>
                                <Input.TextArea style={{ width: 200 }} maxLength={150} rows={3} placeholder='Max letters:150' />
                            </Form.Item>
                            <Form.Item label="About of Bride" name="wife_about" rules={[{ required: true }]}>
                                <Input.TextArea style={{ width: 200 }} maxLength={150} rows={3} placeholder='Max letters:150' />
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
                                    <Button icon={<UploadOutlined />}>Choose file</Button>
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
                                    <Button icon={<UploadOutlined />}>Choose file</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="Couple images"
                                name="couple_img"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{ required: true }]}
                            >
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Choose file</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </>
    );
};

export { A_B_a_G };
