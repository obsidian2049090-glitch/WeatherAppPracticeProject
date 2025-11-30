"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import SearchForm from "@/components/SearchModule";
import WeatherStats from "@/components/WeatherStat";
import WeatherInfo from "@/components/weather/WeatherInfo";
import WeatherDetails from "@/components/weather/WeatherDetails";
import DailyForecast from "@/components/weather/DailyForecast";
import HourlyForecast from "@/components/weather/HourlyForecast";

import { fetchWeatherApi } from "openmeteo";
import { useState, useEffect } from "react";

// useState 
// let lat = 0
// let lon = 0

// const [lat, setLat] = useState(0)
// const [lon, setLon] = useState(0)

// setLat(61.20)
// setLon(25.03)

export default function Home() {
	const [responses, setResponses] = useState<Awaited<ReturnType<typeof fetchWeatherApi>> | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
	const fetchData = async () => {
		const params = {
			latitude: [52.52, 50.12, 53.55],
			longitude: [13.41, 8.68, 9.99],
			// daily: ["temperature_2m_max", "temperature_2m_min", "rain_sum", "showers_sum", "snowfall_sum"],
			// hourly: ["weather_code", "temperature_2m", "temperature_180m"],
			current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "showers", "snowfall", "weather_code", "wind_speed_10m"],
		};
		const url = "https://api.open-meteo.com/v1/forecast";
		const data = await fetchWeatherApi(url, params);
		setResponses(data);
		setLoading(false);
	};

	fetchData();

  }, [])

  if (loading) return <main>Loading...</main>
  if (!responses) return <main>No data</main>
  
  return (
    <>
      <header className="flex justify-between align-center py-2 px-2 max-w-7xl mx-auto">
        <div className="flex flex-row">
          <Image src="/logo.svg" height={40} width={40} alt="logo"></Image>
          <p className="py-2 px-2 text-lg ">Weather Now</p>
        </div>

      </header>
      <main className="p-4 max-w-7xl mx-auto">
        <h1 className="justify-center text-center text-4xl md:text-5xl py-8 font-bold text-balance">How's the sky<br />looking today?</h1>
        <div>
          <SearchForm />
          <div className="grid py-6 gap-8 xl:grid-cols-3 xl:items-start">
            <div className="xl:col-span-2">
			  {/* <WeatherStats data={responses[0].current}/> */}
			  <WeatherInfo data={responses?.[0].current} city={"Seoul"}/>
              <WeatherDetails data={responses?.[0].current}/>
              <DailyForecast data={responses?.[0].daily} />
            </div>
            <HourlyForecast data={responses?.[0].hourly}/>
          </div>
        </div>
      </main>
    </>
  );
}
