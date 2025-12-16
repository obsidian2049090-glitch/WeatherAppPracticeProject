"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import SearchForm from "@/components/SearchModule";
import WeatherStats from "@/components/WeatherStat";
import WeatherInfo from "@/components/weather/WeatherInfo";
import WeatherDetails from "@/components/weather/WeatherDetails";
import DailyForecast from "@/components/weather/DailyForecast";
import HourlyForecast from "@/components/weather/HourlyForecast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";

interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

interface CityWeather {
  city: string;
  data: WeatherData;
}


const KOREA_CITIES = [
  { name: "Seoul", lat: 37.5665, lon: 126.978 },
  { name: "Busan", lat: 35.1796, lon: 129.0756 },
  { name: "Incheon", lat: 37.4563, lon: 126.7052 },
  { name: "Daegu", lat: 35.8714, lon: 128.6014 },
  { name: "Daejeon", lat: 36.3504, lon: 127.3845 },
  { name: "Gwangju", lat: 35.1595, lon: 126.8526 },
  { name: "Jeju", lat: 33.4996, lon: 126.5312 },
];


export default function Home() {
  const [citiesWeather, setCitiesWeather] = useState<CityWeather[]>([])
  const [selectedCity, setSelectedCity] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
	const fetchData = async () => {
    const results = await Promise.all(
      KOREA_CITIES.map(async (city) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&hourly=temperature_2m,weather_code`;
        const response = await fetch(url)
        const data = await response.json()
        return { city: city.name, data}
      })
    )
    setCitiesWeather(results)
    setLoading(false)
	};

	fetchData();

  }, [])

  if (loading) return <main>Loading...</main>
  if (citiesWeather.length === 0) return <main>No data</main>
  
  const weather = citiesWeather[selectedCity].data
  const cityName = citiesWeather[selectedCity].city

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
          {/* <SearchForm /> */}
          <div className="flex justify-center mb-6">
            <Select
              value={String(selectedCity)}
              onValueChange={(val) => setSelectedCity(Number(val))}
            >
              <SelectTrigger className="w-48 bg-w-neutral-800 text-white border-0">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-w-neutral-800 text-white border-0">
                {citiesWeather.map((cityData, index) => (
                  <SelectItem key={cityData.city} value={String(index)}>
                    {cityData.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid py-6 gap-8 xl:grid-cols-3 xl:items-start">
            <div className="xl:col-span-2">
			  {/* <WeatherStats data={responses[0].current}/> */}
			  <WeatherInfo data={weather.current} city={cityName}/>
              <WeatherDetails data={weather.current}/>
              <DailyForecast data={weather.daily} />
            </div>
            <HourlyForecast data={weather.hourly}/>
          </div>
        </div>
      </main>
    </>
  );
}
