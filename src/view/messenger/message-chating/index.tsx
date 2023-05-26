import React, { useState, useEffect, useRef } from "react";
import "./message-chating.scss";
import HelmetTitleBar from "../../../components/TitleBar";
import SideMenuBar from "../../../components/SideMenuBar";
import { useGetAllUser } from "../../../hook/user/useGetUser";
import { useAppSelector } from "../../../app/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { User } from "../../../types/authentication";
import { Router } from "../../../routers/route";
import { NavLink, useParams } from "react-router-dom";
import { TbPhoneCalling } from "react-icons/tb";
import { AiOutlineInfoCircle, AiFillInfoCircle } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineHeart } from "react-icons/ai";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { FilePreview, UidMessageParam } from "../../../types/util";
import useChatController from "../../../hook/chat/useChatController";
import { UserMessage } from "../../../types/message";
import { socket } from "../../../config/socketIo";
import { useQueryClient } from "react-query";
import { AiFillHeart } from "react-icons/ai";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { USER_PROFILE } from "../../../constant/images";
import useUploadFileChat from "../../../hook/chat/useUploadFileChat";
import { PRESET_KEY } from "../../../config/env";
import { uploadImage } from "../../../api/upload/uploadCloudinary";
import Storage from "../../../utility/storage";
import useAuthen from "../../../hook/auth/useAuth";

