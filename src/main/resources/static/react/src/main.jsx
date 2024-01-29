import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./pages/root.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import About from "./pages/about/About.jsx";
import Doctors from "./pages/Doctors.jsx";
import Prices from "./pages/Prices.jsx";
import Contacts from "./pages/Contacts.jsx";
import SignIn from "./pages/signIn/SingIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import InfoMainPage from "./components/main/InfoMainPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <InfoMainPage/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/doctors",
                element: <Doctors/>,
            },
            {
                path: "/prices",
                element: <Prices/>,
            },
            {
                path: "/contacts",
                element: <Contacts/>,
            }
        ]
    },
    {
        path: "signin",
        element: <SignIn/>,
    },
    {
        path: "signup",
        element: <SignUp/>,
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
)
