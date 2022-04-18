import * as redis from "redis"
import { RateLimiterRedis } from "rate-limiter-flexible"
import { NextFunction, Request, Response } from "express"

import { AppError } from "@shared/errors/AppError"

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),//precisa ser um numero
    }


})

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5, //quantas requisiçoes serão permitidas 
    duration: 5, //por quantos segundos serão permitidas as requisiçoes
})



export default async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {

        await redisClient.connect()

        await limiter.consume(req.ip)//verificar o ip do user

        return next()

    } catch (err) {
        throw new AppError("Too many requests", 429)
    } finally {
        await redisClient.disconnect()
    }
}

