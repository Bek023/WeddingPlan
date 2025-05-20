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


// user id 

let user = null;

// user data 

const useData = create((set) => ({

    data: null,
    getData: () => {
        user = JSON.parse(localStorage.getItem("user"));

        axios.get(`/user/${user.username}`)
            .then((response) => {
                set({ data: response.data });
            })
            .catch((error) => {
                console.log("getData error:", error);
            });
    },
    updateUser: async (newData) => {
        const formData = new FormData();
        formData.append("fullname", newData.fullname);
        formData.append("email", newData.email);
        formData.append("password", newData.password);
        formData.append("username", newData.username);

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


// Couple about

const useCoupleStore = create((set) => ({
    coupleData: null,

    getCoupleData: async () => {
        try {
            const res = await axios.get(`/about/${user.id}`);
            set({ coupleData: res.data.data });
        } catch (err) {
            console.error('Failed to fetch couple data:', err);
        }
    },

    updateCoupleData: async (data) => {
        const formData = new FormData();

        formData.append('user_id', user?.id);
        formData.append('husband_name', data.husband_name);
        formData.append('wife_name', data.wife_name);
        formData.append('husband_about', data.husband_about);
        formData.append('wife_about', data.wife_about);

        // Fayllarni qo'shish
        if (data.husband_img && data.husband_img[0]?.originFileObj) {
            formData.append('husband_img', data.husband_img[0].originFileObj);
        }
        if (data.wife_img && data.wife_img[0]?.originFileObj) {
            formData.append('wife_img', data.wife_img[0].originFileObj);
        }
        if (data.wife_img && data.wife_img[0]?.originFileObj) {
            formData.append('couple_img', data.wife_img[0].originFileObj);
        }

        try {
            const res = await axios.post('/couple-about', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            set({ coupleData: res.data.data });
            return true;
        } catch (err) {
            console.error('Failed to update couple data:', err);
            return false;
        }
    },
}));



// Loading
const load = create((set) => ({

    loadStatus: true,
    SetLoading: () => set({ loadStatus: true }),
    RemoveLoading: () => set({ loadStatus: false }),

}));







// Modal store
const useModal = create((set) => ({
    open: false,
    setOpen: () => set({ open: true }),
    closeOpen: () => set({ open: false }),
}));

// FOR meals
const useMealsStore = create((set) => ({
    meals: [],

    getMeals: async () => {
        try {
            const res = await axios.get(`/meal/${user.id}`);
            set({ meals: res.data.data || [] });
        } catch (error) {
            console.error("Failed to fetch meals", error);
            set({ meals: [] });
        }

    },

    addMeal: async ({ meal_name }) => {
        const user_id = user.id;
        try {
            const res = await axios.post(`/createmeal`, {
                meal_name,
                user_id,
            });

            set((state) => ({
                meals: Array.isArray(state.meals)
                    ? [...state.meals, res.data.data]
                    : [res.data.data],
            }));
        } catch (error) {
            console.error("Failed to create meal", error);
        }
    },

    deleteMeal: async (id) => {
        try {
            await axios.delete(`/delmeal/${id}`);
        } catch (error) {
            console.error(" Failed to delete meal", error);
        }
    },
}));



// For gallary


const useGallary = create((set) => ({
    gallaries: [],

    getGallaries: async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await axios.get(`/gallary/${user.id}`);
            set({ gallaries: res.data.data || [] });
        } catch (err) {
            console.error('Failed to fetch gallaries:', err);
            set({ gallaries: [] });
        }
    },

    addGallary: async (files) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const uploadedImages = [];

        for (let file of files) {
            const formData = new FormData();
            formData.append('image', file.originFileObj);
            formData.append('user_id', user?.id);

            try {
                const res = await axios.post('/creategall', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                uploadedImages.push(res.data.data);
            } catch (err) {
                console.error('Failed to upload image:', err);
            }
        }

        set((state) => ({
            gallaries: [...state.gallaries, ...uploadedImages],
        }));
    },

    deleteGallary: async (id) => {
        try {
            await axios.delete(`/delgall/${id}`);
            set((state) => ({
                gallaries: state.gallaries.filter((img) => img.id !== id),
            }));
        } catch (err) {
            console.error('Failed to delete gallary:', err);
        }
    },
}));

// for company

const useCompany = create((set) => ({
    Company: [],

    getCompany: async () => {
        try {
            const res = await axios.get(`company/${user.id}`);
            set({ Company: res.data.data || [] });
        } catch (err) {
            console.error('Failed to fetch companies:', err);
            set({ Company: [] });
        }
    },

    addCompany: async (formData) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            formData.append('user_id', user.id);

            const res = await axios.post('/createcomp', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            set((state) => ({
                Company: [...state.Company, res.data.data],
            }));
        } catch (err) {
            console.error('Failed to add company:', err);
        }
    },

    deleteCompany: async (id) => {
        try {
            await axios.delete(`/delcomp/${id}`);
            set((state) => ({
                Company: state.Company.filter((item) => item.id !== id),
            }));
        } catch (err) {
            console.error('Failed to delete company:', err);
        }
    },
}));


// FOR COUPLE STORY 
const useLoveStore = create((set) => ({
    Story: [],

    getStory: async () => {
        try {
            const res = await axios.get(`/story/${user.id}`);
            set({ Story: res.data.data || [] });
        } catch (err) {
            console.error('Failed to fetch Story:', err);
            set({ Story: [] });
        }
    },


    addStory: async (formData) => {
        try {
            formData.append('user_id', user.id);
            for (const [key, value] of formData) {
                console.log(`${key}: ${value}`);
            }

            const res = await axios.post('/couple-story', formData)

            set((state) => ({
                Story: [...state.Story, res.data.data],
            }));
        } catch (err) {
            console.error('Failed to add Story:', err);
        }
    },
    updateStory: async (formData) => {
        try {
            formData.append('user_id', user.id);

            const res = await axios.put('/couple-story', formData)

            set((state) => ({
                Story: [...state.Story, res.data.data],
            }));
        } catch (err) {
            console.error('Failed to add Story:', err);
        }
    },
    deleteStory: async (id) => {
        try {
            await axios.delete(`/couple-story/${id}`);
            set((state) => ({
                Story: state.Story.filter((item) => item.id !== id),
            }));
        } catch (err) {
            console.error('Failed to delete company:', err);
        }
    },
}));
export {
    load,
    useComponents,
    useAuthComponents,
    useModal,
    useData,
    useCoupleStore,
    useMealsStore,
    useGallary,
    useCompany,
    useLoveStore
};



/*
    for zustand
    create function for get a user data from api
    create a function for update a user data to api

*/
