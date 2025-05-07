import React, { useState } from 'react';
import style from './Style/A_B_a_G.module.css';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Upload,
    Select,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
const formItemLayout = {
    labelCol: {
        xs: { span: 30 },
        sm: { span: 50 },
    },
    wrapperCol: {
        xs: { span: 50 },
        sm: { span: 20 },
    },
};
const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e === null || e === void 0 ? void 0 : e.fileList;
};
const days = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`.padStart(2, '0'),
    value: i + 1,
}));
const A_B_a_G = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const uploadButton = (
        <button
            style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
            type="button"
        >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    return (
        <div className={style.block}>
            <h1>Couple About</h1>
            <Form
                {...formItemLayout}
                form={form}
                variant={'filled'}
                style={{ maxWidth: 700, height: 100 }}
                className={style.from}

            >


                <Form.Item label="Name of  Groom" name="husband_name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Name of  Bride" name="wife_name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="About of Groom"
                    name="husband_about"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="About of Bride"
                    name="wife_about"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <FormItem
                    label="To`y sanasining kuni"
                    name='wed_day'
                    rules={[{ required: true }]}
                >
                    <Select
                        options={days}
                        placeholder="Kunni tanlang"
                        style={{ width: 120 }}
                        onChange={(value) => console.log('Tanlangan kun:', value)}
                    />

                </FormItem>
                <Form.Item
                    label="To`y sanasining oyi"
                    name="DatePicker"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <DatePicker picker="month"/>
                </Form.Item>
                <Form.Item
                    label="To`y sanasining yili"
                    name="DatePicker"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <DatePicker picker="year"/>
                </Form.Item>

                <Form.Item label="Groom's photo" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true }]}>
                    <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={handleChange}
                        name="image"

                    >

                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label="Bride's photo" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true }]}>
                    <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={handleChange}
                        name="image"
                    >

                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export { A_B_a_G };