import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateTaskPage from "./pages/CreateTaskPage";
import AllTaskPage from "./pages/AllTaskPage";
import ProtectedRoute from "./ProtectedRoute";
import MyProjectsPage from "./pages/MyProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import InvitaionsPage from "./pages/InvitaionsPage";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-project"
            element={
              <ProtectedRoute>
                <CreateTaskPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-projects"
            element={
              <ProtectedRoute>
                <MyProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-project/:taskId"
            element={
              <ProtectedRoute>
                <ProjectDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <AllTaskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invitations"
            element={
              <ProtectedRoute>
                <InvitaionsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
