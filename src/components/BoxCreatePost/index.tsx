import React, { useState } from "react";
import "./box-create-post.scss";
import HelmetTitleBar from "../TitleBar";
import { IMG_ADD_POST, LOADING } from "../../constant/images";
import { ValuesCreatePost } from "../../types/post";
import { BsArrowLeft } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";
import { GoLocation } from "react-icons/go";
import { SlArrowDown } from "react-icons/sl";
import ImageDisplay from "../ImageDisplay";
import { useCreatePost } from "../../hook/post/useCreatePost";
import { ClosePopUpFunc } from "../../types/util";

export default function BoxCreatePostBlog({ closePopUp }: ClosePopUpFunc) {
  const [files, setFiles] = useState<any[]>([]);
  const [urlImage, setUrlImage] = useState<any[]>([]);
  const [isReadyToPost, setIsReadyToPost] = useState<ValuesCreatePost>({
    isReady: false,
    fileLength: 0,
  });
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const { isReady } = isReadyToPost;
  const createPost = useCreatePost();

  const onHandleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;
    if (file.length > 0) {
      Array.from(file).forEach((val: any, ind: number) => {
        setFiles((prev: any) => {
          return [...prev, { url: URL.createObjectURL(val), type: val.type }];
        });

        const reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onloadend = () => {
          setUrlImage((data: any) => [
            ...data,
            { url: reader.result, type: val.type },
          ]);
        };
      });
      setIsReadyToPost({
        isReady: true,
        fileLength: file.length,
      });
    }
  };

  const onClickSharePost = () => {
    const values = {
      text: caption,
      media: urlImage,
    };
    createPost.mutate(values, {
      onSuccess: (data) => {
        setIsReadyToPost({ isReady: false });
        closePopUp();
      },
    });
  };

  return (
    <>
      <HelmetTitleBar title="Create new post - Instagram Clone" />
      {!isReady ? (
        <>
          <div className="container-create-box-post">
            <div>
              <div className={`top-overview-create-post`}>
                <span>Create new post</span>
              </div>
              <div className="body-overview-create-post">
                <div className="image-add-post">
                  <img src={IMG_ADD_POST} alt="img-add-post" />
                </div>
                <div className="title-create-post">
                  <span>Drag photos and videos here</span>
                </div>
                <div className="button-create-post">
                  <input
                    type="file"
                    onChange={onHandleChangeFile}
                    accept="image/*,video/*"
                    multiple
                  />
                  <button>Select from computer</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`container-create-box-post ${isReady && "resize-width"}`}
          >
            <div>
              <div className={`top-overview-create-post `}>
                <div className="flex-column-post">
                  <div
                    onClick={() => {
                      setIsReadyToPost({ isReady: false });
                      setFiles([]);
                      setUrlImage([]);
                    }}
                  >
                    <BsArrowLeft />
                  </div>
                  <div>
                    <span>Create new post</span>
                  </div>
                  {!createPost.isLoading && (
                    <div className="share-content" onClick={onClickSharePost}>
                      <span>Share</span>
                    </div>
                  )}
                  {createPost.isLoading && (
                    <div className="share-content">
                      <img src={LOADING} alt="loading" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex-body-post">
                <div className="pic-image-slider">
                  <ImageDisplay media={files} />
                </div>
                <div className="content-post-side">
                  <div className="top-header-post-side">
                    <img src={user?.photo} alt="user" />
                    <span>{user?.name}</span>
                  </div>
                  <div className="body-text-area">
                    <textarea
                      placeholder="Write a caption..."
                      value={caption}
                      onChange={(e) => {
                        setCaption(e.target.value);
                      }}
                      required
                    ></textarea>
                  </div>
                  <div className="body-bottom-post-side">
                    <div className="add-features">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                        placeholder="Add Location"
                      />
                      <GoLocation />
                    </div>
                    <div className="add-features">
                      <span>Accessibility</span>
                      <SlArrowDown />
                    </div>
                    <div className="add-features">
                      <span>Advanced settings</span>
                      <SlArrowDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
