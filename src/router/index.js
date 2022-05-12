import Vue from 'vue'
import VueRouter from "vue-router";
import Home from "@/Pages/Home";
import HomeWork from "@/Pages/HomeWork";
import WorkSchool from "@/Pages/PagesWork/WorkSchool";
import WorkFreelance from "@/Pages/PagesWork/WorkFreelance";
import WorkPerso from "@/Pages/PagesWork/WorkPerso"
import Doubleboggey from "@/Pages/Projects/Doubleboggey"
import About from "@/Pages/About";





Vue.use(VueRouter)

 export const router = new VueRouter({
    routes: [
        {path: '/',name: 'Home',component: Home},
        {path: '/HomeWork',name: 'HomeWork',component: HomeWork},
        {path: '/WorkSchool',name: 'WorkSchool',component: WorkSchool},
        {path: '/WorkFreelance',name: 'WorkFreelance',component: WorkFreelance},
        {path: '/WorkPerso',name: 'WorkPerso',component: WorkPerso},
        {path: '/Doubleboggey',name: 'Doubleboggey',component: Doubleboggey},
        {path: '/About',name: 'About',component: About},
    ]
})



