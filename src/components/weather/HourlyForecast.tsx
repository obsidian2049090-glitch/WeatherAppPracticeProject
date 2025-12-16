"use client";

import Image from "next/image"
import { useState } from "react";
import { WeatherType } from "@/lib/types"
// import { HourlyForecastData } from "@/lib/data"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
// import { useState } from "react"

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

interface HourlyForecastProps {
    data: {
        time: string[];
        temperature_2m: number[];
        weather_code: number[];
    };
}

function formatHour(timeStr: string): string {
    const date = new Date(timeStr);
    const hour = date.getHours();
    const h = hour % 12 === 0 ? 12 : hour % 12;
    return `${h} ${hour >= 12 ? "PM" : "AM"}`;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
    const [selectedDay, setSelectedDay] = useState<"today" | "tomorrow">("today")

    const currentHour = new Date().getHours();

    const startIndex = data.time.findIndex(
        (t) => new Date(t).getHours() >= currentHour
    )

    const tomorrowStartIndex = startIndex + (24 - currentHour)

    const activeStartIndex = selectedDay === "today" ? startIndex : tomorrowStartIndex
    
    const hourlyData = data.time.slice(activeStartIndex, activeStartIndex + 8);

    return (
        <div className="bg-w-neutral-800 p-4 rounded-2xl space-y-4 my-8 xl:my-0 w-full">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                    Hourly forecast
                </h3>
                <Select value={selectedDay} onValueChange={(v) => setSelectedDay(v as "today" | "tomorrow")}>
                    <SelectTrigger className="bg-w-neutral-700 text-sm text-white border-0">
                        <SelectValue className="text-white" placeholder="Select Day" />
                    </SelectTrigger>
                    <SelectContent className="bg-w-neutral-700 text-white border-0">
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                {hourlyData.map((time, idx) => {
                    const index = startIndex + idx
                    const icon = weather_icons[data.weather_code[index]] || "/WeatherIcons/Sunny.png"
                    const temp = data.temperature_2m[index]
                    return (
                        <div key={`${idx}-${time}`} className="flex bg-w-neutral-700 rounded-xl p-3 items-center">
                            <Image src={icon} width={40} height={40} alt="WeatherIcon" />
                            <div className="grow text-lg pl-3 text-white">{formatHour(time)}</div>
                            <div className="pr-4 text-white text-lg font-medium"> {temp} °</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
