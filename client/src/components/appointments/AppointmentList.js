import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "reactstrap";
import { cancelAppointment, getAppointments } from "../../data/appointmentData";
import AppointmentAdd from "./AppointmentAdd";
import AppointmentEdit from "./AppointmentEdit";
import { useNavigate } from "react-router-dom";
import { getServices } from "../../data/serviceData";


export default function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAppointments().then(setAppointments);
        getServices().then(setServices);
    }, []);

    const getAllAppointments = () => {
        getAppointments().then(setAppointments)
    };

    const handleCancel = (e) => {
        e.preventDefault();
        cancelAppointment(e.target.value)
            .then(() => getAllAppointments())
    }



    if (appointments.length === 0) {
        return <Spinner />
    }

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Appointments</h4>
                <AppointmentAdd getAllAppointments={getAllAppointments} />
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Appointment Time</th>
                        <th>Customer Name</th>
                        <th>Stylist Name</th>
                        <th>Service Details</th>
                        <th>Total Price</th>
                        {/* <th>Cancelled?</th> */}
                        <th>Cancel?</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((a) => (
                        <tr key={`appointments-${a.id}`}>
                            <th scope="row">{a.id}</th>
                            <td>{a?.appointmentTime}</td>
                            <td>{a?.customer?.name}</td>
                            <td>{a?.stylist?.name}</td>

                            <td><AppointmentEdit
                                appointment={a}
                                getAllAppointments={getAllAppointments}
                                services={services}
                            /> </td>
                            <td>${a?.totalCost}</td>
                            {/* <td>{a?.isCancelled.toString()}</td> */}

                            {a.isCancelled ? (
                                <td>

                                </td>
                            ) : (
                                <td>
                                    <Button
                                        color='danger'
                                        value={a.id}
                                        onClick={handleCancel}
                                    >Cancel</Button>
                                </td>
                            )

                            }

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );

}