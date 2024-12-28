/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { getAnalyticsChart } from "../store/actions/hotel";

const HotelChart = ({ selectedCategory, filteredItems }) => {
  const dispatch = useDispatch();

  // Fetch data from Redux store
  const { weeklySalesData, sixMonthSalesData } = useSelector(
    (state) => state.hotel
  );

  // Dispatch the action to fetch analytics data
  useEffect(() => {
    dispatch(getAnalyticsChart(selectedCategory));
  }, [dispatch, selectedCategory]);

  // Placeholder state for loading
  if (!weeklySalesData || !sixMonthSalesData || !filteredItems) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="loader">Loading...</div>
      </div>
    );
  }

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

  // Donut Chart: Sales by Category
  const salesData = filteredItems.map(
    (item) => item?.orderedItems?.totalPrice || 0
  );

  // Weekly Sales Data
  const weeklySalesAmounts = new Array(7).fill(0);
  const weeklySalesDates = [];
  const currentDate = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(currentDate.getDate() - i);
    const formattedDate = `${date.getDate()}`; // Day number only
    weeklySalesDates.push(formattedDate);

    const salesForDate = weeklySalesData
      .filter((item) => {
        const itemDate = new Date(item._id.date);
        return (
          itemDate.getDate() === date.getDate() &&
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((acc, curr) => acc + (parseFloat(curr.totalAmount) || 0), 0);

    weeklySalesAmounts[6 - i] = salesForDate;
  }

  // Monthly Sales Data
  const monthlySalesAmounts = new Array(6).fill(0); // Initialize with 0 for 6 months
  const displayMonths = [];
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate last 6 months' labels and data
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(currentMonth - i);
    const monthIndex = date.getMonth(); // Get month index
    const year = date.getFullYear(); // Get year

    // Add month name to displayMonths
    displayMonths.push(monthNames[monthIndex]);

    // Find data for this month
    const monthData = sixMonthSalesData.find(
      (item) =>
        item._id.month - 1 === monthIndex && // Adjust to 0-indexed months
        item._id.year === year
    );

    // Add the totalAmount for this month or 0 if not found
    monthlySalesAmounts[5 - i] = monthData ? monthData.totalAmount : 0;
  }

  // Format for Y-axis labels and tooltips
  const formatAmount = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toFixed(2);
  };

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap justify-center items-start mb-4">
      {/* Donut Chart: Total Sales by Category */}
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

      {/* Weekly Sales Chart */}
      <div className="bg-[#fbf5ec] mx-2 mb-2 flex flex-1 min-w-[300px] max-w-[400px] flex-col rounded-lg shadow-lg items-center justify-center">
        <p className="font-semibold text-lg my-4">Weekly Sales Comparison</p>
        <Chart
          options={{
            xaxis: {
              categories: weeklySalesDates,
              title: { text: "Dates" },
            },
            yaxis: {
              labels: {
                formatter: formatAmount,
              },
              title: { text: "Total Sales" },
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
            colors: ["#896439"],
          }}
          series={[{ name: "Daily Sales", data: weeklySalesAmounts }]}
          type="bar"
          width="300"
          height="180"
        />
      </div>

      {/* Monthly Sales Chart */}
      <div className="bg-[#fbf5ec] mx-2 mb-2 flex flex-1 min-w-[300px] max-w-[400px] flex-col rounded-lg shadow-lg items-center justify-center">
        <p className="font-semibold text-lg my-4">Monthly Sales Comparison</p>
        <Chart
          options={{
            xaxis: {
              categories: displayMonths,
              title: { text: "Months" },
            },
            yaxis: {
              labels: {
                formatter: formatAmount,
              },
              title: { text: "Total Sales" },
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
            colors: ["#896439"],
          }}
          series={[{ name: "Monthly Sales", data: monthlySalesAmounts }]}
          type="line"
          width="300"
          height="180"
        />
      </div>
    </div>
  );
};

export default HotelChart;