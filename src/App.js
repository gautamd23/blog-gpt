import Home from "./Components/Home";
import bgImg from "./assets/bg.jpg";

function App() {
  return (
    <div className=" justify-center  bg-no-repeat bg-cover bg-center">
      <img className=" absolute h-screen w-screen" src={bgImg}></img>
      <Home />
    </div>
  );
}

export default App;
