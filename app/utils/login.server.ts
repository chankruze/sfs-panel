import type { Password, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { Result } from 'ts-results';
import { Err, Ok } from 'ts-results';
import { prisma } from '~/lib/prisma.server';

type UserWithoutPassword = Omit<User, 'password'>;

export async function verifyLogin(
  email: User['email'],
  password: Password['hash']
): Promise<Result<UserWithoutPassword, Error>> {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return Err(new Error('No user found with this email'));
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return Err(new Error('Wrong password. Please try again'));
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return Ok(userWithoutPassword);
}
