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
    },
    borderRadius: 10
  };
  
  export const data = {
    labels: ["Janeiro", "Fevereiro", "Março"],
    datasets: [
      {
        label: 'Receitas',
        data: [10, 20, 15],
        backgroundColor: '#2dceac',
      },
      {
        label: 'Despesas',
        data: [5, 15, 22],
        backgroundColor: '#fb6340',
      },
    ],
  };