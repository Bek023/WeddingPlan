import {
    Modal,
    Table,
    Button,
    DatePicker,
    Form,
    Input,
    Upload,
    Image,
    message,
    InputNumber
} from 'antd';
import { DeleteOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useLoveStore, useModal, load } from '../Utils/zustand';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

export const Love_story = () => {
    const [form] = Form.useForm();
    const { open, setOpen, closeOpen } = useModal();
    const { SetLoading, RemoveLoading } = load();
    const { Story, getStory, addStory, deleteStory } = useLoveStore();

    const [fileList, setFileList] = useState([]);

    const handleAdd = () => {
        SetLoading();
        form.validateFields().then(async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('day', values.day);
            formData.append('month', values.month);
            formData.append('month', values.month);
            formData.append('img', values.img[0].originFileObj);

            await addStory(formData);
            getStory();
            form.resetFields();
            setFileList([]);
            closeOpen();
            setTimeout(() => { RemoveLoading() }, 700);
            message.success("Story added!");
        });
    };

    const handleDelete = async (id) => {
        SetLoading();
        await deleteStory(id);
        getStory();
        setTimeout(() => { RemoveLoading() }, 700);
        message.success("Deleted successfully!");
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title ',
        },
        {
            title: 'About',
            dataIndex: 'description',
        },
        {
            title: 'Image',
            dataIndex: 'img',
            render: (img) => <Image src={img} width={70} height={70} />,
        },
        {
            title: 'Day',
            dataIndex: 'day',
        },
        {
            title: 'Month',
            dataIndex: 'month',
        },
        {
            title: 'Year',
            dataIndex: 'year',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <DeleteOutlined
                    onClick={() => handleDelete(record.id)}
                    style={{ color: 'red', fontSize: 18, cursor: 'pointer' }}
                />
            ),
        },
    ];

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Love Stories</h2>
                <Button type="primary" onClick={() => setOpen()}>
                    <PlusCircleOutlined /> Add
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={Story}
                rowKey="id"
                style={{ marginTop: 20 }}
            />

            <Modal
                title="Add Story"
                open={open}
                onCancel={() => {
                    closeOpen();
                    form.resetFields();
                    setFileList([]);
                }}
                onOk={handleAdd}
                okText="Save"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Enter title' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Enter description' }]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Day"
                        name="day"
                        rules={[{ required: true, message: 'Select day' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Month"
                        name="month"
                        rules={[{ required: true, message: 'Select month' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Year"
                        name="year"
                        rules={[{ required: true, message: 'Select year' }]}
                    >
                        <InputNumber min={2000} max={2025}   />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="img"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Upload an image' }]}
                    >
                        <Upload
                            name="logo"
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={({ fileList: newFileList }) => {
                                beforeUpload: () => false,
                                    setFileList(newFileList);
                                form.setFieldsValue({ comp_img: newFileList });
                            }}
                            maxCount={1}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
