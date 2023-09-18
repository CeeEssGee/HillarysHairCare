import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "reactstrap";
import { getStylists } from "../../data/stylistData";

export default function StylistList() {
    const [stylists, setStylists] = useState([]);

    useEffect(() => {
        getStylists().then(setStylists);
    }, []);

    const getAllStylists = () => {
        getStylists().then(setStylists)
    };

    const handleActivate = (e) => {
        e.preventDefault()
    }

    const handleDeactivate = (e) => {
        e.preventDefault()
    }

    if (stylists.length === 0) {
        return <Spinner />
    }

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Stylists</h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Active?</th>
                        <th>Activate</th>
                        <th>Deactivate</th>
                    </tr>
                </thead>
                <tbody>
                    {stylists.map((s) => (
                        <tr key={`stylists-${s.id}`}>
                            <th scope="row">{s.id}</th>
                            <td>{s?.name}</td>
                            <td>{s?.isActive.toString()}</td>

                            {s.isActive ? (
                                <td>

                                    <Button
                                        color='danger'
                                        value={s.id}
                                        onClick={handleDeactivate}
                                    >Deactivate</Button>
                                </td>
                            ) : (
                                <td>

                                </td>
                            )}

                            {s.isActive ? (
                                <td>

                                </td>
                            ) : (
                                <td>
                                    <Button
                                        color='secondary'
                                        value={s.id}
                                        onClick={handleActivate}
                                    >Activate</Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );

}