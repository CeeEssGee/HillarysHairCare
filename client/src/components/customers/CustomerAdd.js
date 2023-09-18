import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText, Input } from 'reactstrap';
import { addCustomer } from '../../data/customerData';

function CustomerAdd({ getAllCustomers }) {
    const [modal, setModal] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");

    const toggle = () => setModal(!modal);

    const handleSubmitCustomer = (e) => {
        e.preventDefault()

        const customerToSendToAPI = {
            name: customerName,
            email: customerEmail,
            phoneNumber: customerPhoneNumber
        }

        addCustomer(customerToSendToAPI)
            .then(() => toggle())
            .then(() => getAllCustomers())
    }

    return (
        <div>
            <Button color="success" onClick={toggle}>
                Add Customer
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupText>
                            Name:
                        </InputGroupText>
                        <Input placeholder="customerName" onChange={(e) => setCustomerName(e.target.value)} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupText>
                            Email:
                        </InputGroupText>
                        <Input placeholder="customerEmail" onChange={(e) => setCustomerEmail(e.target.value)} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupText>
                            Phone Number:
                        </InputGroupText>
                        <Input placeholder="customerPhoneNumber" onChange={(e) => setCustomerPhoneNumber(e.target.value)} />
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitCustomer}>
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

export default CustomerAdd;