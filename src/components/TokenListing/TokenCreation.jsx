import React from 'react';
import axios from 'axios';
import './TokenCreation.css';
import { useState } from 'react'
import { WiDayWindy } from "react-icons/wi";
import { IoWaterOutline } from "react-icons/io5";
import { Button, Label, TextInput, Datepicker, FileInput } from "flowbite-react";

const TokenCreation = () => {
    const [image, setImage] = useState(null);
    const currencySymbol = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'INR' }).formatToParts()[0].value;
    const [formData, setFormData] = useState({
        plantType: '',
        variety: '',
        plantingDate: '',
        expectedHarvestDate: '',
        cultivationMethod: '',
        seedValue: '',
        estimatedYield: '',
        numberOfSeeds: ''
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageUrl = await uploadImage(image);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
    
            const headers = {
                'authorization': `Bearer ${token}`
            };
            formData.imageOfCrop = imageUrl;
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/registerasset', formData, { headers });
            console.log('Asset created:', response.data);
            // Optionally, handle success (e.g., show a success message or redirect)
        } catch (error) {
            console.error('Error creating asset:', error);
            // Optionally, handle error (e.g., show an error message)
        }
    };
    
    const uploadImage = async (image) => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mentormee")
        data.append("cloud_name", "mentomee-cloud")
    
        const res = await fetch("https://api.cloudinary.com/v1_1/mentormee-cloud/image/upload", {
          method: "post",
          body: data
        })
    
        const resp = await res.json()
        console.log(resp);
        console.log(resp.secure_url);

        return resp.secure_url;
    }

    return (
        <form className='TokenCreation' onSubmit={handleSubmit}>
            <h2>Create a token</h2>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="plantType" value="Plant Type" />
                    </div>
                    <TextInput
                        className='px-2'
                        id="plantType"
                        type="text"
                        sizing="md"
                        placeholder="e.g., lettuce, tomatoes, herbs"
                        value={formData.plantType}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="variety" value="Variety" />
                    </div>
                    <TextInput
                        className='px-2'
                        id="variety"
                        type="text"
                        sizing="md"
                        placeholder="e.g., Romaine lettuce, Cherry tomatoes"
                        value={formData.variety}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Planting Date" />
                    </div>
                    <div className="mb-2 block">
                        <Datepicker
                            className='px-2'
                            sizing="md"
                            maxDate={new Date()}
                            onSelectedDateChanged={(date) => setFormData({ ...formData, plantingDate: date })}
                        />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="expectedHarvestDate" value="Expected Harvest Date" />
                    </div>
                    <div className="mb-2 block">
                        <Datepicker
                            className='px-2'
                            sizing="md"
                            minDate={new Date()}
                            onSelectedDateChanged={(date) => setFormData({ ...formData, expectedHarvestDate: date })}
                        />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="cultivationMethod" value="Cultivation Method" />
                    </div>
                    <div className="mb-2 block px-2">
                        <Button.Group>
                            <Button
                                color="gray"
                                onClick={() => setFormData({ ...formData, cultivationMethod: 'Hydroponics' })}
                            >
                                <IoWaterOutline className="mr-3 h-4 w-4" />
                                Hydroponics
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setFormData({ ...formData, cultivationMethod: 'Aeroponics' })}
                            >
                                <WiDayWindy className="mr-3 h-4 w-4" />
                                Aeroponics
                            </Button>
                        </Button.Group>
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="seedValue" value="Seed Value" />
                    </div>
                    <div className="mb-2 block">
                        <TextInput
                            className='px-2'
                            id="seedValue"
                            type="number"
                            sizing="md"
                            placeholder={`e.g., ${currencySymbol}100`}
                            value={formData.seedValue}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="estimatedYield" value="Estimated Yield Per Plant (in INR)" />
                    </div>
                    <div className="mb-2 block">
                        <TextInput
                            className='px-2'
                            id="estimatedYield"
                            type="number"
                            sizing="md"
                            placeholder={`e.g., ${currencySymbol}100`}
                            value={formData.estimatedYield}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="numberOfSeeds" value="Number of Seeds" />
                    </div>
                    <div className="mb-2 block">
                        <TextInput
                            className='px-2'
                            id="numberOfSeeds"
                            type="number"
                            sizing="md"
                            placeholder={`e.g., 20`}
                            value={formData.numberOfSeeds}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="imageOfCrop" value="Image of Crop" />
                    </div>
                    <div className="mb-2 block">
                        <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4 py-4">
                <div className='px-2'>
                    <div className="mb-2 block">
                        <Button type="submit" gradientDuoTone="purpleToBlue">Create A Token</Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default TokenCreation;