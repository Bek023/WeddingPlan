import { create } from 'zustand';
import axios from './Axios';

// COMPONENT LIST 
import { UserProfile } from '../Components/UserProfile';
import { Main } from '../Components/Main';
import { A_B_a_G } from '../Components/A_B_a_G';
import { Meals } from '../Components/Meals';
import { Company } from '../Components/Company';
import { Love_story } from '../Components/Love_story';
import { Gallery } from '../Components/Gallery';




// Component Store
const componentList = [
    { id: 1, title: 'Profile', component: () => <UserProfile /> },
    { id: 2, title: 'Main', component: () => <Main /> },
    { id: 3, title: 'A_B_a_G', component: () => <A_B_a_G /> },
    { id: 4, title: 'Love_story', component: () => <Love_story /> },
    { id: 5, title: 'Gallery', component: () => <Gallery /> },
    { id: 6, title: 'Meals', component: () => <Meals /> },
    { id: 7, title: 'Company', component: () => <Company /> },

];


const useComponents = create((set) => ({
    comp: componentList[0],
    setComp: (index) => {
        if (componentList[index]) {
            set({ comp: componentList[index] });
        }
    },
    getAllComponents: () => componentList,
}));

// components for auth
import SignAbout from '../Components/SignAbout';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import { message } from 'antd';
import { data } from 'react-router-dom';

const authComponents = [
    { id: 1, title: 'About', component: () => <SignAbout /> },
    { id: 2, title: 'Login', component: () => <SignIn /> },
    { id: 3, title: 'SignUp', component: () => <SignUp /> },
];
const useAuthComponents = create((set) => ({
    comp: authComponents[0],
    setComp: (index) => {
        if (authComponents[index]) {
            set({ comp: authComponents[index] });
        }
    },
    getAllComponents: () => authComponents,
}));




// user data 

const useData = create((set, get) => ({

    data: null,
    getData: () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            console.warn("User topilmadi!");
            return;
        }

        axios.get(`/user/${user.username}`)
            .then((response) => {
                set({ data: response.data });
            })
            .catch((error) => {
                console.log("getData error:", error);
            });
    },
    updateUser: async (newData) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const formData = new FormData();
        formData.append("fullname", newData.fullname);
        formData.append("email", newData.email);
        formData.append("password", newData.password);
        formData.append("username", newData.username);
        for (const [key, value] of formData) {
            console.log(`${key}: ${value}\n`);
        };
        try {
            const response = await axios.put(`/updateuser/${user.id}`, formData);

            set({ data: response.data });
            message.success("Ma'lumotlar muvaffaqiyatli yangilandi!");
            return true;
        } catch (error) {
            console.error("updateUser xatolik:", error);
            message.error("Ma'lumotlarni yangilashda xatolik yuz berdi");
            return false;
        }
    }



}));




// Loading
const load = create((set, get) => ({

    loadStatus: true,
    SetLoading: () => set({ loadStatus: true }),
    RemoveLoading: () => set({ loadStatus: false }),

}));







// Modal store
const useModal = create((set, get) => ({
    open: false,
    setOpen: () => set({ open: true }),
    closeOpen: () => set({ open: false }),
}));




export {
    load,
    useComponents,
    useAuthComponents,
    useModal,
    useData
};



/*
    for zustand
    create function for get a user data from api
    create a function for update a user data to api

*/
