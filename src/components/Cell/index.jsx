import React from 'react';
import './cell.scss';

class Cell extends React.Component {

    render() {
        const { value, clickHandler } = this.props;

        return (
            <span className="square" onClick={() => { clickHandler() }}>{value}</span>
        );
    }
}

export default Cell;
