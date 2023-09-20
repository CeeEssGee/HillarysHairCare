import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText, Input, FormGroup, Label, Form } from 'reactstrap';
import { addAppointment, getAppointment, updateAppointment } from '../../data/appointmentData';
import { getActiveStylists, getStylists } from '../../data/stylistData';
import { getCustomers } from '../../data/customerData';
import { getServices } from '../../data/serviceData';

function AppointmentEdit({ appointment, getAllAppointments, services }) {
    // const [appointment, setAppointment] = useState({});
    const [stylists, setStylists] = useState([]);
    // const [services, setServices] = useState([]);
    // const [customers, setCustomers] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedStylist, setSelectedStylist] = useState(0)
    // const [appointmentTime, setAppointmentTime] = useState("");
    const [newAppointment, setNewAppointment] = useState({
        stylistId: null,
        customerId: null,
        appointmentTime: null,
        services: [],
    });

    // const { id } = useParams();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    useEffect(() => {
        setSelectedServices(appointment.services)
    }, []);


    const handleCheckbox = (e, service) => {
        const { checked } = e.target;
        let clone = structuredClone(selectedServices);

        if (checked) {
            clone.push(structuredClone(service));
        } else {
            clone = clone.filter((serv) => serv.id !== service.id);
        }
        setSelectedServices(clone);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let newAppointment = structuredClone(appointment);
        newAppointment.services = structuredClone(selectedServices);
        for (let service of newAppointment.services) {
            delete service["appointments"]
        }
        newAppointment.stylistId = selectedStylist ? selectedStylist : appointment.stylistId
        newAppointment.appointmentTime = `${selectedDate ? selectedDate : appointment.appointmentTime?.split("T")[0]}T${selectedTime ? selectedTime : appointment.appointmentTime?.split("T")[1]}`

        updateAppointment(newAppointment.id, newAppointment)
            .then(() => getAllAppointments());
        toggle()
    };

    const handleEditButton = (e) => {
        e.preventDefault()
        toggle()
    }

    return (
        <div>
            <Button color="primary" onClick={handleEditButton}>
                Edit Appointment
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Appointment</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor='date'>
                                <p>Current Appointment Date</p>
                            </Label>
                            <Input disabled="disabled" type="date" name="appointment.appointmentTime"
                                value={appointment?.appointmentTime?.split("T")[0]} />
                            <p></p>
                            <p>New Appointment Date</p>
                            <Input type='date' onChange={(e) => setSelectedDate(e.target.value)} />
                            <p></p>
                            <Label htmlFor='date'>
                                <p>Current Appointment Time</p>
                            </Label>
                            <Input disabled="disabled" type="time" name="appointment.appointmentTime"
                                value={appointment?.appointmentTime?.split("T")[1]} />
                            <p></p>
                            <p>New Appointment Time</p>
                            <Input type='time' onChange={(e) => setSelectedTime(e.target.value)} />


                        </FormGroup>

                        {/* <FormGroup>
                            <Label htmlFor='time'>Time: {appointment?.appointmentTime?.slice(11, 16)}</Label>
                        </FormGroup> */}

                        <FormGroup>
                            <Label htmlFor='customerId'>Customer: {appointment?.customer?.name}</Label>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor='stylistId'>Stylist: {appointment?.stylist?.name}</Label>
                        </FormGroup>

                        <Label>Select Services</Label>
                        {services.map((s) => {
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
                                        checked={!!selectedServices.find((s2) => s2.id === s.id)
                                        }
                                        onChange={(e) => {
                                            handleCheckbox(e, s);
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

export default AppointmentEdit;