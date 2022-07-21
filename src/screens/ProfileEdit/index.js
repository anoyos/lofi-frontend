import React, { useEffect, useState } from "react";
import { Link, useHistory  } from "react-router-dom";
import cn from "classnames";
import styles from "./ProfileEdit.module.sass";
import Control from "../../components/Control";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import Icon from "../../components/Icon";
import { connect, useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {
  createUser,
  findOne,
  updateById,
} from "../../store/actions/user.action";
import axios from "axios";
import ipfs from "../../ipfs";
import whitelist from '../../whitelist'

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Edit Profile",
  },
];

const ProfileEdit = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const [address, setAddress] = useState("");  
  const [selectedImage, setSelectedImage] = useState("");
  const [username, setUserName] = useState("");
  const [customeUrl, setCustomUrl] = useState("https://lofi-market.com/");
  const [bio, setBio] = useState("");
  const [portfoli, setPortfoli] = useState("");
  const [twitter, setTwitter] = useState("");
  const [preview, setPreview] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYouTube] = useState("");
  const [soundcloud, setSoundCloud] = useState("");
  const [spotify, setSpotify] = useState("");
  const [applemusic, setAppleMusic] = useState("");
  const [etsy, setEtsy] = useState("");
  const [tiktok, setTikTok] = useState("");
  const [twitch, setTwitch] = useState("");
  const [avatar, setAvatar] = useState("");
  const history = useHistory(); 
  
  const convertToBuffer = async(reader) => { 
    const buffer = await Buffer.from(reader.result);
    await ipfs.add(buffer, (err, ipfsHash) => {
      if (ipfsHash) {
        console.log("Uploading images ended.", ipfsHash)
        setSelectedImage(ipfsHash[0].hash);
      }
    });
  };

  const changeImage = (e) => { 
    if (e.target.files && e.target.files.length > 0) {
      e.stopPropagation();
      e.preventDefault();
      setPreview(URL.createObjectURL(e.target.files[0]));     
      const file = e.target.files[0];
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        convertToBuffer(reader);
      }
    }
  };

  const clearAll = (e) => {
    setSelectedImage();
    setPreview();
  };

  const checkWhiteList = (address) => {
    if (whitelist) { 
      for (let item of whitelist) {
        if (item.toLowerCase() == address.toLowerCase() ) { console.log("adddress true", address.toString(), whitelist)
          return true;
        }
      }    
      return false;
    } 
  }

  const handleCustomUrl = (value) => {
    if (value.includes("https://lofi-market.com/")) {
      setCustomUrl(value);
    } else {
      setCustomUrl("https://lofi-market.com/");
    }
  }

  const uploadUser = async () => {  
    if (userData.userData._id) { 
      if (checkWhiteList(userData.userData.address)) {
        await updateById(
          userData.userData._id,
          username,
          customeUrl,
          selectedImage,
          bio,
          twitter,
          portfoli,
          instagram,
          facebook,
          youtube,
          soundcloud,
          spotify,
          applemusic,
          etsy,
          tiktok,
          twitch
        )(dispatch).then(async (res) => {
          toast.success(<>{res.message}</>, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
           dispatch(findOne(userData.userData.address));
        });
      } else { 
        toast.warning('Sorry, you are not on the whitelist', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }     
    } else { 
      if (checkWhiteList(address)) {
        createUser(
          address,
          username,
          customeUrl,
          selectedImage,
          bio,
          twitter,
          portfoli,
          instagram,
          facebook,
          youtube,
          soundcloud,
          spotify,
          applemusic,
          etsy,
          tiktok,
          twitch
        )(dispatch).then(async (res) => {
          toast.success(<>{res.message}</>, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          dispatch(findOne(address));
        });
      } else { 
        toast.warning('Sorry, you are not on the whitelist', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }      
    }         
  };

  useEffect(() => {
    if (userData.userData) {
      if (userData.userData.customURL) {
        setCustomUrl(userData.userData.customURL);
      } else {
        setCustomUrl("https://lofi-market.com/");
      }
      if (userData.userData.profilePhoto) {
        setTwitter(userData.userData.profilePhoto);
      } else {
        setTwitter("");
      } 
      if (userData.userData.username) {
        setUserName(userData.userData.username);
      } else {
        setUserName("");
      }
      if (userData.userData.userBio) {
        setBio(userData.userData.userBio);
      } else {
        setBio("");
      }
      if (userData.userData.websiteURL) {
        setPortfoli(userData.userData.websiteURL);
      } else {
        setPortfoli("");
      }
      if (userData.userData.userImg) {
        setSelectedImage(userData.userData.userImg);
      } else {
        setSelectedImage("");
      } 
      if (userData.userData.userImg) {
        setAvatar(userData.userData.userImg);
      } else {
        setAvatar("");
      }
      if (userData.userData.instagram) {
        setInstagram(userData.userData.instagram);
      } else {
        setInstagram("");
      }
      if (userData.userData.facebook) {
        setFacebook(userData.userData.facebook);
      } else {
        setFacebook("");
      }
      if (userData.userData.youtube) {
        setYouTube(userData.userData.youtube);
      } else {
        setYouTube("");
      }
      if (userData.userData.soundcloud) {
        setSoundCloud(userData.userData.soundcloud);
      } else {
        setSoundCloud("");
      }
      if (userData.userData.spotify) {
        setSpotify(userData.userData.spotify);
      } else {
        setSpotify("");
      }
      if (userData.userData.applemusic) {
        setAppleMusic(userData.userData.applemusic);
      } else {
        setAppleMusic("");
      }
      if (userData.userData.etsy) {
        setEtsy(userData.userData.etsy);
      } else {
        setEtsy("");
      }
      if (userData.userData.tiktok) {
        setTikTok(userData.userData.tiktok);
      } else {
        setTikTok("");
      }
      if (userData.userData.twitch) {
        setTwitch(userData.userData.twitch);
      } else {
        setTwitch("");
      }
    }
  }, [userData.userData]);

  useEffect(async () => { 
    if (localStorage.getItem("metaMaskConnect") !== null) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (data) => {
          if (data[0]) {
            setAddress(data[0]);
            dispatch(findOne(data[0]));
          }
        });
    } else {
      history.push("/");
    }
  }, [props.user]);

  return (
    <div className={styles.page}>
      <a
        target="_blank"
        rel="noreferrer"
      >
        <ToastContainer />
      </a>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.section)}>
        <div>
          <div className={cn("container", styles.container)}>
            <div className={styles.top}>
              <h1 className={cn("h2", styles.title)}>Edit Profile</h1>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.user}>
                  <div className={styles.avatar}>
                    {
                      preview ?
                      <img src={preview} alt="Avatar" /> :
                        selectedImage && avatar ?
                        <img src={`https://ipfs.io/ipfs/${selectedImage}`} alt="Avatar" /> :                         
                        <img src="/images/content/main_avatar.png" alt="Avatar" />                    
                    }
                  </div>
                  <div className={styles.details}>
                    <div className={styles.stage}>Profile Photo</div>
                    <div className={styles.text}>
                      We recommend an image of at least 400x400. Gifs work too{" "}
                      <span role="img" aria-label="hooray">
                        🙌
                      </span>
                    </div>
                    <div className={styles.file}>
                      <button
                        className={cn(
                          "button-stroke button-small",
                          styles.button
                        )}
                      >
                        Upload
                      </button>
                      <input accept="image/*" className={styles.load} onChange={changeImage} type="file" style={{ cursor: 'pointer' }} />

                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.list}>
                  <div className={styles.item}>
                    <div className={styles.category}>Account Info</div>
                    <div className={styles.fieldset}>
                      <TextInput
                        className={styles.field}
                        label="display name"
                        name="Name"
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your display name"
                        required
                      />
                      <TextInput
                        className={styles.field}
                        label="Custom url"
                        name="Url"
                        type="text"
                        value={customeUrl}
                        onChange={(e) => handleCustomUrl(e.target.value)}
                        placeholder="https://lofi-market.com/Your custom URL"
                        // disabled
                        required
                      />
                      <TextArea
                        className={styles.field}
                        label="Bio"
                        name="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="About yourselt in a few words"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.category}>Social</div>
                    <div className={styles.fieldset}>
                      <TextInput
                        className={styles.field}
                        label="portfolio or website"
                        name="Portfolio"
                        type="text"
                        value={portfoli}
                        onChange={(e) => setPortfoli(e.target.value)}
                        placeholder="Enter URL"
                        required
                      />
                      {/* <div className={styles.box}> */}
                        <TextInput
                          className={styles.field}
                          label="twitter"
                          name="Twitter"
                          value={twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                          type="text"
                          placeholder="@twitter username"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="instagram"
                          name="Instagram"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          type="text"
                          placeholder="instagram username"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="facebook"
                          name="Facebook"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                          type="text"
                          placeholder="facebook username"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="youtube"
                          name="YouTube"
                          value={youtube}
                          onChange={(e) => setYouTube(e.target.value)}
                          type="text"
                          placeholder="youtube username"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="soundcloud"
                          name="SoundCloud"
                          value={soundcloud}
                          onChange={(e) => setSoundCloud(e.target.value)}
                          type="text"
                          placeholder="Enter URL"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="spotify"
                          name="Spotify"
                          value={spotify}
                          onChange={(e) => setSpotify(e.target.value)}
                          type="text"
                          placeholder="Enter URL"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="apple music"
                          name="Apple Music"
                          value={applemusic}
                          onChange={(e) => setAppleMusic(e.target.value)}
                          type="text"
                          placeholder="Enter URL"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="etsy"
                          name="Etsy"
                          value={etsy}
                          onChange={(e) => setEtsy(e.target.value)}
                          type="text"
                          placeholder="Enter URL"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="tiktok"
                          name="TikTok"
                          value={tiktok}
                          onChange={(e) => setTikTok(e.target.value)}
                          type="text"
                          placeholder="Enter URL"
                          required
                        />
                        <TextInput
                          className={styles.field}
                          label="twitch"
                          name="Twitch"
                          value={twitch}
                          onChange={(e) => setTwitch(e.target.value)}
                          type="text"
                          placeholder="Enter URL"
                          required
                        />
                        {/* <button
                          className={cn(
                            "button-stroke button-small",
                            styles.button
                          )}
                        >
                          Verify account
                        </button> */}
                      {/* </div> */}
                    </div>
                    {/* <button
                      className={cn("button-stroke button-small", styles.button)}
                    >
                      <Icon name="plus-circle" size="16" />
                      <span>Add More Social Accounts</span>
                    </button> */}
                  </div>
                </div>
                <div className={styles.btns}>
                  <button
                    className={cn("button", styles.button)}
                    type="submit"
                    onClick={uploadUser}
                  >
                    Update Profile
                  </button>
                  <button className={styles.clear} onClick={clearAll}>
                    <Icon name="circle-close" size="24" />
                    Clear all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapToStateProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapToStateProps)(ProfileEdit);
