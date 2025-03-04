import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LollipopChart = () => {
  const options = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
      height: 250, // Adjust height for compact look
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: ["Google", "YouTube", "Instagram", "Pinterest", "Facebook", "Twitter"],
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "var(--textColor)",
        },
      },
      lineWidth: 0,
      tickWidth: 0,
    },
    yAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        pointWidth: 3, // Bar height
        borderWidth: 0,
        pointPadding: 0.2, // Adjust gap between stacked segments
        groupPadding: 0.3, // Adjust gap between different categories
      },
    },
    series: [
      {
        name: "Dark Segment",
        data: [30, 50, 35, 60, 25, 40],
        color: "var(--textColor)",
      },
      {
        name: "Medium Segment",
        data: [25, 40, 30, 45, 20, 30],
        color: "var(--softTextColor)",
      },
      {
        name: "Light Segment",
        data: [20, 30, 25, 35, 15, 25],
        color: "var(--seperatoor)",
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "var(--softBg)",
      style: {
        color: "var(--textColor)",
      },
      borderColor: "var(--seperatoor)",
      shadow: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LollipopChart;
