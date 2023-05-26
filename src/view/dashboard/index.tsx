import React, { useEffect } from "react";
import HelmetTitleBar from "../../components/TitleBar";
import SideMenuBar from "../../components/SideMenuBar";
import { DEFAULT_USER, LOADING } from "../../constant/images";
import BoxUserSuggestion from "../../components/BoxUserSuggestion";
import BlogUserPost from "../../components/BlogUserPost";
import { useGetAllUser } from "../../hook/user/useGetUser";
import { Post } from "../../types/post";
import "./dashboard.scss";
import { useGetPostInifiniteScroll } from "../../hook/post/useGetPost";
import useAuthen from "../../hook/auth/useAuth";
import { useAppSelector } from "../../app/hooks";
import ProfileStorySlider from "../../components/ProfileStorySlider";

// { profile }: { profile: User }
export default function DashboardScreen() {
  // const {
  //   userProfileQuery: { data: user },
  // } = useAuthen();

  const { user: profile } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();

  // if (user) dispatch(authSignInAsync(user));

  // console.log("profile", profile);

  const {
    data: post,
    hasNextPage,
    // isLoading,
    fetchNextPage,
  } = useGetPostInifiniteScroll();

  // const { data: post } = useGetAllPost();
  // const { data } = useGetAllUser();
  // console.log(post);
  // console.log(data);

  // const { data: save } = useGetUserSavePost();
  // const {
  //   data: post,
  //   hasNextPage,
  //   isError,
  //   isLoading,
  //   fetchNextPage,
  // } = useInfiniteQuery(
  //   "repositories",
  //   ({ pageParam }) => getAllPostOnScroll(pageParam),
  //   {
  //     getNextPageParam: (lastPage: any, allPages: any) => {
  //       const maxPages = lastPage.dataCount / 5;
  //       const nextPage = allPages.length + 1;
  //       return nextPage <= maxPages ? nextPage : undefined;
  //     },
  //   }
  // );

  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   queryClient.refetchQueries(["userProfile"]);
  //   queryClient.refetchQueries(["getAllUser"]);
  //   // queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  //   // queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
  // }, [queryClient]);
  // useEffect(() => {
  //   socket.connect();
  //   socket.on("post-data", (data) => {
  //     if (data) {
  //       queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
  //       queryClient.refetchQueries(["getPostUser"]);
  //       queryClient.refetchQueries(["getUserSavePost"]);
  //     }
  //   });

  //   return () => {
  //     socket.disconnect();
  //     socket.off("post-data");
  //     console.clear();
  //   };
  // }, [queryClient]);

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const scrollEvent = event.target as Document;
      const { scrollHeight, scrollTop, clientHeight } =
        scrollEvent.scrollingElement as Element;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage]);
  const showLike = false;

  return (
    <>
      <HelmetTitleBar title="Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <div className="side-dashboard-flex">
            <div className="left-side-dashboard">
              <ProfileStorySlider />

              <div className="box-all-scroll-post">
                <div className="blog-post">
                  {post?.pages.map((page) =>
                    page?.data.map((val: Post, ind: number) => (
                      <BlogUserPost
                        key={ind}
                        id={val.id!}
                        userId={val.userId}
                        username={val.user!.name!}
                        createdAt={val.createdAt}
                        photo={val.media}
                        likes={val.likes}
                        comments={val.comments}
                        user={val.user!.photo!}
                        description={val.text}
                        saveBy={val.saveBy}
                        isHideLike={val.user?.isHideLike}
                        isShowLike={showLike}
                      />
                    ))
                  )}
                  {hasNextPage && (
                    <div className="loading-constructor">
                      <img src={LOADING} alt="loading" />
                    </div>
                  )}
                  {/* {post?.map((val: Post, ind: number) => (
                    <BlogUserPost
                      key={ind}
                      id={val.id!}
                      userId={val.userId}
                      username={val.user!.name!}
                      createdAt={val.createdAt}
                      photo={val.media}
                      likes={val.likes}
                      comments={val.comments}
                      user={val.user!.photo!}
                      description={val.text}
                      saveBy={val.saveBy}
                    />
                  ))} */}
                </div>
              </div>
            </div>
            <div className="right-side-dashboard">
              <div className="top-profile-user">
                <div className="box-image-user">
                  <img
                    src={profile?.photo ?? DEFAULT_USER}
                    style={{
                      borderRadius: "50px",
                      height: "53px",
                      width: "53px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
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
