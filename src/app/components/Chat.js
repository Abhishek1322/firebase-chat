import React from 'react'
import * as Images from "../../utilities/images"
const Chat = () => {
  return (
    <>
      <div className='modalContent'>
        <div className='searchbar flexBox'>
          <p className='searchtext'>Search Chef near you...</p>
          <img src={Images.searchbar} className='searchbarImg' alt='searchbar' />

        </div>
        <div className='chatModal  '>
          <img src={Images.userProfile} className='userprofile' alt='cartImg' />
          <div className='innermodal'>
            <p className='chefName'>Sarah Bergstrom</p>
            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
            <p className='chatTime'>Just Now</p>
          </div>
          <div className=''>
            <img src={Images.cartDelete} className='' alt='cartcancel' />
          </div>

        </div>
        <div className='chatModal '>
          <img src={Images.userProfile} className='userprofile' alt='cartImg' />
          <div className='innermodal'>
            <p className='chefName'>Hilda Herzog </p>
            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
            <p className='chatTime'>Just Now</p>
          </div>
          <div className=''>
            <img src={Images.cartDelete} className='' alt='cartcancel' />
          </div>

        </div>
        <div className='chatModal '>
          <img src={Images.userProfile} className='userprofile' alt='cartImg' />
          <div className='innermodal'>
            <p className='chefName'>Tom Stoltenberg</p>
            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
            <p className='chatTime'>Just Now</p>
          </div>
          <div className=''>
            <img src={Images.cartDelete} className='' alt='cartcancel' />
          </div>

        </div>
        <div className='chatModal '>
          <img src={Images.userProfile} className='userprofile' alt='cartImg' />
          <div className='innermodal'>
            <p className='chefName'>Sheryl Lowez</p>
            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
            <p className='chatTime'>Just Now</p>
          </div>
          <div className=''>
            <img src={Images.cartDelete} className='' alt='cartcancel' />
          </div>

        </div>
        <div className='chatModal '>
          <img src={Images.userProfile} className='userprofile' alt='cartImg' />
          <div className='innermodal'>
            <p className='chefName'>Olive Kuvalis</p>
            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
            <p className='chatTime'>Just Now</p>
          </div>
          <div className='cancel'>
            <img src={Images.cartDelete} className='' alt='cartcancel' />
          </div>

        </div>
      </div> 



    </>
  )
}

export default Chat