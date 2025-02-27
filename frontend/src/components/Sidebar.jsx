import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery, Box, styled } from "@mui/material";
import data from "../data";

const StyledSidebar = styled(Sidebar)(({ theme }) => ({
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  overflowY: "auto",
  width: "250px",
  "& .ps-sidebar-container": {
    background: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  "& .ps-menu-button:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  "& .ps-menu-button.ps-active": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    zIndex: 1200,
  },
}));

const MenuToggleButton = styled("button")(({ theme }) => ({
  position: "fixed",
  right: 16,
  top: 16,
  zIndex: 1300,
  padding: 8,
  borderRadius: "50%",
  backgroundColor: "white",
  border: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("md")]: {
    position: "relative",
  },
}));

function sidebarTree(data, parent_id = null) {
  const tree = [];
  for (const item of data) {
    if (item.parent_id === parent_id) {
      const children = sidebarTree(data, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    }
  }
  return tree;
}

const generateMenuItems = (nodes) => {
  return nodes.map((node) => {
    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
      return (
        <SubMenu key={node.id} icon={<HomeOutlinedIcon />} label={node.name}>
          {generateMenuItems(node.children)}
        </SubMenu>
      );
    } else {
      return (
        <MenuItem key={node.id} icon={<PeopleOutlinedIcon />}>
          <Link
            to={`/${node.name.toLowerCase()}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "100%",
              display: "block",
            }}
          >
            {node.name}
          </Link>
        </MenuItem>
      );
    }
  });
};

const SidebarComponent = () => {
  const treeData = sidebarTree(data);
  const { collapseSidebar, toggleSidebar, toggled, broken } = useProSidebar();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      collapseSidebar(true);
      setIsCollapsed(true);
    } else {
      collapseSidebar(false);
      setIsCollapsed(false);
    }
  }, [isMobile, collapseSidebar]);

  const toggle = () => {
    toggleSidebar();
    if (toggled) {
      collapseSidebar();
    } else {
      collapseSidebar();
    }
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "150vh", position: "relative" }}>
      <StyledSidebar
        breakPoint="md"
        transitionDuration={400}
        backgroundColor="white"
        rtl={false}
        collapsed={isCollapsed}
      >
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={toggle}
            style={{
              textAlign: "center",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              marginBottom: 8,
            }}
          >
            {!isCollapsed && <h2>Property</h2>}
          </MenuItem>

          {generateMenuItems(treeData)}

          <LogoutMenuItem
            style={{
              position: "relative",
            }}
            icon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            {!isCollapsed && "Logout"}
          </LogoutMenuItem>
        </Menu>
      </StyledSidebar>

      {broken && (
        <MenuToggleButton onClick={toggle}>
          <MenuOutlinedIcon />
        </MenuToggleButton>
      )}
    </Box>
  );
};

export default SidebarComponent;
