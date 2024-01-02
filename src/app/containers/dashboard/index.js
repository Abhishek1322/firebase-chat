import React, { useState, useEffect, useRef } from "react";


const AccountDashboard = () => {
   

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <>

          <h1>Dashboard</h1>
        </>
    )
}

export default AccountDashboard
