import React from 'react';
import './cell.scss';

class Cell extends React.Component {

    render() {
        const { value, clickHandler } = this.props;

        let cls = value === 'X' ? `square-1` : `square-2`;
        console.log("cls: " + cls);

        return (
            <span className={cls} onClick={() => { clickHandler() }}>{value}</span>
        );
    }
}

export default Cell;
