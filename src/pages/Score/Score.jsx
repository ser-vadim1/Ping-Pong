import React, { Fragment, useEffect, useState, useRef } from "react";
import Table from "../../components/Kit/Table/style";
import { data } from "../../components/data";
import { Center } from "../../components/styles/mixin/center";
import { AuthPageLayout } from "../../components/Auth/AuthPageLayoutHook";
import * as firebase from "firebase";
import { ButtonResetHistory } from "../../components/buttonResetHistory/buttonResetHistory";

export const Score = () => {
  const { displayName, uid } = firebase.auth().currentUser;
  const [data, setData] = useState({});
  const [Flag_removeData, setFlag_RemoveData] = useState(false);

  const getData = () => {
    const db = firebase.database();
    const score = db.ref("users/" + uid);
    score.once("value", (elem) => setData(elem.val().score));
  };
  useEffect(() => {
    getData();
    return () => firebase.database.OnDisconnect;
  }, [Flag_removeData]);

  const upDateState = (trueFlag) => {
    setFlag_RemoveData(trueFlag);
  };
  return (
    <>
      <ButtonResetHistory upDateState={upDateState} />
      <Center V H>
        <Table data={data} userName={displayName} />
      </Center>
    </>
  );
};
