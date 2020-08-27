import React, { useState } from "react";
import * as firebase from "firebase";
import { Score } from "../../pages/Score/Score";

export const ButtonResetHistory = ({ upDateState }) => {
  const { displayName, uid } = firebase.auth().currentUser;

  const removeData = async () => {
    let scoreRef = firebase.database().ref("users/" + uid + "/score");
    try {
      await scoreRef.remove().then(() => {
        upDateState(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={removeData}>Reset History</button>;
};
