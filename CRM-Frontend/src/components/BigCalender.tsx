'use client';
import React, { useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ar');
const localizer = momentLocalizer(moment);

type Props = {
   Events?: any;
};

const BigCalender = ({ Events }: Props) => {
   const [view, setViews] = useState<View>(Views.MONTH);
   const [currentDate, setCurrentDate] = useState(new Date());

   const handleOnChangeView = (selectedView: View) => {
      setViews(selectedView);
      console.log(selectedView);
   };

   const handleOnDoubleClickEvent = (event: any) => {
      console.log(event);
   };

   return (
      <Calendar
         localizer={localizer}
         events={Events}
         startAccessor='start'
         endAccessor='end'
         style={{ height: '96%' }}
         views={['day', 'week', 'month', 'agenda']}
         view={view}
         onView={handleOnChangeView}
         onDoubleClickEvent={(event) => handleOnDoubleClickEvent(event)}
         min={new Date(2025, 1, 0, 8, 0, 0)}
         max={new Date(2025, 1, 0, 17, 0, 0)}
         date={currentDate}
         onNavigate={setCurrentDate}
      />
   );
};

export default BigCalender;
