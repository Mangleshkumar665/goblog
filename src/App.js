
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import CreatePost from './Pages/create-post/CreatePost';
import Home from './Pages/Home/Home';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/create-post' element={<CreatePost />} ></Route>
          
        </Routes>

      </Router>

    </>
  );
}

export default App;



