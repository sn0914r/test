import AdminPage from "./pages/AdminPage";
import AdminProductForm from "./admin/components/Routes/Form/ProductForm";
import AdminHistory from "./admin/components/Routes/History/History";
import NotFound from "./pages/NotFoundPage";

import { Route, Routes } from "react-router-dom"


function App() {
  return (
    <Routes>
      <Route path="/admin-page" element={<AdminPage />}>
        <Route path="add-product" element={<AdminProductForm/>} />
        <Route path="add-History" element={<AdminHistory/>} />
        {/* <Route path="Statistics" element={<div>Statistics Page</div>} /> */}
      </Route>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App
