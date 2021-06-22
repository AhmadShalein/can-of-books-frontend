import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react'; 
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'

class BestBooks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bookData:[],
            showModel:true,
        }
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
    .catch(
        error => {
            alert(error.message);
        }
    );
    }

    render(){
        return(
            <>
                {/* <Carousel >
                    {this.state.showModel && this.state.bookData.map((item) => (
                    <Carousel.Item>
                    {/* <img
                    className="d-block w-100"
                    src={item.bookUrl}
                    alt={item.name}
                    /> */}
                    {/* <Carousel.Caption > 
                    <h3>Hello </h3>
                    <p>{item.description}</p>
                    <p>{item.status}</p>
                    </Carousel.Caption>
                    </Carousel.Item> */}
                    {/* // ))}
                // </Carousel> */}

                    <Card>
                    {this.state.showModel && this.state.bookData.map((item) => (
                    <Card.Body>
                        <Card.Text>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>{item.status}</p>
                        </Card.Text>
                    </Card.Body>
                    ))}
                    </Card>
            </>
        );
}
}

export default withAuth0(BestBooks);