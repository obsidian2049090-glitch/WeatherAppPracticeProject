import Image from "next/image"
import { WeatherType } from "@/lib/types"
// import { DailyForecastData } from "@/lib/data"

const weather_icons: Record<number, string> = {
  0: "/WeatherIcons/Sunny.png",
  1: "/WeatherIcons/Sunny.png",
  2: "/WeatherIcons/PartlyCloudy.png",
  3: "/WeatherIcons/PartlyCloudy.png",
  45: "/WeatherIcons/Fog.png",
  48: "/WeatherIcons/Fog.png",
  51: "/WeatherIcons/Drizzle.png",
  53: "/WeatherIcons/Drizzle.png",
  55: "/WeatherIcons/Drizzle.png",
  56: "/WeatherIcons/Drizzle.png",
  57: "/WeatherIcons/Drizzle.png",
  61: "/WeatherIcons/Rain.png",
  63: "/WeatherIcons/Rain.png",
  65: "/WeatherIcons/Rain.png",
  66: "/WeatherIcons/Rain.png",
  67: "/WeatherIcons/Rain.png",
  71: "/WeatherIcons/Snow.png",
  73: "/WeatherIcons/Snow.png",
  75: "/WeatherIcons/Snow.png",
  77: "/WeatherIcons/Snow.png",
  80: "/WeatherIcons/Rain.png",
  81: "/WeatherIcons/Rain.png",
  82: "/WeatherIcons/Rain.png",
  85: "/WeatherIcons/Snow.png",
  86: "/WeatherIcons/Snow.png",
  95: "/WeatherIcons/ThunderStorms.png",
  96: "/WeatherIcons/ThunderStorms.png",
  99: "/WeatherIcons/ThunderStorms.png",
};

interface DailyForecastProps {
  data: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
  };
}

function formatDay(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("ru-RU", { weekday: "short" })
}


export default function DailyForecast({data}: DailyForecastProps) {

  return (
    <div className="space-y-3 font-bold xl:py-7">
      <h3>Daily forecast</h3>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 xl:py-4">
        {data.time.map((time, index) => {
          const icon = weather_icons[data.weather_code[index]] || "/WeatherIcons/Sunny.png"
          return (
            <div
              className="bg-w-neutral-800 place-items-center rounded-xl p-3"
              key={time}
            >
              <div className="my-3">{formatDay(time)}</div>
              <Image src={icon} width={60} height={60} alt="weather" />
              <div className="place-self-stretch flex justify-between mt-3">
                <div className="font-semibold">
                  {Math.round(data.temperature_2m_max[index])}°
                </div>
                <div>{Math.round(data.temperature_2m_min[index])}°</div>
              </div>
            </div>          )}
        )}
      </div>
    </div>
  )
}