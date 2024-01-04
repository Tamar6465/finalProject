// import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate, useParams } from 'react-router-dom';
import { resortContext } from '../context/resortContext';
import Paypal from './Paypal';
import { orderContext } from '../context/orderContext';
import { userContext } from '../context/userContext';
// import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import { Modal, Button } from 'react-bootstrap';  // Import Bootstrap Modal and Button
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Resort() {
    const { id } = useParams();
    const { resorts, getResortById } = useContext(resortContext);
    const { userLogin } = useContext(userContext);
    const { orders, addOrder } = useContext(orderContext);

    useEffect(() => {
        getResortById(id)
    }, []);
    const resort = resorts[0];
    const localizer = momentLocalizer(moment);
    const [selectedDates, setSelectedDates] = useState([]);
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);  // State to control Bootstrap Modal
    const [showAlertPaypal, setShowAlertPaypal] = useState(false);  // State to control SweetAlert
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(today);
tomorrow.setDate(new Date(today).getDate() + 1);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow.toISOString().split('T')[0]);

    const handleStartDateChange = (event) => {
        const dateValue = event.target.value;
        setStartDate(dateValue);
    };

    const handleEndDateChange = (event) => {
        const dateValue = event.target.value;
        setEndDate(dateValue);
    };

    const order = () => {
        // Show Bootstrap Modal when the "order" button is clicked
        setShowModal(true);
    };

    const closeModal = () => {
        // Close Bootstrap Modal
        setShowModal(false);

    };

    const orderAndCloseModal = () => {
        // Close Bootstrap Modal and perform order-related actions
        setShowModal(false);
        setShowAlertPaypal(true);

    };

    const closePaypalModal = () => {
        // Close SweetAlert
        setShowAlertPaypal(false);
        const orderTemp = {
            dateOrder: new Date(),
            dateStart: startDate,
            dateEnd: endDate,
            sumOrder: Number.parseInt(resort.price) * Number.parseInt(selectedDates.length),
            resortId: resort.id,
            userId: userLogin.id
                }
        console.log(orderTemp);
    //    const order= addOrder(orderTemp);

    //    console.log({order})
        navigate(`/order`,{state:{orderTemp}});

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
                <p>{resort.price}</p>
                <p>צור קשר :</p>
                <p>{resort.ownerId.name}</p>
                <p>{resort.ownerId.phone}</p>

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

                {/* Bootstrap Modal for Order Details */}
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Your order details input fields */}
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
                            placeholder={today}
                            min={startDate}
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={orderAndCloseModal} >
                            Order
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showAlertPaypal} onHide={closePaypalModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>PayPal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Paypal />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closePaypalModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )
}
