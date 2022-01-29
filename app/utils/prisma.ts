import { PrismaClient } from "@prisma/client";

export type DB = PrismaClient;

export const db = new PrismaClient();
