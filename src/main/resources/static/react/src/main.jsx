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
import MyPets from "./pages/account/customer/my_pets/MyPets.jsx";
import DoctorsAppointment from "./pages/account/customer/doctor_appointment/DoctorsAppointment.jsx";
import VisitHistory from "./pages/account/customer/visit_history/VisitHistory.jsx";
import Payment from "./pages/account/customer/payment/Payment.jsx";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import Loading from "./components/Loading.jsx";
import {PersistGate} from "redux-persist/integration/react";
import NewDoctor from "./pages/account/administrator/new_doctor/NewDoctor.jsx";
import Statistics from "./pages/account/administrator/statistics/Statistics.jsx";
import MyAppointments from "./pages/account/doctor/my_appointments/MyAppointments.jsx";
import Return from "./pages/account/customer/payment/Return.jsx";
import CheckoutLink from "./pages/account/customer/payment/CheckoutLink.jsx";

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
                path: "new-doctor",
                element: <NewDoctor/>,
            },
            {
                path: "statistics",
                element: <Statistics/>,
            },
            {
                path: "my-appointments",
                element: <MyAppointments/>,
            },

            {
                path: "payment",
                element: <Payment/>,
            },
            {
                path: "return",
                element: <Return/>,
            },
        ]
    },
    {
        path: "checkout-page",
        element: <CheckoutLink/>,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.Fragment>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Loading/>}>
                <RouterProvider router={router}></RouterProvider>
            </PersistGate>
        </Provider>
    </React.Fragment>,
)
