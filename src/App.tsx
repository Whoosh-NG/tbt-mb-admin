import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import generalRoutes from "./Layout/Routes/GeneralRutes";
import dashboardRoutes from "./Layout/Routes/DashboardRoutes";
import DashboardLayout from "./Layout/DashboardLayout";
import NotFound from "./Pages/404/NotFound";
import AOS from "aos";
import useIdleTimeout from "./Hooks/useIdleTimeout";
import { useAuthHook } from "./Hooks/authHook";

const App = () => {
  // AOS animation
  useEffect(() => {
    AOS.init();
  }, [AOS]);

  const { logoutUser } = useAuthHook();
  useIdleTimeout(logoutUser, 300000);

  return (
    <main className="App">
      <Toaster position="top-center" />
      <Router>
        <Routes>
          {generalRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
          {dashboardRoutes.map((route, idx: number) => (
            <Route
              key={idx}
              path={route.path}
              element={<DashboardLayout>{route.element}</DashboardLayout>}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
