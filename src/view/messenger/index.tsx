import React from "react";
import "./messenger.scss";
import SideMenuBar from "../../components/SideMenuBar";
import HelmetTitleBar from "../../components/TitleBar";
import { IoIosArrowDown } from "react-icons/io";
import { useAppSelector } from "../../app/hooks";
import { SEND_CHAT } from "../../constant/images";
import { NavLink } from "react-router-dom";
import { Router } from "../../routers/route";
import { useGetAllUser } from "../../hook/user/useGetUser";
import { User } from "../../types/authentication";
import useChatController from "../../hook/chat/useChatController";
import { UserMessage } from "../../types/message";
import Storage from "../../utility/storage";
import useAuthen from "../../hook/auth/useAuth";

export default function MessengerScreen() {
  const { user } = useAppSelector((state) => state.auth);

  // const { useGetAllUserMessage, useGetUserMessage } = useChatController();
  // const { data: allUserMessage } = useGetAllUserMessage;

  const {
    userProfileQuery: { data: auth },
  } = useAuthen();
  const { data } = useGetAllUser();

  // const uid = data?.map((val: User) => val.uid);

  // console.log(allUserMessage);

  // console.log(chatLatest);

  // console.log(chatLatest);

  // uid?.forEach((val) => );
  // console.log(uid);
  // console.log(allUserMessage);

  return (
    <>
      <HelmetTitleBar title="Messenger - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="chat-box-size">
            <div className="box-container-message">
              <div className="flex-box-message">
                <div className="message-left-side">
                  <div className="top-header-message">
                    <span>{user?.name}</span>
                    <IoIosArrowDown />
                  </div>
                  <div className="body-message-chat">
                    {data?.map((val: User, ind: number) => (
                      <NavLink key={ind} to={`${Router.MESSAGE}/${val.uid}`}>
                        <div className="user-message-chat">
                          <div className="flex-user-message">
                            <div className="flex-item-list">
                              <div>
                                <img src={val.photo} alt="userImage" />
                              </div>
                              <div>
                                <span>{val.name}</span>
                                <p>Text messages...</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className="user-all-message-chat">
                  <div className="send-message-dashboard">
                    <div>
                      <div className="icon-send">
                        <img src={SEND_CHAT} alt="chat" />
                      </div>
                      <div className="title-page">
                        <span>Your Messages</span>
                      </div>
                      <div className="title-description">
                        <p>
                          Send private photos and messages to a friend or group.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
