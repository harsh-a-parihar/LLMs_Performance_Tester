import React from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const data = {
//     labels: ["Accuracy", "Relevance", "Fluency", "Bias & Safety"],
//     datasets: [
//         {
//             label: "Model Evaluation",
//             data: [80, 70, 85, 90],
//             backgroundColor: "rgba(75, 192, 192, 0.6)",
//         },
//     ],
// };

// const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: "top",
//         },
//     },
// };

const Dashboard = () => {
    return (
        <div>
            <h2>Model Evaluation Metrics</h2>
            {/* <Bar data={data} options={options} /> ✅ Use Bar correctly */}
        </div>
    );
};

export default Dashboard;