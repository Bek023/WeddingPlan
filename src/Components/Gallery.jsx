import { useEffect, useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    Form,
    Upload,
    Button,
    message,
    Card,
    Image,
    Popconfirm,
    Row,
    Col,
} from 'antd';
import { useGallary } from '../Utils/zustand';

const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
};

export const Gallery = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const { gallaries, getGallaries, addGallary, deleteGallary } = useGallary();

    useEffect(() => {
        getGallaries();
    }, []);

    const handleChange = ({ fileList: newList }) => {
        setFileList(newList);
        form.setFieldsValue({ comp_img: newList });
    };

    const handleSubmit = async () => {
        if (fileList.length === 0) {
            return message.error("Please select at least one image to upload.");
        }
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) {
            return message.error("User not found!");
        }
        let file = [];
        for (let originFileObj of fileList) {      
            file.push(originFileObj);;
            if (!file) {
                return message.error("Invalid file upload!");
            }
            if (file.length === 2) {
                await addGallary(file);
                message.success("Images uploaded successfully!");
            }
        }
        setFileList([]);
        form.resetFields();
        getGallaries();
    };

    const handleDelete = async (id) => {
        await deleteGallary(id);
        message.success("Image deleted!");
        getGallaries();
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div style={{ padding: 40, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Card
                title="Gallery"
                style={{
                    maxWidth: 900,
                    margin: 'auto',
                    borderRadius: 10,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                }}
            >
                <p style={{ color: "red", marginBottom: 20 }}>
                    You can upload between 1 and 8 images at once.
                </p>

                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Upload Images"
                        name="comp_img"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Please upload at least one image' }]}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={handleChange}
                            maxCount={8}
                            multiple
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginTop: 10 }}>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            disabled={fileList.length === 0 || fileList.length > 8}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card
                title="Uploaded Images"
                style={{
                    maxWidth: 900,
                    margin: '40px auto 0',
                    borderRadius: 10,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                }}
            >
                <Row gutter={[16, 16]}>
                    {gallaries.map((img) => (
                        <Col xs={12} sm={8} md={6} key={img.id}>
                            <div style={{ position: 'relative' }}>
                                <Image
                                    src={img.couple_gallary}
                                    alt="gallery"
                                    width="100%"
                                    height={150}
                                    style={{ objectFit: 'cover', borderRadius: 10 }}
                                />
                                <Popconfirm
                                    title="Are you sure to delete this image?"
                                    onConfirm={() => handleDelete(img.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteOutlined
                                        style={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            color: 'red',
                                            fontSize: 20,
                                            backgroundColor: '#fff',
                                            borderRadius: '50%',
                                            padding: 4,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Popconfirm>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
};
