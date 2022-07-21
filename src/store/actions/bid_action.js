import { GET_NFT_BID_SUCCESS, GET_NFT_BID_FAIL, UPLOAD_CREATE_BID_FAIL, UPLOAD_CREATE_BID_SUCCESS } from "./types";
import axios from 'axios';
import { BACKEND_API } from "../../constant";


export const uploadBid = (nftId, bidNum, bidPrice, bidAddress) => async (dispatch) => {
    const { data } = await axios.post(`${BACKEND_API}/bids/create_bid`, {
        nftId: nftId,
        bidNum: bidNum,
        bidPrice: bidPrice,
        bidAddress: bidAddress,
    });

    try {
        if (data.message) {
            dispatch({ type: UPLOAD_CREATE_BID_FAIL, payload: data.message })
        }
        else {
            dispatch({ type: UPLOAD_CREATE_BID_SUCCESS, payload: data })
        }

    } catch (error) {
        dispatch({ type: UPLOAD_CREATE_BID_FAIL, payload: error })
    }
}

export const getNFTDataById = (nftId) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BACKEND_API}/bids/findNFT`, {
            nftId: nftId
        });

        // if(data.message){
        //     dispatch({ type: GET_NFT_BID_FAIL, payload: data.message})
        // }
        // else {
        //     dispatch({ type: GET_NFT_BID_SUCCESS, payload: data})
        // }
        return data;
    } catch (error) {
        dispatch({ type: GET_NFT_BID_FAIL, payload: error })
    }
}

export const getNFTDataAll = () => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BACKEND_API}/bids`);
        return data;
    } catch (error) {
        dispatch({ type: GET_NFT_BID_FAIL, payload: error })
    }
}

export const approveBid = (id, price) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BACKEND_API}/bids/updateBidStatus`, {
            id: id,
            price: price,
        });
        return data;
    } catch (error) {
        dispatch({ type: GET_NFT_BID_FAIL, payload: error })
    }
}

export const removeBid = (nftId) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BACKEND_API}/bids/deleteBid`, {
            nftId: nftId,
        });
        return data;
    } catch (error) {
        dispatch({ type: GET_NFT_BID_FAIL, payload: error })
    }
}