import { useState } from "react";
import Sidebar from "./Sidebar";
import { UpdatePasswordForm, UpdateProfileInfoForm } from ".";
import CreateDentistProfile from "./CreateDentistProfile";

export type ProfileViews = "profile" | "password" | "dentist-profile";

const Profile = () => {
  const [view, setView] = useState<ProfileViews>("profile");

  const onChangeView = (view: ProfileViews) => {
    setView(view);
  };

  const renderContent = () => {
    if (view === "profile") {
      return <UpdateProfileInfoForm />;
    }
    if (view === "password") {
      return <UpdatePasswordForm />;
    }
    if (view === "dentist-profile") {
      return <CreateDentistProfile />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentView={view} onChangeView={onChangeView} />

      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full max-w-md">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Profile;
