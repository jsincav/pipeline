var socket = io();
var ctx = $('#numberChart');

var numberData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [{
        label: 'Pre-Qualified Pipeline',
        backgroundColor: window.chartColors.red,
        borderColor: window.chartColors.red,
        data: [
            100,
            150,
            140,
            122,
            145,
            166,
            184
        ],
        fill: false,
    }, {
        label: 'Qualified Pipeline',
        fill: false,
        backgroundColor: window.chartColors.blue,
        borderColor: window.chartColors.blue,
        data: [
            44,
            87,
            12,
            88,
            90,
            122,
            100
        ],
    }, {
        label: 'Total Pipeline',
        fill: false,
        backgroundColor: window.chartColors.grey,
        borderColor: window.chartColors.grey,
        data: [
            200,
            220,
            240,
            202,
            232,
            200,
            250
        ],
    }]
}

$(function() {
    generateCharts();
});

function generateCharts() {

    var numberChart = new Chart(ctx, {
        type: 'line',
        data: numberData,
        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            }
        }
    });

    ctx = $('#ageChart');

    var ageChart = new Chart(ctx, {
        type: 'line',
        data: numberData,
        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            }
        }
    });
}
