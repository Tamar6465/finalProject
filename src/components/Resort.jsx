import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Resort({ resort }) {

    const localizer = momentLocalizer(moment);

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
                        events={resort.events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        eventPropGetter={(event) => ({
                            style: {
                                backgroundColor: 'red',
                                color: 'white',
                            },
                        })}
                    />
                </div>
                {/* <button onClick={moreDetails}>More...</button> */}
            </div>
        </>
    )
}
