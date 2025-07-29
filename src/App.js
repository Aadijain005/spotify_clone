// import './App.css';
import "./output.css";
import LoginComponent  from "./routes/Login";
import SignUPComponent from "./routes/SignUp"
import LoggedInHomeComponent from "./routes/LoggedInHome"
import { BrowserRouter,Routes ,Route } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import HomeComponent from "./routes/Home"
import UploadSong from "./routes/UploadSong"
function App() {

  const [cookie,setCookie] = useCookies(["token"]);
  // console.log(cookie.token);
  return (
      <BrowserRouter>
      <div className="w-screen h-screen font-poppins">
        {cookie.token ? (
          //Logged in routes
      <Routes>
        {/* Adding routes component here indicates to package (react-router-dom) that we are start to define our routes inside this*/}
        <Route path="/" element={<HelloComponent />} />
        <Route path="/home" element={<LoggedInHomeComponent />} />
        <Route path="/uploadSong" element={<UploadSong/>}/>
        <Route path="*" element={<Navigate to="/home"/>}/>
      </Routes>
        ):(
          //Logged out routes
        <Routes>
        <Route path="/login" element={<LoginComponent/>}/>
        <Route path="/signup" element={<SignUPComponent/>}/>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="*" element={<Navigate to="/login"/>}/>
     </Routes>
        )}
     </div>
      </BrowserRouter>
  );
}

const HelloComponent = () =>{
  return <div>Hello</div>
}
export default App;
