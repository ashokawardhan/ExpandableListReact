import React from 'react';
const getObjectFromStringKey = (path, obj) => {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : undefined
    }, obj || self);
};

export const TextCell = (props) => {
	let style = props.style;
	if (!style) {
		style = {}
	}
	return (<div style={style}>{getObjectFromStringKey(props.getKey, props.datum)}</div>);
};

export const ImageCell = (props) => {
	let style = props.style;
	if (!style) {
		style = {height: '100%'}
	}
	return (<img style={style} src={getObjectFromStringKey(props.getKey, props.datum)}/>);
};

export const SpanCell = (props) => {
	let style = props.style;
	if (!style) {
		style = {}
	}
	return (<span style={style}>{getObjectFromStringKey(props.getKey, props.datum)}</span>);
};
