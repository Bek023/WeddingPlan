
import {
    Button,
    Form,
    Input,
    Radio,
    Image,
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

    const [form] = Form.useForm();
    const onFinish = values => {
        setComp(1);
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
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
            className={style.block}
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: null }]}
                onChange={onChangeUser}
            >
                <Input className='inp' />
            </Form.Item>

            <div className={style.info}>

                {user &&
                    (userData ? <p style={{ width: 200, background: 'white', marginTop: 15, textAlign: 'center' }}>✅{infoUsername}</p> : <p style={{ width: 200, background: 'white', marginTop: 15, textAlign: 'center' }}>❌{infoUsername}</p>)}
            </div>

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
                {feadback ? <p style={{ width: 200, background: 'white', marginTop: 15, textAlign: "center" }}>✅ {infoPassword}</p> : <p style={{ width: 200, background: 'white', marginTop: 15, textAlign: "center" }}>❌ {infoPassword}</p>}
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password className='inp' />
            </Form.Item>
                <Radio.Group name="radiogroup" defaultValue={1} style={{ marginLeft: 20 }} className={style.radio}
                options={[
                    {
                    value:"one",
                    label:(
                        <Image src={img1} width={100} height={100}  style={{ borderRadius: 10, marginRight: 10 }} />
                    )
                },
                    {
                    value:"two",
                    label:(
                        <Image src={img1} width={100} height={100}  style={{ borderRadius: 10, marginRight: 10 }} />
                    )
                },
                    {
                    value:"three",
                    label:(
                        <Image src={img1} width={100} height={100}  style={{ borderRadius: 10, marginRight: 10 }} />
                    )
                },
                    {
                    value:"four",
                    label:(
                        <Image src={img1} width={100} height={100}  style={{ borderRadius: 10, marginRight: 10 }} />
                    )
                },
                    {
                    value:"five",
                    label:(
                        <Image src={img1} width={100} height={100}  style={{ borderRadius: 10, marginRight: 10 }} />
                    )
                },
            ]}
                /> 
            <Form.Item {...tailFormItemLayout}>
                <Button htmlType="submit" >
                    Ro`yxatdan o`tish
                </Button>
            </Form.Item>
            <p style={{ marginLeft: "40%" }}> Agar accountingiz bo`lsa <span onClick={() => setComp(1)} style={{ cursor: 'pointer', textDecoration: "underline" }}>Tizimga kiring</span></p>

        </Form >

    );
};



export default SignUp;