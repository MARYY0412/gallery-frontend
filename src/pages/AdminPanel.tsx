import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlinePicture } from "react-icons/ai";
import ManageImages from "../components/admin/ManageImages";
import ManageUsers from "../components/admin/ManageUsers";
import styled from "styled-components";
function AdminPanel() {
  const [activeComponent, setActiveComponent] = useState("manage-images");

  const setManageUsersActive = () => {
    setActiveComponent("manage-users");
  };
  const setManageImagesActive = () => {
    setActiveComponent("manage-images");
  };

  return (
    <Box>
      <div className="render-nav">
        <div
          className={
            activeComponent === "manage-images"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={setManageImagesActive}
        >
          <AiOutlinePicture className="render-nav-link-icon" />
          <p>IMAGES</p>
        </div>
        <div
          className={
            activeComponent === "manage-users"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={setManageUsersActive}
        >
          <AiOutlineUserAdd className="render-nav-link-icon" />
          <p>USERS</p>
        </div>
      </div>
      <div className="render-nav-content">
        {activeComponent === "manage-images" && <ManageImages />}
        {activeComponent === "manage-users" && <ManageUsers />}
      </div>
    </Box>
  );
}

export default AdminPanel;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
