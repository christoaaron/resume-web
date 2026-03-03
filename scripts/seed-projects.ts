import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const projects = [
    {
      title: "Bazaar UMKM Gereja Santa Maria Imakulata 2024",
      subtitle: "Decoration Committee",
      startDate: "2024-03",
      endDate: "2024-08",
      current: false,
      date: "Mar 2024 - Aug 2024",
      description: [
        "A public bazaar event was held by Gereja Santa Maria Imakulata, located in West Jakarta. I supported the event as a decoration committee member, ensuring that the decorations were well-organized and visually appealing.",
      ],
    },
    {
      title: "Tourism Scholarship 2023",
      subtitle: "Project Management, Fundraising",
      startDate: "2023-03",
      endDate: "2023-12",
      current: false,
      date: "Mar 2023 - Dec 2023",
      description: [
        "An annual scholarship program held by Advocacy Department, HIMAPAR FIA UB.",
        "As a fundraising coordinator for this project, the team successfully raised the targeted amount of funds. This program has increased the scholarship funds by 33.33% compared to the previous year.",
      ],
    },
    {
      title: "Ruang Bahasa 2023",
      subtitle: "Event Planning",
      startDate: "2023-07",
      endDate: "2023-11",
      current: false,
      date: "Jul 2023 - Nov 2023",
      description: [
        "One-day Korean workshop that taught about intermediate-level Korean (Hangul).",
        "A follow-up event was held to support the previous year's event named Ruang Bahasa 2022, which discussed beginner-level Korean (Hangul).",
        "As an event staff, I learned to plan and execute an event, made a cue card for the Master of Ceremony, and successfully operated the multimedia on the event day.",
      ],
    },
    {
      title: "Fun Tourism 2023",
      subtitle: "Field Coordination, Equipment Installation",
      startDate: "2023-06",
      endDate: "2023-09",
      current: false,
      date: "Jun 2023 - Sep 2023",
      description: [
        "A Futsal event was held to increase the solidarity of the Faculty of Administration Business Universitas Brawijaya's tourism students.",
        "As a field coordinator and equipment staff, my team and I need to ensure that the event runs well.",
      ],
    },
    {
      title: "Women In Tourism 2023",
      subtitle: "Equipment Installation",
      startDate: "2023-03",
      endDate: "2023-05",
      current: false,
      date: "Mar 2023 - May 2023",
      description: [
        "An event that focused on issues related to the significant contributions of women in the tourism industry.",
        "As an equipment coordinator, I need to ensure that the equipments to be used are complete before the event starts.",
        "I successfully managed my team of 3 staff members to complete the list of the event' needs before the event day.",
      ],
    },
    {
      title: "Acara Kebersamaan Misdinar Gereja Santa Maria Imakulata",
      subtitle: "Vice Chairman of the Committee",
      startDate: "2022-04",
      endDate: "2022-08",
      current: false,
      date: "Apr 2022 - Aug 2022",
      description: [
        "As Vice Chairman of the Committee, I oversaw the team's activities, ensured tasks were executed effectively, and conducted detailed rechecks to verify accuracy and meet event requirements",
      ],
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }
  console.log("Projects seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
