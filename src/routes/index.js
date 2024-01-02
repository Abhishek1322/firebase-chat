import { Route, Routes } from "react-router-dom";
import * as Containers from "../app/containers";
import * as Layouts from "../app/layouts";
import { useAuthSelector } from "../redux/selector/auth";

const Router = () => {
  const authData = useAuthSelector();

  return (
    <>
    
      <Routes>
        {/* USER_ROUTES */}
        <Route element={<Layouts.UserLayout />}>
          {authData?.userInfo?.role === "user" && (
            <Route path="/setting" element={<Containers.SettingMain />} />
          )}
          <Route path="/home-user" element={<Containers.HomeUser />} />
          <Route path="/chef-details" element={<Containers.ChefDetails />} />
          <Route path="/user-chef-home" element={<Containers.UserChefHome />} />
          <Route
            path="/user-order-home"
            element={<Containers.UserOrderHome />}
          />
          <Route
            path="/user-myprofile"
            element={<Containers.UserMyProfile />}
          />
          <Route
            path="/user-editprofile"
            element={<Containers.UserEditProfile />}
          />
           <Route
            path="/choose-location"
            element={<Containers.ChooseLocation />}
          />
        </Route>

        {/* CHEF_ROUTES */}
        <Route element={<Layouts.Chef_Layout />}>
          {authData?.userInfo?.role === "chef" && (
            <Route path="/setting" element={<Containers.SettingMain />} />
          )}

          <Route path="/chef-profile" element={<Containers.myprofile />} />
          <Route
            path="/edit-chef-profile"
            element={<Containers.EditProfile />}
          />
          <Route path="/new-booking" element={<Containers.NewBooking />} />
          <Route path="/menu" element={<Containers.Menu />} />
          <Route path="/home" element={<Containers.HomeRequsest />} />
       
          <Route path="/my-profile" element={<Containers.myprofile />} />
        
          <Route path="/order-details" element={<Containers.OrderDetails />} />
          <Route
            path="/anotherorder-detail"
            element={<Containers.AnotherOrderdetail />}
          />
          <Route path="/new-booking" element={<Containers.NewBooking />} />
          <Route path="/menu" element={<Containers.Menu />} />
          <Route path="/home" element={<Containers.HomeRequsest />} />
          <Route
            path="/booking-details"
            element={<Containers.BookingDetails />}
          />

          <Route path="/order-details" element={<Containers.OrderDetails />} />
          <Route
            path="/anotherorder-detail"
            element={<Containers.AnotherOrderdetail />}
          />
        </Route>

        {/* PUBLIC_ROUTES */}
        <Route element={<Layouts.AuthLayout />}>
          <Route path="/" element={<Containers.Login />} />
          <Route path="/choose-roles" element={<Containers.ChooseRoles />} />
          <Route path="/verification" element={<Containers.Verification />} />
          <Route
            path="/create-account/:role"
            element={<Containers.CreateAccount />}
          />

          <Route path="/setup-profile" element={<Containers.SetupProfile />} />
          <Route path="/request" element={<Containers.RequestPage />} />

          <Route
            path="/forgot-password"
            element={<Containers.ForgotPassword />}
          />
          <Route
            path="/recover-password"
            element={<Containers.Recoverpassword />}
          />
          <Route path="/enter-otp" element={<Containers.EnterOtp />} />
        </Route>

        {/* COMMON_ROUTES */}
        <Route element={<Layouts.CommonLayout />}>
          <Route
            path="/change-password"
            element={<Containers.ChangePassword />}
          />
          <Route
            path="/delete-account"
            element={<Containers.DeleteAccount />}
          />
          <Route path="/loading" element={<Containers.Loading />} />
          <Route path="/loading-page" element={<Containers.Loadingpage />} />
          <Route
            path="/account-deleted"
            element={<Containers.AccountDeleted />}
          />
          <Route
            path="/term-condition"
            element={<Containers.TermAndCondition />}
          />
          <Route path="/contactu-us" element={<Containers.Contactus />} />
          <Route
            path="/privacy-policy"
            element={<Containers.PrivacyPolicy />}
          />
          <Route path="/cart" element={<Containers.Cart />} />
          <Route path="/chat" element={<Containers.Chat />} />
          <Route path="/notification" element={<Containers.Notification />} />
          <Route
            path="/user-manageaddress"
            element={<Containers.UserManageAddress />}
          />
           <Route
            path="*"
            element={<Containers.PageNotFound />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
