import React,{Suspense,lazy} from "react";
import { Route,Routes } from "react-router-dom";

import LoadingPage from "./pages/Loading";
import Navbar from "./pages/Navbar";
const Home = lazy(()=>import("./pages/Home"));
const Login = lazy(()=>import("./components/Login"))
const Signup = lazy(()=>import("./components/SignUp")); 
const DashBoard = lazy(()=>import("./components/Dashboard"))
const BlogWordStats = lazy(()=>import("./components/BlogWordStats"))

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Suspense fallback={<LoadingPage />} >
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashBoard/>}></Route>
          <Route path="/blog/stats" element={<BlogWordStats/>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
