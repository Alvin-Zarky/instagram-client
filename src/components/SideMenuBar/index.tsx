import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Router } from "../../routers/route";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import { RiChat1Fill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListMenuSide from "../../components/ListMenuSide";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { RiChat1Line } from "react-icons/ri";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LOGO_INSTAGRAM } from "../../constant/images";
import useAuthen from "../../hook/auth/useAuth";
import { TbSettings } from "react-icons/tb";
import { SlArrowRight } from "react-icons/sl";
import { FiLogOut, FiBookmark } from "react-icons/fi";
import "./side-menu-bar.scss";

export default function SideMenuBar() {
  const [togglePopUp, setTogglePopUp] = useState(false);
  const { logOutMutation } = useAuthen();

  return (
    <>
      <div className="left-menu-side">
        <div className="logo-side-menu">
          <NavLink exact to={Router.INDEX}>
            <img src={LOGO_INSTAGRAM} alt="logo-instagram" />
          </NavLink>
        </div>
        <div className="side-menu-bar">
          <ul>
            <ListMenuSide
              link={Router.INDEX}
              title="Home"
              from={<HomeIcon />}
              to={<HomeOutlinedIcon />}
            />
            <ListMenuSide
              link={Router.EXPLORER}
              title="Explore"
              from={<ExploreIcon />}
              to={<ExploreOutlinedIcon />}
            />
            <ListMenuSide
              link={Router.MESSAGE}
              title="Messages"
              from={<RiChat1Fill />}
              to={<RiChat1Line />}
            />
            <ListMenuSide
              link={Router.NOTIFICATION}
              title="Notifcations"
              from={<FavoriteIcon />}
              to={<FavoriteBorderOutlinedIcon />}
            />
            <ListMenuSide
              link={Router.CREATE}
              title="Create"
              from={<AddCircleIcon />}
              to={<AddCircleOutlineOutlinedIcon />}
            />
            <ListMenuSide
              link={Router.PROFILE}
              title="Profile"
              from={<AccountCircleIcon />}
              to={<AccountCircleOutlinedIcon />}
            />
          </ul>
        </div>
        {togglePopUp && (
          <div className="toggle-form-pop-up">
            <div className="list-menu-more">
              <ul>
                <li>
                  <NavLink to={Router.SETTINGS}>
                    <div>
                      <TbSettings />
                      <span>Settings</span>
                    </div>
                    <SlArrowRight className="svg-arrow" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={Router.SAVED}>
                    <div>
                      <FiBookmark />
                      <span>Saved</span>
                    </div>
                    <SlArrowRight className="svg-arrow" />
                  </NavLink>
                </li>
                <li
                  onClick={() => {
                    logOutMutation.mutate();
                  }}
                >
                  <div className="btn-logout">
                    <div>
                      <FiLogOut />
                      <span>Logout</span>
                    </div>
                    <SlArrowRight className="svg-arrow" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div
          className="drop-down-menu"
          onClick={() => {
            setTogglePopUp(!togglePopUp);
          }}
        >
          <RxHamburgerMenu />
          <span>More</span>
        </div>
      </div>
    </>
  );
}
