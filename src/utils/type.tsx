type weatheData = {
    wind: {
        deg: number
        speed: number
    }
    weather : [{
        main: string
        description: string,
        icon: string
    }]
    sys: {
        country: string
    }
    main : {
        feels_like: number
        grnd_level: number
        humidity: number
        pressure: number
        sea_level: number
        temp: number
    }
}

export type { weatheData }