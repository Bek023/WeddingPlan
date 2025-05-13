
import { Button, Input, Modal, Table, message } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {  useState } from 'react';
import { useMealsStore, useModal, load } from '../Utils/zustand';


export const Meals = () => {
    const { open, setOpen, closeOpen } = useModal();
    const { meals, getMeals, addMeal, deleteMeal } = useMealsStore();
    const { SetLoading, RemoveLoading } = load();
    const [mealName, setMealName] = useState('');

    const onFinish = async () => {

        SetLoading();
        const value = mealName.trim();
        if (value.length === 0) {
            message.warning('Input is empty');
            return;
        }

        await addMeal({ meal_name: value });
        setMealName('');
        getMeals();
        handleClose();
        setTimeout(()=>{RemoveLoading()}, 700)
    };

    const handleClose = () => {
        setMealName('');
        closeOpen();
    };

    const handleDelete = async (id) => {
        SetLoading();
        await deleteMeal(id);
        getMeals();
        setTimeout(()=>{RemoveLoading()}, 700)
    };

    const columns = [
        {
            title: 'Meal Name',
            dataIndex: 'meal_name',
            key: 'meal_name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, meal) => (
                <a
                    onClick={() => handleDelete(meal.id)}
                    style={{ marginLeft: "50%", color: "red", fontSize: 22 }}
                >
                    <DeleteOutlined />
                </a>
            ),
        },
    ];

    return (
        <>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: 20 }}>
                <h1 style={{ margin: "0 0" }}>Meals</h1>
                <Button type="primary" onClick={setOpen} style={{ margin: "0 20px 0 0" }}>
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
                    rowKey="id"
                    style={{ maxWidth: 600 }}
                    size="middle"
                />
            </div>
        </>
    );
};
