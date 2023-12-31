import React, { useState } from 'react';

export default function FormResort() {
    const [formData, setFormData] = useState({
        siteName: '',
        image: '',
        price: '',
        address: '',
        disabilities: '',
        description: '',
        phone: '',
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
        formData.image=selectedImage;
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>שם האתר:</label>
                <input type="text" name="siteName" value={formData.siteName} onChange={handleChange} />
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
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
                <label>סוגי נכויות:</label>
                <input type="text" name="disabilities" value={formData.disabilities} onChange={handleChange} />
            </div>
            <div>
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

