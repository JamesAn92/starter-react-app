import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import faker from '@faker-js/faker';

function Report({ id, accessToken, setAccessToken, refreshToken }) {
  const [reportTable, setReportTable] = useState([]);

  useEffect(() => {
    const start = async () => {
      try {
        const res = await axiosJWT.get(`http://localhost:6001/report?id=${id}`, {
          headers: {
            'auth-token-access': accessToken,
          },
        });
        setReportTable(JSON.stringify(res.data));
        console.log(reportTable);
      } catch (err) {
        console.log(err);
      }
    };
    start();
  }, [id]);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/requestNewAccessToken',
        {},
        {
          headers: {
            'auth-token-refresh': refreshToken,
          },
        }
      );
      return res.headers['auth-token-access'];
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const newAccessToken = await refreshAccessToken();
        config.headers['auth-token-access'] = newAccessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const [pluginsRegistered, setPluginsRegistered] = useState(false);

  useEffect(() => {
    if (!pluginsRegistered) {
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      setPluginsRegistered(true);
    }
  }, [pluginsRegistered]);

//   const hoursMap = {};
//   const minutesMap = {};

//   // Group timestamps by hour and count the number of timestamps in each group
//   if (reportTable && reportTable.timestamps) {

//     reportTable.timestamps.forEach((timestamp) => {
//       const date = new Date(timestamp);
//       const hours = date.getHours();
//       hoursMap[hours] = (hoursMap[hours] || 0) + 1;
//     });
//   }
//   if (reportTable && reportTable.timestamps) {
//   // Group timestamps by minute and count the number of timestamps in each group
//   reportTable.timestamps.forEach((timestamp) => {
//     const date = new Date(timestamp);
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const key = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
//     minutesMap[key] = (minutesMap[key] || 0) + 1;
//   });
// }

//   const chartData = {
//     labels: Object.keys(hoursMap),
//     datasets: [
//       {
//         label: 'Server Usage',
//         data: Object.values(hoursMap),
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1,
//       },
//       {
//         label: 'Server Usage (by minute)',  
//         data: Object.values(minutesMap),
//         fill: false,
//         borderColor: 'rgb(192, 75, 75)',
//         tension: 0.1
//       }
//     ]
//   };



  return (
    <>
      {/* <h1> {reportTable[0]}</h1> */}
      <div>Report {id && id}</div>
      <div> {reportTable && reportTable}</div>
      {/* <Line data={chartData} /> */}
    </>
  )
}

export default Report