import { z } from "zod";

export const data = z
    .array(
        z.object({
            current: z.object({
                precipitation: z.number(),
                relative_humidity_2m: z.number(),
                temperature_2m: z.number(),
                weather_code: z.number(),
                wind_speed_10m: z.number(),
                is_day: z
                    .number()
                    .min(0)
                    .max(1)
                    .transform((v) => v === 1),
                apparent_temperature: z.number(),
                time: z.string().transform((v) => new Date(v)),
            }),
            daily: z.object({
                temperature_2m_max: z.array(z.number()),
                temperature_2m_min: z.array(z.number()),
                time: z.array(z.string().transform((v) => new Date(v))),
                weather_code: z.array(z.number()),
            }),
            hourly: z.object({
                temperature_2m: z.array(z.number()),
                time: z.array(z.string().transform((v) => new Date(v))),
                weather_code: z.array(z.number()),
            }),
            latitude: z.number(),
            longitude: z.number(),
        }),
    )
    .length(5) // <= require exactly 5 elements
    .transform(([germany, egypt, italy, london, san]) => ({
        Egypt: egypt,
        Germany: germany,
        Italy: italy,
        London: london,
        "San Francisco": san,
    }));
