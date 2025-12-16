import Image from "next/image"

function formatDay(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("ru-RU", { weekday: "long" })
}

function formatDate(dateStr: string): string {
   const date = new Date(dateStr)

  const day = date.getDate()
  const month = date.toLocaleString("ru-RU", { month: "long" })
  const year = date.getFullYear()

  return `${month} ${day}, ${year} год`
}

interface WeatherInfoProps {
  city: string
  data: {
    time: string
    weather_code: number
    temperature_2m: number
  }
}



export default function WeatherInfo({ data, city }: WeatherInfoProps) {

  const weather_icons: Record<number, string> = { 0: "/WeatherIcons/Sunny.png", 1: "/WeatherIcons/Sunny.png", 2: "/WeatherIcons/PartlyCloudy.png", 3: "/WeatherIcons/PartlyCloudy.png", 45: "/WeatherIcons/Fog.png", 48: "/WeatherIcons/Fog.png", 51: "/WeatherIcons/Drizzle.png", 53: "/WeatherIcons/Drizzle.png", 55: "/WeatherIcons/Drizzle.png", 56: "/WeatherIcons/Drizzle.png", 57: "/WeatherIcons/Drizzle.png", 61: "/WeatherIcons/Rain.png", 63: "/WeatherIcons/Rain.png", 65: "/WeatherIcons/Rain.png", 66: "/WeatherIcons/Rain.png", 67: "/WeatherIcons/Rain.png", 71: "/WeatherIcons/Snow.png", 73: "/WeatherIcons/Snow.png", 75: "/WeatherIcons/Snow.png", 77: "/WeatherIcons/Snow.png", 80: "/WeatherIcons/Rain.png", 81: "/WeatherIcons/Rain.png", 82: "/WeatherIcons/Rain.png", 85: "/WeatherIcons/Snow.png", 86: "/WeatherIcons/Snow.png", 95: "/WeatherIcons/ThunderStorms.png", 96: "/WeatherIcons/ThunderStorms.png", 99: "/WeatherIcons/ThunderStorms.png" };


  const icon = weather_icons[data.weather_code]

  return (
    <div className="bg-[url(/Noise.svg)] md:bg-[url(/NoiseMd.svg)] bg-cover rounded-2xl flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left md:py-20 md:px-9 py-8 px-6">
      <div className="space-y-1">
        <h2 className="font-dm font-semibold text-3xl">{city}</h2>
        <p className="font-dm bold text-4xl"> {formatDay(data.time)}, {formatDate(data.time)}</p>
      </div>

      <div className="flex items-center justify-center gap-5">
        <Image src={icon} alt="WeatherIcon" width={120} height={120} />
        <span className="text-8xl font-dm font-semibold italic">{data.temperature_2m}°</span>
      </div>
    </div>
  )
}

// kebab case
//
// daily-forecast
//
// camel case
//
// DailyForecast 