import React from 'react'

const GroupDetail = (props) => {
    const { group } = props;
    console.log("props", props)

    return (
        <>
            <h4>{group.groupName}</h4>
        </>
    )
}

export default GroupDetail;