import React, { useEffect, useState, useRef } from "react";
import cn from "classnames";
import styles from "./User.module.sass";
import Icon from "../../../components/Icon";
import Report from "../../../components/Report";
import Modal from "../../../components/Modal";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import ReactTooltip from "react-tooltip";
// import { useOnClickOutside } from 'usehooks-ts'
// import { isStepDivisible } from "react-range/lib/utils";
import web3 from "../../../components/InitWeb3";
import { connect, useDispatch, useSelector } from "react-redux";
import { findOne } from "../../../store/actions/user.action";


const shareUrlFacebook = "https://ui8.net";
const shareUrlTwitter = "https://ui8.net";

const User = ({ className }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const auth = useSelector((state) => state.auth);

  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  const [address, setAddress] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy");
  const ref = useRef(null);

  // useOnClickOutside(ref, handleClickOutside);
  
  const copyToolTip = () => {
    navigator.clipboard.writeText(address);
    setCopyStatus("Copied");
  }

  const clickOutside = () => {
    setVisibleShare(false)
  }

  const handleClickOutside = () => {
    document.addEventListener("mousedown", clickOutside)
  } 

  const showMonth = (month) => {
    switch (month) {
      case "01":
        return "Jan";
        break;
      case "02":
        return "Feb";
        break;
      case "03":
        return "Mar";
        break;
      case "04":
        return "Apr";
        break;
      case "05":
        return "May";
        break;
      case "06":
        return "Jun";
        break;
      case "07":
        return "Jul";
        break;
      case "08":
        return "Aug";
        break;
      case "09":
        return "Sep";
        break;
      case "10":
        return "Oct";
        break;
      case "11":
        return "Nov";
        break;
      case "12":
        return "Dec";
        break;
    
      default:
        break;
    }
  }

  const handleMemberDate = () => {
    if (userData.userData.createdAt) {
      let slicedDate = userData.userData.createdAt.slice(0, 10);
      let splittedDate = slicedDate.split("-");
      return `${showMonth(splittedDate[1])}` + "  " + `${splittedDate[2]}` + ", " + `${splittedDate[0]}`
    }
  }

  useEffect(async () => { 
    if (window.ethereum != null) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (data) => {
          if (data[0]) {
            setAddress(data[0]);
            dispatch(findOne(data[0]));
          }
        });
    }
  }, [auth.user]);

  return (
    <>
      <div className={cn(styles.user, className)}>
        <div className={styles.avatar}>
          {userData.userData.userImg ? (
            <img src={`https://ipfs.io/ipfs/${userData.userData.userImg}`} alt="Avatar" />
          ) : (
            <img src="/images/content/main_avatar.png" alt="Avatar" />
          )}
        </div>
        <div className={styles.name}>
          {userData.userData.username ? userData.userData.username : "hero"}
        </div>
        <div className={styles.code}>
          <div className={styles.number}>{`${address.slice(
            0,
            8
          )} . . . ${address.slice(-3)}`}</div>
          <button 
            className={styles.copy}
            onClick={copyToolTip}
            data-tip 
            data-for="registerTip"
            onMouseEnter={() => setCopyStatus("Copy") }
            onMouseLeave={() => setCopyStatus("Copy")}
          >
            <Icon name="copy" size="16" />
          </button>
          <ReactTooltip id="registerTip" place="top" effect="solid">
            {copyStatus}
          </ReactTooltip>
        </div>
        <div className={styles.info}>
          {/* A wholesome farm owner in Montana. Upcoming gallery solo show in
          Germany */}
          {userData.userData.userBio}
        </div>
        <div>
          {userData.userData.customURL ? (
            <a
              className={styles.site}
              href={`${userData.userData.customURL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="globe" size="16" />
              <span>{userData.userData.customURL}</span>
            </a>
          ) : (
            <a
              className={styles.site}
              href="https://lofi-market.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="globe" size="16" />
              <span>https://lofi-market.com/</span>
            </a>
          )}
        </div>        
        <div className={styles.control}>
          <div className={styles.btns}>
            {/* <button
              className={cn(
                "button button-small",
                { [styles.active]: visible },
                styles.button
              )}
              onClick={() => setVisible(!visible)}
            >
              <span>Follow</span>
              <span>Unfollow</span>
            </button> */}
            <button
              className={cn(
                "button-circle-stroke button-small",
                { [styles.active]: visibleShare },
                styles.button
              )}
              onClick={() => setVisibleShare(!visibleShare)}
            >
              <Icon name="share" size="20" />
            </button>
            <button
              className={cn("button-circle-stroke button-small", styles.button)}
              onClick={() => setVisibleModalReport(true)}
            >
              <Icon name="report" size="20" />
            </button>
          </div>
          <div className={cn(styles.box, { [styles.active]: visibleShare })} onMouseLeave={() => handleClickOutside()} >
            <div className={styles.stage}>Share link to this page</div>
            <div className={styles.share}>
              <TwitterShareButton
                className={styles.direction}
                // url={shareUrlTwitter
                url={userData.userData.profilePhoto}
              >
                <span>
                  <Icon name="twitter" size="20" />
                </span>
              </TwitterShareButton>
              <FacebookShareButton
                className={styles.direction}
                url={userData.userData.facebook}
              >
                <span>
                  <Icon name="facebook" size="20" />
                </span>
              </FacebookShareButton>
            </div>
          </div>
        </div>
        <div className={styles.socials}>
            <a
              className={styles.social}
              href={'https://twitter.com/' + userData.userData.profilePhoto}
              target="_blank"
              rel="noopener noreferrer"
              key='-1'
            >
              <Icon name="twitter" size="20" />
            </a>
            <a
              className={styles.social}
              href={'https://instagram.com/' + userData.userData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              key='0'
            >
              <Icon name="instagram" size="20" />
            </a>
            <a
              className={styles.social}
              href={'https://facebook.com/' + userData.userData.facebook}
              target="_blank"
              rel="noopener noreferrer"
              key='1'
            >
              <Icon name="facebook" size="20" />
            </a>
          {/* {item.map((x, index) => (
            <a
              className={styles.social}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Icon name={x.title} size="20" />
            </a>
          ))} */}
        </div>
        <div className={styles.note}>Member since {handleMemberDate()}</div>
      </div>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report />
      </Modal>
    </>
  );
};

export default User;
