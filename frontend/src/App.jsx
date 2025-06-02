import { useEffect, useContext } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Home/Home";
import Profile from "./Components/profile/profile";
import PendingDonations from "./Components/admin/mypendingdonation/pendingdonation";
import Donation from "./Components/donation/donation";
import Previousdonation from "./Components/admin/myPreviousdonation/previousdonation";
import AdminDashboard from "./Components/admin/dashboard/dashboard";
import AgentDashboard from "./Components/agent/dashboard/dashboard";
import AllDonation from "./Components/admin/donor/alldonor";
import { ToastContainer } from "react-toastify";
import Agentdata from "./Components/admin/agent/agent";
// import AssignAgents from "./Components/admin/agent/assigenagent";
import PendingCollectionsagent from "./Components/agent/mypendingcollections/pendingcollection";
import PreviousCollectionsagent from "./Components/agent/myPreviouscollections/previouscollection";
import CollectionDetails from "./Components/agent/collection";
import DonorDashboard from "./Components/donor/dashboard/dashboard";
import DonateForm from "./Components/donor/donate";
import DonorPendingDonations from "./Components/donor/mypendingdonation/pendingdonation";
import DonorPreviousDonations from "./Components/donor/myPreviousdonation/previousdonation";
import AcceptDonation from "./Components/admin/donor/Acceptdonation";
import RejectDonation from "./Components/admin/donor/Rejectdonation";
import AssignAgent from "./Components/admin/donor/assignagent";
import ColletDonation from "./Components/agent/collectdonate";
import CollectDonationagent from "./Components/agent/myPreviouscollections/collectbyagent";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./Components/Home/About";
import axios from "axios";

// import axios from "axios";
export default function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  //   const fetchUser = async () => {
  //     try {
  //         const res = await axios.get(
  //             "https://backend-food-amber.vercel.app/api/v1/user/getuser",
  //             {
  //                 withCredentials: true,
  //                 authorization: `Bearer ${localStorage.getItem("token")}`,
  //             }
  //         );
  //         setUser(res.data.user);
  //         setIsAuthorized(true);
  //     } catch (error) {
  //         console.log(error);
  //         setIsAuthorized(false);
  //     }
  // };
  //   useEffect(() => {
  //   isAuthorized &&fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token);
      try {
        const res = await axios.get(
          "https://backend-food-amber.vercel.app/api/v1/user/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data.user);
        setIsAuthorized(true);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  console.log(isAuthorized);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/admin/agent" element={<Agentdata />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/previousdonation"
            element={<Previousdonation />}
          />
          {/* <Route path="/admin/assignagent/:donationId" element={<AssignAgents />} />  */}
          <Route path="/admin/pendingdonation" element={<PendingDonations />} />
          <Route
            path="/admin/donation/view/:donationId"
            element={<AllDonation />}
          />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route
            path="/agent/pendingcollection"
            element={<PendingCollectionsagent />}
          />
          <Route
            path="/agent/previouscollection"
            element={<PreviousCollectionsagent />}
          />
          <Route
            path="/agent/collection/view/:collectionId"
            element={<CollectionDetails />}
          />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donate" element={<DonateForm />} />
          <Route
            path="/pending-donations"
            element={<DonorPendingDonations />}
          />
          <Route
            path="/previous-donations"
            element={<DonorPreviousDonations />}
          />
          <Route
            path="/admin/donation/accept/:donationId"
            element={<AcceptDonation />}
          />
          <Route
            path="/admin/donation/reject/:donationId"
            element={<RejectDonation />}
          />
          <Route
            path="/admin/donation/assign/:donationId"
            element={<AssignAgent />}
          />
          <Route
            path="/agent/collection/accept/:donationId"
            element={<ColletDonation />}
          />
          <Route
            path="/agent/collection/collect/:collectionId"
            element={<CollectDonationagent />}
          />
        </Routes>
        <Footer />
        {/* <Toaster />       */}
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}
