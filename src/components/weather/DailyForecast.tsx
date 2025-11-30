import Image from "next/image"
import { WeatherType } from "@/lib/types"
// import { DailyForecastData } from "@/lib/data"



export default function DailyForecast({data}) {

  const DailyForecastData = [
      { key: "time", value: `${data.time}` },
      { key: "temperature_2m_max", value: `${Math.round(data.temperature_2m_max)}%` },
      { key: "temperature_2m_min", value: `${Math.round(data.temperature_2m_min)} mph` },
      { key: "Precipitation", value: `${Math.round(data.precipitation)} in` },
    ];

  return (
    <div className="space-y-3 font-bold xl:py-7">
      <h3>Daily forecast</h3>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 xl:py-4">
        {DailyForecastData.map(
          day => {
            return (
              <div className="bg-w-neutral-800 place-items-center rounded-xl p-3" key={day.time}>

                <div className="my-3">{day.time}</div>
                <Image src={day.weather} width={60} height={60} alt={day.weather} />

                <div className="place-self-stretch flex justify-between mt-3">
                  <div className="font-semibold">{day.maxTemp}</div>
                  <div>{day.minTemp}</div>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}