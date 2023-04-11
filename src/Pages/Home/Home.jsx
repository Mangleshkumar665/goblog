import Post from "./Post";
import MainScreen from "./MainScreen";
import Footer from "../../Components/Footer";



import {useSelector} from "react-redux";

const Home = (props) => {
  
  
  const post =  useSelector((state)=>{ return state.postList[0] || state.postList})
  

  return (
    <>
      
      <MainScreen  />
      
      <div className=" all-posts ">
        
        <div className="  my-2 d-flex justify-content-center align-items-center flex-column">
          
          {post?.map((post) => (
            
           <li key={post.id} className=" no-style"> <Post  post={post}  /> </li>
          ))}
        </div>
        
        <Footer style={{minHeight : "100vh"}}  />
      </div>
     
    </>
  );
};

export default Home;