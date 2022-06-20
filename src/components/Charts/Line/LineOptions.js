export const options = {
  responsive: true,
  maintainAspectRatio: false,
  redraw: true,
  defaultColor: '#fff',
  defaultFontColor: '#fff',
  defaultFontSize: 13,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
    },
  },
  scales: {
    xAxis: {
      grid: {
        display: false
      },
      ticks: {
        color: '#8494a7'
      }
    },
    yAxis: {
      grid: {
        display: false
      },
      ticks: {
        color: '#8494a7'
      },

    }
  }
};

export const data = {
  labels: ["Janeiro", "Fevereiro", "Março"],
  datasets: [
    {
      data: [1, 2, 3],
      borderColor: '#5e72e4',
      fill: true,
      tension: 0.3,
    }
  ],
};