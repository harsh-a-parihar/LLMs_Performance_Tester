import React from "react";

const ResponseDisplay = ({ response, model }) => {
    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Response</h3>
            <p>{response}</p>
            <p>Model: {model}</p>
        </div>
    );
};

export default ResponseDisplay;