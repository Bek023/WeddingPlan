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
} from 'antd';
import { DeleteOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useCompany, useModal, load } from '../Utils/zustand';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const { TextArea } = Input;

export const Company = () => {
    const [form] = Form.useForm();
    const { open, setOpen, closeOpen } = useModal();
    const { SetLoading, RemoveLoading } = load();
    const { Company, getCompany, addCompany, deleteCompany } = useCompany();

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        getCompany();
    }, []);

    const handleAdd = () => {
        SetLoading();
        form.validateFields().then(async (values) => {
            const formData = new FormData();
            formData.append('comp_name', values.comp_name);
            formData.append('comp_desc', values.comp_desc);
            formData.append('comp_worked_date', values.comp_worked_date.format("YYYY-MM-DD"));
            formData.append('comp_img', values.comp_img[0].originFileObj);

            await addCompany(formData);
            getCompany();
            form.resetFields();
            setFileList([]);
            closeOpen();
            setTimeout(() => {
                RemoveLoading();
            }, 700);
            message.success("Company added!");
        });
    };

    const handleDelete = async (id) => {
        SetLoading();
        await deleteCompany(id);
        getCompany();
        setTimeout(() => {
            RemoveLoading();
        }, 700);
        message.success("Deleted successfully!");
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'comp_name',
        },
        {
            title: 'About',
            dataIndex: 'comp_desc',
        },
        {
            title: 'Logo',
            dataIndex: 'comp_img',
            render: (comp_img) => (
                <Image
                    src={`https://100m.uz/${comp_img}`}
                    width={70}
                    height={70}
                    alt="Company Logo"
                />
            ),
        },
        {
            title: 'Date',
            dataIndex: 'comp_worked_date',
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
                <h2>Companies</h2>
                <Button type="primary" onClick={() => setOpen()}>
                    <PlusCircleOutlined /> Add
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={Company}
                rowKey="id"
                style={{ marginTop: 20 }}
            />

            <Modal
                title="Add Company"
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
                        label="Company Name"
                        name="comp_name"
                        rules={[{ required: true, message: 'Enter company name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="About Company"
                        name="comp_desc"
                        rules={[{ required: true, message: 'Enter description' }]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Working Date"
                        name="comp_worked_date"
                        rules={[{ required: true, message: 'Select date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Logo Image"
                        name="comp_img"
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
