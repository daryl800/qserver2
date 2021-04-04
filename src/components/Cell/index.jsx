import React from 'react';
import './cell.scss';

class Cell extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.value === nextProps.value && this.props.unit === nextProps.unit) {
            return false;
        }

        return true;
    }

    render() {
        const {value, size, clickHandler, unit} = this.props;

        let cls = `square square-${unit}`
        cls = value === size*size ? `${cls} zero` : cls;

        return (
            <span className={cls} onClick={() => {clickHandler()}}>{value}</span>
        );
    }
}

export default Cell;
