import axios from '../Utils/Axios';
import {
    Button,
    Form,
    Input,
    Radio,
    Image,
    message,
} from 'antd';
import { useState } from 'react';
import style from './Style/SignUp.module.css';
import users from '../Utils/data';
import img1 from '../assets/images/register-first-img.jpg';
import { useAuthComponents } from '../Utils/zustand';


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

let infoUsername = 'Username Mavjud';
const infoPassword = 'Parol 4tadan kam bulmasligi kerak!'





const SignUp = () => {
    const { setComp } = useAuthComponents();
    const [feadback, setFeadback] = useState(false);
    const [userData, setUserData] = useState(true);
    const [user, setUser] = useState(false);
    const { loadStatus, SetLoading, RemoveLoading } = load();

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        SetLoading();
        const payload = {
            username: values.username,
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            template_name: values.radiogroup
        };

        try {
            const response = await axios.post('/register', payload);
            console.log('Foydalanuvchi ro‘yxatdan o‘tdi:', response.data);
            setComp(1);
            RemoveLoading();
        } catch (error) {
            RemoveLoading();
            const msg = error.response?.data?.message || "Ro`yxatdan o`tish xatoligi!";
            message.error(msg);
            console.error('Ro‘yxatdan o‘tishda xatolik:', error.response?.data || error.message);
            

        }
    };
    const onChangePass = e => {
        const { value } = e.target;
        // const hasUpperCase = /[A-Z]/.test(value);
        // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const isTooShort = value.length < 4;
        const isTooLong = value.length > 20;

        if (!isTooShort && !isTooLong) {
            setFeadback(true);
        } else {
            setFeadback(false);
        }
    }
    const usernames = users.map(user => user.name);
    const onChangeUser = (e) => {
        const { value } = e.target;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const isTooShort = value.length < 5;
        const isTooLong = value.length > 15;

        const isValidFormat = !hasUpperCase && !hasSpecialChar && !isTooShort && !isTooLong;
        const isUnique = !usernames.includes(value);

        if (isValidFormat && isUnique) {
            setUserData(true);
        } else {
            setUserData(false);
        }
        setUser(true);
    };


    // console.log(form.getFieldValue('password'));

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ radiogroup: 'one' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
            className={style.block}
        >
            <Form.Item
                name="fullname"
                label="Full Name"
                rules={[{ required: true, message: 'Iltimos to‘liq ismingizni kiriting!' }]}
            >
                <Input className='inp' />
            </Form.Item>
            <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "username kiriting" }]}
                onChange={onChangeUser}
            >
                <Input className='inp' />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Bu E-mail xato!',
                    },
                    {
                        required: true,
                        message: 'Iltimos E-mailingizni kiriting!',
                    },
                ]}
            >
                <Input className='inp' />
            </Form.Item>


            <Form.Item
                name="password"
                label="Parol"
                rules={[
                    {
                        required: true,
                        message: 'Iltimos parol yarating!',
                    },
                ]}
                onChange={onChangePass}

            >
                <Input.Password className='inp' />
            </Form.Item>
            {feadback ? <p style={{ width: 200, background: 'white', marginTop: 15, textAlign: "center" }}>✅ {infoPassword}</p> : <p style={{ width: 200, background: 'white', marginTop: 15, textAlign: "center" }}>❌ {infoPassword}</p>}

            <Form.Item
                name="radiogroup"
                label="Shablon tanlang"
                rules={[{ required: true, message: 'Iltimos shablonni tanlang!' }]}
            >
                <Radio.Group
                    style={{ marginLeft: 20 }}
                    className={style.radio}
                    options={[
                        {
                            value: "one",
                            label: <Image src={img1} width={100} height={100} style={{ borderRadius: 10, marginRight: 10 }} />,
                        },
                        {
                            value: "two",
                            label: <Image src={img1} width={100} height={100} style={{ borderRadius: 10, marginRight: 10 }} />,
                        },
                        {
                            value: "three",
                            label: <Image src={img1} width={100} height={100} style={{ borderRadius: 10, marginRight: 10 }} />,
                        },
                        {
                            value: "four",
                            label: <Image src={img1} width={100} height={100} style={{ borderRadius: 10, marginRight: 10 }} />,
                        },
                        {
                            value: "five",
                            label: <Image src={img1} width={100} height={100} style={{ borderRadius: 10, marginRight: 10 }} />,
                        },
                    ]}
                />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button htmlType="submit" style={{ marginTop: 30 }}>
                    Ro`yxatdan o`tish
                </Button>
            </Form.Item>
            <p> Agar accountingiz bo`lsa <span onClick={() => setComp(1)} style={{ cursor: 'pointer', textDecoration: "underline" }}>Tizimga kiring</span></p>

        </Form >

    );
};
export default SignUp;