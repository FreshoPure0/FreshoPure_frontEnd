/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { getAnalyticsChart } from "./../store/actions/hotel";

function Charts({ selectedCategory, filteredItems }) {
  const dispatch = useDispatch();
  const { weeklySalesData, sixMonthSalesData } = useSelector(
    (state) => state.hotel
  );

  // console.log("weeklySalesData", weeklySalesData);

  const salesData = filteredItems.map(
    (item) => item?.orderedItems?.totalPrice || 0
  );

  const formatAmount = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toFixed(2);
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weeklySalesAmounts = new Array(7).fill(0);
  const weeklySalesDates = new Array(7).fill(""); // Array to hold the dates

  const currentDate = new Date();
  const firstDayOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())
  );

  // Populate the weekly sales amounts and dates
  weeklySalesData.forEach((item) => {
    const date = new Date(item._id.date); // Extract the date from your data
    const dayIndex = date.getDay(); // Get the day index (0-6 for Sun-Sat)
    console.log(dayIndex);
    weeklySalesAmounts[dayIndex] += parseFloat(item.totalAmount) || 0;
  });

  // Fill in the weeklySalesDates with the current week's dates
  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i); // Set to the corresponding day of the week
    weeklySalesDates[i] = `${date.getDate()}`; // Only show the date as "DD"
  }

  const monthlySalesAmounts = new Array(6).fill(0);
  const currentMonth = new Date().getMonth();

  sixMonthSalesData.forEach((item, index) => {
    const itemDate = new Date(item.date);
    const itemMonth = itemDate.getMonth();
    const monthIndex = (currentMonth - index + 12) % 12;
    monthlySalesAmounts[monthIndex] = parseFloat(item.totalAmount) || 0;
  });

  useEffect(() => {
    dispatch(getAnalyticsChart(selectedCategory));
  }, [dispatch, selectedCategory]);

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap justify-center items-start mb-4">
      {/* Enhanced Donut Chart */}
      <div className="bg-[#fbf5ec] mx-2 mb-2 flex flex-1 min-w-[300px] max-w-[400px] flex-col rounded-lg shadow-lg items-center">
        <p className="font-semibold text-lg my-4">Total Sales by Category</p>
        <Chart
          options={{
            labels: filteredItems.map((item) => item.name),
            colors: ["#896439", "#F6B060", "#619524", "#89643966"],
            tooltip: {
              y: {
                formatter: (value, { seriesIndex }) =>
                  `${filteredItems[seriesIndex].name}: ${formatAmount(value)}`,
              },
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "75%",
                  labels: {
                    show: true,
                    name: { fontSize: "16px", fontWeight: 600 },
                    value: { fontSize: "14px", formatter: formatAmount },
                    total: {
                      show: true,
                      fontSize: "18px",
                      color: "#333",
                      label: "Total Sales",
                      formatter: () =>
                        formatAmount(
                          salesData.reduce((acc, curr) => acc + curr, 0)
                        ),
                    },
                  },
                },
              },
            },
            legend: {
              show: false,
            },
          }}
          series={salesData}
          type="donut"
          width="280"
        />
      </div>

      {/* Bar Chart for Weekly Sales */}
      <div className="bg-[#fbf5ec] mx-2 mb-2 flex flex-1 min-w-[300px] max-w-[400px] flex-col rounded-lg shadow-lg items-center justify-center">
        <p className="font-semibold text-lg my-4">Weekly Sales Comparision</p>
        <Chart
          options={{
            xaxis: {
              categories: weeklySalesDates, // Use dates instead of day names
              title: { text: "Week" },
            },
            colors: ["#896439"],
            yaxis: {
              title: { text: "Total Amount" },
              labels: {
                formatter: formatAmount,
              },
            },
            tooltip: {
              enabled: true,
              y: {
                formatter: formatAmount,
              },
            },
            dataLabels: {
              enabled: false,
            },
          }}
          series={[{ name: "Total Amount", data: weeklySalesAmounts }]}
          type="bar"
          width="300"
          height="180"
        />
      </div>

      {/* Line Chart for Monthly Sales Comparison */}
      <div className="bg-[#fbf5ec] mx-2 mb-2 flex flex-1 min-w-[300px] max-w-[400px] flex-col rounded-lg shadow-lg items-center justify-center">
        <p className="font-semibold text-lg my-4">Monthly Sales Comparison</p>
        <Chart
          options={{
            xaxis: {
              categories: monthNames.slice(currentMonth - 5, currentMonth + 1),
              title: { text: "Months" },
            },
            colors: ["#896439"],
            yaxis: {
              title: { text: "Total Sales" },
              labels: {
                formatter: formatAmount,
              },
            },
            tooltip: {
              enabled: true,
              y: {
                formatter: formatAmount,
              },
            },
          }}
          series={[
            {
              name: "Sales",
              data: monthlySalesAmounts.slice(
                currentMonth - 5,
                currentMonth + 1
              ),
            },
          ]}
          type="line"
          width="300"
          height="180"
        />
      </div>
    </div>
  );
}

export default Charts;
