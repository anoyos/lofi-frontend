import React, { useEffect, useState } from "react";
import styles from "./collection.module.sass";
import { useDispatch } from "react-redux";
import Web3Init from "../InitWeb3";
import axios from "axios";
import { BACKEND_API } from "../../constant";

const CreateCollect = () => {


    const [selectedImage, setSelectedImage] = useState();
    const [cName, setCName] = useState('');
    const [cDes, setCDes] = useState('');
    const [author, setAuthor] = useState('');

    const changeImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const uploadNewCollection = () => {
        if (!selectedImage) {
            alert("Please select Collection Image");
            return;
        }
        if (!cName) {
            alert("Please enter Collection Name");
            return;
        }
        if (!cDes) {
            alert("Please enter Collection Descrition");
            return;
        }
        const formData = new FormData();
        formData.append('name', cName);
        formData.append('image', selectedImage);
        formData.append('description', cDes);
        formData.append('author', author);
        axios.post(`${BACKEND_API}/collect/newCollect`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        }).then(res => {
            if (res.data === "1") {
                alert("Collection already exist");
            }
            else {

                alert("Successfully Uploaded");
            }
            window.location.reload();
        });
    }

    useEffect(async () => {
        const web3 = await Web3Init();
        const accounts = await web3.eth.getAccounts();
        setAuthor(accounts[0]);
    }, []);

    return (
        <div className={`${styles.MainCollect}`}>
            <div className={styles.ImgPart}>
                <label>Cover Image:</label>
                {selectedImage ? <div>Image Uploaded</div> : null}
                <input className={styles.load} onChange={changeImage} type="file" />
            </div>
            <div className={styles.NamePart}>
                <label>Collection Name: </label>
                <input type={'text'} className={styles.cNameInput} onChange={(e) => setCName(e.target.value)} placeholder="Collection Name" />
            </div>
            <div className={styles.NamePart}>
                <label>Description: </label>
                <textarea className={styles.cDesInput} onChange={(e) => setCDes(e.target.value)} placeholder="Collection's Description" />
            </div>
            <div className={styles.sPart}>
                <button type="button" className={styles.sButton} onClick={() => { uploadNewCollection() }}>Submit</button>
            </div>
        </div>
    )
}

export default CreateCollect;