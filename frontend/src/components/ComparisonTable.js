import React from "react";

const ComparisonTable = ({ history }) => {
    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Model</th>
                    <th>Response</th>
                </tr>
            </thead>
            <tbody>
                {history.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.question}</td>
                        <td>{entry.model}</td>
                        <td>{entry.response}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ComparisonTable;