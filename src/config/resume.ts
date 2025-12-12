/* 
 * NOTE: This file is currently used for SEEDING only. 
 * The live application fetches data from the Supabase database via Prisma.
 * Editing this file will NOT update the live website unless you run the seed script again.
 */

export type ResumeItem = {
    title: string;
    subtitle: string;
    location?: string;
    date: string;
    description?: string[];
};

export const education: ResumeItem[] = [
    {
        title: "Universitas Brawijaya",
        subtitle: "Bachelor in Tourism (GPA: 3.57)",
        location: "Malang, Indonesia",
        date: "Aug 2021 - Nov 2025",
    },
    {
        title: "SMA Negeri 2 Jakarta",
        subtitle: "Social Studies",
        location: "Jakarta, Indonesia",
        date: "Jul 2018 - Jul 2021",
    },
];

export const experience: ResumeItem[] = [
    {
        title: "Museum Perumusan Naskah Proklamasi",
        subtitle: "Marketing Intern",
        location: "Jakarta, Indonesia",
        date: "Oct 2024 - Dec 2024",
        description: [
            "Participated in strategy discussions to identify campaign priorities and align content with the museum’s marketing goals.",
            "Produced short-form video content to promote exhibitions, events, and educational programs across the museum’s digital channels.",
        ],
    },
];

export const organizations: ResumeItem[] = [
    {
        title: "Himpunan Mahasiswa Pariwisata, Universitas Brawijaya",
        subtitle: "Advocacy Staff",
        location: "Malang, Indonesia",
        date: "Feb 2023 - Dec 2023",
    },
    {
        title: "KOMSOS (Komunikasi Sosial), Gereja Santa Maria Imakulata",
        subtitle: "Multimedia Staff",
        location: "Jakarta, Indonesia",
        date: "Apr 2020 - Aug 2021",
    },
    {
        title: "Putra Altar Santo Tarsisius, Gereja Santa Maria Imakulata",
        subtitle: "Vice President",
        location: "Jakarta, Indonesia",
        date: "Jul 2018 - Dec 2023",
    },
];

export const projects: ResumeItem[] = [
    {
        title: "Bazaar UMKM Gereja Santa Maria Imakulata",
        subtitle: "Decoration Committee",
        location: "Jakarta, Indonesia",
        date: "Mar 2024 - Aug 2024",
        description: [
            "Collaborated with a team to design and set up decorations for the annual public bazaar event.",
        ],
    },
    {
        title: "Tourism Scholarship Program",
        subtitle: "Fundraising Coordinator",
        location: "Malang, Indonesia",
        date: "Mar 2023 - Dec 2023",
        description: [
            "Led a team in successfully raising funds for the annual scholarship, achieving a 33.33% increase in scholarship funds compared to the previous year.",
        ],
    },
    {
        title: "Ruang Bahasa Program",
        subtitle: "Event Staff",
        location: "Malang, Indonesia",
        date: "Jul 2023 - Nov 2023",
        description: [
            "Built upon the success of the previous year's beginner-level event by organizing an intermediate-level Korean workshop.",
        ],
    },
    {
        title: "Fun Tourism Program",
        subtitle: "Equipment and Field Coordinator",
        location: "Malang, Indonesia",
        date: "Jun 2023 - Sep 2023",
        description: [
            "Organized and managed logistics for a futsal event at Universitas Brawijaya, enhancing solidarity among tourism students.",
        ],
    },
    {
        title: "Woman In Tourism Seminar",
        subtitle: "Equipment Coordinator",
        location: "Malang, Indonesia",
        date: "Mar 2023 - May 2023",
        description: [
            "Ensured all equipment was set up before the event and managed a team of three staff members to meet the event’s needs.",
        ],
    },
    {
        title: "Acara Kebersamaan Misdinar Gereja Santa Maria Imakulata",
        subtitle: "Vice Chairman of the Committee",
        location: "Jakarta, Indonesia",
        date: "Apr 2022 - Aug 2022",
        description: [
            "Oversaw team activities, ensuring tasks were executed effectively and met event requirements.",
        ],
    },
];

export const certifications = [
    "English - C1 on the CEFR",
    "Duolingo English Test - 130",
];

export const skills = {
    hard: ["Microsoft Office", "Google Workspace"],
    soft: ["Teamwork", "Problem-Solving", "Adaptability", "Leadership", "Fast-learner"],
};
