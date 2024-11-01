import Container from "./components/common/Container";
import Navbar from "./components/layout/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Home from "./components/pages/home/Home";
import Formations from "./components/pages/formations/Formations";
import FormationSearch from "./components/pages/formations/FormationSearch";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/profile/Profile";
import { useCheckUserLogin } from "./API/User";
import ShowFormation from "./components/pages/formations/ShowFormation";
import FormationRoom from "./components/pages/formationRoom/FormationRoom";
import Room from "./components/pages/formationRoom/Room";
import { useSelector } from "react-redux";
import EditFormation from "./components/pages/formations/editFormation/EditFormation.jsx";
import FormationHome from "./components/pages/formationHome/FormationHome.jsx";
import Admin from "./admin/Admin.jsx";
import AdminForm from "./admin/AdminForm";
import Visitor from "./components/pages/profile/Visitor.jsx";

export default function App() {
  useCheckUserLogin();
  const meeting = useSelector((state) => state.user.meeting);
  const admin = useSelector((state) => state.user.admin);
  return (
    <div className="App">
      <Router>
        <Container>
          {!meeting && <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginAdmin" element={<AdminForm />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute allowedRoles={["Student", "Teacher"]}>
                  <Visitor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["Student", "Teacher"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/formation/room/"
              element={
                <ProtectedRoute allowedRoles={["Student", "Teacher"]}>
                  <FormationRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/formation/room/:formationId/:codeRoom"
              element={
                <ProtectedRoute allowedRoles={["Student", "Teacher"]}>
                  <Room />
                </ProtectedRoute>
              }
            />
            <Route
              path="/formation/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["Teacher"]}>
                  <EditFormation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/formation/:id/:name"
              element={
                <ProtectedRoute allowedRoles={["Teacher", "Student"]}>
                  <FormationHome />
                </ProtectedRoute>
              }
            />

            <Route path="/contact/:destinationId/:name" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/formations/:search" element={<FormationSearch />} />
            <Route path="/formation/:id" element={<ShowFormation />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}
