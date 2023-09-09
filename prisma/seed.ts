import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const admins = [
  {
    name: 'Chandan Kumar Mandal',
    email: 'chankruze@gmail.com',
    password: '$2a$12$SMjX2n1ao/KedFEUwXNgeev2/czrawD3jJuf5vp/M.Hp3Rwm4UgsG', // admin
  },
  {
    name: 'Sanmaya Kumar Parida',
    email: 'sanmayaparida6@gmail.com',
    password: '$2a$12$erFTQ5Z0atsNEU0uIuz4IeIURO1EW1iUoevgtuowBWzznPj0rfMVy', // Sinu@123.
  },
];

const task = async (admin: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    // remove the admin user if exists
    let result = await prisma.user.findUnique({
      where: {
        email: admin.email,
      },
    });

    if (!result) {
      result = await prisma.user.create({
        data: {
          name: admin.name,
          email: admin.email,
          role: 'ADMIN',
          password: {
            create: {
              hash: admin.password,
            },
          },
        },
      });
    }

    await prisma.user.update({
      where: {
        email: admin.email,
      },
      data: {
        password: {
          update: {
            hash: admin.password,
          },
        },
      },
    });

    console.info(result);
  } catch (error) {
    console.error(error);
  }
};

Promise.all(admins.map((admin) => task(admin)))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
