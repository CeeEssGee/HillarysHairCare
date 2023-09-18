import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "reactstrap";
import { getServices } from "../../data/serviceData";

export default function ServiceList() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        getServices().then(setServices);
    }, []);

    const getAllServices = () => {
        getServices().then(setServices)
    };

    if (services.length === 0) {
        return <Spinner />
    }

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Services</h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((s) => (
                        <tr key={`services-${s.id}`}>
                            <th scope="row">{s.id}</th>
                            <td>{s?.name}</td>
                            <td>${s?.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );

}