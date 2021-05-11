import React, { Component } from "react";
import './app.scss';
import Queue from './components/Queue';
import Navbar from "./components/Navbar";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import FireStore from "./FireStore";

class App extends Component {
    render() {
        console.log("<<< rendering 1 >>>");
        return (
            <React.Fragment>
                <Navbar />
                <main className="container">
                    <Container>
                        <Row>
                            <Col>
                                <h3 className="header">Queue A</h3>
                                <div className="app__content">
                                    <div className="app__header">
                                    </div>
                                    <div className="app__body">
                                        <Queue queue={"A"} />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <h3 className="header">Queue B</h3>
                                <div className="app__content">
                                    <div className="app__header">
                                    </div>
                                    <div className="app__body">
                                        <Queue queue={"B"} />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <h3 className="header">Queue C</h3>
                                <div className="app__content">
                                    <div className="app__header">
                                    </div>
                                    <div className="app__body">
                                        <Queue queue={"C"} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </main>
            </React.Fragment>
        )
    }
}

export default App;
