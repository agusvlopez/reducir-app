import React from "react";
import NavbarWeb from "../../components/NavbarWeb";
import Footer from "../../components/Footer";
import MenuAdmin from "../../components/MenuAdmin";

const AdminLayout = ({ children, pageTitle }) => {
  return (
    <>
      <div className="h-full">
        <div className="p-4 mb-8">
          <h1 className="border-b-2 border-gray-500 pb-2 mb-4">{pageTitle}</h1>
          <MenuAdmin></MenuAdmin>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
