import React from 'react';
import firebase from 'firebase';
import Board from '../Board';
import './queue.scss';


import db from '../../FirebaseConfig';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [1, 2, 3, 4, 5, 6, 7, 8, 0],
            size: 0,
            servingQNum: 0,
            lastQNum: 0
        };
    }

    componentDidMount() {
        this.newGame(this.state.size);
        this.FireStore();
    }

    newGame(size) {
//        const num = size * size;
        const num = size;
        let goal = [];
        console.log ("size = ", size);
        for (let i = 1; i <= num; i++) goal.push(i);

        const board = goal;
        this.setState({ size, board, goal});
    }

    updateBoard(board) {
        if (!this.state.done) {
            let move = this.state.move;
            this.setState({ board, move: move + 1 }, () => {
                this.setState({done: this.checkDone()});
            });
        }
    }

    addToQueue(i)
    {
        this.setState({
            board: this.state.board.concat(i)
          })
    }

    updateServingQNum(i)
    {
        let arrayPosition = i - 1;
        // 1. Make a shallow copy of the items
        let board = [...this.state.board];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...board[arrayPosition]};
        // 3. Replace the property you're intested in
        item = 'X';
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        board[arrayPosition] = item;
        // 5. Set the state to our new copy
        this.setState({board});
    }

    next()
    {   
        if (this.state.servingQNum < this.state.lastQNum)
        {
            db.collection("SweeCafe").doc('queue_' + this.props.queue).update({
                serving_no: firebase.firestore.FieldValue.increment(1)      
            }, { merge: true })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
        else
        {
            alert("Alert:  Reached end of queue!");
        }
//        this.fetchData();
    }

    reset()
    {   
        db.collection("SweeCafe").doc('queue_' + this.props.queue).set({     
            serving_no: 0,
            rear_no: 1
        }, { merge: true })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        this.newGame(this.state.size);
        this.setState({lastQNum: 0});
        this.FireStore();
    }
    

    updateQueue (queueName)
    {
        db.collection("SweeCafe").doc(queueName)
        .onSnapshot({
            // Listen for document metadata changes
            includeMetadataChanges: true
            },(doc) => {
                let rear_no = doc.data().rear_no;
                let serving_no = doc.data().serving_no;
                console.log ('serving_no: ', serving_no);
                console.log ('this.state.servingQNum: ', this.state.servingQNum);
        //     if (this.state.lastQNum == 0 || serving_no > this.state.servingQNum)

                if (this.state.lastQNum == 0 )
                {
                //    console.log ('serving_no > this.state.servingQNum');
                    for (let i = 1; i <= rear_no; i++)
                    {
                        if (i <= serving_no)
                        {this.addToQueue('X');}
                        else
                        {this.addToQueue(this.props.queue + i);}
                    } 
                    this.setState({lastQNum: rear_no});
                }
                else if (rear_no > this.state.lastQNum)
                {
                    this.addToQueue(this.props.queue + rear_no);
                    this.setState({lastQNum : rear_no});
                } else  if (serving_no > this.state.servingQNum)
                {
                    this.updateServingQNum(serving_no);
                }
                this.setState({servingQNum: serving_no})
        });

    }

    FireStore = () => {
        this.updateQueue("queue_"+ this.props.queue)
    /*             switch (this.props.queue) {
                    case "A":
                        this.updateQueue("queue_A");
                    break;
                    case "B":
                        this.updateQueue("queue_B");
                    break;
                    case "C":
                        this.updateQueue("queue_C");
                    default:
                        // default
                } */
        }

        render() {
            return (
                <div className='queue'>
                {/*  <div className="queue-header">
                        {this.state.done ? <h3>You won!</h3> : ''} 
                    </div> */}
                    <div className='displayBox'>
                        <p>Currently serving:</p>
                        <h3> {this.props.queue} {this.state.servingQNum}</h3>
                    </div>
                    <div className="queue-body">
                        {this.state && this.state.board ?
                            <Board
                                size={this.state.size}
                                board={this.state.board}
                                updateBoard={this.updateBoard.bind(this)}
                            />
                            : null
                        }
                    </div>
                    {/*                 <Footer
                        move={this.state.move}
                        start={this.state.start}
                        done={this.state.done}
                        newGame={this.newGame.bind(this)}
                    /> */}  
                <button className='nextButton' variant="primary" onClick={this.next.bind(this)}>Next</button>
                <br></br>
                <button className='nextButton' variant="primary" onClick={this.reset.bind(this)}>RESET</button>
                </div>
                
            );
        }
}

export default Queue;
