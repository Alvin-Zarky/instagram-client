import React, { useEffect } from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import { DEFAULT_USER } from "../../constant/images";
import BoxProfileStory from "../../components/BoxProfileStory";
import BoxUserSuggestion from "../../components/BoxUserSuggestion";
import { User } from "../../types/authentication";
import BlogUserPost from "../../components/BlogUserPost";
import { useGetAllUser } from "../../hook/user/useGetUser";
import { useGetAllPost } from "../../hook/post/useGetPost";
import { Post } from "../../types/post";
import { socket } from "../../config/socketIo";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./dashboard.scss";

export default function DashboardScreen({ profile }: { profile?: User }) {
  const { data } = useGetAllUser();
  const { data: post } = useGetAllPost();

  useEffect(() => {
    socket.connect();
    socket.on("post-data", (data: Post) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
      socket.off("post-data");
    };
  }, []);

  return (
    <>
      <HelmetTitleBar title="Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="side-dashboard-flex">
            <div className="left-side-dashboard">
              <div className="profile-story-slider">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={-30}
                  slidesPerView={7}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {data?.map((val: User, ind: number) => (
                    <SwiperSlide key={ind}>
                      <BoxProfileStory
                        key={ind}
                        title={val.name!}
                        image={val.photo!}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="box-all-scroll-post">
                <div className="blog-post">
                  {post?.map((val: Post, ind: number) => (
                    <BlogUserPost
                      key={ind}
                      id={val.id}
                      userId={val.userId}
                      username={val.user.name!}
                      createdAt={val.createdAt}
                      photo={val.media}
                      likes={val.likes}
                      comments={val.comments}
                      user={val.user.photo!}
                      description={val.text}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="right-side-dashboard">
              <div className="top-profile-user">
                <div className="box-image-user">
                  <img
                    src={profile?.photo ?? DEFAULT_USER}
                    alt="my-user-profile"
                  />
                  <div className="box-title-user">
                    <div className="top-title">
                      <span>{profile?.name}</span>
                    </div>
                    <div className="bottom-title">
                      <span>{profile?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="btn-switch">
                  <span>Switch</span>
                </div>
              </div>
              <div className="box-suggestion">
                <div className="box-header-bar">
                  <div>
                    <span>Suggestions for you</span>
                  </div>
                  <div className="btn-see-all">
                    <span>See All</span>
                  </div>
                </div>
                <BoxUserSuggestion username="alvin" user="lazyCherry" />
                <BoxUserSuggestion username="kenn" user="lazyCherry" />
                <BoxUserSuggestion username="fdken" user="lazyCherry" />
                <BoxUserSuggestion username="xinn" user="lazyCherry" />
                <BoxUserSuggestion username="kaithe" user="lazyCherry" />
              </div>
              <div className="dashboard-footer">
                <span>@2023 Instagram Clone developed by Alvin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
