

export default function WeatherDetails({data}) {
    const weatherDetails = [
      { key: "Feels like", value: `${Math.round(data.apparent_temperature)}°` },
      { key: "Humidity", value: `${Math.round(data.relative_humidity_2m)}%` },
      { key: "Wind", value: `${Math.round(data.wind_speed_10m)} mph` },
      { key: "Precipitation", value: `${Math.round(data.precipitation)} in` },
    ];

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-5 xl:py-6">
            {weatherDetails.map(
                item => {
                    return (
                        <div className="grid grid-rows-subgrid row-span-2 px-5 bg-w-neutral-800 rounded-xl py-4" key={item.key}>
                            <p className="text-sm text-gray-300">{item.key}</p>
                            <h3 className="text-2xl ">{item.value}</h3>
                        </div>
                    )
                }
            )}
        </div>
    )
}