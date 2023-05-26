import { createContext, useContext } from "react";
import { BlogPost } from "../types/post";

export const PostContext= createContext<BlogPost | null>(null)
export const usePostContext = () => useContext(PostContext)