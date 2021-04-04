import React from 'react';
import Cell from '../Cell';

class Board extends React.Component {
    componentDidMount() {
        this.findClickables(this.props.board, this.props.size);
        document.body.addEventListener('keydown', (event) => {this.handleKeyPress(event)});
    }

    componentWillReceiveProps(nextProps) {
        this.findClickables(nextProps.board, nextProps.size);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', (event) => {this.handleKeyPress(event)})
    }

    shouldComponentUpdate(nextProps) {
        const curr = this.props.board.join('');
        const next = nextProps.board.join('');
        return curr !== next;
    }



    findClickables(board, size) {
        const zeroIndex = board.indexOf(size*size);
        const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
        const possibleTopIdx = zeroCoordinate.row > 0 ? this.getIndexFromCoord(zeroCoordinate.row - 1, zeroCoordinate.column, size) : null;
        const possiblRightIdx = zeroCoordinate.column < size ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column + 1, size) : null;
        const possiblBottomIdx = zeroCoordinate.row < size ? this.getIndexFromCoord(zeroCoordinate.row + 1, zeroCoordinate.column, size) : null;
        const possibleLeftIdx = zeroCoordinate.column > 1 ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column - 1, size) : null;

        this.setState({
            zero: zeroIndex,
            possibleTopIdx: possibleTopIdx,
            possiblRightIdx: possiblRightIdx,
            possiblBottomIdx: possiblBottomIdx,
            possibleLeftIdx: possibleLeftIdx
        });
    }

    getCoordFromIndex(idx, size) {
        return {row: Math.floor(idx / size) + 1, column: (idx % size) + 1};
    }

    getIndexFromCoord(row, col, size) {
        return (size * (row - 1)) + col - 1;
    }

    cellClickHandler(index) {
        console.log("key pressed: ", index);
        if (index === this.state.possibleTopIdx ||
            index === this.state.possiblRightIdx ||
            index === this.state.possiblBottomIdx ||
            index === this.state.possibleLeftIdx
        ) {
            this.updateBoard(index);
        }
    }

    updateBoard(index, direction) {
        const board = this.props.board.slice();
        const temp = board[index];
        board[index] = board[this.state.zero];
        board[this.state.zero] = temp;
        this.props.updateBoard(board);
    }

    render() {
        const size = this.props.size;
        let squares = [];

/*        let docWidth = document.body.clientWidth,
            docHeight = document.body.clientHeight;
            const maxWidth = parseInt(docWidth / size) - 10,
            maxHeight = parseInt((docHeight - 200) / size),
            unit = maxHeight > maxWidth ? maxWidth : maxHeight; */
            const maxWidth = 80,
            maxHeight = 80,
            unit = maxHeight > maxWidth ? maxWidth : maxHeight;

        this.props.board.map((val, index) => {
            squares.push(
                <div>
                <Cell
                    key={index}
                    value={val}
                    size={size}
                    clickHandler={() => this.cellClickHandler(index)}
                    right={index+1 === val}
                    unit={unit}
                />
                </div>
            );

/*             if ((index + 1) % size === 0) {
                squares.push(<br key={`br_${index}`} />)
            } */
        });

        return (
            <div className='board'>
              {squares}
            </div>
        );
    }
}

export default Board;
