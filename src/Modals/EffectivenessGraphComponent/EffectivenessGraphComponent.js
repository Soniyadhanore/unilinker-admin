import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Calendar } from "primereact/calendar";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";

export default function EffectivenessGraphComponent() {
  const [date, setDate] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartDataDouble, setChartDataDouble] = useState({});
  const [chartOptionsDouble, setChartOptionsDouble] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "08/03/24",
        "08/03/24",
        "08/03/24",
        "08/03/24",
        "08/03/24",
        "08/03/24",
        "08/03/24",
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: documentStyle.getPropertyValue("#A5CA96"),
          borderColor: documentStyle.getPropertyValue("#A5CA96"),
          data: [20, 30, 40, 50, 60, 70, 80],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "08/03/24",
        "08/03/24",
        "08/03/24",
        "08/03/24",
        "08/03/24",
        "08/03/24",
        "08/03/24",
      ],
      datasets: [
        {
          label: "Clicked",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue("#EAA9A8"),
          tension: 0.4,
        },
        {
          label: "Impressions",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue("#A5CA96"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartDataDouble(data);
    setChartOptionsDouble(options);
  }, []);

  return (
    <>
      <div className="relative px-4">
        <div className="flex justify-content-end">
          <div className="formField">
            <span className="p-float-label small-input mb-3">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
              />
            </span>
          </div>
        </div>
        <div className="grid">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="card p-4">
              <h4 className="font-semibold">
                Reach
                <CustomTooltip tooltipText="The percentage of impressions that led to clicks (opening the UniAffiliate)">
                  <i className="pi pi-info-circle ml-2"></i>
                </CustomTooltip>
              </h4>
              <p>No. of unique users</p>
              <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="card p-4">
              <h4 className="font-semibold">
                Impression
                <CustomTooltip tooltipText="The percentage of impressions that led to clicks (opening the UniAffiliate)">
                  <i className="pi pi-info-circle ml-2"></i>
                </CustomTooltip>
              </h4>
              <p>See how often jobs are viewed daily.</p>
              <Chart type="line" data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="card p-4">
              <h4 className="font-semibold">
              Clicks
                <CustomTooltip tooltipText="The percentage of impressions that led to clicks (opening the UniAffiliate)">
                  <i className="pi pi-info-circle ml-2"></i>
                </CustomTooltip>
              </h4>
              <p>300</p>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="card p-4">
              <h4 className="font-semibold">
              Click Through Rate (CTR)
                <CustomTooltip tooltipText="The percentage of impressions that led to clicks (opening the UniAffiliate)">
                  <i className="pi pi-info-circle ml-2"></i>
                </CustomTooltip>
              </h4>
              <p>55%</p>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="card p-4">
              <h4 className="font-semibold">
                Conversions
                <CustomTooltip tooltipText="The percentage of impressions that led to clicks (opening the UniAffiliate)">
                  <i className="pi pi-info-circle ml-2"></i>
                </CustomTooltip>
              </h4>
              <p>No. of unique users</p>
              <Chart
                type="bar"
                data={chartDataDouble}
                options={chartOptionsDouble}
              />
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="card p-4">
              <h4 className="font-semibold">
              Audience demographic
                <CustomTooltip tooltipText="The percentage of impressions that led to clicks (opening the UniAffiliate)">
                  <i className="pi pi-info-circle ml-2"></i>
                </CustomTooltip>
              </h4>
              <Chart
                type="line"
                data={chartDataDouble}
                options={chartOptionsDouble}
              />
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="card p-4">
              <h4 className="font-semibold">
              Likes
                <CustomTooltip tooltipText="The percentage of impressions that led to clicks (opening the UniAffiliate)">
                  <i className="pi pi-info-circle ml-2"></i>
                </CustomTooltip>
              </h4>
              <p>321</p>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="card p-4">
              <h4 className="font-semibold">
              Conversion Rate
                <CustomTooltip tooltipText="The percentage of impressions that led to clicks (opening the UniAffiliate)">
                  <i className="pi pi-info-circle ml-2"></i>
                </CustomTooltip>
              </h4>
              <p>30%</p>
            </div>
          </div>
          
          
        </div>
      </div>
    </>
  );
}
