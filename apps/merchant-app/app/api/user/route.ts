import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "test@test.com",
            name: "John",
            number: "1234567890",
            password: "hashedpassword", 
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}