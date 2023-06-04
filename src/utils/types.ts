type Device = {
    name: string;
    consumption: number;
    isBattery?: boolean;
    chargeLevel?: number;
}

type QueuedJob = {
    device: Device;
    start: number;
    end: number;
    cost: number;
}

type WeatherApiResponse = {
    forecast: Forecast
}

type Forecast = {
    forecastday: ForecastDay[]
}

type ForecastDay = {
    date: string,
    hour: Hour[]
}

type Hour = {
    time: string,
    windKph: number,
    uvIndex: number
}

type PricingData = {
    amount: number,
    valid_from: string,
    valid_to: string
}

export type { Device, WeatherApiResponse, Forecast, ForecastDay, Hour, PricingData, QueuedJob };
