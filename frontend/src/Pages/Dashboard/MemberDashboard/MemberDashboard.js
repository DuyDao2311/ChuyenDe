import React, { useContext } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { AuthContext } from "../../../Context/AuthContext";

function MemberDashboard() {
  const { user } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="dashboard-options active">
          <div className="dashboard-logo">
            <LibraryBooksIcon style={{ fontSize: 50 }} />
            <p className="logo-name">LCMS</p>
          </div>
          <p className="dashboard-option clicked">
            <AccountCircleIcon className="dashboard-option-icon" /> Thông tin cá nhân
          </p>
          <p className="dashboard-option" onClick={logout}>
            <PowerSettingsNewIcon className="dashboard-option-icon" /> Đăng xuất
          </p>
        </div>

        <div className="dashboard-option-content">
          <div className="member-profile-content">
            <div className="user-details-topbar">
              <img
                className="user-profileimage"
                src="./assets/images/Profile.png"
                alt=""
              ></img>
              <div className="user-info">
                <p className="user-name">{user?.name || "User"}</p>
                <p className="user-email">{user?.email}</p>
                <p className="user-id">{user?._id}</p>
              </div>
            </div>
            <p className="member-dashboard-heading">Chưa có dữ liệu giao dịch hiển thị</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
