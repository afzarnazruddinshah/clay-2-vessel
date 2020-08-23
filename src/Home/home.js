import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { firestore } from "firebase";
import { getToday } from "../Utils/utilityFunctions";
import "./home.css";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
//Notification Badge
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStylesAlert = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      alignContent: "center",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

const Home = (props) => {
  const alertClasses = useStylesAlert();
  const [count, setCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [recordsPresent, setRecordsPresent] = useState(false);
  const audioRef = useRef(document.createElement("audio"));

  const badgeProps = {
    color: "secondary",
    children: <NotificationsIcon />,
  };

  useEffect(() => {
    getCurrentUser();
    getNotificationCount();
  }, []);

  const getCurrentUser = (e) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user === null || user === undefined) {
        props.history.push("/login");
      }
    });
  };

  //For Getting the notification Count on Refresh button click
  const getNotificationCount = () => {
    var today = getToday();
    var db = firestore();
    var recArr = [];
    //Getting records with today as their Next service Date
    db.collection("installations")
      .where("nextServiceDate", "==", today)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const idObj = { id: doc.id };
          const obj = { ...idObj, ...doc.data() };
          recArr.push(obj);
        });
        setRecords(recArr);
        setRecordsPresent(true);
        setCount(recArr.length);
      })
      .catch((err) => {
        console.log(err);
      });
    // Getting Pending Service Records and adding them to above Array
    db.collection("installations")
      .where("status", "==", "pending")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const idObj = { id: doc.id };
          const obj = { ...idObj, ...doc.data() };
          var a1 = recArr.find((item) => item.id === idObj.id);
          if (a1 === null || a1 === undefined) {
            recArr.push(obj);
          }
        });
        setRecords(recArr);
        setRecordsPresent(true);
        setCount(recArr.length);
        playNotificationSound(recArr.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //For Playing Notification Sound
  const playNotificationSound = (count) => {
    if (count > 0) {
      audioRef.current.play();
    }
  };

  const logoutUser = (e) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.history.push("/login"); //Move to Login Route on Logout
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="dashboardform">
      <h2>Welcome to On Time Service</h2>
      <div>
        <div>&nbsp;</div>
      </div>
      <div>
        <div>&nbsp;</div>
      </div>
      <div>
        <div>&nbsp;</div>
      </div>
      <p>
        <Link to="/addrecords">
          <Button
            size="large"
            variant="contained"
            color="primary"
            type="button"
          >
            Add Records
          </Button>
        </Link>{" "}
      </p>
      <div>
        <div>&nbsp;</div>
      </div>
      <div>
        <div>&nbsp;</div>
      </div>
      <p>
        <Link to="/viewrecords">
          <Button
            size="large"
            variant="contained"
            color="primary"
            type="button"
          >
            View Records
          </Button>
        </Link>
      </p>
      <div>
        <div>&nbsp;</div>
      </div>
      <div>
        <div>&nbsp;</div>
      </div>
      <p>
        <Link to="/notifications">
          <Button
            size="large"
            variant="contained"
            color="primary"
            type="button"
          >
            Notifications &nbsp;{" "}
            <Badge
              max={10}
              color="secondary"
              badgeContent={count}
              {...badgeProps}
            ></Badge>
          </Button>
        </Link>{" "}
      </p>
      <div>
        <div>&nbsp;</div>
      </div>
      <div>
        <div>&nbsp;</div>
      </div>
      <p>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={logoutUser}
        >
          Logout
        </Button>
      </p>
      <div>
        <div>&nbsp;</div>
      </div>
      <div className={alertClasses.root}>
        <Alert severity="info">
          Click on Refresh button to get Notifications
        </Alert>
      </div>
      <audio
        webkit-playsinline="true"
        playsInline={true}
        ref={audioRef}
        id="notificationSound"
        src="https://notificationsounds.com/soundfiles/acc3e0404646c57502b480dc052c4fe1/file-sounds-1140-just-saying.mp3"
      />
    </div>
  );
};
export default withRouter(Home);