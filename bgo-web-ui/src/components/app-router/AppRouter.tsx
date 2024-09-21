import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/not-found/NotFound";
import MainLayout from "../main-layout/MainLayout";
import MyOlympics from "../../pages/my-olympics/MyOlympics";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="myolympics" element={<MyOlympics />} />
      </Route>
    </Routes>
  );
}
