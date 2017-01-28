import React, {Component} from 'react';

export default class ExpandableListHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.state.data) {
            this.setState({data: nextProps.data});
        }
    }

    render() {
        let {style, actAsExpander, children, _handleExpand} = this.props;
        let {data} = this.state;
        if (!style) {
            style = {
                display: 'flex',
                border: '1px solid #aaa',
                width: '100%',
                height: '50px',
                fontSize: '1.5rem',
                backgroundColor: "#fff"
            };
        }
        return (
            <div style={style}>
                {React.Children.map(children, (cell) => {
                    return React.cloneElement(cell, {data, _handleExpand});
                })}
            </div>
        );
    }
}