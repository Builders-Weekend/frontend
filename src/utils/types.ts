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

type weatherApiResponse = {
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
    price: number,
    valid_from: string,
    valid_to: string
}

export type { Device, weatherApiResponse, Forecast, ForecastDay, Hour, PricingData, QueuedJob };