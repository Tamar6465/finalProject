import React, { useContext, useState } from 'react';
import { resortContext } from '../context/resortContext';
import { useNavigate } from 'react-router-dom';
import UpImage from './UpImage';

export default function FormResort() {
    const { addResort } = useContext(resortContext)
    const [formData, setFormData] = useState({
        name: '',
        images: [],
        price: '',
        adress: '',
        accessibility: '',
        category: "",
        numBed: "",
        ownerId: "",
        description: '',
        phone: '',
        city: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e;
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: [...prevFormData.images, file],
            }));
        }
    };

  
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>שם האתר:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <UpImage handleImage={handleImageChange} formData={formData} setFormData={setFormData} />


            <div>
                <label>מחיר:</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div>
                <label>כתובת:</label>
                <input type="text" name="adress" value={formData.adress} onChange={handleChange} />
            </div>
            <div>
                <label>עיר:</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div>
                <label>סוגי נכויות:</label>
                <select name="accessibility" onChange={event => {
                    handleChange(event)
                }}>
                    <option value="visual">visual</option>
                    <option value="hearing">hearing</option>
                    <option value="motor">motor</option>
                    <option value="mentalHealth">mentalHealth</option>
                </select>
            </div>
            <div>
                <label> קטגוריה:</label>
                <select name="category" onChange={event => {
                    handleChange(event)
                }}>
                    <option value="hotelRoom">hotelRoom</option>
                    <option value="b&b">b&b</option>
                    <option value="vila">vila</option>
                </select>
            </div>
            <div>
                <div>
                    <label htmlFor="numBed">מספר מיטות:</label>
                    <input
                        type="number"
                        id="numBed"
                        name="numBed"
                        onChange={handleChange}
                        max={50}
                    />
                </div>
                <label>תיאור:</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div>
                <label>טלפון:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <button type="submit">שלח</button>
        </form>
    );
};

