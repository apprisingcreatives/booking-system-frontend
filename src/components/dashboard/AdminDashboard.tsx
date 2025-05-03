import { Card } from "../common";
import { menuLinks } from "./constant";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const renderMenuCards = () => {
    return (
      menuLinks &&
      Array.isArray(menuLinks) &&
      menuLinks.length > 0 &&
      menuLinks.map((menuLink) => (
        <Card key={menuLink.label}>
          <Link to={menuLink.link}>{menuLink.label}</Link>
        </Card>
      ))
    );
  };

  return (
    <div className="w-full max-w-7xl p-8 mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Admin Dashboard
      </h2>

      {renderMenuCards()}
    </div>
  );
};

export default AdminDashboard;
