import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Resort({ resort }) {

    const localizer = momentLocalizer(moment);
    const [selectedDates, setSelectedDates] = useState([]);



    const order = () => {

    }
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
                    {/* <Calendar
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
                        selectable
                        onSelectSlot={(slotInfo) => {
                            const { start, end } = slotInfo;
                            const newSelectedDates = [...selectedDates, start];

                            setSelectedDates(newSelectedDates);
                        }}
                    /> */}
                    <Calendar
                        localizer={localizer}
                        events={resort.events.map((date) => ({ start: date, end: date }))}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 200 }}
                        eventPropGetter={(event) => ({
                            style: {
                                backgroundColor: selectedDates.includes(event.start) ? 'green' : 'red',
                                color: 'white',
                                cursor: 'pointer',
                            },
                        })}
                        selectable
                        onSelectSlot={(slotInfo) => {
                            const { start, end } = slotInfo;
                            const formattedStartDate = moment(start).format('YYYY-MM-DD');

                            if (selectedDates.includes(formattedStartDate)) {
                                // Remove the date if already selected
                                const newSelectedDates = selectedDates.filter((date) => date !== formattedStartDate);
                                setSelectedDates(newSelectedDates);
                            } else if (start >= new Date()) {
                                // Add the date if it's in the future
                                const newSelectedDates = [...selectedDates, formattedStartDate];
                                setSelectedDates(newSelectedDates);
                            }
                        }}
                    />


                    <div>
                        <h4>Selected Dates:</h4>
                        <ul>
                            {selectedDates.map((date, index) => (
                                <li key={index}>{date}</li>
                            ))}
                        </ul>
                    </div>

                </div>
                <button onClick={order}>order:</button>
            </div>
        </>
    )
}
