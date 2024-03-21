import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./pages/root.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import About from "./pages/about/About.jsx";
import Doctors from "./pages/doctors/Doctors.jsx";
import Services from "./pages/services/Services.jsx";
import Contacts from "./pages/contacts/Contacts.jsx";
import SignIn from "./pages/signIn/SingIn.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import InfoMainPage from "./components/InfoMainPage.jsx";
import AccountMainPage from "./pages/account/main_page/AccountMainPage.jsx";
import MyInformation from "./pages/account/my_information/MyInformation.jsx";
import MyPets from "./pages/account/my_pets/MyPets.jsx";
import DoctorsAppointment from "./pages/account/doctors_appointment/DoctorsAppointment.jsx";
import VisitHistory from "./pages/account/visit_history/VisitHistory.jsx";
import Payment from "./pages/account/payment/Payment.jsx";
import Feedback from "./pages/account/feedback/Feedback.jsx";
import {Provider} from "react-redux";
import {store} from "./store";
import {persistor} from "./store";
import Loading from "./components/Loading.jsx";
import {PersistGate} from "redux-persist/integration/react";

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
    {
        path: "account",
        element: <AccountMainPage/>,
        children: [
            {
                path: "info",
                element: <MyInformation/>,
            },
            {
                path: "my-pets",
                element: <MyPets/>,
            },
            {
                path: "appointment",
                element: <DoctorsAppointment/>,
            },
            {
                path: "visit-history",
                element: <VisitHistory/>,
            },
            {
                path: "payment",
                element: <Payment/>,
            },
            {
                path: "feedback",
                element: <Feedback/>,
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Loading />}>
                <RouterProvider router={router}></RouterProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
