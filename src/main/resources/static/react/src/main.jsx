import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./pages/root.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import About from "./pages/about/About.jsx";
import Doctors from "./pages/doctors/Doctors.jsx";
import Services from "./pages/services/Services.jsx";
import Contacts from "./pages/contacts/Contacts.jsx";
import SignIn from "./pages/signIn/SingIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import InfoMainPage from "./components/InfoMainPage.jsx";

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
                path: "/services",
                element: <Services/>,
            },
            {
                path: "/contacts",
                element: <Contacts/>,
            }
        ]
    },
    {
        path: "authentication",
        element: <SignIn/>,
    },
    {
        path: "registration",
        element: <SignUp/>,
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
)
