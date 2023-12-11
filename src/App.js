import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaviBar from "./component/NaviBar";
import Footer from "./component/Footer";
import BasketPage from "./pages/BasketPage";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";
import MenuPage from "./pages/MenuPage";
import EnterPage from "./pages/EnterPage";
import ProfilePage from "./pages/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "./index";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { users } = useContext(Context);
  return (
    <div>
      <BrowserRouter className="wrapper">
        <NaviBar />
        <main className="main">
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/enter" element={<EnterPage />} />
            {users.loggedIn && (
              <Route path="/profile" element={<ProfilePage />} />
            )}
            <Route path="/basket" element={<BasketPage />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  );
});

export default App;
