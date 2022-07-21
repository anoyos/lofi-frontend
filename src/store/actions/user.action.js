import axios from "axios";
import { BACKEND_API } from "../../constant";
import {
  GET_USER_COVER_SUCCESS,
  GET_USER_COVER_FAIL,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL
} from "./types";

export const findOne = (address) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${BACKEND_API}/users/findOne`,
      {
        address: address,
      }
    ); 
     if (data.message) {
      dispatch({ type: GET_USER_DATA_FAIL, payload: data.message });      
    } else {
      dispatch({ type: GET_USER_DATA_SUCCESS, payload: data });
    } 
  } catch (error) { 
  dispatch({ type: GET_USER_DATA_FAIL, payload: error });
  }
};

export const findCoverImgOne = (address) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${BACKEND_API}/user_cover/findOne`,
      {
        address: address,
      }
    );  
    if (data.message) {
      dispatch({ type: GET_USER_COVER_FAIL, payload: data.message });      
    } else {
      dispatch({ type: GET_USER_COVER_SUCCESS, payload: data });
    }    
  } catch (error) {
    dispatch({ type: GET_USER_COVER_FAIL, payload: error });
  }
};

export const createUser =
  (address, username, customeUrl, selectedImage, bio, twitter, portfoli, instagram, facebook, youtube, soundcloud, spotify, applemusic, etsy, tiktok, twitch) =>
    async (dispatch) => {
      try {
        const { data } = await axios.post(
          `${BACKEND_API}/users/create`,
          {
            address: address,
            username: username,
            customURL: customeUrl,
            bio: bio,
            websiteURL: portfoli,
            userImg: selectedImage,
            profilePhoto: twitter,
            instagram: instagram,
            facebook: facebook,
            youtube: youtube,
            soundcloud: soundcloud,
            spotify: spotify,
            applemusic: applemusic,
            etsy: etsy,
            tiktok: tiktok,
            twitch: twitch
          }
        );
        return data;
      } catch (error) {
        return [];
      }
    };

export const createUserCover =
  (address, userCoverImg) =>
    async (dispatch) => {
      try {
        const { data } = await axios.post(
          `${BACKEND_API}/user_cover/create`,
          {
            address: address,
            userCoverImg: userCoverImg
          }
        );
        return data;
      } catch (error) {
        return [];
      }
    };

export const updateById =
  (id, username, customeUrl, selectedImage, bio, twitter, portfoli, instagram, facebook, youtube, soundcloud, spotify, applemusic, etsy, tiktok, twitch) =>
    async (dispatch) => {
      try {
        const { data } = await axios.post(
          `${BACKEND_API}/users/update`,
          {
            id: id,
            username: username,
            customURL: customeUrl,
            bio: bio,
            websiteURL: portfoli,
            userImg: selectedImage,
            profilePhoto: twitter,
            instagram: instagram,
            facebook: facebook,
            youtube: youtube,
            soundcloud: soundcloud,
            spotify: spotify,
            applemusic: applemusic,
            etsy: etsy,
            tiktok: tiktok,
            twitch: twitch
          }
        );
        return data;
      } catch (error) {
        return [];
      }
    };

export const updateCoverById =
  (id, userCoverImg) =>
    async (dispatch) => {
      try {
        const { data } = await axios.post(
          `${BACKEND_API}/user_cover/update`,
          {
            id: id,
            userCoverImg: userCoverImg
          }
        ); 
        return data;
      } catch (error) {
        return [];
      }
    };
