import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText, Input, FormGroup, Label, Form } from 'reactstrap';
import { addAppointment } from '../../data/appointmentData';
import { getActiveStylists } from '../../data/stylistData';
import { getCustomers } from '../../data/customerData';
import { getServices } from '../../data/serviceData';

function AppointmentAdd({ getAllAppointments }) {
    const [newAppointment, setNewAppointment] = useState({
        stylistId: null,
        customerId: null,
        appointmentTime: null,
        services: [],
    });
    const [allStylists, setAllStylists] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [service, setService] = useState([]);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // getting all active stylists, customers, and services upon initial render
    useEffect(() => {
        getActiveStylists().then(setAllStylists);
        getCustomers().then(setAllCustomers);
        getServices().then(setAllServices);
    }, []);

    // set new appointment event handler
    const handleNewAppointmentChange = (e) => {
        setNewAppointment({
            ...newAppointment,
            [e.target.name]: e.target.value,
        });
    };

    // set services handler - not sure if this is working
    const handleCheckbox = (service) => {
        if (!newAppointment.services.find((s) => s.id === service.id)) {
            const copy = { ...newAppointment };
            copy.services.push(service);
            setNewAppointment(copy);
        } else {
            const copy = { ...newAppointment };
            copy.services = copy.services.filter((s) => s.id !== service.id);
            setNewAppointment(copy);
        }
    };

    // doesn't seem to work - because of date or services checkbox?
    const handleSubmit = () => {
        if (
            newAppointment.stylistId &&
            newAppointment.customerId &&
            newAppointment.appointmentTime &&
            newAppointment.services.length > 0
        ) {
            // format for appointmentTime

            const appointmentToSendToAPI = {
                customerId: newAppointment.customerId,
                stylistId: newAppointment.stylistId,
                appointmentTime: newAppointment.appointmentTime,
                services: service
            };

            addAppointment(appointmentToSendToAPI).then(() => getAllAppointments());
            toggle()
        } else {
            window.alert(
                "Please complete appointment form before submission"
            );
        }

    };



    return (
        <div>
            <Button color="success" onClick={toggle}>
                Add Appointment
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>New Appointment</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor='date'>Select date</Label>
                            <Input type='date' name='date' onChange={handleNewAppointmentChange}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor='time'>Select time</Label>
                            <Input type='time' name='time' defaultValue={'9:00'} min={'9:00'} max={'18:00'} step={'3600'}
                                onChange={handleNewAppointmentChange}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor='customerId'>Select Customer</Label>
                            <Input
                                type='select'
                                name='customerId'
                                onChange={handleNewAppointmentChange}>
                                <option value={null}>-- Please select a customer --</option>
                                {allCustomers.map((c) => {
                                    return (
                                        <option
                                            key={c.id}
                                            value={parseInt(c.id)}
                                        >
                                            {c.name}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor='stylistId'>Select Stylist</Label>
                            <Input
                                type='select'
                                name='stylistId'
                                onChange={handleNewAppointmentChange}>
                                <option value={null}>-- Please select a stylist --</option>
                                {allStylists.map((s) => {
                                    return (
                                        <option
                                            key={s.id}
                                            value={parseInt(s.id)}
                                        >
                                            {s.name}
                                        </option>
                                    );
                                })}
                            </Input>
                        </FormGroup>

                        <Label>Select Services</Label>
                        {allServices.map((s) => {
                            return (
                                <FormGroup
                                    check
                                    key={s.id}
                                >
                                    <Label
                                        check
                                        htmlFor={s.id}
                                    >
                                        {s.name} -- ${s.price}
                                    </Label>
                                    <Input
                                        type='checkbox'
                                        name={s.id}
                                        checked={!!newAppointment.services.find((s2) => s2.id === s.id)
                                        }
                                        onChange={() => {
                                            handleCheckbox(s);
                                        }}
                                    />
                                </FormGroup>
                            );
                        })}
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AppointmentAdd;