import React from 'react';

// import { firestore } from "firebase";

const DevotionContent = (props) => {

    const [content, setContent] = React.useState("");
    const [month, setMonth] = React.useState("");
    const monthMap = (month) =>{
      switch(month){
        case 0: return 'jan';
        case 1: return 'feb';
        case 2: return 'mar';
        case 3: return 'apr';
        case 4: return 'may';
        case 5: return 'jun';
        case 6: return 'jul';
        case 7: return 'aug';
        case 8: return 'sep';
        case 9: return 'oct';
        case 10: return 'nov';
        case 11: return 'dec';
        default: return '';
      }
    }
    React.useEffect(()=> {
      if(props.selection){
        const month = monthMap(props.month);
        setMonth(month.toUpperCase());
        const monthYear = String(month+"-"+props.year);
        const currentMonthRecord = props.records.filter( record=> record.id ===  monthYear);
        if(currentMonthRecord && currentMonthRecord[0])
          setContent(currentMonthRecord[0][String(month+"-"+props.date)]);
        if(currentMonthRecord[0] === undefined){
          setContent("Devotion not updated for this date");
        }
      }
       
    }, [props.records, props.year, props.month, props.date]);
    return ( 
        <>
        { props.selection && 
        <>
        <br />
        <h3 className="d-flex justify-content-center">{String(month+" "+props.date+" - "+props.year)}</h3>
        <div>
          <p className="text-justify">{content !== undefined ? content : 'Devotion Content Not Updated for this Day'}</p>
        </div>
          </>
        }
        </>

     );
}

export default DevotionContent;