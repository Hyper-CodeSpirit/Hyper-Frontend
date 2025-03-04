import React from 'react'

import './overview.scss'
import SparklineChart from '../../../components/charts/SparklineChart'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'
import BarChart from '../../../components/charts/BarChart'
import LollipopChart from '../../../components/charts/LollipopChart'
import 'react-calendar/dist/Calendar.css';
import HyperCalender from '../../../components/calender/HyperCalender'
import clientData from '../../../data/client.data'

const OverviewPage = () => {

  const topCardData = [
    {
      title:"Active Vehicles",
      value: 445,
      total:945,
      data:[2,8,5,15,7,9],
      efficiency: 12
    },

    {
      title:"Appointments",
      value: 240,
      total:945,
      data:[10,7,20,7,9,1],
      efficiency: -10
    },

    {
      title: "Inspections",
      value: 210,
      total:945,
      data:[0,7,5,20,13,15],
    },

    {
      title: "Revenue",
      value: 240,
      total:945,
      data:[10,7,20,7,9,1],
      efficiency: 10
    }
];

const vehicleData = {categories: ["22", "23", "24", "25", "26", "27", "28"], data: [27, 20, 30, 18, 26, 15, 22]};

  return (
    <div className='top-layer-overview-container'>
      <div className="header">
        <div className="title">Dashbard</div>
      </div>
      <div className="overview-container">
        <div className="left-overview-container">
          <div className="top-cards-container">

            {topCardData.map((data, index) => {
              const status = data.efficiency > 0 ? true : false;
              return (
                <div key={index} className="top-card">
                <div className="header">
                  <div className="card-title">{data.title}</div>
                </div>
                <div className="content">
                  <div className="values">
                    <div className="value">{data.value}</div>
                    <div className="total">Total: <span>{data.total}</span></div>
                  </div>
  
                  <div className="chart">
                  <SparklineChart data={data.data} />
                  </div>
                </div>
                <div className="footer">
                  <div className="trend-icon">
                  {status ? <FaArrowTrendUp className='trend-up'/> : <FaArrowTrendDown className='trend-down'/>}
                  </div>
                  <div className={`efficiency ${status ? 'trend-up' : 'trend-down'}`}>
                    {data.efficiency}% <span>than last month</span>
                </div>
                <div className="text"></div>
              </div>
            </div>
              )
            })}
            

          </div>

          <div className="overview-chart-container">
            <div className="vehicle-views">
            <div className="header">
              <div className="header-name">
              <div className="sized-box"></div>
              <div className="chart-title">Vehicle</div>
              </div>
              <select name='time-duratin' id='time-duratin' className="header-filter">
                <option value="day">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            <div className="vehicle-view-container">
              <BarChart categories={vehicleData.categories} data={vehicleData.data} />
            </div>
            </div>

            <div className="web-traffic">
              <div className="header">Traffic by Website</div>
              <div className="web-traffic-container">
                <LollipopChart />
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <div className="quick-actions-container">
              <div className="header">
                <div className="sized-box"></div>
                <div className="header-title">Quick Actions</div>
              </div>

              <div className="quick-action-container">
                <div className="sub-title">Need sme ideas fr next Vehicles?</div>

                <div className="quick-action-list">

                <div className="quick-action">
                <div className="action-avatar"><span>+</span></div>
                <div className="action-details">
                    <div className="action-title">Create new appointment</div>
                    <div className="action-description">Add a new appointment to the system</div>
                  </div>
                </div>

                <div className="quick-action">
                  <div className="action-avatar"><span>+</span></div>
                  <div className="action-details">
                    <div className="action-title">Create new invoice</div>
                    <div className="action-description">Add a new invoice to the system</div>
                  </div>
                </div>

                </div>
              </div>
            </div>
            <div className="calender-container">
              <HyperCalender/>
            </div>
          </div>

          <div className="clients">
            <div className="header">Clients</div>
            <table className="client-container">
              <thead>
              <tr>
                <th>Vehicle</th>
                <th>Client Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              </thead>

              <tbody>
              {clientData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td><img src={data.vehicle} alt="vehicle" className="vehicle-image"/></td>
                    <td>{data.client}</td>
                    <td><div className={`client-status ${data.class}`}>{data.status}</div></td>
                    <td>{data.actions}</td>
                </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right-overview-container">Right</div>
      </div>
    </div>
  )
}

export default OverviewPage