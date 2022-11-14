import * as React from "react";
import "../../types/i18n";
 import { useTranslation } from 'react-i18next';
type Hours = {
  title?: string;
  hours: Hours;
  children?: React.ReactNode;
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

const todayIndex = new Date().getDay();

/**
 * Dynamically creates a sort order based on today's day.
 */
function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }

  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}

const renderHours = (week: Week) => {
  const dayDom: JSX.Element[] = [];
  for (const [k, v] of Object.entries(sortByDay(week))) {
    dayDom.push(<DayRow key={k} dayName={k} day={v} isToday={isDayToday(k)} />);
  }

  return <tbody className="font-normal">{dayDom}</tbody>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

function convertTo12HourFormat(time: string, includeMeridiem: boolean): string {
  const timeParts = time.split(":");
  let hour = Number(timeParts[0]);
  const minutesString = timeParts[1];
//  const meridiem = hour < 12 || hour === 24 ? "AM" : "PM"; // Set AM/PM
  hour = hour % 24 || 24; // Adjust hours

  // return (
  //   hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
  // );

  return (
    hour.toString() + ":" + minutesString 
  );
  
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday } = props;
  const { t, i18n } = useTranslation();
  return (
    <tr className={isToday ? "currentDay" : ""}>
      <td className="dayName">
      <span>{t(dayName)}</span>
      </td>
      {!day.isClosed && (
        <td className="dayStatus">
          <span>
            <span className="timeContent">{convertTo12HourFormat(day.openIntervals[0].start, true)}</span> <span className="dash">-</span> 
            <span className="timeContent">{convertTo12HourFormat(day.openIntervals[0].end, true)}</span><br/>
            <span className="timeContent">{convertTo12HourFormat(day.openIntervals[1].start, true)}  </span> <span className="dash">-</span>
            <span className="timeContent">{convertTo12HourFormat(day.openIntervals[1].end, true)}</span>
          </span>
        </td>
      )}
      {day.isClosed && (
        <td className="dayStatus">
          <span className="timeContent">Fermée</span>
        </td>
      )}
    </tr>
  );
};

const Hours = (props: Hours) => {
  const { title, hours } = props;

  const titleString = title ? <div className="text-xl font-semibold mb-4">{title}</div>: ""; 

  return (
    <>
      <div>
        {titleString}
        <table>
          <thead className="sr-only">
            <tr>
              <th>Day of the Week</th>
              <th>Hours</th>
            </tr>
          </thead>
          {renderHours(hours )}
        </table>
      </div>
    </>
  );
};

export default Hours;
