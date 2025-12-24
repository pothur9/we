import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeadForm from "./components/LeadForm";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "We For Uni - Find Your Perfect College",
  description: "Explore 50,000+ colleges, compare courses, and make informed decisions about your future. Your trusted partner in finding the perfect college.",
  keywords: "colleges, education, courses, admissions, college finder, higher education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <LeadForm />
      </body>
    </html>
  );
}

