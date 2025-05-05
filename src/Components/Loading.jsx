import React from 'react';
import { Flex, Spin } from 'antd';
const Loading = () => (
    <div
        style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Yarim shaffof oq fon
            // backdropFilter: 'blur(5px)', // Orqa fonni xira qiladi
            // WebkitBackdropFilter: 'blur(5px)', // Safari qo'llab-quvvatlashi uchun
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }}
    >
        <Spin size="large" />
    </div>
);


export default Loading;