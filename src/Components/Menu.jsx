import React, { useState } from 'react';
import { useComponents } from '../Utils/zustand';
import {
    MailOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
const Sidebar = () => {
    const { comp, setComp } = useComponents();
    const items = [
        { key: '1', icon: <PieChartOutlined />, label: 'Profile', onClick: () => setComp(0) },

        {
            key: 'sub1',
            label: 'Wedding Day',
            icon: <MailOutlined />,
            children: [
                { key: '2', label: 'Main', onClick: () => setComp(1) },
                { key: '3', label: 'Couple About', onClick: () => setComp(2) },
                { key: '4', label: 'Love story', onClick: () => setComp(3) },
                { key: '5', label: 'Gallery', onClick: () => setComp(4) },
                { key: '6', label: 'Meals', onClick: () => setComp(5) },
                { key: '7', label: 'Company', onClick: () => setComp(6) }
            ],
        },

    ];

    return (
        <div style={{  height: "100vh" , borderRight: "2px solid #FB62F6"}}>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="light"
                items={items}
                inlineCollapsed={true}
                style={{ height: '100%', borderRight: 0 }}
            />
        </div>
    );
};
export default Sidebar;