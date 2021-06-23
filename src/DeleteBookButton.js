import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class DeleteBookButton extends React.Component{

    deleteBook = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/books/${this.props.bookIndex}?email=${this.props.auth0.user.email}`).then(response => {
            this.props.booksDataAfterDelete(response.data)
        })
    }

    render(){
        return(
            <>
            <button onClick={this.deleteBook}>Delete Book</button>
            </>
        )
    }
}

 export default withAuth0(DeleteBookButton);