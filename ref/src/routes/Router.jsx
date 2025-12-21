import { createBrowserRouter, redirect } from 'react-router';
import axios from 'axios';
import Root from '../layout/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import AllPlants from '../pages/AllPlants';
import PlantDetails from '../pages/PlantDetails';
import MyProfile from '../pages/MyProfile';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../context/PrivateRoute';

const Router = createBrowserRouter([{
    path: "/",
    Component: Root,
    children: [
        {
            index: true,
            loader: async () => {
                const res = await axios.get('/plants.json');
                return { plantData: res.data };
            },
            Component: Home
        },
        {
            path: "/login",
            Component: Login
        },
        {
            path: "/signup",
            Component: Signup
        },
        {
            path: "/forgot-password",
            Component: ForgotPassword
        },
        {
            path: "/allPlants",
            loader: async () => {
                const res = await axios.get('/plants.json');
                return { plantData: res.data };
            },
            Component: AllPlants
        },
        {
            path: "/plant/:id",
            loader: async ({ params }) => {
                const res = await axios.get('/plants.json');
                const plant = res.data.find((p) => p.plantId == params.id);
                if (!plant) {
                    return redirect('/plant-not-found');
                }
                return { plant };
            },
            element: <PrivateRoute><PlantDetails /></PrivateRoute>
        },
        {
            path: "/userProfile",
            element: <PrivateRoute><MyProfile /></PrivateRoute>
        },
        {
            path: "/plant-not-found",
            Component: NotFound
        },
        {
            path: "*",
            Component: NotFound
        }
    ]
}])

export default Router;