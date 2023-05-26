import React, { useEffect, useRef, useState } from "react";
import "./edit-profile.scss";
import { useAppSelector } from "../../app/hooks";
import { Row, Col } from "reactstrap";
import {
  useRemoveCurrentPhoto,
  useUpdateProfile,
} from "../../hook/profile/useUpdateProfile";
import PageAllProfile from "../../components/PageAllProfile";
import HelmetTitleBar from "../../components/TitleBar";
import { DEFAULT_USER } from "../../constant/images";
import useToggleBodyOverflow from "../../hook/util/useToggleBodyOverflow";
import { USER_PROFILE_IMG_LINK } from "../../constant/constant";
import useUploadImage from "../../hook/upload/useUploadImage";
import { PRESET_KEY } from "../../config/env";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebSite] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [isCheck, setIsCheck] = useState<any>("");
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const editProfile = useUpdateProfile();
  const removePhoto = useRemoveCurrentPhoto();
  const { uploadSingleImage } = useUploadImage();

  const onClick = () => {
    editProfile.mutate(
      {
        name: username,
        email,
        website,
        bio,
        photo: imgUrl || photo,
      },
      {
        onSuccess: () => {
          setUsername("");
          setEmail("");
        },
      }
    );
  };

  useToggleBodyOverflow(isShowPopUp);
  useEffect(() => {
    setWebSite(user?.links ?? "");
    setBio(user?.bio ?? "");
    setPhoto(user?.photo ?? "");
  }, [user]);

  const onHandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const formData = new FormData();

    if (!files) {
      setErrMessage("Please upload image!");
      setIsShowPopUp(false);
      return;
    }
    if (!files[0].type.startsWith("image")) {
      setErrMessage("Upload image only!");
      setIsShowPopUp(false);
      return;
    }

    formData.append("file", files[0]);
    formData.append("upload_preset", PRESET_KEY);

    uploadSingleImage.mutate(formData, {
      onSuccess: (data) => {
        setImgUrl(data?.secure_url!);
        setIsShowPopUp(false);
        setErrMessage("");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <HelmetTitleBar title="Edit Profile - Instagram Clone" />
      <PageAllProfile>
        <div className="title-overview">
          <span>Edit Profile</span>
        </div>
        <div className="body-overview">
          <div className="box-section-part">
            <Row className="flex-section">
              {errMessage && (
                <div className="box-custom-message">
                  <span>{errMessage}</span>
                </div>
              )}
              <Col xl="3" lg="3">
                <div className="left-flex-section">
                  <img src={user?.photo ?? DEFAULT_USER} alt="profile" />
                </div>
              </Col>
              <Col xl="9" lg="9">
                <div className="right-flex-section">
                  <div className="part-a">
                    <span>{user?.name}</span>
                  </div>
                  <div
                    className="part-b"
                    onClick={() => {
                      setIsShowPopUp(true);
                    }}
                  >
                    <span>Change profile photo</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="box-section-part">
            <Row className="flex-section">
              <Col xl="3" lg="3">
                <div className="left-flex-section">
                  <span>Username</span>
                </div>
              </Col>
              <Col xl="9" lg="9">
                <div className="right-flex-section">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    ref={usernameRef}
                    placeholder={user?.name}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="box-section-part">
            <Row className="flex-section">
              <Col xl="3" lg="3">
                <div className="left-flex-section">
                  <span>Email</span>
                </div>
              </Col>
              <Col xl="9" lg="9">
                <div className="right-flex-section">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                    placeholder={user?.email}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="box-section-part">
            <Row className="flex-section">
              <Col xl="3" lg="3">
                <div className="left-flex-section">
                  <span>Website</span>
                </div>
              </Col>
              <Col xl="9" lg="9">
                <div className="right-flex-section">
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebSite(e.target.value)}
                    placeholder="Website"
                  />
                  <div className="detail">
                    <span>
                      Editing your links is only available on mobile. Visit the
                      Instagram app and edit your profile to change the websites
                      in your bio.
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="box-section-part">
            <Row className="flex-section">
              <Col xl="3" lg="3">
                <div className="left-flex-section">
                  <span>Bio</span>
                </div>
              </Col>
              <Col xl="9" lg="9">
                <div className="right-flex-section">
                  <textarea
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  ></textarea>
                </div>
              </Col>
            </Row>
          </div>
          <div className="box-section-part">
            <Row className="flex-section">
              <Col xl="3" lg="3">
                <div className="left-flex-section">
                  <span>Show account suggestions on profiles</span>
                </div>
              </Col>
              <Col xl="9" lg="9">
                <div className="right-flex-section">
                  <div className="right-check">
                    <div>
                      <input
                        type="checkbox"
                        value={isCheck}
                        onChange={(e) => {
                          setIsCheck(e.target.checked);
                        }}
                        checked
                      />
                    </div>
                    <span>
                      Choose whether people can see similar account suggestions
                      on your profile, and whether your account can be suggested
                      on other profiles.[?]
                    </span>
                  </div>
                </div>
                <div className="btn-submit" onClick={onClick}>
                  <span>
                    {editProfile.isLoading ? "Submiting..." : "Submit"}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </PageAllProfile>
      {isShowPopUp && (
        <>
          <div
            className="pop-up-modal"
            onClick={() => {
              setIsShowPopUp(false);
            }}
          ></div>
          <div className="box-change-photo box-setting-config">
            <div className="box-title-overview">
              <span>Change Profile Photo</span>
            </div>
            <div className="box-list">
              <ul>
                <li className="text-bold-blue" onClick={() => {}}>
                  <div className="custom-file-upload">
                    {uploadSingleImage.isLoading
                      ? "Uploading..."
                      : "Upload Image"}
                  </div>
                  <input type="file" onChange={onHandleImage} />
                </li>
                {user?.photo !== USER_PROFILE_IMG_LINK && (
                  <li
                    className="text-bold"
                    onClick={() => {
                      removePhoto.mutate(undefined, {
                        onSuccess: () => {
                          setIsShowPopUp(false);
                        },
                      });
                    }}
                  >
                    {removePhoto.isLoading
                      ? "Removing..."
                      : "Remove Current Photo"}
                  </li>
                )}
                <li
                  onClick={() => {
                    setIsShowPopUp(false);
                  }}
                >
                  Cancel
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
