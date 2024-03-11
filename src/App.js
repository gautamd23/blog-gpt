import Home from "./Components/Home";
import bgImg from "./assets/bg.jpg";
import Login from './Components/Login'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])
  return (
    <div className=" justify-center  bg-no-repeat bg-cover bg-center">
      {/* <img className=" absolute h-screen w-screen" src={bgImg}></img> */}
      <RouterProvider  router={appRouter}/>
    </div>
  );
}

export default App;
