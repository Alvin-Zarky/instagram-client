import React, { useRef, useState, useEffect } from "react";
import { customAxios } from "../lib/axiosConfig";
import { API_POST } from "../config/env";
import HelmetTitleBar from "../components/TitleBar";
import SideMenuBar from "../components/SideMenuBar";

function RefTesting() {
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const prevRef = useRef<string>("");

  const isMounted = useRef(true);
  useEffect(() => {
    inputRef.current?.focus();
    prevRef.current = comment;
  }, [comment]);

  useEffect(() => {
    if (isMounted.current) {
      fetchData();
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = async () => {
    const response = await customAxios.get(`${API_POST}`);
    const { data } = response.data;

    console.log(data);
    return data;
  };

  console.log(prevRef.current);
  return (
    <>
      <HelmetTitleBar title="Explore - Instagram Clone" />
      <div className="main-container-dashboard">
        <SideMenuBar />
        <div className="body-contain-dashboard">
          <span>A</span>
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            ref={inputRef}
          />
        </div>
      </div>
    </>
  );
}

export default RefTesting;
