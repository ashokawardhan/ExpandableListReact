import React, {Component} from 'react';

export default class ExpandableListExpandable extends Component {
    constructor(props) {
        super(props);
        this.state = {datum: props.datum};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.datum != this.state.datum) {
            this.setState({datum: nextProps.datum});
        }
    }

    render() {
        let {style, actAsExpander, index, children, _handleExpand} = this.props;
        let {datum} = this.state;
        if (!style) {
            style = {display: 'flex', width: '100%', fontSize: '1.5rem'};
        }
        return (
            <div style={style} onClick={e => {
                return (actAsExpander ? _handleExpand(e, index) : null)
            }}>
                {React.Children.map(children, (cell) => {
                    return React.cloneElement(cell, {datum, index, _handleExpand});
                })}
            </div>
        );
    }
}