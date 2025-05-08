import { Button, Input, Modal, Table, message } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useModal } from '../Utils/zustand';
import { useRef, useState } from 'react';

export const Meals = () => {
    const { open, setOpen, closeOpen } = useModal();

    const [meals, setMeals] = useState([
        { key: 1, name: 'John Brown' },
        { key: 2, name: 'Jane Doe' },
    ]);

    const [mealName, setMealName] = useState('');
    const nextKey = useRef(meals.length + 1);

    const onFinish = () => {
        const value = mealName.trim();
        if (value.length === 0) {
            message.warning('Input is empty');
            return;
        }

        setMeals(prev => [
            ...prev,
            { key: nextKey.current++, name: value }
        ]);

        setMealName('');
        handleClose();
    };

    const handleClose = () => {
        setMealName('');
        closeOpen();
    };

    const handleDelete = (key) => {
        setMeals(prev => prev.filter(item => item.key !== key));
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <a
                    onClick={() => handleDelete(record.key)}
                    style={{ marginLeft: "50%", color: "red", fontSize: 22 }}
                >
                    <DeleteOutlined />
                </a>
            ),
        },
    ];

    return (
        <>
            <div style={{display:"flex", width:"100%", justifyContent:"space-between", padding:20}}>
                <h1 style={{margin:"0 0"}}>Meals</h1>
                <Button type="primary" onClick={setOpen} style={{margin:"0 20px 0 0"}}>
                    <PlusCircleOutlined />
                </Button>

                <Modal
                    title="Add a meal"
                    open={open}
                    onOk={onFinish}
                    onCancel={handleClose}
                    okText="Add"
                >
                    <Input
                        placeholder="Add a meal"
                        maxLength={25}
                        value={mealName}
                        onChange={e => setMealName(e.target.value)}
                    />
                </Modal>
            </div>

            <div>
                <Table
                    columns={columns}
                    dataSource={meals}
                    style={{ maxWidth: 600 }}
                    pagination={false}
                />
            </div>
        </>
    );
};
