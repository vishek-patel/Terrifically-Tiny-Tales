import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import "./App.css";

const options = {
  chart: {
    type: 'column',
    backgroundColor: '#1e1f29',
    width: 900,
    height: 400
  },
  title: {
    text: 'Word Frequency Example',
    style: {
      color: '#d8d2d2'
    }
  },
  xAxis: {
    categories: ['I', 'a', 'to', 'the', 'of', 'can', 'and', 'us', 'on', 'at', 'you', 'your', 'do', 'our', 'in', 'If', 'We', 'get', 'from', 'have'],
    labels: {
      style: {
        color: '#d8d2d2'
      }
    },
    lineColor: '#d8d2d2',
    tickColor: '#d8d2d2'
  },
  yAxis: {
    title: {
      text: 'Frequency',
      style: {
        color: '#d8d2d2'
      }
    },
    labels: {
      style: {
        color: '#d8d2d2'
      }
    },
    gridLineColor: 'transparent'
  },
  legend: {
    itemStyle: {
      color: '#d8d2d2'
    }
  },
  plotOptions: {
    column: {
      borderWidth: 0,
      color: '#4caf50'
    }
  },
  series: [{
    name: 'Words',
    data: [27, 23, 21, 15, 13, 13, 13, 11, 10, 10, 10, 9, 9, 8, 8, 8, 7, 6, 6, 6]
  }]
};

const ColumnChart = () => {
  const chartRef = useRef(null);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export default ColumnChart;
