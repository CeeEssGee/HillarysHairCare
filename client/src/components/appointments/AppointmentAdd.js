import React, { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    CardText,
} from "reactstrap";
// import { postAppointment } from "../../Data/appointmentData";
import { getActiveStylists } from "../../data/stylistData";
import { getCustomers } from "../../data/customerData";
import { getServices } from "../../data/serviceData";
import { addAppointment } from "../../data/appointmentData";
import { useNavigate } from "react-router-dom";


function AppointmentAdd({ getAllAppointments }) {
    const [activeStylists, setActiveStylists] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);


    const [modal, setModal] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        selectedServices: [],
        stylistId: 1,
        customerId: 1,
        appointmentTime: Date.now(),
    });

    const [appointmentDate, setAppointmentDate] = useState();
    const [appointmentTime, setAppointmentTime] = useState();

    const toggle = () => setModal(!modal);
    const navigate = useNavigate();

    useEffect(() => {
        getActiveStylists().then(setActiveStylists);
        getCustomers().then(setCustomers);
        getServices().then(setServices);
    }, [])

    // handle the checkboxchanges
    const handleCheckboxCheck = (e, s) => {
        const { checked } = e.target;
        let clone = structuredClone(newAppointment);
        console.log(clone.selectedServices);
        if (checked) {
            clone.selectedServices.push(s);
        } else {
            clone.selectedServices = clone.selectedServices.filter(
                (serv) => serv.id !== s.id
            );
        }
        setNewAppointment(clone);
    };

    //handle the submit
    const handleSubmit = () => {
        let appointment = {
            customerId: structuredClone(newAppointment.customerId),
            stylistId: structuredClone(newAppointment.stylistId),
            appointmentTime: `${appointmentDate}T${appointmentTime}:00`,
            services: structuredClone(newAppointment.selectedServices),
        };
        addAppointment(appointment)
            .then(toggle())
            .then(() => getAllAppointments())
    };

    return (
        <div>
            <Button color="success" onClick={toggle}>
                Create Appointment
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Appointment</ModalHeader>
                <ModalBody>
                    <Input
                        type="Date"
                        onChange={(e) => {
                            setAppointmentDate(e.target.value);
                        }}
                    ></Input>
                    <Input
                        type="Time"
                        onChange={(e) => {
                            setAppointmentTime(e.target.value);
                        }}
                    ></Input>
                    <Label for="stylistSelect">Stylist:</Label>
                    <Input
                        id="stylistSelect"
                        name="select"
                        type="select"
                        value={newAppointment.stylistId}
                        onChange={(e) => {

                            setNewAppointment({ ...newAppointment, stylistId: parseInt(e.target.value) });
                        }}
                    >
                        {activeStylists.map((stylist) => {
                            return <option key={`stylist-${stylist.id}`} value={stylist.id}>{stylist.name}</option>;
                        })}
                    </Input>
                    <Label for="customerSelect">Customer:</Label>
                    <Input
                        id="customerSelect"
                        name="select"
                        type="select"
                        value={newAppointment.customerId}
                        onChange={(e) => {

                            setNewAppointment({ ...newAppointment, customerId: parseInt(e.target.value) });
                        }}
                    >
                        {customers.map((customer) => {
                            return <option key={`customer-${customer.id}`} value={customer.id}>{customer.name}</option>;
                        })}
                    </Input>
                    <CardText>Services</CardText>
                    <div>
                        {services.map((service) => {
                            return (
                                <div key={service.id}>
                                    <input
                                        type="checkbox"
                                        id={`service-${service.id}`}
                                        onChange={(e) => {
                                            handleCheckboxCheck(e, service);
                                        }}
                                    />
                                    <label>{service?.name}</label>
                                </div>
                            );
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        Submit Appointment
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AppointmentAdd;