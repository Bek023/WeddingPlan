import { Button, Input, Modal, Table, message } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useModal } from '../Utils/zustand';
import { useRef, useState } from 'react';

export const Meals = () => {
    const { open, setOpen, closeOpen } = useModal();
    const newMeal = useRef();

    // 👉 Meals data state (shunday qilish kerak!)
    const [meals, setMeals] = useState([
        { key: 1, name: 'John Brown' },
        { key: 2, name: 'Jane Doe' },
    ]);

    // 🔑 Dynamic unique ID generator
    const nextKey = useRef(meals.length + 1);

    // ➕ Yangi meal qo‘shish
    const onFinish = () => {
        const value = newMeal.current.input.value.trim();
        if (value.length === 0) {
            message.warning('Input is empty');
            return;
        }
    
        setMeals(prev => [
            ...prev,
            { key: nextKey.current++, name: value }
        ]);
    
        handleClose(); // modal yopiladi va input tozalanadi
    };

    // ❌ Qatorni o‘chirish
    const handleDelete = (key) => {
        setMeals(prev => prev.filter(item => item.key !== key));
    };

    // 📊 Columnlar
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
    const handleClose = () => {
        closeOpen();
        if (newMeal.current) {
            newMeal.current.input.value = '';
        }
        return (
            <>
                <div>
                    <h1>Meals</h1>
                    <Button type="primary" onClick={setOpen}><PlusCircleOutlined /></Button>

                    <Modal
                        title="Add a meal"
                        open={open}
                        onOk={onFinish}
                        onCancel={handleClose}
                        okText="Add"
                    >
                        <Input placeholder="Add a meal" maxLength={25} ref={newMeal} />
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
