import Chart from 'chart.js/auto';
import React from 'react';

const labels = ['January', 'February', 'March', 'April', 'May', 'June, July']

const data = {
    labels: labels,
    datasets: [{
        label: 'Dataset 1',
        data: [0, 10, 5, 2, 20, 30],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }],
}

const config = {
    type: 'line',
    data: data,
}

function LineChart() {
    return (
        <div>
            
        </div>
    )
}

export default function LineChart();