import WeatherInfo from "./weather/WeatherInfo"

export default function WeatherStats({ temp, weather, longitude, latitude}) {
    return (
        <>
            <div>
                {/* Weather Info Container */}
                <div>
                    <div>
                        <WeatherInfo />
                    </div>
                    <div>
                        {/* Weather Details */}
                    </div>
                </div>
                <div>
                    {/* Daily Forecast Container */}
                </div>
            </div>
            {/* Hourly Forecast Container */}
        </>
    )
}