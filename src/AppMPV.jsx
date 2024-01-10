import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutPublic from "./layout/LayoutPublic";
import { SignUp, Login, ForgotPassword, ForForgotPassword, VerifyAccount } from "./pagesPublic/";

import { AuthProvider } from "./context/AuthProvider";
import { PatientsProvider } from "./context/PatientsProvider"

import LayoutPrivate from "./layout/LayoutPrivate";
import { PatientManager, EditPassword, EditProfile } from "./pagesPrivate"

const AppMPV = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path="/" element={ <LayoutPublic /> }>
              <Route index element={ <Login /> } />
              <Route  path="sign-up" element={ <SignUp /> } />
              <Route path="verify-account/:token" element={ <VerifyAccount /> } />
              <Route path="forgot-password" element={ <ForgotPassword /> }/>
              <Route path="change-password/:token" element={ <ForForgotPassword/> } />
            </Route>
              
              <Route path="/admin" element={<LayoutPrivate />}>
                <Route index element={ <PatientManager /> }/>
                <Route path="edit-profile" element={ <EditProfile /> }/>
                <Route path="edit-password" element={ <EditPassword /> } />
              </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppMPV