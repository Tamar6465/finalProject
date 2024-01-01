import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Resort({ resort }) {

    const localizer = momentLocalizer(moment);
    const [selectedDates, setSelectedDates] = useState([]);

    // const handleDayClick = ({ start, end }) => {
    //     const selectedDatesCopy = [...selectedDates];
    //     const clickedDate = start;

    //     // Check if the date is already selected, if yes, remove it, otherwise add it
    //     const index = selectedDatesCopy.findIndex(date => date.getTime() === clickedDate.getTime());

    //     if (index !== -1) {
    //         selectedDatesCopy.splice(index, 1);
    //     } else {
    //         selectedDatesCopy.push(clickedDate);
    //     }

    //     setSelectedDates(selectedDatesCopy);
    // };
    const handleButtonClick = (date) => {
        const dateToToggle = moment(date).toDate();
        const isSelected = selectedDates.some(selectedDate => selectedDate.getTime() === dateToToggle.getTime());
    
        if (isSelected) {
          const updatedDates = selectedDates.filter(selectedDate => selectedDate.getTime() !== dateToToggle.getTime());
          setSelectedDates(updatedDates);
        } else {
          setSelectedDates([...selectedDates, dateToToggle]);
        }
      };

    return (
        <>
            <div>
                {resort.images?.map((image, index) => {
                    return <img src={image} key={index} style={{ width: "20px", height: "20px" }} />
                })}

                <h3>{resort.name}</h3>
                <h4>{resort.price}</h4>
                <h4>{resort.adress}</h4>
                <h4>Adapted to: {resort.disabilities}</h4>
                <p>{resort.description}</p>
                <button>{resort.phone}</button>
                <div>
                    <Calendar
                        localizer={localizer}
                        events={resort.events.map((date) => ({ start: date, end: date }))}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 200 }}
                        eventPropGetter={(event) => ({
                            style: {
                                backgroundColor: 'red',
                                color: 'white',
                            },
                        })}
                        onSelectSlot={({ start }) => handleButtonClick(start)}
                     />
                    <div>
                        <h4>Selected Dates:</h4>
                        <ul>
                            {selectedDates.map((date, index) => (
                                <li key={index}>{date.toDateString()}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}
