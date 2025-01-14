import Header from "./components/Header";
import Body from "./components/Body";
import Auction from "./components/Auction";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
