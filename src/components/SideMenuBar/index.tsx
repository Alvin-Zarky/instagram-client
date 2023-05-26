import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Router } from "../../routers/route";
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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LOGO_INSTAGRAM } from "../../constant/images";
import useAuthen from "../../hook/auth/useAuth";
import { TbSettings } from "react-icons/tb";
import { SlArrowRight } from "react-icons/sl";
import { FiLogOut, FiBookmark } from "react-icons/fi";
import { useAppSelector } from "../../app/hooks";
import useToggleBodyOverflow from "../../hook/util/useToggleBodyOverflow";
import BoxCreatePostBlog from "../BoxCreatePost";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import "./side-menu-bar.scss";
import SideMobileMenu from "./SideMobileMenu";

export default function SideMenuBar() {
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { logOutMutation } = useAuthen();

  useToggleBodyOverflow(isCreated || isPopUp);

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
            <div
              className={`${!isNotification && "normal"}`}
              onClick={() => {
                setIsNotification(true);
                setIsPopUp(true);
              }}
            >
              <ListMenuSide
                link={`#`}
                title="Notifcations"
                from={<FavoriteBorderIcon />}
                to={
                  isNotification ? (
                    <FavoriteOutlinedIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )
                }
              />
            </div>
            <div
              className={`${!isActive && "normal"}`}
              onClick={() => {
                setIsCreated(true);
                setIsActive(true);
              }}
            >
              <ListMenuSide
                link={`#`}
                title="Create"
                from={<AddCircleIcon />}
                to={
                  isActive ? (
                    <AddCircleIcon />
                  ) : (
                    <AddCircleOutlineOutlinedIcon />
                  )
                }
              />
            </div>
            <ListMenuSide
              link={`${Router.PROFILE}/${user?.name}`}
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
                  <NavLink to={Router.EDIT_PROFILE}>
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
      {isCreated && (
        <>
          <div
            className="pop-up-modal"
            style={{ zIndex: 250 }}
            onClick={() => {
              setIsCreated(false);
              setIsActive(false);
            }}
          ></div>
          <BoxCreatePostBlog
            closePopUp={() => {
              setIsCreated(false);
              setIsActive(false);
            }}
          />
        </>
      )}
      {isPopUp && (
        <>
          <div
            className="pop-up-modal"
            style={{ background: "transparent" }}
            onClick={() => {
              setIsPopUp(false);
              setIsNotification(false);
            }}
          ></div>
          <SideMobileMenu
            setIsActive={setIsActive}
            setIsCreated={setIsCreated}
            setIsNotification={setIsNotification}
            setIsPopUp={setIsPopUp}
            isActive={isActive}
            isNotification={isNotification}
          />
        </>
      )}
    </>
  );
}
