import * as React from "react";
 
 const openClose ={
 
 formatOpenNowString:(hoursData, utcOffset) =>{
    const now = openClose.getYextTimeWithUtcOffset(utcOffset);
  
    const tomorrow = new Date(now.getTime() + 60 * 60 * 24 * 1000);
    const yesterday = new Date(now.getTime() - 60 * 60 * 24 * 1000);
    const nowTimeNumber = now.getHours() + now.getMinutes() / 60;
  
    const intervalsToday = openClose.getIntervalOnDate(now, hoursData);
    const intervalsTomorrow = openClose.getIntervalOnDate(tomorrow, hoursData);
    const intervalsYesterday = openClose. getIntervalOnDate(yesterday, hoursData);
    let openRightNow = false;
    let currentInterval = null;
    let nextInterval = null;
  
    if (intervalsYesterday) {
      for (let i = 0; i < intervalsYesterday.length; i++) {
        const interval = intervalsYesterday[i];
        const startIntervalNumber = openClose.timeStringToNumber(interval.start);
        const endIntervalNumber = openClose.timeStringToNumber(interval.end);
  
        // If end overflows to the next day (i.e. today).
        if (endIntervalNumber < startIntervalNumber) {
          if (nowTimeNumber < endIntervalNumber) {
            currentInterval = interval;
            openRightNow = true;
          }
        }
      }
    }
  
    // Assumes no overlapping intervals
    if (intervalsToday) {
      for (let i = 0; i < intervalsToday.length; i++) {
        const interval = intervalsToday[i];
        const startIntervalNumber = openClose.timeStringToNumber(interval.start);
        const endIntervalNumber =openClose.timeStringToNumber(interval.end);
  
        // If current time doesn't belong to one of yesterdays interval.
        if (currentInterval == null) {
          if (endIntervalNumber < startIntervalNumber) {
            if (nowTimeNumber >= startIntervalNumber) {
              currentInterval = interval;
              openRightNow = true;
            }
          } else if (
            nowTimeNumber >= startIntervalNumber &&
            nowTimeNumber < endIntervalNumber
          ) {
            currentInterval = interval;
            openRightNow = true;
          }
        }
  
        if (nextInterval == null) {
          if (startIntervalNumber > nowTimeNumber) {
            nextInterval = interval;
          }
        } else {
          if (
            startIntervalNumber > nowTimeNumber &&
            startIntervalNumber < openClose.timeStringToNumber(nextInterval.start)
          ) {
            nextInterval = interval;
          }
        }
      }
    }
  
    let nextIsTomorrow = false;
  
    // If no more intervals in the day
    if (nextInterval == null) {
      if (intervalsTomorrow) {
        if (intervalsTomorrow.length > 0) {
          nextInterval = intervalsTomorrow[0];
          nextIsTomorrow = true;
        }
      }
    }
  
        let hoursString = 'Ferm??e';
        if (openRightNow) {
          if (currentInterval.start === "00:00" && currentInterval.end === "23:59") {
            hoursString = 'Ouvert 24 heures';
          } else {
            hoursString = 'Ouverte - Ferme ?? [closingTime]';
            hoursString = hoursString.replace("[closingTime]", openClose.formatTime(currentInterval.end));
          }
        } else if (nextInterval) {
          if (nextIsTomorrow) {
            hoursString = 'Ferm??e - Ouvert ?? [openingTime]';
            hoursString = hoursString.replace("[openingTime]", openClose.formatTime(nextInterval.start));
          } else {
            hoursString = 'Ferm??e - Ouvert ?? [openingTime]';
            hoursString = hoursString.replace("[openingTime]", openClose.formatTime(nextInterval.start));
          }
        }
        return hoursString;
      },
 getYextTimeWithUtcOffset:(entityUtcOffsetSeconds)=>{
    const now = new Date();
    let utcOffset = 0;
    if (entityUtcOffsetSeconds) {
      utcOffset = entityUtcOffsetSeconds * 1000;
    }
    if (utcOffset !== 0) {
      const localUtcOffset = now.getTimezoneOffset() * 60 * 1000;
      return new Date(now.valueOf() + utcOffset + localUtcOffset);
    }
    return now;
  },
  parseTimeZoneUtcOffset:(timeString)=>{
    if (!timeString) {
      return 0;
    }
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    if (hours < 0) {
      return -(Math.abs(hours) + minutes / 60) * 60 * 60;
    }
    return (hours + minutes / 60) * 60 * 60;
  },
  
 timeStringToNumber:(timeString)=>{
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    return hours + minutes / 60;
  },
  getIntervalOnDate:(date, hoursData) =>{
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
  
    const dateString =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);
    const dayOfWeekString = days[date.getDay()];
  
    // Check for holiday
    if (hoursData.holidayHours) {
      for (let i = 0; i < hoursData.holidayHours.length; i++) {
        const holiday = hoursData.holidayHours[i];
        if (holiday.date == dateString) {
          if (holiday.openIntervals) {
            return holiday.openIntervals;
          } else if (holiday.isClosed === true) {
            return null; // On holiday but closed
          }
        }
      }
    }
  
    // Not on holiday
    if (hoursData[dayOfWeekString] && hoursData[dayOfWeekString].openIntervals) {
      return hoursData[dayOfWeekString].openIntervals;
    } else {
      return null;
    }
  },  
  formatTime:(time) =>{
  const tempDate = new Date("January 1, 2020 " + time);
  const localeString = "en-US";
  return tempDate.toLocaleTimeString(localeString.replace("_", "-"), {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  },
  getUtcOffsetFromTimeZone:(timeZone, date = new Date()) => { 
	  const tz = date.toLocaleString("fr", {timeZone, timeStyle: "long"}).split(" ").slice(-1)[0];	  
	  const dateString = date.toString();
	  const offset = Date.parse(`${dateString} UTC`) - Date.parse(`${dateString} ${tz}`);
	  return openClose.msToTime(offset);
  },
  msToTime: (duration) => {
	  var milliseconds = Math.floor((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
	  hours = (hours < 10) ? hours : hours;
	  return hours+":00" ;
 }	
}

export default function OpenCloseStatus(props){  
  let parsedOffset = openClose.parseTimeZoneUtcOffset(openClose.getUtcOffsetFromTimeZone(props.timezone)); 
  return(
    <>
      <div className="">
            {props.hours && props.hours.reopenDate?
                <p className="">Temp Closed</p>:props.hours?
                <p className="closeing-div">{openClose.formatOpenNowString(props.hours, parsedOffset)}</p>:
                <p className="closed">Closed</p>
            }
         </div>
    </>
  )
}
