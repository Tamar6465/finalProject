import React, { useContext, useState } from 'react';
import { resortContext } from '../context/resortContext';

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
        city:''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedImage(file);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleUpload = (e) => {
        // כאן יש יותר מקוד להעלאת התמונה לשרת או לעשות משהו אחר
        // יש להשתמש ב-API של השרת או בשירותי ענן כמו Firebase Storage או AWS S3
        e.preventDefault();
        console.log('Uploading image:', selectedImage);

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // ניתן להוסיף פה לוגיקת שליחת הטופס לשרת או לעשות משהו אחר
        formData.images.push(selectedImage) ;
        console.log('Form submitted:', formData);

        addResort(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>שם האתר:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {selectedImage && (
                    <div>
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%' }} />
                        <button onClick={handleUpload}>העלאה</button>
                    </div>
                )}
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

