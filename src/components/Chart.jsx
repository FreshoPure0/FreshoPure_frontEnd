import React from 'react';
import Chart from "react-apexcharts";
import { BarChart, LineChart, donutChart } from '../data/chart'; // Import the data

function Charts() {
    return ( 
         <div className="w-full flex flex-row mb-2">
          {/* Donut Chart */}
          <div className='bg-[#fbf5ec] mx-2 mb-2 flex flex-1 flex-col rounded-md shadow items-center  '>
            <p className='font-semibold my-4'>Percentage of sales</p>
          <Chart
            options={donutChart.options}  // Use donut chart options from the imported object
            series={donutChart.series}    // Use donut chart series from the imported object
            type="donut"
            width="260" // Adjust the width to fill the container
          />
          </div>
          <div className='bg-[#fbf5ec] mx-2 mb-2 flex flex-1 flex-col rounded-md shadow items-center justify-center '>
            <p className='font-semibold my-4'>Sales per item</p>
          {/* Bar Chart */}
          <Chart
            options={BarChart.options}  // Use imported bar chart options
            series={BarChart.series}    // Use imported bar chart series
            type="bar"
            width="260"  // Adjust the width to fill the container
            height="160" // Adjust the height to fit the div
          />
          </div>
          <div className='bg-[#fbf5ec] mx-2 mb-2 flex flex-1 flex-col rounded-md shadow items-center justify-center '>
            <p className='font-semibold my-4'>Monthly sales comparison</p>
          {/* Line Chart */}
          <Chart
            options={LineChart.options}  // Use imported line chart options
            series={LineChart.series}    // Use imported line chart series
            type="line"
            width="260"  // Adjust the width to fill the container
            height="160" // Adjust the height to fit the div
          />
          </div>
        </div>
     );
}

export default Charts;