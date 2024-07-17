import React from 'react';
import './TokenCreation.css';
import { WiDayWindy } from "react-icons/wi";
import { IoWaterOutline } from "react-icons/io5";
import { Button, Label, TextInput, Datepicker } from "flowbite-react";

const TokenCreation = () => {
    const currencySymbol = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'INR' }).formatToParts()[0].value;
    return (
        <div className='TokenCreation'>
            <h2>Create a token</h2>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Plant Type" />
                    </div>
                    <TextInput id="base" type="text" sizing="md" placeholder="e.g., lettuce, tomatoes, herbs" required />
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Variety" />
                    </div>
                    <TextInput id="base" type="text" sizing="md" placeholder="e.g., Romaine lettuce, Cherry tomatoes" />
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Planting Date" />
                    </div>
                    <div className="mb-2 block">
                        <Datepicker sizing="md" maxDate={new Date()} />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Expected Harvest Date" />
                    </div>
                    <div className="mb-2 block">
                        <Datepicker sizing="md" minDate={new Date()} />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Cultivation Method" />
                    </div>
                    <div className="mb-2 block">
                        <Button.Group>
                            <Button color="gray">
                                <IoWaterOutline className="mr-3 h-4 w-4" />
                                Hydroponics
                            </Button>
                            <Button color="gray">
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
                        <Label htmlFor="base" value="Seed Value" />
                    </div>
                    <div className="mb-2 block">
                        <TextInput id="base" type="number" sizing="md" placeholder={`e.g., ${currencySymbol}100`} />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Estimated Yield Per Plant (in INR)" />
                    </div>
                    <div className="mb-2 block">
                        <TextInput id="base" type="number" sizing="md" placeholder={`e.g., ${currencySymbol}100`} />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Number of Seeds" />
                    </div>
                    <div className="mb-2 block">
                        <TextInput id="base" type="number" sizing="md" placeholder={`e.g., 20`} />
                    </div>
                </div>
            </div>
            <div className="flex max-w-md flex-col gap-4 py-4">
                <div>
                    <div className="mb-2 block">
                        <Button gradientDuoTone="purpleToBlue">Create A Token</Button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default TokenCreation;