import React from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import "./notification.scss";
import BlogUserPost from "../../components/BlogUserPost";
import { useParams } from "react-router-dom";
import { UidMessageParam } from "../../types/util";
import { useGetSinglePost } from "../../hook/post/useGetSinglePost";

export default function NotificationScreen() {
  const { id } = useParams<UidMessageParam>();
  const { data } = useGetSinglePost(id);

  return (
    <>
      <HelmetTitleBar title="Notification - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="notification-detail">
            <div className="blog-post-detail">
              {data && (
                <BlogUserPost
                  id={data?.id!}
                  userId={data?.userId!}
                  username={data?.user!.name!}
                  createdAt={data?.createdAt!}
                  photo={data?.media!}
                  likes={data?.likes!}
                  comments={data?.comments!}
                  user={data?.user?.photo!}
                  description={data?.text!}
                  saveBy={data?.saveBy!}
                  isHideLike={data.user?.isHideLike}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
