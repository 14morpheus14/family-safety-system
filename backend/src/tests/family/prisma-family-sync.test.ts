import prisma from "../../config/db";

async function runTest() {
  console.log(
    "\nRunning Prisma deterministic synchronization integration test...\n"
  );

  const sync =
    await prisma.familySync.create({
      data: {
        familyId:
          "integration-test-family",

        updatedAt:
          new Date(),

        members: {
          create: [
            {
              memberId:
                "member-001",

              memberName:
                "Parent",

              role:
                "parent",

              devices: {
                create: [
                  {
                    deviceId:
                      "device-001",

                    deviceName:
                      "Pixel",

                    protectionEnabled:
                      true,

                    lastSeen:
                      new Date()
                  }
                ]
              }
            }
          ]
        }
      },

      include: {
        members: {
          include: {
            devices: true
          }
        }
      }
    });

  if (
    sync.members.length === 1 &&
    sync.members[0]
      .devices.length === 1
  ) {
    console.log(
      "✅ Nested deterministic synchronization persistence passed"
    );
  } else {
    console.log(
      "❌ Nested synchronization persistence failed"
    );
  }

  await prisma.deviceState.deleteMany({
    where: {
      familyMember: {
        familySyncId:
          sync.id
      }
    }
  });

  await prisma.familyMember.deleteMany({
    where: {
      familySyncId:
        sync.id
    }
  });

  await prisma.familySync.delete({
    where: {
      id: sync.id
    }
  });

  console.log(
    "✅ Integration cleanup completed"
  );

  process.exit(0);
}

runTest().catch((error) => {
  console.error(error);

  process.exit(1);
});
