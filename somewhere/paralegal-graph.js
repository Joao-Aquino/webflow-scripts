const chartDiv = document.getElementById("salaryChart");
const labels = JSON.parse(chartDiv.dataset.labels);
const values = JSON.parse(chartDiv.dataset.values);

const options = {
  chart: {
    type: "bar",
    height: "100%",
    background: "#ffffff",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  series: [
    {
      name: "Average Salary (USD)",
      data: values,
    },
  ],
  xaxis: {
    categories: labels,
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        color: "#444",
        fontSize: "0.5rem",
        fontFamily: "DM Sans, sans-serif",
      },
    },
  },
  colors: ["#00524e", "#ff9f1c", "#0f997e", "#16e398"],
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: "85%",
      distributed: true,
    },
  },
  dataLabels: {
    enable: true,
    position: "top",
    formatter: function (val) {
      return `$${val.toLocaleString()}`;
    },
  },
  tooltip: {
    style: {
      fontSize: "0.8rem",
      fontFamily: "DM Sans, sans-serif",
    },
    y: {
      formatter: (val) => `$${val.toLocaleString()}`,
    },
  },
};

const chart = new ApexCharts(chartDiv, options);
chart.render();
