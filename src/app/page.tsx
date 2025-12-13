import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";
import Experience from "@/components/sections/experience";
import Education from "@/components/sections/education";
import Organizations from "@/components/sections/organizations";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Contact from "@/components/ui/Contact";
import { getCertifications, getEducation, getExperience, getOrganizations, getProjects, getSkills, getProfile } from "@/lib/data";
import { AnimatedBackground } from "@/components/ui/animated-background";

// Revalidate all data every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  // Fetch data in parallel
  const [
    experienceData,
    educationData,
    organizationsData,
    projectsData,
    skillsData,
    certificationsData,
    profileData
  ] = await Promise.all([
    getExperience(),
    getEducation(),
    getOrganizations(),
    getProjects(),
    getSkills(),
    getCertifications(),
    getProfile()
  ]);

  // Fallback if no profile exists yet
  const profile = profileData || {
    name: "Christopher Aaron",
    headline: "Crafting digital experiences with precision and clarity.",
    bio: "I am a specialized developer focused on clarity and performance.",
    email: "hello@example.com",
    github: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    id: "",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Serialize data to avoid passing Date objects to Client Components
  const cleanExperience = experienceData.map(({ createdAt, updatedAt, ...item }) => item);
  const cleanEducation = educationData.map(({ createdAt, updatedAt, ...item }) => item);
  const cleanOrganizations = organizationsData.map(({ createdAt, updatedAt, ...item }) => item);
  const cleanProjects = projectsData.map(({ createdAt, updatedAt, ...item }) => item);

  const allHardSkills = skillsData.hard.map(({ createdAt, updatedAt, ...item }) => item);
  const featuredHardSkills = allHardSkills.filter(s => s.featured);

  const cleanSkills = {
    hard: allHardSkills,
    soft: skillsData.soft.map(({ createdAt, updatedAt, ...item }) => item),
  };
  const cleanCertifications = certificationsData.map(({ createdAt, updatedAt, ...item }) => item);

  // For profile, we need to be careful as it's a single object
  const { createdAt, updatedAt, ...cleanProfile } = profile;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://christopheraaron.vercel.app';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.headline,
    url: baseUrl,
    sameAs: [
      profile.linkedin,
      profile.github,
      profile.twitter,
      profile.instagram
    ].filter(Boolean),
    description: profile.bio
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Christopher Aaron Portfolio',
    url: baseUrl,
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, websiteJsonLd]) }}
      />
      <Navbar name={cleanProfile.name} />
      <Hero name={cleanProfile.name} headline={cleanProfile.headline} />
      <About bio={cleanProfile.bio} skills={featuredHardSkills} />
      <Experience data={cleanExperience} />
      <Education data={cleanEducation} />
      <Organizations data={cleanOrganizations} />
      <Projects data={cleanProjects} />
      <Skills skills={cleanSkills} certifications={cleanCertifications} />
      <Contact profile={cleanProfile} />

      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border relative z-10 bg-background">
        © {new Date().getFullYear()} {profile.name}.
      </footer>
    </main>
  );
}
