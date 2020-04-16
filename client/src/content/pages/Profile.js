import React from 'react';

export default function Feed(props) {
    return (
        <div>Here be a profile {props.user? "for " + props.user.name : ""}</div>
    )
}