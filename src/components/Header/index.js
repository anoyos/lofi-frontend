import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import { connect, useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { authLogout, authSet } from "../../store/actions/auth.actions";
import { apiGetAccountAssets } from "../../store/actions/wallet.action";
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { convertUtf8ToHex } from "@walletconnect/utils";
// import { IInternalEvent } from "@walletconnect/types";

const nav = [
  {
    url: "/marketCollect",
    title: "Discover",
  },
  {
    url: "/faq",
    title: "How it Works",
  },

  {
    url: "/whitepaper",
    title: "Whitepaper",
  },
  {
    url: "/explain",
    title: "Why LOFI",
  },
  {
    url: "/tokenomics",
    title: "Tokenomics",
  },
  {
    url: "/roadmap",
    title: "Roadmap",
  },
  {
    url: "/team",
    title: "Team",
  },
  {
    url: "/merch",
    title: "Merch",
  },
  {
    url: "/en",
    title: "En",
  },

  {
    url: "/item",
    title: "Create item",
  },
  {
    url: "/profile",
    title: "Profile",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "23rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: "2rem"
};

const Headers = (props) => {
  const dispatch = useDispatch();

  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState('');
  let [web3, setWeb3] = useState({});
  const [connectOther, setConnectOther] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  

  const [address, setAddress] = useState('');
  const [assets, setAssets] =  useState([]);
  const [connector, setConnector] = useState(null);
  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [fetching, setFetching] = useState(false);

  // show connet wallet button status on PC
  const showConnectWallet = () => { 
    if (user || (address && assets.length)) { 
      return <User 
                className={styles.user} 
                userItem={user} 
                logout={() => {
                  props.authLogout(); 
                  setUser('');
                }} 
              />
    } else if (connectOther) {
        return  <p
                  className={cn("button-stroke button-small", styles.button)}                  
                >
                  Connected
                </p>
    } else {      
        return  <p
                  className={cn("button-stroke button-small", styles.button)}
                  style={{ cursor: 'pointer' }}
                  onClick={handleOpen}
                >
                  Connect Wallet
                </p>
    }
  }

  // show connet wallet button status on Mobile
  const showConnectWalletMobile = () => { 
    if (user || (address && assets.length)) { 
      return false;
    } else if (connectOther) {
        return  <p
                  className={cn("button-stroke button-small", styles.button)}                  
                >
                  Connected
                </p>
    } else {      
        return  <p
                  className={cn("button-stroke button-small", styles.button)}
                  style={{ cursor: 'pointer' }}
                  onClick={handleOpen}
                >
                  Connect Wallet
                </p>
    }
  }
  
  const connectMetaMask = async () => {  
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      let web3 = new Web3(ethereum);
      setWeb3(web3); 
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == CONFIG.NETWORK.ID) { 
          setUser(accounts[0]);
          setConnectOther(false);
          await props.authSet({
            user: accounts[0],
            web3: web3              
          });
          localStorage.setItem("metaMaskConnect", "1");
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => { 
            window.location.reload();
            setUser(accounts[0]);
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          setConnectOther(true);
          toast.warning(`Change network to ${CONFIG.NETWORK.NAME}`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (err) { console.log("errrr", err)
        setConnectOther(false);
        toast.error("Something went wrong.", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      toast.error("Install Metamask.", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  // for wallet connect
  const connectWallet = async () => {
    handleClose();
    // bridge url
    const bridge = "https://bridge.walletconnect.org";

    // create new connector
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

    await setConnector(connector);

    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession();
    }

    // subscribe to events
    await subscribeToEvents();
  };

  const subscribeToEvents = () => {
    if (!connector) {
      return;
    }

    connector.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`);

      if (error) {
        throw error;
      }

      const { chainId, accounts } = payload.params[0];
      onSessionUpdate(accounts, chainId);
    });

    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);

      if (error) {
        throw error;
      }

      onConnect(payload);
    });

    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);

      if (error) {
        throw error;
      }

      onDisconnect();
    });

    if (connector.connected) {
      const { chainId, accounts } = connector;
      const address = accounts[0];
      setConnected(true);
      setChainId(chainId);
      setAccounts(accounts);
      setAddress(address);
      localStorage.setItem("walletConnect", "1");
      onSessionUpdate(accounts, chainId);
    }

    setConnector(connector);
  };

  const onSessionUpdate = async (accounts, chainId) => {
    const address = accounts[0];
    await setChainId(chainId);
    await setAccounts(accounts);
    await setAddress(address);
    await getAccountAssets();
  };

  const onConnect = async (payload) => {
    const { chainId, accounts } = payload.params[0];
    const address = accounts[0];
    await setConnected(true);
    await setChainId(chainId);
    await setAccounts(accounts);
    await setAddress(address);    
    getAccountAssets();
  };

  const getAccountAssets = async () => {
    setFetching(true);
    try {
      // get account balances
      const assets = await dispatch(apiGetAccountAssets(address, chainId));

      await setFetching(false);
      await setAddress(assets);
    } catch (error) {
      console.error(error);
      await setFetching(false);
    }
  };

  const onDisconnect = async () => {
    resetApp();
  };

  const resetApp = async () => {
    setAddress('');
    setConnector(null);
    setAssets([]);
  };

  const killSession = async () => {    
    if (connector) {
      connector.killSession();
    }
    resetApp();
  };

  useEffect(async () => {
    if (localStorage.getItem("metaMaskConnect") != null) {
      connectMetaMask();
    } else if (localStorage.getItem("walletConnect") != null) {
      connectWallet();
    } else if (localStorage.getItem("metaMaskConnect") == null && localStorage.getItem("walletConnect") == null) {
      handleOpen();
    }   
  }, []); 

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.logincontainer}>
            <div className={styles.logincenter}>
              <button className={styles.btnmetamask} onClick={() => { handleClose(); connectMetaMask() }} style={{ background: "white url('/images/metamask-logo.png') no-repeat" }}>Connect with MetaMask</button>
              {/* <button className={styles.btnwalletconnect} onClick={connectWallet} style={{ background: "white url('/images/WalletConnect.png') no-repeat" }}>Login via WalletConnect</button> */}
            </div>
          </div>
        </Box>
      </Modal>      
      <header className={styles.header}>
        <a
          target="_blank"
          rel="noreferrer"
        >
          <ToastContainer />
        </a>      
        <div className={cn("container", styles.container)}>
          <Link 
            className={styles.logo} to="/"
            onClick={() => {
                if (visibleNav) {
                  setVisibleNav(false);
                  visibleNav ? props.mobileNav("1") : props.mobileNav("0.3");
                }              
              }
            }
          >
            <Image
              className={styles.pic}
              src="/images/LOFI-DEFI-Logo-Black-Horizontal.svg"
              srcDark="/images/LOFI-DEFI-Logo-White-Horizontal.svg"
              alt="BlockFox"
            />
          </Link>
          <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
            <nav className={styles.nav}>
              {nav.map((x, index) => (
                <Link
                  className={styles.link}
                  // activeClassName={styles.active}
                  to={x.url}
                  key={index}
                  onClick={() => { 
                      if (visibleNav) {
                        setVisibleNav(false);
                        visibleNav ? props.mobileNav("1") : props.mobileNav("0.3");
                      }                   
                    }
                  }
                >
                  {x.title}
                </Link>
              ))}
            </nav>
            {/* <form
              className={styles.search}
              action=""
              onSubmit={() => handleSubmit()}
            >
              <input
                className={styles.input}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                placeholder="Search"
                required
              />
              <button className={styles.result}>
                <Icon name="search" size="20" />
              </button>
            </form> */}
            <Link
              className={cn("button-small", styles.button)}
              to="/upload-variants"
              // to="/"
            >
              Upload
            </Link>
            {showConnectWalletMobile()}
          </div>
          <Notification className={styles.notification} />
          <Link
            className={cn("button-small", styles.button)}
            to="/upload-variants"
            // to="/"
          >
            Upload
          </Link>
          {showConnectWallet()}
          <button
            className={cn(styles.burger, { [styles.active]: visibleNav })}
            onClick={() => {
                setVisibleNav(!visibleNav);
                visibleNav ? props.mobileNav("1") : props.mobileNav("0.3");
              }
            }
          ></button>
        </div>     
      </header>
    </div>
  );
};

const mapToStateProps = ({ auth }) => ({
  user: auth.user
});

const mapToDispatchProps = dispatch => ({
  authLogout: () => dispatch(authLogout()),
  authSet: (payload) => dispatch(authSet(payload))
});

export default connect(mapToStateProps, mapToDispatchProps)(Headers);
