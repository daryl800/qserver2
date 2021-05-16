import React from 'react';
import firebase from 'firebase';
import Board from '../Board';
import './queue.scss';

import db from '../../FirebaseConfig';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            servingQNum: 0,
            lastQNum: 0
        };
    }

    componentDidMount() {
        this.updateQueue("queue_" + this.props.queue);
    }

    // shouldComponentUpdate() {
    //     console.log("shouldComponentUpdate");
    //     this.updateQueue("queue_" + this.props.queue);
    // }

    addToQueue(i, rear_num_from_firebase, serving_num_from_firebase) {
        console.log("add to Queue");
        this.setState({
            board: this.state.board.concat(i),
            lastQNum: rear_num_from_firebase,
            servingQNum: serving_num_from_firebase
        })
    }


    updateQueue(queueName) {
        console.log("updateQueue called");
        db.collection("SweeCafe").doc(queueName)
            .onSnapshot({
                // Listen for document metadata changes
                includeMetadataChanges: true
            }, (doc) => {
                let queue_name_from_firebase = doc.data().name;
                let rear_num_from_firebase = doc.data().rear_no;
                let serving_num_from_firebase = doc.data().serving_no;
                console.log('queue_name: (firebase)', queue_name_from_firebase);
                console.log('serving_no: (firebase)', serving_num_from_firebase);
                console.log('servingQNum: (local)', this.state.servingQNum);
                console.log('lastQNum: (local)', this.state.lastQNum);

                if (this.state.lastQNum == 0) {  // Local UI is not set (i.e. page is empty before loaded from firebase.)
                    console.log("A ...");
                    for (let i = 1; i <= rear_num_from_firebase; i++) {
                        if (i <= serving_num_from_firebase) { this.addToQueue('X', rear_num_from_firebase, serving_num_from_firebase); }  // put 'X' to cell which has been served
                        else { this.addToQueue(this.props.queue + i, rear_num_from_firebase, serving_num_from_firebase); }
                    }
                    //   this.setState({ lastQNum: rear_num_from_firebase });
                } else if (rear_num_from_firebase == 1 && serving_num_from_firebase == 0) { // Reset button pressed
                    console.log("B ...");
                    this.setState({ board: [], lastQNum: 0 });  // need to trigger to reload the queue on UI
                } else if (rear_num_from_firebase > this.state.lastQNum) {  // Add to queue when new ticket is added to Q in firebase
                    console.log("C ...");
                    console.log("rear_num_from_firebase: " + rear_num_from_firebase);
                    console.log("lastQNum: " + this.state.lastQNum);
                    this.addToQueue(this.props.queue + rear_num_from_firebase, rear_num_from_firebase, serving_num_from_firebase);
                    //    this.setState({ lastQNum: rear_num_from_firebase });
                } else if (serving_num_from_firebase > this.state.servingQNum) {  // Advance Serving queue number
                    console.log("D ...");
                    this.updateServingQNum(serving_num_from_firebase);
                }
                //                this.setState({ servingQNum: serving_num_from_firebase })
            });
    }

    updateServingQNum(serving_num_from_firebase) {  // put the 'X' mark to the queue in the right position 
        let arrayPosition = serving_num_from_firebase - 1;  // array starts from 0
        // 1. Make a shallow copy of the items
        let board = [...this.state.board];
        // 2. Make a shallow copy of the item you want to mutate
        let item = { ...board[arrayPosition] };
        // 3. Replace the property you're intested in
        item = 'X';
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        board[arrayPosition] = item;
        // 5. Set the state to our new copy
        this.setState({ board, servingQNum: serving_num_from_firebase });
    }

    next() {  // Update firebase when serving queue is advanced (on webpage)
        if (this.state.servingQNum < this.state.lastQNum) {
            // update document in Firestore
            db.collection("SweeCafe").doc('queue_' + this.props.queue).update({
                serving_no: firebase.firestore.FieldValue.increment(1)
            }, { merge: true })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }
        else {
            alert("Alert:  Reached end of queue!");
        }
        //        this.fetchData();
    }

    reset() {  // Update firebase when reset button in pressed (on webpage)
        db.collection("SweeCafe").doc('queue_' + this.props.queue).set({
            serving_no: 0,
            rear_no: 1
        }, { merge: true })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        // this.setState({ board: [], lastQNum: 0 });
    }

    render() {
        console.log("<<< rendering >>>");
        return (
            <div className='queue'>
                <div className='displayBox'>
                    <p>Currently serving: <strong> {this.props.queue}{this.state.servingQNum} </strong></p>
                    <p>Last in queue: <strong> {this.props.queue}{this.state.lastQNum} </strong></p>
                </div>
                <div className="queue-body">
                    <Board
                        board={this.state.board}
                    />
                </div>
                <button className='nextButton' variant="primary" onClick={this.next.bind(this)}>Next</button>
                <br></br>
                <button className='nextButton' variant="primary" onClick={this.reset.bind(this)}>RESET</button>
            </div>

        );
    }
}

export default Queue;
