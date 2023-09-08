import type { Password, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from "~/lib/prisma.server";

export async function verifyLogin(
    email: User['email'],
    password: Password['hash']
  ) {
    const userWithPassword = await prisma.user.findUnique({
      where: { email },
      include: {
        password: true,
      },
    });
  
    if (!userWithPassword || !userWithPassword.password) {
      throw {
        email: 'No user found with this email',
      };
    }
  
    const isValid = await bcrypt.compare(
      password,
      userWithPassword.password.hash
    );
  
    if (!isValid) {
      throw {
        password: 'Wrong password. Please try again',
      };
    }
  
    const { password: _password, ...userWithoutPassword } = userWithPassword;
  
    return userWithoutPassword;
  }