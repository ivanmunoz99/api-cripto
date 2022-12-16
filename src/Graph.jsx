import "./Graph.css"

import { useState, useEffect, useRef } from "react";
//Importación de elementos propios de chartjs
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

//Importación de elemento que permite dibujar gráficos de línea
import { Line } from "react-chartjs-2";
import moment from "moment/moment";

//Registro de dichos elementos / reseteo de valores por defecto
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)

export default function Graph({ type = 1, coin = "bitcoin", days = 30, color = "#04D99D", currency = "usd" }) {

    const chartStyle = {
        border: {
            display: false
        },
        grid: {
            display: false
        },
        ticks: {
            display: false
        }
    }

    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    let data, options

    const [prices, setPrices] = useState()
    const [dates, setDates] = useState()
    const [gradient, setGradient] = useState()

    async function getData() {
        try {
            const response = await fetch(url)
            //console.log(response)
            const json = await response.json()
            console.log(json)
            setPrices(json.prices.map(item => Math.round(item[1])))
            //console.log(prices)
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
            //console.log(dates)
        } catch (e) {
            console.log("error", e)
        }
    }

    const chartRef = useRef(null);

    useEffect(_ => {
        getData()
        const canvas = chartRef.current.firstChild
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, 'rgba(4, 191, 157, 1)');
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)')
        setGradient(BGgradient)
    }, [])

    switch (type) {
        case 0:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function (value) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
            }
            data = {
                labels: dates,
                datasets: [
                    {
                        data: prices,
                        borderColor: color,
                        backgroundColor: gradient,
                        tension: .4,
                        pointRadius: 0,
                        fill: true
                    }
                ]
            }
            break

        case 1:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    x: chartStyle,
                    y: chartStyle
                }
            }
            data = {
                labels: dates,
                datasets: [
                    {
                        data: prices,
                        borderColor: color,
                        tension: 0.4,
                        pointRadius: 0,
                    }
                ]
            }
            break

            default:
                console.log("a")
            break
    }


    return (
        <div ref={chartRef} className="graph">
            <Line options={options} data={data}/>
        </div>
    )
} 