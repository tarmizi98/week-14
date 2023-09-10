import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma";

export const POST = async (req) => {

    const {name, email, password} = await req.json();

    const hashPassword = await bcrypt.hash(password, 10)

    try {

        const register = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword

            }

        })
        return NextResponse.json(register)

    } catch(err) {
        throw(err)
    }

}