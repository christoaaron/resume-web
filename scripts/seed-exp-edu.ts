import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const experiences = [
    {
      title: "Public Relations Staff of MMD 848 Universitas Brawijaya",
      subtitle: "Pemerintah Kabupaten Magetan",
      startDate: "2023-07",
      endDate: "2023-08",
      current: false,
      date: "Jul 2023 - Aug 2023",
      location: "Poncol Village, Magetan District",
      description: [
        "Team 848 was placed in Poncol Village, Magetan District. There, we worked as a team to complete the task allocated by the university and helped the locals to solve their problems. We, as students are tested to apply our knowledge to solve real-life problems.",
      ],
    },
  ];

  const education = [
    {
      title: "Bachelor of Tourism, Business Administration",
      subtitle: "University of Brawijaya",
      startDate: "2021-08",
      endDate: "2025-08",
      current: false,
      date: "2021 - 2025",
    },
    {
      title: "Social Studies",
      subtitle: "SMAN 2 Jakarta",
      startDate: "2018-08",
      endDate: "2021-08",
      current: false,
      date: "2018 - 2021",
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({
      data: exp,
    });
  }
  console.log("Experiences seeded successfully.");

  for (const edu of education) {
    await prisma.education.create({
      data: edu,
    });
  }
  console.log("Education seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
