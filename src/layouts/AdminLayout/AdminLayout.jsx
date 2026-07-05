import Navbar from "../../components/Navbar/Navbar";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Navbar />
      <main className="admin-content">{children}</main>
    </div>
  );
}

export default AdminLayout;
