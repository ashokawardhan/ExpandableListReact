import React, {Component} from 'react';
import ExpandableListRow from './ExpandableListRow';
import ExpandableListFooter from './ExpandableListFooter';
import ExpandableListExpandable from './ExpandableListExpandable';
import ExpandableListHeader from './ExpandableListHeader';

export default class ExpandableListData extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.state.data) {
            this.setState({data: nextProps.data});
        }
    }

    _handleExpand = (e, selectedIndex) => {
        e.preventDefault();
        let {data} = this.state;
     	let selectedDatum = {};
        let { onClick } = this.props;
        data = data.map((datum, index) => {
            if (index === selectedIndex) {
				selectedDatum = datum;
                datum.selected = !datum.selected;
            }
            return datum;
        });
        this.setState(data);
        if (onClick) {
        	onClick(selectedDatum);
        }
    }

    renderChildComponent = (child, datum, index) => {
        switch (child.type) {
            case ExpandableListRow: {
                return React.cloneElement(child, {datum, index, _handleExpand: this._handleExpand});
            }
            case ExpandableListExpandable: {
                return datum.selected ? React.cloneElement(child, {
                        datum,
                        index,
                        _handleExpand: this._handleExpand
                    }) : ''
            }
            default: {
                return React.cloneElement(child, {datum, index, _handleExpand: this._handleExpand});
            }
        }
    }

    render() {
        let {selectedStyle, children, inActiveStyle, activeStyle, actAsExpander, scrollable} = this.props;
        let {data} = this.state;
        if (!selectedStyle) {
            selectedStyle = {};
        }
        return (
            <div>
                {data.map((datum, index) => {
                    let datumSelectedStyle = datum.selected ? selectedStyle : {backgroundColor: "#fff"};
                    let datumActiveStyle = datum.inactive ? inActiveStyle : activeStyle;
                    let ulStyle = Object.assign(datumSelectedStyle, datumActiveStyle);
                    ulStyle = {...ulStyle, border: '1px solid #aaa', width: '100%'};
                    return <div style={ulStyle} onClick={e => {
                        return (actAsExpander ? this._handleExpand(e, index) : null)
                    }}>
                        {
                            React.Children.map(children, (child) => {
                                return this.renderChildComponent(child, datum, index)
                            })
                        }
                    </div>;
                })}
            </div>
        );
    }
}