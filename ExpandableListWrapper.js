import React, {Component} from 'react';
import ExpandableListData from './ExpandableListData';
import ExpandableListFooter from './ExpandableListFooter';
import ExpandableListHeader from './ExpandableListHeader';

export default class ExpandableListWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.state.data) {
            this.setState({data: nextProps.data});
        }
    }
    renderChildComponent = (child, data) => {
        switch (child.type) {
            case ExpandableListData: {
                return React.cloneElement(child, {data});
            }
            case ExpandableListFooter: {
                return React.cloneElement(child, {data});
            }
            case ExpandableListHeader: {
                return React.cloneElement(child, {data});
            }
            default: {
                return React.cloneElement(child, {data});
            }
        }
    }

    render() {
        let {children, style} = this.props;
        let {data} = this.state;
        return (
            <div style={style}>
                {React.Children.map(children, (child) => {
                    return this.renderChildComponent(child, data)
                })
                }
            </div>
        );
    }
}