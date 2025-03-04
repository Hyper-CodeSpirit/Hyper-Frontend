import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = ({ categories, data }) => {

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "var(--softTextColor)",
        },
      },
      gridLineWidth: 0,
    },
    yAxis: {
      min: 5,
      title: {
        text: null,
      },
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "var(--softTextColor)",
        },
      },
      gridLineColor: "var(--seperator)",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: 5,
        pointPadding: 0.2,
        groupPadding: 0.1,
      },
    },
    tooltip: {
      useHTML: true,
      backgroundColor: "var(--bg)",
      borderRadius: 8,
      style: {
        color: "var(--textColor)",
      },
      formatter: function () {
        return `<b>${this.x} September</b><br>
        <span style="color:${this.point.color}">●</span> ${this.y}k`;
      },
    },
    series: [
      {
        name: "Data",
        data: data.map((value, index) => ({
          y: value,
          color: index === 2 ? "#007bff" : index % 2 === 0 ? "#a3e4d7" : "#f5b7b1",
        })),
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