export default function MessageChating() {
  const { user } = useAppSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [filePreview, setFilePreview] = useState<FilePreview>({
    url: "",
    type: "",
    public_id: "",
  });
  const [isImgLoading, setIsImgLoading] = useState(false);

  const queryClient = useQueryClient();

  const { id } = useParams<UidMessageParam>();
  const inputMessageRef = useRef<HTMLInputElement | null>(null);
  const refVideo = useRef<HTMLVideoElement | null>(null);

  const {
    useCreateMessage,
    useGetUserMessage,
    useDeleteUserMessage,
    useDeleteAllUserMessage,
  } = useChatController();

  const {
    userProfileQuery: { data: auth },
  } = useAuthen();

  const { data: allMessages } = useGetUserMessage(id!);
  const { data } = useGetAllUser();

  // console.log(isError);
  // const { data: allUser } = useGetAllUser();

  const { uploadFileChat, urlImage, setUrlImage } = useUploadFileChat();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    useCreateMessage.mutate({ text: message, uid: id });
    setMessage("");
    setIsEmojiPicker(false);
  };
  const onSendEmojiHeart = () => {
    useCreateMessage.mutate({ text: "❤️", uid: id });
  };

  // useEffect(() => {
  //   socket.connect();
  //   socket.on("message", (value: UserMessage) => {
  //     if (value !== null) {
  //       // queryClient.invalidateQueries({ queryKey: ["getAllMessage"] });
  //       queryClient.invalidateQueries({ queryKey: ["getMessage", value.id] });
  //       // queryClient.refetchQueries(["getMessage", id]);
  //     }
  //   });

  //   return () => {
  //     socket.disconnect();
  //     socket.off("message");
  //     console.clear();
  //   };
  // }, [queryClient]);

  const userChat = data?.find((val: User) => val.uid === id);
  // const userChat = allUser?.find((val: User) => val.uid === id);

  const onHandleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    uploadFileChat(files, id);

    for (let val of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", val);
      formData.append("upload_preset", PRESET_KEY);

      setIsImgLoading(true);
      const data = await uploadImage(formData);
      if (data) {
        useCreateMessage.mutate(
          {
            text: {
              url: data.secure_url,
              public_id: data.public_id,
              type: data.resource_type,
            },
            uid: id,
          },
          {
            onSuccess: (data) => {
              setIsImgLoading(false);
              setUrlImage([]);
            },
          }
        );
      }
    }
  };

  const onPauseVideo = () => {
    isPopUp ? refVideo.current?.pause() : refVideo.current?.play();
  };

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
                                <p>Text Message...</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className="user-all-message-chat">
                  <div className="top-bar-dashboard-chat">
                    <div className="flex-dashboard-top-side">
                      <NavLink to={`${Router.ACCOUNT_USER}/${userChat?.name}`}>
                        <div
                          className="flex-left-side"
                          style={{
                            visibility: isDetail ? "hidden" : "visible",
                          }}
                        >
                          <div>
                            <img
                              src={userChat?.photo ?? USER_PROFILE}
                              alt="userProfile"
                            />
                          </div>
                          <div>
                            <span>{userChat?.name}</span>
                          </div>
                        </div>
                      </NavLink>
                      <div className="flex-right-side">
                        {!isDetail && (
                          <>
                            <TbPhoneCalling />
                            <HiOutlineVideoCamera />
                          </>
                        )}
                        {isDetail ? (
                          <AiFillInfoCircle
                            onClick={() => {
                              setIsDetail(false);
                            }}
                          />
                        ) : (
                          <AiOutlineInfoCircle
                            onClick={() => {
                              setIsDetail(true);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {isDetail && (
                    <>
                      <div className="body-bar-dashboard-chat">
                        <div className="body-bar-member">
                          <div className="title-bar">
                            <span>Members</span>
                          </div>
                          <NavLink
                            to={`${Router.ACCOUNT_USER}/${userChat?.name}`}
                          >
                            <div className="user-message-chat">
                              <div className="flex-user-message">
                                <div>
                                  <img src={userChat?.photo} alt="userImage" />
                                </div>
                                <div>
                                  <span>{userChat?.name}</span>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      </div>
                      <div className="footer-bar-member">
                        <ul>
                          {allMessages && (
                            <li
                              onClick={() => {
                                useDeleteAllUserMessage.mutate({ uid: id });
                                setIsDetail(false);
                              }}
                            >
                              <span>Delete Chat</span>
                            </li>
                          )}
                          <li>
                            <span>Block</span>
                          </li>
                          <li>
                            <span>Report</span>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                  {!isDetail && (
                    <>
                      <div className="body-bar-all-message">
                        <div className="container-chat-dashboard">
                          <div className="box-all-messages">
                            {allMessages?.map(
                              (val: UserMessage, ind: number) => (
                                <div
                                  key={ind}
                                  className="box-user-message"
                                  style={{
                                    justifyContent:
                                      val.uSendText === user?.id
                                        ? "right"
                                        : "left",
                                  }}
                                >
                                  <NavLink
                                    to={`${Router.ACCOUNT_USER}/${userChat?.name}`}
                                  >
                                    {val.uUser?.id !== user?.id && (
                                      <img src={val.uUser?.photo} alt="" />
                                    )}
                                  </NavLink>
                                  <div className="box-flex-tooltip">
                                    {val.uSendText === user?.id && (
                                      <div
                                        className="icon-tooltip"
                                        onClick={() => {
                                          useDeleteUserMessage.mutate({
                                            id: val.id,
                                            uid: id,
                                          });
                                        }}
                                      >
                                        <BackspaceIcon
                                          style={{
                                            transform: "rotate(180deg)",
                                            marginRight: "10px",
                                          }}
                                        />
                                      </div>
                                    )}
                                    {val.text.type === "image" ? (
                                      <div className="box-file-sending">
                                        <img
                                          src={val.text.url}
                                          alt=""
                                          onClick={() => {
                                            setIsPopUp(true);
                                            setFilePreview({
                                              url: val.text.url,
                                              type: val.text.type,
                                            });
                                          }}
                                        />
                                      </div>
                                    ) : val.text.type === "video" ? (
                                      <div className="box-file-sending">
                                        <video
                                          src={val.text.url}
                                          ref={refVideo}
                                          onClick={() => {
                                            setIsPopUp(true);
                                            onPauseVideo();
                                            setFilePreview({
                                              url: val.text.url,
                                              type: val.text.type,
                                            });
                                          }}
                                          controls
                                        />
                                      </div>
                                    ) : val.text === "❤️" ? (
                                      <div className="empty-box-message">
                                        <AiFillHeart />
                                      </div>
                                    ) : (
                                      <div className="box-message">
                                        <span>{val.text}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                            {isImgLoading &&
                              urlImage.map((val, ind) =>
                                val.type.startsWith("image") ? (
                                  <div
                                    className="box-user-message"
                                    style={{ justifyContent: "right" }}
                                    key={ind}
                                  >
                                    <div className="box-file-sending">
                                      <img src={val.url} alt="" />
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className="box-user-message"
                                    style={{ justifyContent: "right" }}
                                    key={ind}
                                  >
                                    <div className="box-file-sending">
                                      <video src={val.url} />
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                        <div className="box-input-message">
                          <form onSubmit={onSubmit}>
                            {isEmojiPicker && (
                              <div className="emoji-picker">
                                <EmojiPicker
                                  searchDisabled={true}
                                  previewConfig={{ showPreview: false }}
                                  onEmojiClick={(e) => {
                                    setMessage((input) => input + e.emoji);
                                    inputMessageRef.current?.focus();
                                  }}
                                />
                              </div>
                            )}
                            <div
                              className="insertion-emoji"
                              onClick={() => {
                                setIsEmojiPicker((prev) => !prev);
                                inputMessageRef.current?.focus();
                              }}
                            >
                              <InsertEmoticonIcon />
                            </div>
                            <input
                              type="text"
                              value={message}
                              onChange={(e) => {
                                setMessage(e.target.value);
                                // setIsEmojiPicker(false);
                              }}
                              ref={inputMessageRef}
                              placeholder="Message..."
                            />
                            {!message && (
                              <div className="input-tooltip">
                                <label>
                                  <input
                                    type="file"
                                    onChange={onHandleChangeFile}
                                    accept="image/*,video/*"
                                    multiple
                                  />
                                </label>
                                <AiOutlineHeart onClick={onSendEmojiHeart} />
                              </div>
                            )}
                            {message && (
                              <button className="text-send">
                                <span>Send</span>
                              </button>
                            )}
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopUp && (
        <>
          <div
            className="pop-up-modal"
            onClick={() => {
              setIsPopUp(false);
            }}
          ></div>
          <div className="box-file-preview">
            {filePreview.type === "image" ? (
              <img src={filePreview.url} alt="" />
            ) : (
              <video src={filePreview.url} autoPlay controls />
            )}
          </div>
        </>
      )}
    </>
  );
}
