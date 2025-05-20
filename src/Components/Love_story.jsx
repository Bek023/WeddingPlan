import {
    Modal,
    Table,
    Button,
    DatePicker,
    Form,
    Input,
    Upload,
    Image,
    message
} from 'antd';
import { DeleteOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useLoveStore, useModal, load } from '../Utils/zustand';
import { useEffect, useState } from 'react';
import moment from 'moment';

const { TextArea } = Input;

export const Love_story = () => {
    const [form] = Form.useForm();
    const { open, setOpen, closeOpen } = useModal();
    const { SetLoading, RemoveLoading } = load();
    const { Story, getStory, addStory, deleteStory } = useLoveStore();

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        getStory();
    }, []);

    const handleAdd = () => {
        SetLoading();
        form.validateFields().then(async (values) => {
            if (!values.img || values.img.length === 0) {
                message.error("Please upload an image.");
                RemoveLoading();
                return;
            }

            const date = values.date;
            const day = date.date();
            const monthName = date.format('MMMM');
            const year = date.year();

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('day', day);
            formData.append('month', monthName);
            formData.append('year', year);
            formData.append('img', values.img[0]?.originFileObj);
            console.log(values.img[0]?.originFileObj)

            const res = await addStory(formData);
            getStory();
            form.resetFields();
            setFileList([]);
            closeOpen();
            setTimeout(() => { RemoveLoading() }, 700);
            if (res) {
                message.success("Story added!");
            } else {
                message.error("Story not added!");
            }
        }).catch(() => {
            message.error("Story not added!");
            RemoveLoading();
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
            dataIndex: 'title',
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
                <Form form={form} layout="vertical">
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
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Select date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="img"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Upload an image' }]}
                    >
                        <Upload
                            name="img"
                            listType="picture-card"
                            beforeUpload={() => false} // Serverga avtomatik ketmasin
                            fileList={fileList}
                            onChange={({ fileList: newFileList }) => {
                                setFileList(newFileList);
                                form.setFieldsValue({ img: newFileList });
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
