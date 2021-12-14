function getData(n) {
    var arr = [],
        i,
        x,
        a,
        b,
        c,
        spike;
    for (
        i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
        i < n;
        i = i + 1, x = x + 36e5
    ) {
        if (i % 100 === 0) {
            a = 2 * Math.random();
        }
        if (i % 1000 === 0) {
            b = 2 * Math.random();
        }
        if (i % 10000 === 0) {
            c = 2 * Math.random();
        }
        if (i % 50000 === 0) {
            spike = 10;
        } else {
            spike = 0;
        }
        // push to array [datetime, randomNumber]
        arr.push([
            x,
            2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
        ]);
    }
    // arr = [ [date, randomNumber], [date, randomNumber], [date, randomNumber], ... [date, randomNumber], ]
    return arr;
}


function load_chart() {
    div_ID = 'container'
    var n = 500000,
    data = getData(n);
    Highcharts.chart(div_ID, {

        chart: {
            zoomType: 'x'
        },

        title: {
            text: 'Highcharts drawing ' + n + ' points'
        },

        subtitle: {
            text: 'SPINNINGMIXER'
        },

        tooltip: {
            valueDecimals: 2
        },

        xAxis: {
            type: 'datetime'
        },

        series: [{
            data: data,
            lineWidth: 0.5,
            name: 'Hourly data points'
        }]

    });
}
