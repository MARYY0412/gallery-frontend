import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo, reset } from "./store/slices/user_Slice";
import { fetchLoggedUserInfo } from "./utils/BackendMethods";
import { Title, SideBar, PrivateRoute, Footer } from "./components";
import pages from "./pages";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
//context
export const ThemeContext = createContext(null);

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>("light-theme");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchLoggedUserInfo();
      if (data !== "not logged") {
        dispatch(
          setUserInfo({
            username: data.username,
            email: data.email,
            ID: data.id,
            date_of_birth: data.date_of_birth,
            avatar: data.avatar,
            role: data.role,
          })
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
        dispatch(reset());
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={theme === "light-theme" ? "App light-theme" : "App dark-theme"}
    >
      <SideBar theme={theme} />
      <Title theme={theme} setTheme={setTheme} />
      {isLoading === true ? (
        <div>loading....</div>
      ) : (
        <main>
          <Routes>
            <Route
              path="/sessionExpired"
              element={<pages.SessionExpired theme={theme} />}
            />
            <Route
              path="/accessDenied"
              element={<pages.AccessDenied theme={theme} />}
            />
            <Route path="/" element={<pages.Home />} />
            <Route path="/login" element={<pages.Login />} />
            <Route path="/register" element={<pages.Register />} />
            <Route path="/forgot-password" element={<pages.ForgotPassword />} />
            <Route path="/Contact" element={<pages.Contact />} />
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/admin-panel" element={<pages.AdminPanel />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route
                path="/loggedUserProfile"
                element={<pages.LoggedUserProfile />}
              />
              <Route path="/yourGallery" element={<pages.YourGallery />} />
              <Route path="/user-messages" element={<pages.UserMessages />} />
            </Route>
            <Route path="/image/:imageID" element={<pages.ImagePage />} />
            <Route path="/user/:userID" element={<pages.UserProfile />} />
            <Route path="*" element={<pages.NotFound theme={theme} />} />
          </Routes>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default App;
