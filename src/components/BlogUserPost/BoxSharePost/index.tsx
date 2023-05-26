import React, { useRef, useState } from "react";
import HelmetTitleBar from "../../TitleBar";
import { DEFAULT_USER } from "../../../constant/images";
import "./box-share-post.scss";
import { useGetAllUser } from "../../../hook/user/useGetUser";
import { User } from "../../../types/authentication";
import Storage from "../../../utility/storage";

export default function BoxSharePost() {
  const [isCheck, setIsCheck] = useState(false);
  const inputCheck = useRef<HTMLInputElement | any>();

  const { data } = useGetAllUser();

  const onClick = () => {};
  return (
    <>
      <HelmetTitleBar title="Share - Instagram Clone" />
      <div className="box-share-post">
        <div className="box-header-post">
          <span>Share</span>
        </div>
        <div className="form-submission">
          <form>
            <input type="text" placeholder="Search..." />
          </form>
        </div>
        <div className="box-contain-user">
          <div className="user-friends">
            <span>Suggested</span>
            <div className="list-user-friends">
              {data?.map((val: User, ind: number) => (
                <div key={ind} className="user-flex-box" onClick={onClick}>
                  <div>
                    <img src={val.photo ?? DEFAULT_USER} alt="user" />
                    <span>{val.name}</span>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      ref={inputCheck}
                      onChange={(e) => {
                        setIsCheck(e.target.checked);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="button-submit">
          <button className="">Send</button>
        </div>
      </div>
    </>
  );
}
