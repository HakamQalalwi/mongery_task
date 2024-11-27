import React from 'react';
import Navbar from "../Components/Navbar";
import OrdersTable from "../Components/OrderTableComponents/OrderTable";

function MainPage(props) {
    return (
        <>
            <Navbar />
            <OrdersTable />
        </>
    );
}

export default MainPage;