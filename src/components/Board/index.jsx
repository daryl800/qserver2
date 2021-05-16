import React from 'react';
import Cell from '../Cell';

class Board extends React.Component {
    //     componentDidMount() {
    //         this.findClickables(this.props.board, this.props.size);
    //         document.body.addEventListener('keydown', (event) => {this.handleKeyPress(event)});
    //     }

    //     componentWillReceiveProps(nextProps) {
    //         this.findClickables(nextProps.board, nextProps.size);
    //     }

    //     componentWillUnmount() {
    //         document.body.removeEventListener('keydown', (event) => {this.handleKeyPress(event)})
    //     }

    //     shouldComponentUpdate(nextProps) {
    //         const curr = this.props.board.join('');
    //         const next = nextProps.board.join('');
    //         return curr !== next;
    //     }

    cellClickHandler(index) {
        alert(index + ' clicked');
    }

    render() {
        let squares = [];

        this.props.board.map((val, index) => {
            console.log("val: " + val + " || index: " + index);
            squares.push(
                <div>
                    <Cell
                        key={index}
                        value={val}
                        clickHandler={() => this.cellClickHandler(index)}
                    />
                </div>
            );
        });

        return (
            <div className='board'>
                {squares}
            </div>
        );
    }
}

export default Board;
