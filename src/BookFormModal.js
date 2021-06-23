import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class BookFormModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        newName: '',
        newDesc: '',
        newStatus: '',
        newBookData: []
    }
}

    sendForm = (event) => {
        event.preventDefault()

        const reqBody = {
            email: this.props.auth0.user.email,
            name: this.state.newName,
            description: this.state.newDesc,
            status: this.state.newStatus
        }

        // to send a request for creating new data, we will be using the POST method
        axios.post(`${process.env.REACT_APP_SERVER_URL}/books`, reqBody).then(response => {
            this.setState({
                newBookData: response.data.books
            })
            this.props.newBook(response.data);
        })
        .catch (error =>
            alert(error.message)
        )
    }

    render(){
        return(
            <Modal show={this.props.formStatus} onHide={this.props.modalClosed}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.sendForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(event) => this.setState({ newName: event.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" onChange={(event) => this.setState({ newDesc: event.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Book status</Form.Label>
                        <Form.Control type="text" placeholder="Enter Status" onChange={(event) => this.setState({ newStatus: event.target.value })} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Add Book</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.modalClosed}>Close</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}
export default withAuth0(BookFormModal);