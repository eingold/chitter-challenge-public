import React from 'react'

const Error = ({ errors }) => {
    const mapErrors = () => {
        return <ul>{errors.map((e, i) => {
            let errorMessage = `Error: ${e.msg}`;
            if (e.msg === "Invalid value") errorMessage += ` in ${e.param}`;
            return < li key={i} ><h3>{errorMessage}</h3></li>
        })
        }</ul>
    }

    return (
        <>{mapErrors()}</>
    )
}

export default Error