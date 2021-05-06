import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DevotionContent from './DevotionContent';
import firebase from "firebase";

const DailyDevotion = () => {

  const [value, setValue] = React.useState(new Date());
  const [date, setDate] = React.useState(0);
  const [month, setMonth] = React.useState(0);
  const [year, setYear] = React.useState(0);
  
  const [selection, setSelection] = React.useState(false);
    const onDateClick = (d) =>{
      if(hasRecords){
        setValue(d);
        setDate(d.getDate());
        setMonth(d.getMonth());
        setYear(d.getFullYear());
        setSelection(true);
      }
     
    }

    const [records, setRecords] = React.useState([]);
    const [hasRecords, setHasRecords] = React.useState(false);
    React.useEffect(()=>{
  }, [records]);

    const getData = () => {
      var db = firebase.firestore();
      var recArr = [];
      db.collection("devotionContent")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const idObj = { id: doc.id };
            const obj = { ...idObj, ...doc.data() };
            recArr.push(obj);
          });
          setHasRecords(true);
          setRecords(recArr);
        });
    };

    React.useEffect(()=>{
        getData();
    }, []);
  
    return ( 
        <>
       <p>Here comes the Daily Devotion Calendar</p>
       <Calendar
        onChange={onDateClick}
        value={value}
      />
      <DevotionContent records={records} selection={selection} date={date} month={month}  year={year} />
        </>
     );
}
 
export default DailyDevotion;