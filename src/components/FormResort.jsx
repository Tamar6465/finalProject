import React, { useContext, useState } from 'react';
import { resortContext } from '../context/resortContext';
import { useNavigate } from 'react-router-dom';

export default function FormResort() {
    const { resorts, addResort } = useContext(resortContext);

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
        const files = e.target.files;

        if (files) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: [...prevFormData.images, ...files],
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData.images);
        // ניתן להוסיף פה לוגיקת שליחת הטופס לשרת או לעשות משהו אחר
        console.log('Form submitted:', formData);

        addResort(formData);
        navigate("/owner");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>שם האתר:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <input type="file" accept="image/*" onChange={handleImageChange} multiple />
                {formData.images.map((image, index) => (
                    <div key={index}>
                        <img src={URL.createObjectURL(image)} alt={`Selected ${index + 1}`} style={{ maxWidth: '100%' }} />
                    </div>
                ))}
            </div>
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
                    console.log(event);
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
                    console.log(event);
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

