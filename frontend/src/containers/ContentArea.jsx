import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function ContentArea() {
  return (
    <>
      <Header menus={[]} />
      <div className="container-fluid">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default ContentArea;
