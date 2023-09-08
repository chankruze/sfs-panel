import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const admin = {
  email: 'chankruze@gmail.com',
  password: '$2a$12$SMjX2n1ao/KedFEUwXNgeev2/czrawD3jJuf5vp/M.Hp3Rwm4UgsG', // admin
};

const main = async () => {
  try {
    // remove the admin user if exists
    let result = await prisma.user.findUnique({
      where: {
        email: admin.email,
      }
    });

    if (result) {
      await prisma.user.update({
        where: {
          email: admin.email
        },
        data : {
          password: {
            update: {
              hash: admin.password
            }
          }
        }
      })
    }

    result = await prisma.user.create({
      data: {
        email: admin.email,
        role: "ADMIN",
        password: {
          create: {
            hash: admin.password
          }
        }
      }
    })

    console.info(result);
  } catch (error) {
    console.error(error);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
