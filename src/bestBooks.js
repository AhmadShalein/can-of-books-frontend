import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react'; 
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import AddBookButton from './AddBookButton';
import DeleteBookButton from './DeleteBookButton';

class BestBooks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bookData:[],
            showModel:true,
        }
    }

    booksDataAfterDelete = (newDataAfterDelete) => {
        this.setState({
            bookData: newDataAfterDelete
        })
    }

    componentDidMount = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.auth0.user.email}`).then(response => {
        console.log(response.data);
        this.setState({
            bookData: response.data,
            showModel: true
        })
        console.log(this.state.bookData);
    })
    // .catch(
    //     error => {
    //         alert(error.message);
    //     }
    // );
    }

    newBook = (newBookData) => {
        this.setState({
            bookData : newBookData
        })
    }

    render(){
        return(
            <>
            <AddBookButton newBook={this.newBook} />
                 {/* <Carousel >
                    {this.state.showModel && this.state.bookData.map((item,index) => (
                    <Carousel.Item>
                     <img
                    className="d-block w-100"
                    src={item.bookUrl}
                    alt={item.name}
                    /> 
                     <Carousel.Caption > 
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>{item.status}</p>
                    </Carousel.Caption>
                    <DeleteBookButton bookIndex={index} booksDataAfterDelete={this.booksDataAfterDelete} />
                    </Carousel.Item> 
                      ))}
                 </Carousel>  */}

                    <Card>
                    {this.state.showModel && this.state.bookData.map((item,index) => (
                    <Card.Body>
                        <Card.Text>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>{item.status}</p>
                        </Card.Text>
                        <DeleteBookButton bookIndex={index} booksDataAfterDelete={this.booksDataAfterDelete} />
                    </Card.Body>
                    ))}
                    </Card>
            </>
        );
}
}

export default withAuth0(BestBooks);