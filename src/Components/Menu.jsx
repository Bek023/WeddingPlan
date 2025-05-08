
import { useNavigate } from 'react-router-dom';
import { useComponents } from '../Utils/zustand';
import {
    MailOutlined,
    PieChartOutlined,
    LogoutOutlined ,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
const Sidebar = () => {
    const {  setComp } = useComponents();
    const navigate = useNavigate();
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
    function chiqish() {
        localStorage.removeItem("user");
        navigate('/sign');
    }
    return (
        <div style={{ height: "100vh", borderRight: "2px solid #FB62F6", background: "#fff", display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="light"
                items={items}
                inlineCollapsed={true}
             style={{  borderRight: 0 }}
            >

            </Menu>
            <Button onClick={chiqish} type="primary" danger style={{marginBottom: 30, width:50, height:50 ,padding:5, borderRadius:'50%', fontSize:30}}><LogoutOutlined /></Button>
            {/* <button onClick={chiqish} style={{marginBottom: 30, border:"none", padding:5, background:"red",color:"white", fontSize:20, borderRadius:15}} >Chiqish</button> */}
        </div>
    );
};
export default Sidebar;
