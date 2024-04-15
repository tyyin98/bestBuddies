import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Login from "./pages/Login";

import ProtectedRoute from "./pages/ProtectedRoute";
import Nav from "./Components/Nav";
import AppLayout from "./pages/AppLayout";
// import SearchBar from "./Components/SearchBar"

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path=":id" element={<Update />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
