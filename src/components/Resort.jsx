import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import SweetAlert from 'react-bootstrap-sweetalert';  // Import SweetAlert
import { resortContext } from '../context/resortContext';
// import Paypal from './Paypal';
// import 'bootstrap/dist/css/bootstrap.min.css';  
export default function Resort() {
    const { id } = useParams();
    const { resorts, getResortById } = useContext(resortContext);

    useEffect(() => {
        getResortById(id)
    }, []);
    const resort = resorts[0];
    const localizer = momentLocalizer(moment);
    const [selectedDates, setSelectedDates] = useState([]);
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false);  // State to control SweetAlert
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const handleStartDateChange = (event) => {
        const dateValue = event.target.value;
        setStartDate(dateValue);
    };

    const handleEndDateChange = (event) => {
        const dateValue = event.target.value;
        setEndDate(dateValue);
    };
    const order = () => {
        // Show SweetAlert when the "order" button is clicked
        setShowAlert(true);
    };

    const closeAlert = () => {
        // Close SweetAlert
        setShowAlert(false);
        navigate("/order")
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
                <p>צור קשר :</p>
                <h3>{resort.ownerId.name}</h3>
                <h3>{resort.ownerId.phone}</h3>
                <div>

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
                <button onClick={order}>order</button>
                <SweetAlert
                    show={showAlert}
                    title="Order Details"
                    showCancelButton
                    onCancel={closeAlert}
                >

                    <label>Start Date:</label>
                    <input
                        type='date'
                        name='startDate'
                        placeholder='0/0/0'
                        value={startDate}
                        onChange={handleStartDateChange}
                    />

                    <label>End Date:</label>
                    <input
                        type='date'
                        name='endDate'
                        placeholder='0/0/0'
                        min={startDate}
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                    {/* <Paypal /> */}
                </SweetAlert>

            </div>
        </>
    )
}
