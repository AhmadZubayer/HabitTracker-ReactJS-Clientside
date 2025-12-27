import { createBrowserRouter } from 'react-router';
import Root from '../layout/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddHabit from '../pages/AddHabit';
import UpdateHabit from '../pages/UpdateHabit';
import MyHabits from '../pages/MyHabits';
import BrowseHabits from '../pages/BrowseHabits';
import HabitDetails from '../pages/HabitDetails';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../context/PrivateRoute';

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
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
        path: "/add-habit",
        element: <PrivateRoute><AddHabit /></PrivateRoute>
      },
      {
        path: "/update-habit/:id",
        element: <PrivateRoute><UpdateHabit /></PrivateRoute>
      },
      {
        path: "/my-habits",
        element: <PrivateRoute><MyHabits /></PrivateRoute>
      },
      {
        path: "/browse-habits",
        Component: BrowseHabits
      },
      {
        path: "/habit/:id",
        element: <PrivateRoute><HabitDetails /></PrivateRoute>
      }
    ]
  },
  {
    path: "*",
    Component: NotFound
  }
]);

export default Router;
