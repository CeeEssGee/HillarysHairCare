import { useEffect, useState } from "react";
import { getCustomers } from "../../data/customerData";
import { Button, Spinner, Table } from "reactstrap";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers().then(setCustomers);
    }, []);

    const getAllCustomers = () => {
        getCustomers().then(setCustomers)
    };

    if (customers.length === 0) {
        return <Spinner />
    }

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Customers</h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Schedule</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={`customers-${c.id}`}>
                            <th scope="row">{c.id}</th>
                            <td>{c?.name}</td>
                            <td>{c?.email}</td>
                            <td>{c?.phoneNumber}</td>
                            <td><Button
                                color="primary"
                                value={c.id}
                            >Schedule</Button></td>
                            <td><Button
                                color="secondary"
                                value={c.id}
                            >Edit</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );

}