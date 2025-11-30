import Image from "next/image"
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

function formatHour(hour: number): string {
    const h = hour % 12 === 0 ? 12 : hour % 12;
    return `${h} ${hour >= 12 ? 'PM' : 'AM'}`;
}


export default function HourlyForecast({data}) {
    return (
        <div className="bg-w-neutral-800 p-4 rounded-2xl space-y-4 my-8 xl:my-0 w-full">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                    Hourly forecast
                </h3>
                <Select>
                    <SelectTrigger className="bg-w-neutral-700 text-sm text-white border-0">
                        <SelectValue className="text-white" placeholder="Select Day" />
                    </SelectTrigger>
                    <SelectContent className="bg-w-neutral-700 text-white border-0">
                        <SelectItem value="Mon">Monday</SelectItem>
                        <SelectItem value="Tue">Tuesday</SelectItem>
                        <SelectItem value="Wed">Wednesday</SelectItem>
                        <SelectItem value="Thu">Thursday</SelectItem>
                        <SelectItem value="Fri">Friday</SelectItem>
                        <SelectItem value="Sat">Saturday</SelectItem>
                        <SelectItem value="Sun">Sunday</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                {/* {data.slice(0, 8).map((day, index) => (
                    <div key={`${index}-${day.day}`} className="flex bg-w-neutral-700 rounded-xl p-3 items-center">
                        <Image src={day.weather} width={40} height={40} alt={day.weather} className=""/>
                        <div className="grow text-lg pl-3 text-white">
                            {formatHour(day.hour)}
                        </div>
                        <div className="pr-4 text-white text-lg font-medium">
                            {day.temp}
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    )
}
