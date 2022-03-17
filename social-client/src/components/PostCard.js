import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PostContent from "./PostContent";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { postLike, removeLike } from "../actions/action";

const useStyles = makeStyles({
  root: {
    width: "598px",
    borderRadius: "8px",
    marginBottom: "16px",
    borderColor: "#eee #ddd #bbb",
    borderStyle: "solid",
    borderWidth: "1px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    height: "calc(100% - 24px)",
    flexDirection: "row",
    padding: "12px 16px",
  },
  imagePlaceholder: {
    flexBasis: "48px",
    marginRight: "12px",
    justifyContent: "center",
    display: "flex",
  },
  circle: {
    height: "48px",
    width: "48px",
    borderRadius: "50%",
    background: "orange",
  },
  content: {
    flexGrow: "1",
  },
  header: {
    display: "flex",
    height: "20px",
    marginBottom: "4px",
  },
  username: {
    margin: "0 10px 0 0 ",
    fontWeight: "700",
  },
  date: {
    margin: "0",
    fontWeight: "400",
    color: "#5B7083",
  },
  bodyText: {
    margin: "0 4px 0 0",
    fontSize: "15px",
    fontWeight: "400",
    color: "#0F1419",
  },
  bodyImage: {
    margin: "12px 0 0 0",
    width: "504px",
    overflow: "hidden",
    borderRadius: "16px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  image: {
    minWidth: "0",
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
  buttonArea: {
    height: "36px",
    width: "506px",
    display: "inline",
  },
  buttonRow: {
    maxWidth: "425px",
    marginTop: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: "#536471",
  },
  count: {
    padding: "0 12px",
    height: "20px",
    fontWeight: "400",
    color: "#536471",
  },
});

function Postcard({
  postId,
  username,
  content,
  date_added,
  imageUrl,
  userId,
  likeCount,
  liked,
}) {
  const classes = useStyles();

  const myId = useSelector((state) => state.user.id);

  const dispatch = useDispatch();

  const handleLike = () => {
    liked ? dispatch(removeLike(myId, postId)) : dispatch(postLike(myId, postId));
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.imagePlaceholder}>
          <div className={classes.circle} />
        </div>
        <div className={classes.content}>
          <div className={classes.header}>
            <p className={classes.username}>
              <Link
                to={`/user/${userId}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {username}
              </Link>
            </p>
            <p className={classes.date}>{date_added}</p>
          </div>
          <div className={classes.body}>
            <p className={classes.bodyText}>
              <PostContent content={content} />
            </p>
          </div>
          {imageUrl && (
            <div className={classes.bodyImage}>
              <img className={classes.image} src={imageUrl} alt={imageUrl} />
            </div>
          )}
          <div className={classes.buttonArea}>
            <div className={classes.buttonRow}>
              <div className={classes.iconContainer}>
                <IconButton onClick={handleLike}>
                  {liked ? (
                    <FavoriteIcon className={classes.icon} />
                  ) : (
                    <FavoriteBorderIcon className={classes.icon} />
                  )}
                </IconButton>
                <div className={classes.count}>{likeCount}</div>
              </div>
              <div className={classes.iconContainer}>
                <ModeCommentOutlinedIcon className={classes.icon} />
                <div className={classes.count}>Na</div>
              </div>
              <div className={classes.iconContainer}>
                <ModeCommentOutlinedIcon className={classes.icon} />
                <div className={classes.count}>Na</div>
              </div>
              <div className={classes.iconContainer}>
                <ModeCommentOutlinedIcon className={classes.icon} />
                <div className={classes.count}>Na</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postcard;
