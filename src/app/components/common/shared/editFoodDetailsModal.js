import React from 'react'
import * as Images from "../../../../utilities/images"

const EditFoodDetailsModal = () => {
    return (
        <>
            <div className='editFoodDetailmenu'>
                <div className='menuModal_'>
                    <div className="input-container mt-5">
                        <input type="" className=" menuReport_button   " placeholder='Chicken Salad' />
                        <img src={Images.categoryImg} className='cateofyImg_' alt='categoryImg' />
                        <label className="border-label">Item Name</label>
                    </div>
                    <div className="input-container mt-4">
                        <input type="" className=" menuReport_button   " placeholder='Non-Veg' />
                        <img src={Images.menuDishImg} className='cateofyImg_' alt='menuDish'/>
                        <label className="border-label">Category</label>
                    </div>
                    <div className='flexBox justify-content-between editMenuFields_ '>
                        <div className="input-container mt-5">
                            <input type="" className=" menuEditbuttom " placeholder='22.00' />
                            <img src={Images.euroImg} className='cateofyImg_' alt='EuroImg' />
                            <label className="border-label">Price</label>
                        </div>
                        <div className="input-container mt-5 pe-3 flexBox">
                            <input type="" className=" menuEditbuttom " placeholder='45' />
                            <p className='inneredittxt'>MIN</p>
                            <img src={Images.clockImg} className='cateofyImg_'  alt='clockImg'/>
                            <label className="border-label">Delivery Time</label>
                        </div>
                    </div>
                </div>
                <div className="input-container mt-4">
                    <textarea type="" className=" menuReport_button  menuDescrition_  " placeholder='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' />
                    <label className="border-label">Description</label>
                </div>
                <div className='editImgBox_'>
                    <p className='chefName mt-4 pb-3'>Upload Image </p>
                    <img src={Images.editMenuImg} className='editFoodImg' alt='editMneuImg' />
                    <span className='cancelEditImg'>
                        <i className="fas fa-times cancelEdit"></i>
                    </span>
                </div>
                <button className='foodmodalbtn  modalfooterbtn mb-4'>
                    Save Changes
                </button>
            </div>
        </>
    )
}

export default EditFoodDetailsModal