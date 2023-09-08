/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Mar 01 2023 13:54:02 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2023 and beyond
*/

import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '~/lib/prisma.server';

export type { User } from '@prisma/client';

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } });
}

export const createUser = async (email: User['email'], password: string) => {
  // hash the password
  const hashedPassword = await bcrypt.hash(password, 12);
  // create a new user
  return await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
};
