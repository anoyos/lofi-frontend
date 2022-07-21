import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link, useHistory } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Followers from "./Followers";
import { connect, useDispatch, useSelector } from "react-redux";
import { bids } from "../../mocks/bids";
import { isStepDivisible } from "react-range/lib/utils";
import ipfs from "../../ipfs";
import whitelist from '../../whitelist'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

import {
  findCoverImgOne,
  createUserCover,
  updateCoverById
} from "../../store/actions/user.action";

const navLinks = [
  "On Sale",
  "Collectibles",
  "Created",
  "Likes",
  // "Following",
  // "Followers",
];

const following = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const followers = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const Profile = (props) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const [coverPreview, setCoverPreview] = useState("");
  const [saveCoverImage, setSaveCoverImage] = useState("");
  const [saving, setSaving] = useState(false);

  const userCover = useSelector((state) => state.userCover);

  const checkWhiteList = (address) => {
    if (whitelist) { 
      for (let item of whitelist) {
        if (item.toLowerCase() == address.toLowerCase() ) { 
          return true;
        }
      }    
      return false;
    } 
  }

  const convertToBuffer = async(reader) => { 
    setSaving(true);
    const buffer = await Buffer.from(reader.result);
    await ipfs.add(buffer, async (err, ipfsHash) => {
      if (ipfsHash) { 
        if (userCover.userCover._id) { 
          await updateCoverById(
            userCover.userCover._id,
            ipfsHash[0].hash
          )(dispatch).then(async (res) => {
            toast.success(<>{res.message}</>, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            dispatch(findCoverImgOne(userCover.userCover.address));
            setVisible(false);
          });    
        } else { 
          await createUserCover(
            address,
            ipfsHash[0].hash
          )(dispatch).then(async (res) => {
            toast.success(<>{res.message}</>, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            dispatch(findCoverImgOne(address));
            setVisible(false);
          });    
        } 
      }
    });    
  };

  const changeCoverImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      e.stopPropagation();
      e.preventDefault();
      setCoverPreview(URL.createObjectURL(e.target.files[0])); 
      setSaveCoverImage(e.target.files[0]); 
    }
  }

  const uploadCoverImage =  () => {
    const file = saveCoverImage;
    if  (file) {
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        convertToBuffer(reader);
      }
    }   
  }

  const checkEditCover = () => {
    if (userCover.userCover._id) {
      if (checkWhiteList(userCover.userCover.address)) {
        setVisible(true);
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
        setVisible(true);
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
  }
  
  useEffect(async () => { 
    if (localStorage.getItem("metaMaskConnect") !== null) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (data) => {
          if (data[0]) { 
            setAddress(data[0]);
            dispatch(findCoverImgOne(data[0])); 
          }
        });
    } else {
      history.push("/");
    }
  }, [props.user]);

  return (
    <div className={styles.profile}>
      <a
        target="_blank"
        rel="noreferrer"
      >
        <ToastContainer />
      </a>
      <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage: `url(${coverPreview ? coverPreview : userCover.userCover.userCoverImg ? `https://ipfs.io/ipfs/${userCover.userCover.userCoverImg}` : '/images/content/bg-profile.jpg'})`,
        }}
      >
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => {                  
                  checkEditCover();
                }
              }
            >
              <span>Edit Cover Photo</span>
              <Icon name="edit" size="16" />
            </button>
            <Link
              className={cn("button-stroke button-small", styles.button)}
              to="profile-edit"
            >
              <span>Edit Profile</span>
              <Icon name="image" size="16" />
            </Link>
          </div>
          <div className={styles.file}>
            <input type="file" onChange={changeCoverImage} />
            <div className={styles.wrap}>
              <Icon name="upload-file" size="48" />
              <div className={styles.info}>Drag and drop your photo here</div>
              <div className={styles.text}>or click to browse</div>
            </div>
            <button
              className={cn("button-small", styles.button)}
              onClick={() => {                   
                  uploadCoverImage();                
                }              
              }
            >
              {
                saving ? <div className={styles.loader}></div> : 'Save Photo'
              }              
            </button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <User className={styles.user} />
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                  <Items class={styles.items} items={bids.slice(0, 3)} />
                )}
                {activeIndex === 1 && (
                  <Items class={styles.items} items={bids.slice(0, 6)} />
                )}
                {activeIndex === 2 && (
                  <Items class={styles.items} items={bids.slice(0, 2)} />
                )}
                {activeIndex === 3 && (
                  <Items class={styles.items} items={bids.slice(0, 3)} />
                )}
                {activeIndex === 4 && (
                  <Followers className={styles.followers} items={following} />
                )}
                {activeIndex === 5 && (
                  <Followers className={styles.followers} items={followers} />
                )}
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

export default connect(mapToStateProps)(Profile);
