import { MainNav } from "@/components/main-nav"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  I'm a passionate web developer with over 5 years of experience building modern, responsive, and
                  user-friendly web applications. I specialize in frontend development with React, Next.js, and
                  TypeScript, but I'm also comfortable working with backend technologies.
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  My journey in web development started when I was in college, where I built my first website for a
                  student organization. Since then, I've worked with startups, agencies, and enterprise companies,
                  helping them build products that users love.
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  When I'm not coding, you can find me hiking, reading, or experimenting with new technologies. I'm
                  always looking for new challenges and opportunities to grow as a developer.
                </p>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">Skills</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "JavaScript",
                      "HTML",
                      "CSS",
                      "Tailwind CSS",
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "Firebase",
                      "Git",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="/placeholder.svg?height=600&width=400"
                    alt="Profile"
                    className="aspect-[3/4] h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Working"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Hobby"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            © 2023 Portfolio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              GitHub
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Twitter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
