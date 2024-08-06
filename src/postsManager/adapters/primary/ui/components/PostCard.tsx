import React, { useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Post } from "src/postsManager/core/domain/entities/Post";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useDeleteByIdUseCase } from "src/postsManager/core/application/usesCases/useDeletePostByIdUsesCase";
import { useUpdatePostByIdUseCase } from "src/postsManager/core/application/usesCases/useUpdatePostByIdUsesCase";
import { useSelector } from "react-redux";
import { RootState } from "src/postsManager/adapters/secondary/redux/store";
import { useGetCommentsByPostIdUsesCase } from "../../../../core/application/usesCases/useGetCommentsByPostIdUsesCase";

import * as styles from "./PostCard.module.css";

type PostCardProps = Post & {
  existActions?: boolean;
  setCountComments?: (countComments: number) => void;
};

const PostCard = ({ id, title, body, existActions, setCountComments }: PostCardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const deletePost = useDeleteByIdUseCase();
  const updatePost = useUpdatePostByIdUseCase();

  const { comments, isLoading, isError } = useGetCommentsByPostIdUsesCase(id);

  // const navigate = useNavigate();

  // const handleCharacterCardClick = useCallback(() => {
  //   navigate(`/post/${id.toString()}`);
  // }, [id, navigate]);

  useEffect(() => {
    if (!isLoading && !isError && comments) {
      setCountComments && setCountComments(comments.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, comments]);

  const handleDelete = useCallback(() => {
    deletePost(id);
  }, [deletePost, id]);

  const handleUpdate = useCallback(() => {
    updatePost({ id, title: "Title1", body: "body2", userId: user?.id });
  }, [updatePost, id, user?.id]);

  return (
    <div key={id} className={styles.card}>
      <div className={styles.card__details}>
        <span className={styles.card__title}>{title?.toUpperCase()}</span>
        <span className={styles.card__body}>{body}</span>
      </div>
      {existActions && (
        <div className={styles.card__actions}>
          <Button className={styles["card__action-item"]} label={t("crud.edit")} onClick={handleUpdate} />
          <Button className={styles["card__action-item"]} label={t("crud.delete")} onClick={handleDelete} />
          <Button
            className={styles["card__action-item"]}
            label={t("comments.button", { count: comments.length })}
            onClick={() => console.log("ver comentarios")}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
