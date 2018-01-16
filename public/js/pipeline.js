var socket = io();
var numberData;
var ageData;

socket.on('connect', function () {
    console.log('connected to server');
    socket.emit('chart');
});

socket.on('chart', function(data){
    console.log(data);
    setTableData(data);
    setChartData(data);
    generateCharts();
});

socket.on('update', function (data) {
    console.log(data);
    socket.emit('chart');
});

function setTableData (data) {
    $('#preQualifiedTableBody').empty();
    $('#preQualifiedTableBody').html(`<tr><th>${data.numResult.rows[6].num_pre_q}</th><th>${data.ageResult.rows[6].age_pre_q}</th></tr>`);

    $('#qualifiedTableBody').empty();
    $('#qualifiedTableBody').html(`<tr><th>${data.numResult.rows[6].num_post_q}</th><th>${data.ageResult.rows[6].age_post_q}</th></tr>`);

    $('#totalTableBody').empty();
    $('#totalTableBody').html(`<tr><th>${data.numResult.rows[6].num_total}</th><th>${data.ageResult.rows[6].age_total}</th></tr>`);
}

function setChartData (data) {
    $('#numberChart').empty();
    $('#ageChart').empty();
    var rows = data.numResult.rows;
   
    numberData = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [{
            label: 'Pre-Qualified Pipeline',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [
                rows[0].num_pre_q,
                rows[1].num_pre_q,
                rows[2].num_pre_q,
                rows[3].num_pre_q,
                rows[4].num_pre_q,
                rows[5].num_pre_q,
                rows[6].num_pre_q,
            ],
            fill: false,
        }, {
            label: 'Qualified Pipeline',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [
                rows[0].num_post_q,
                rows[1].num_post_q,
                rows[2].num_post_q,
                rows[3].num_post_q,
                rows[4].num_post_q,
                rows[5].num_post_q,
                rows[6].num_post_q,
            ],
        }, {
            label: 'Total Pipeline',
            fill: false,
            backgroundColor: window.chartColors.grey,
            borderColor: window.chartColors.grey,
            data: [
                rows[0].num_total,
                rows[1].num_total,
                rows[2].num_total,
                rows[3].num_total,
                rows[4].num_total,
                rows[5].num_total,
                rows[6].num_total,
            ],
        }]
    }

    rows = data.ageResult.rows;
    
    ageData = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [{
            label: 'Pre-Qualified Pipeline',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [
                rows[0].age_pre_q,
                rows[1].age_pre_q,
                rows[2].age_pre_q,
                rows[3].age_pre_q,
                rows[4].age_pre_q,
                rows[5].age_pre_q,
                rows[6].age_pre_q,
            ],
            fill: false,
        }, {
            label: 'Qualified Pipeline',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [
                rows[0].age_post_q,
                rows[1].age_post_q,
                rows[2].age_post_q,
                rows[3].age_post_q,
                rows[4].age_post_q,
                rows[5].age_post_q,
                rows[6].age_post_q,
            ],
        }, {
            label: 'Total Pipeline',
            fill: false,
            backgroundColor: window.chartColors.grey,
            borderColor: window.chartColors.grey,
            data: [
                rows[0].age_total,
                rows[1].age_total,
                rows[2].age_total,
                rows[3].age_total,
                rows[4].age_total,
                rows[5].age_total,
                rows[6].age_total,
            ],
        }]
    }
}

function generateCharts() {
    var ctx = $('#numberChart');

    var numberChart = new Chart(ctx, {
        type: 'line',
        data: numberData,
        options: {
            elements: {
                line: {
                    //tension: 0, // disables bezier curves
                }
            }
        }
    });

    ctx = $('#ageChart');

    var ageChart = new Chart(ctx, {
        type: 'line',
        data: ageData,
        options: {
            elements: {
                line: {
                    //tension: 0, // disables bezier curves
                }
            }
        }
    });
}
