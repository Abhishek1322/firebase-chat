import React from 'react'

const UserReportChat = () => {
    return (
        <>
            <div className='reportchatsection reportchatdrop_'>
                <h4 className='reportText_'>Are you sure, you want to report
                    Sarah Bergstrom?</h4>
                <div className="input-container mt-5">
                    <textarea type="" className="Reportborder-input " />
                    <label className="border-label">Give a reason</label>
                </div>
                <div className='orderItems_ flexBox justify-content-between modalfooterbtn'>
                    <button className='cancelOrder_' type='button' >Cance</button>
                    <button className='submitOrder_' type='button'>Yes, Report</button>
                </div>
            </div>
        </>
    )
}

export default UserReportChat