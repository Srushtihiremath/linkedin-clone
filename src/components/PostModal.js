import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { db, auth, storage } from "../firebase"; 
import { Timestamp } from "firebase/firestore";

import { postArticleAPI } from "../actions";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const postArticle = (e) => {
    console.log("post malone :🚀")
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      console.log("Hello")
        return;
    }

    const payload = {
        image: shareImage,
        video: videoLink,
        user: props.user,
        description: editorText,
        timestamp: Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e)
    
};
  const reset = (e) => {
    e.preventDefault();
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);// Close the modal if function is provided
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={reset}>
                <img src="/images/close.svg" alt="Close" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
              {props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                <img src="/images/user.svg" alt="User" />
              )}
                <span>{props.user.displayName}</span>
                 
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                ></textarea>
                { assetArea === 'image' ?
                <UploadImage>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                      <p>
                        <label htmlFor="file">Select an image to share</label>
                      </p>
                      {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                      </UploadImage>
                      :
                      assetArea === 'media' &&
                     <>
                     <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />

                            {videoLink && (
                              <ReactPlayer width="100%" url={videoLink} />
                            )}

                     </>
                }
                

              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/image.png" alt="Attach Image" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/play.png" alt="Attach Video" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/comment1.png" alt="Comment" /> Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                 disabled={!editorText ? true : false}
                 onClick={(event) => postArticle(event)}>
                Post
                </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    img {
      height: 40px;
      width: 40px;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-clip: content-box;
    border: 2px solid transparent;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  color: rgba(0, 0, 0, 0.5);
  img {
    width: 30px;
    height: 30px;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding: 8px 16px;
  background: #0a66c2;
  color: white;
  &:hover {
    background: #004182;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
`;
const UploadImage = styled.div`
   text-align:center;
   img{
    width:100%;
   }
`;

 const mapStateToProp = (state) => {
       return{
        user: state.userState.user,
      };
    };
    


  
const mapDisplayToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload))
});
export default connect(mapStateToProp, mapDisplayToProps)(PostModal);
 