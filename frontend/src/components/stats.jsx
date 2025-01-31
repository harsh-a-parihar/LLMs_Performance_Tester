import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/stats").then(res => setData(res.data));
    }, []);

    const chartData = {
        labels: data.map(item => item.model),
        datasets: [
            {
                label: "Response Length",
                data: data.map(item => item.avgLength),
                backgroundColor: ["blue", "red", "green", "purple"],
            }
        ]
    };

    return (
        <div>
            <h1>Model Performance Dashboard</h1>
            <Bar data={chartData} />
        </div>
    );
};

export default Dashboard;