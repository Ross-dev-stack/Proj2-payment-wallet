"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });


    if (!user) {
        throw new Error("User does not exist in the database");
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new Error("Invalid amount provided");
    }

    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
          provider: String(provider),
          status: "Processing",
          startTime: new Date(),
          token,
          userId,
          amount: parsedAmount * 100
        }
    });

    return {
        message: "Done"
    }
}
