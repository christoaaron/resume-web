import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { AnalyticsTracker } from "@/components/analytics-tracker";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Christopher Aaron | Tourism, Marketing & Business Administration Professional",
    template: "%s | Christopher Aaron",
  },
  description: "Portfolio of Christopher Aaron, a dedicated Tourism, Marketing, and Business Administration graduate. Skilled in digital marketing, project management, and customer relations.",
  keywords: [
    // Personal Brand
    "Christopher Aaron", "Christopher Aaron CV", "Christopher Aaron resume", "Tourism graduate Christopher Aaron",
    "Marketing graduate Christopher Aaron", "Business administration graduate Christopher Aaron", "Fresh graduate CV Christopher Aaron",
    "Professional portfolio Christopher Aaron", "Curriculum Vitae Christopher Aaron", "Online resume Christopher Aaron",
    // Tourism & Hospitality
    "Tourism graduate", "Tourism management skills", "Travel industry entry level", "Hospitality and tourism CV",
    "Guest relations skills", "Customer service in tourism", "Tourism job seeker", "Tourism internship candidate",
    "Tour operations assistant", "Reservations assistant skills", "Destination management support", "Travel consultant entry level",
    "Tourism operations trainee", "Tourism administration skills", "Tourism fresh graduate resume", "Lulusan pariwisata",
    "Keahlian manajemen pariwisata", "Kandidat magang pariwisata", "CV pariwisata", "Pekerjaan pariwisata fresh graduate",
    // Marketing
    "Marketing graduate", "Digital marketing skills", "Marketing assistant skills", "Social media marketing resume",
    "Content creation skills", "Brand communication skills", "Marketing internship candidate", "Entry-level marketing professional",
    "Market research skills", "Marketing coordinator trainee", "Consumer behavior knowledge", "Junior marketing specialist",
    "Marketing portfolio examples", "Lulusan pemasaran", "Keahlian digital marketing", "Asisten pemasaran pemula",
    "Portofolio pemasaran", "Kandidat magang pemasaran", "Resume pemasaran fresh graduate", "Pekerjaan pemasaran entry level",
    // Business Administration
    "Business administration graduate", "Administrative assistant skills", "Office management support", "Business operations trainee",
    "Project coordination skills", "Organizational skills resume", "Business development support", "Entry-level admin professional",
    "Operations assistant resume", "Fresh graduate administrative CV", "Corporate support assistant", "Business analyst entry level",
    "Administrative job seeker", "Lulusan administrasi bisnis", "Keahlian administrasi perkantoran", "Trainee operasional bisnis",
    "CV administrasi bisnis", "Kandidat administrasi pemula", "Asisten kantor entry level", "Dukungan administrasi kantor",
    // Soft Skills
    "Strong communication skills", "Customer service excellence", "Problem-solving ability", "Teamwork and collaboration",
    "Adaptability and flexibility", "Time management skills", "Leadership potential", "Interpersonal communication",
    "Critical thinking skills", "Professional work attitude",
    // Hiring Intent
    "Hire tourism graduate", "Entry-level marketing candidate", "Business admin fresh graduate", "Junior business operations assistant",
    "Tourism job applicant", "Marketing job applicant", "Administrative support candidate", "Fresh graduate recruitment",
    "Kandidat fresh graduate pariwisata", "Kandidat administrasi bisnis"
  ],
  authors: [{ name: "Christopher Aaron" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mausukses.com", // Placeholder, user should update
    title: "Christopher Aaron | Tourism, Marketing & Business Administration Portfolio",
    description: "Explore the professional portfolio of Christopher Aaron, featuring skills in tourism management, digital marketing, and business administration.",
    siteName: "Christopher Aaron Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Aaron | Portfolio",
    description: "Tourism, Marketing & Business Administration Graduate.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          jakarta.variable,
          "antialiased bg-background text-foreground min-h-screen font-sans"
        )}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <AnalyticsTracker />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
