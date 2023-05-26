import React, { useEffect } from "react";
import { USER_PROFILE } from "../../../constant/images";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./side-mobile-menu.scss";
import { Link, NavLink } from "react-router-dom";
import { Router } from "../../../routers/route";
import ListMenuSide from "../../ListMenuSide";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import { RiChat1Fill } from "react-icons/ri";
import { RiChat1Line } from "react-icons/ri";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAppSelector } from "../../../app/hooks";
import {
  NotificationData,
  NotificationSideUi,
} from "../../../types/notification";
import { useGetAllNotification } from "../../../hook/notification/useGetNotification";
import moment from "moment";
import { socket } from "../../../config/socketIo";
import { useQueryClient } from "react-query";

export default function SideMobileMenu({
  isNotification,
  setIsNotification,
  setIsPopUp,
  isActive,
  setIsCreated,
  setIsActive,
}: NotificationSideUi) {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetAllNotification();

  const queryClient = useQueryClient();
  useEffect(() => {
    socket.connect();
    socket.on("notification", (value) => {
      if (value) {
        queryClient.refetchQueries(["getAllNotification"]);
      }
    });

    return () => {
      socket.disconnect();
      socket.off("notification");
      // queryClient.refetchQueries(["getAllNotification"]);
      console.clear();
    };
  }, [queryClient]);

  return (
    <>
      <div className="notification-side-bar">
        <div className="left-menu-mobile-side">
          <div className="mobile-icon-instagram">
            <NavLink to={`${Router.INDEX}`}>
              <InstagramIcon />
            </NavLink>
          </div>
          <div>
            <ul>
              <ListMenuSide
                link={Router.INDEX}
                title=""
                from={<HomeIcon />}
                to={<HomeOutlinedIcon />}
              />
              <ListMenuSide
                link={Router.EXPLORER}
                title=""
                from={<ExploreIcon />}
                to={<ExploreOutlinedIcon />}
              />
              <ListMenuSide
                link={Router.MESSAGE}
                title=""
                from={<RiChat1Fill />}
                to={<RiChat1Line />}
              />
              <div
                className={`${!isNotification && "normal"}`}
                onClick={() => {
                  setIsNotification(false);
                  setIsPopUp(false);
                }}
              >
                <ListMenuSide
                  link={`#`}
                  title=""
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
                  title=""
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
                title=""
                from={<AccountCircleIcon />}
                to={<AccountCircleOutlinedIcon />}
              />
            </ul>
          </div>
          <div></div>
        </div>
        <div className="right-menu-notification">
          <div className="span-title-bar">
            <span>Notification</span>
          </div>
          <div className="notification-today">
            <div className="title-bar">
              <span>All Activities</span>
            </div>
            {data?.map((val: NotificationData, ind: number) => (
              <Link key={ind} to={`${Router.NOTIFICATION}/${val.post.id}`}>
                <div className="data-activity" key={ind}>
                  <div className="flex-activity">
                    <div className="user-profile-photo">
                      <img src={val.user.photo ?? USER_PROFILE} alt="" />
                    </div>
                    <div>
                      <span>
                        <span className="user-name">{val.user.name}</span>{" "}
                        {val.activity}.{" "}
                        <span className="duration">
                          {moment(val.createdAt).fromNow()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="post-photo">
                    <img src={val.post.media![0]} alt="" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
