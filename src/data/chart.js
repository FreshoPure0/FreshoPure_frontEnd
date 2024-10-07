// chartData.js
export const BarChart = {
  options: {
    colors: ['#896439'],
    chart: {
      toolbar: {
        show: false,
      },
      id: "basic-bar",
      scrollable: true // Enable scrollable chart
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1991, 1992, 1993, 1994, 1995, 1996],
      tickPlacement: 'on', // Ensures ticks are properly aligned
      range: 5 // Number of categories visible at once
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 55, 60, 70, 80, 90, 100, 110, 120]
    }
  ],
};


  export const LineChart = {
    options: {
        colors: ['#896439', '#89643940'],
        chart: {
          toolbar: {
            show: false,
          },
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996,]
        },
      },
      series: [
        {
          name: "series-1",
          data: [0, 40, 20, 50, 55, 60]
        },
        {
          name: "series-2",
          data: [10, 20, 40, 60, 75, 20]
        }
      ],
  };
  


  // donutChartData.js

export const donutChart = {
    options: {
        colors: ['#896439', '#F6B060', '#619524', '#89643966'],
    },
    series: [44, 55, 41, 17],
    labels: ['A', 'B', 'C', 'D']
  };