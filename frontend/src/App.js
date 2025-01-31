import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [question, setQuestion] = useState("");
    const [model, setModel] = useState("chatgpt");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/history")
            .then((res) => setHistory(res.data))
            .catch((err) => console.error("Error fetching history:", err));
    }, []);

    const askModel = async () => {
        if (!question.trim()) {
            alert("Please enter a question!");
            return;
        }

        setLoading(true);
        setResponse("");

        try {
            const res = await axios.post(
                "http://localhost:5000/query",
                { question, model },
                { headers: { "Content-Type": "application/json" } }
            );

            setResponse(res.data.response);
            setHistory([
                ...history,
                { question, model, response: res.data.response },
            ]);
        } catch (error) {
            console.error(
                "Error:",
                error.response ? error.response.data : error.message
            );
            alert("Failed to get response from backend!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>LLM Model Comparison</h1>

            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Enter your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={styles.input}
                />
                <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    style={styles.select}
                >
                    <option value="chatgpt">ChatGPT (OpenChat)</option>
                    <option value="mistral">Mistral</option>
                    <option value="llama3">LLaMA 3</option>
                    <option value="deepseek">DeepSeek</option>
                    <option value="phi">Phi2</option>
                    <option value="gemma">Gemma</option>
                </select>
                <button onClick={askModel} style={styles.button}>
                    Query
                </button>
            </div>

            {loading && <p style={styles.loading}>Generating response...</p>}

            {response && (
                <div style={styles.responseContainer}>
                    <h3 style={styles.responseHeader}>
                        Response from {model}:
                    </h3>
                    <pre style={styles.response}>{response}</pre>
                </div>
            )}

            <h2 style={styles.tableHeader}>Comparison Table</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeaderCell}>Question</th>
                        <th style={styles.tableHeaderCell}>Model</th>
                        <th style={styles.tableHeaderCell}>Response</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                        <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableCell}>{entry.question}</td>
                            <td style={styles.tableCell}>{entry.model}</td>
                            <td style={styles.tableCell}>{entry.response}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    header: {
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#333",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        marginBottom: "30px",
    },
    input: {
        width: "80%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    select: {
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    button: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
    },
    loading: {
        color: "#007bff",
        fontSize: "16px",
    },
    responseContainer: {
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
    },
    responseHeader: {
        marginBottom: "10px",
        color: "#333",
    },
    response: {
        fontFamily: "monospace",
        fontSize: "14px",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
    },
    tableHeader: {
        marginTop: "30px",
        marginBottom: "10px",
        fontSize: "1.5rem",
        color: "#333",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    tableHeaderCell: {
        padding: "15px",
        backgroundColor: "#007bff",
        color: "white",
        borderBottom: "1px solid #ddd",
    },
    tableRow: {
        backgroundColor: "#f9f9f9",
        borderBottom: "1px solid #ddd",
    },
    tableCell: {
        padding: "10px",
        textAlign: "left",
        fontSize: "14px",
    },
};

export default App;