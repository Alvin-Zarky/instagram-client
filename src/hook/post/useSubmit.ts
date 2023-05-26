import { useAppSelector } from "../../app/hooks";
import { PostPartial } from "../../types/post";
import { useUpdateCommentPost, useUpdateLikePost } from "./useUpdatePost";

const useSubmit = () => {
  const { user: auth } = useAppSelector((state) => state.auth);
  const updatePostComment = useUpdateCommentPost();
  const updatePostLike = useUpdateLikePost();

  const onSubmitComment = (
    e: React.FormEvent<HTMLFormElement>,
    comment: string,
    id: number
  ): void => {
    e.preventDefault();

    const values = {
      id,
      comments: {
        id: auth?.id!,
        name: auth?.name!,
        email: auth?.email!,
        photo: auth?.photo!,
        comment,
      },
    };
    updatePostComment.mutate(values);
  };

  const onSubmitLikePost = (id: number, likesPost: PostPartial[]): void => {
    let values = {
      id,
      userId: auth?.id!,
      likes: [
        {
          id: auth?.id!,
          name: auth?.name!,
          email: auth?.email!,
          photo: auth?.photo!,
        },
      ],
    };

    updatePostLike.mutate(values);
  };

  return { onSubmitComment, onSubmitLikePost };
};

export { useSubmit };
