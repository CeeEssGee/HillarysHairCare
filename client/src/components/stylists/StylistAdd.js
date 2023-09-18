import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText, Input } from 'reactstrap';
import { addCustomer } from '../../data/customerData';
import { addStylist } from '../../data/stylistData';

function StylistAdd({ getAllStylists }) {
    const [modal, setModal] = useState(false);
    const [stylistName, setStylistName] = useState("");
    const [stylistIsActive, setStylistIsActive] = useState(true);

    const toggle = () => setModal(!modal);

    const handleSubmitStylist = (e) => {
        e.preventDefault()

        const stylistToSendToAPI = {
            name: stylistName,
            isActive: true
        }

        addStylist(stylistToSendToAPI)
            .then(() => toggle())
            .then(() => getAllStylists())
    }

    return (
        <div>
            <Button color="success" onClick={toggle}>
                Add Stylist
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupText>
                            Name:
                        </InputGroupText>
                        <Input placeholder="stylistName" onChange={(e) => setStylistName(e.target.value)} />
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitStylist}>
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

export default StylistAdd;