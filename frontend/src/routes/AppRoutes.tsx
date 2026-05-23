import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute.tsx";
import CreateMember from "../pages/CreateMember.tsx";
import EditMember from "../pages/EditMember.tsx";
import SearchMembers from "../pages/SearchMembers.tsx";
import MemberDetail from "../pages/MemberDetail.tsx";
import FamilyTreePage from "../pages/FamilyTreePage.tsx";
import GalleryPage from "../pages/GalleryPage.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="member/create/"
        element={
          <ProtectedRoute>
            <CreateMember />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members/edit/:id"
        element={
          <ProtectedRoute>
            <EditMember />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search/member"
        element={
          <ProtectedRoute>
            <SearchMembers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members/:id"
        element={
          <ProtectedRoute>
            <MemberDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members/tree/:id"
        element={
          <ProtectedRoute>
            <FamilyTreePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <GalleryPage />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}