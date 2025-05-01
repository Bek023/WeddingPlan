import { create } from 'zustand';
import axios from './Axios';

// COMPONENT LIST (kerak bo‘lsa ko‘paytirish mumkin)
// import { Profile } from '../Components/Profile';
// import { Main } from '../Components/Main';
// import { A_B_a_G } from '../Components/A_B_a_G';
// import { Meals } from '../Components/Meals';
// import { Company } from '../Components/Company';
// import { Love_story } from '../Components/Love_Story';
// import { Gallery } from '../Components/Gallery';




// // Component Store
// const componentList = [
//     { id: 1, title: 'Profile', component: () => <Profile /> },
//     { id: 2, title: 'Main', component: () => <Main /> },
//     { id: 3, title: 'A_B_a_G', component: () => <A_B_a_G /> },
//     { id: 4, title: 'Love_story', component: () => <Love_story /> },
//     { id: 5, title: 'Gallery', component: () => <Gallery /> },
//     { id: 6, title: 'Meals', component: () => <Meals /> },
//     { id: 7, title: 'Company', component: () => <Company /> },

// ];


// const useComponents = create((set) => ({
//     comp: componentList[0],
//     setComp: (index) => {
//         if (componentList[index]) {
//             set({ comp: componentList[index] });
//         }
//     },
//     getAllComponents: () => componentList,
// }));

// components for auth
import SignAbout from '../Components/SignAbout';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';

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



// User Token
const id = localStorage.getItem("userId");






// User data store
const useData = create((set, get) => ({
    data: null,
    getData: () => axios.get('/users').then((response) => {
        set({ data: response.data })
    }).catch((error) => {
        console.log(error);
    }),
    updateUser: async (newData) => {
        try {
            const response = await axios.patch(`/users/${id}`, newData);
            set({ data: response.data });
        } catch (error) {
            console.error(error);
        }
    },
    load: true,
    SetLoading: () => set({ load: true }),
    RemoveLoading: () => set({ load: false }),

}));







// Modal store
const useModal = create((set, get) => ({
    open: false,
    setOpen: () => set({ open: true }),
    closeOpen: () => set({ open: false }),
}));




export {
    useData,
    //  useComponents, 
    useAuthComponents,
    useModal
};



/*
    for zustand
    create function for get a user data from api
    create a function for update a user data to api

*/
