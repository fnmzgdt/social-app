import React, { useState } from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { writePost } from "../actions/action";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import GifIcon from "@material-ui/icons/Gif";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "608px",
    height: "auto",
    marginBottom: "16px",
    marginTop: "24px",
    padding: "8px 0 4px 0",
    borderColor: "#eee #ddd #bbb",
    borderStyle: "solid",
    borderWidth: "1px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "white",
  },
  container: {
    width: "100%",
    height: "100%",
    padding: "0 1.5rem",
    display: "flex",
    flexDirection: "row",
  },
  postContainer: {
    flexGrow: "1",
    padding: "4px 0",
  },
  textArea: {
    width: "calc(100% - 4px)",
    minHeight: "52px",
    border: "2px solid rgba(255,255,255,.5)",
    display: "flex",
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    height: "100%",
  },
  input: {
    width: "100%",
    fontSize: "20px",
    color: "#5B7083",
    fontWeight: "400",
    height: "24px",
    padding: "2px 0",
    border: "none",
    "&:focus": {
      outline: "none",
    },
  },
  public: {
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid gray",
  },
  buttonArea: {
    height: "52px",
    marginTop: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  random: {
    margin: "0",
  },
  submitButton: {
    padding: "10px 25px",
    backgroundColor: "rgba(0,136,169,0.6)",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease 0s",
    color: "white",
    fontFamily: "inherit",
    fontSize: "16px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "rgba(0,136,169,1)",
    },
  },
  searchBar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  giphyInput: {
    marginLeft: "2rem",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const PostWrite = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.id);

  const fileChange = (e) => {
    setImages((prevState) => [...prevState, ...e.target.files]);
  };
  console.log(images);
  const handleFileChange = () => {
    const imageInput = document.getElementById("uploadImage");
    imageInput.click();
  };

  const handleGiphyDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let i = 0; i < images.length; i++) {
      formdata.append("images", images[i]);
    }
    formdata.append("post", post);
    formdata.append("id", id);

    dispatch(writePost(formdata));
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.postContainer}>
          <div className={classes.textArea}>
            <div className={classes.inputWrapper}>
              <input
                placeholder="What is on your mind"
                className={classes.input}
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.public}></div>
          <div className={classes.buttonArea}>
            <div>
              <input
                type="file"
                name="images"
                multiple="multiple"
                id="uploadImage"
                onChange={fileChange}
                hidden="hidden"
              />
              <IconButton
                onClick={handleFileChange}
                style={{ color: "rgba(0,136,169,0.6)" }}
              >
                <InsertPhotoOutlinedIcon />
              </IconButton>
              <IconButton
                style={{ color: "rgba(0,136,169,0.6)" }}
                onClick={handleGiphyDialog}
              >
                <GifIcon />
              </IconButton>
              <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <div
                  style={{
                    width: "100%",
                    height: "800px",
                    backgroundColor: "white",
                  }}
                >
                  <Paper component="form" className={classes.searchBar}>
                    <InputBase
                      className={classes.giphyInput}
                      placeholder="Search Giphy"
                      inputProps={{ "aria-label": "search google maps" }}
                    />
                    <IconButton
                      type="submit"
                      className={classes.iconButton}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
              </Dialog>
            </div>
            <button
              className={classes.submitButton}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWrite;
