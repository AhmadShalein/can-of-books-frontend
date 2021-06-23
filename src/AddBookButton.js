import React from 'react';
import BookFormModal from './BookFormModal'

class AddBookButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            formStatus : false
        }
    }

    formStatusChanger = () => {
        this.setState({
            formStatus: true
        })
    }

    modalClosed = () => {
        this.setState({
            formStatus: false
        })
    }

    render(){
        return(
            <>
            <button onClick={this.formStatusChanger}>Add Book</button>
            <BookFormModal modalClosed={this.modalClosed} formStatus={this.state.formStatus} newBook={this.props.newBook} />
        </>
        )
    }
}

 export default AddBookButton;