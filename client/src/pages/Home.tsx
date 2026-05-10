import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { useProjects, useSkills } from "@/hooks/use-portfolio";
import { Download, MapPin, Mail, Phone, Linkedin, Github, ArrowRight } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function appear(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease },
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-6 h-px bg-white/20" />
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white/90 tracking-tight leading-tight">
      {children}
    </h2>
  );
}

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">

        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/3 w-[800px] h-[700px] bg-indigo-600/14 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[110px]" />
          <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-10 left-1/3 w-[500px] h-[250px] bg-blue-500/7 rounded-full blur-[100px]" />
        </div>

        {/* Radar visualization — right side */}
        <div className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center justify-center w-[48%] pointer-events-none">
          <div className="relative w-[420px] h-[420px] flex items-center justify-center">

            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-2xl" />

            {/* Concentric rings */}
            {[100, 75, 50, 27].map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-white/[0.06]"
                style={{ width: `${size}%`, height: `${size}%` }}
              />
            ))}

            {/* Crosshair */}
            <div className="absolute w-full h-px bg-white/[0.04]" />
            <div className="absolute h-full w-px bg-white/[0.04]" />

            {/* Radar sweep */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              {/* Sweep line */}
              <div
                className="absolute top-1/2 left-1/2 h-px w-[48%] -translate-y-1/2 origin-left"
                style={{ background: "linear-gradient(to right, rgba(99,102,241,0.85), transparent)" }}
              />
              {/* Sweep fade cone */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, rgba(99,102,241,0.13) 0deg, rgba(99,102,241,0.04) 40deg, transparent 80deg)",
                }}
              />
            </motion.div>

            {/* Blip points (detected objects) */}
            {[
              { top: "18%", left: "68%", delay: 0 },
              { top: "62%", left: "80%", delay: 0.8 },
              { top: "75%", left: "38%", delay: 1.5 },
              { top: "28%", left: "22%", delay: 0.4 },
              { top: "50%", left: "58%", delay: 1.1 },
              { top: "38%", left: "48%", delay: 2.0 },
            ].map((dot, i) => (
              <div key={i} className="absolute" style={{ top: dot.top, left: dot.left }}>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/80 shadow-[0_0_6px_2px_rgba(99,102,241,0.5)]" />
                <div
                  className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-indigo-400/40 animate-ping"
                  style={{ animationDelay: `${dot.delay}s`, animationDuration: "2s" }}
                />
              </div>
            ))}

            {/* Center dot */}
            <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400 z-10 shadow-[0_0_12px_4px_rgba(99,102,241,0.6)]" />

            {/* Label */}
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              <span className="text-[10px] font-mono text-white/15 uppercase tracking-[0.2em]">LiDAR · SLAM · Autonomy</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full pt-28 pb-20">

          {/* Status badge */}
          <motion.div {...appear(0.05)} className="mb-9">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-medium text-white/50 tracking-wide"
              data-testid="status-available"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgb(52_211_153_/_0.5)]" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...appear(0.12)}
            className="text-[clamp(56px,10vw,112px)] font-extrabold text-white tracking-[-0.04em] leading-[0.9] mb-7"
            data-testid="hero-name"
          >
            Deepak K
          </motion.h1>

          {/* Role typewriter */}
          <motion.div
            {...appear(0.22)}
            className="text-xl md:text-2xl font-medium text-white/30 mb-7 h-8 font-mono"
            data-testid="hero-subtitle"
          >
            <Typewriter
              options={{
                strings: [
                  "Robotics",
                  "Control Systems",
                  "AI & Computer Vision",
                  "EEE Student",
                ],
                autoStart: true,
                loop: true,
                delay: 55,
                deleteSpeed: 25,
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...appear(0.3)}
            className="max-w-xl text-[15px] md:text-base text-white/35 leading-relaxed mb-11 font-light"
          >
            I love building things that move — robots, anything with a motor and a
            microcontroller. Most nights you'll find me playing with electronics,
            debugging firmware, or picking up something new just to build it.
            That's just how I'm wired.
          </motion.p>

          {/* CTAs */}
          <motion.div {...appear(0.38)} className="flex flex-wrap gap-3 mb-16">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 active:scale-[0.98] transition-all shadow-lg shadow-white/10"
              data-testid="button-view-projects"
            >
              View Projects
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => window.open("/resume.pdf", "_blank")}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-white/[0.13] text-white/65 font-medium text-sm hover:text-white hover:border-white/28 hover:bg-white/[0.05] active:scale-[0.98] transition-all"
              data-testid="button-download-resume"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </button>
          </motion.div>

          {/* Stats bar */}
          <motion.div {...appear(0.46)}>
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/[0.07]">
              {[
                { value: "9.24", label: "CGPA / 10.0" },
                { value: "6", label: "Projects Built" },
                { value: "4", label: "Certifications" },
                { value: "2027", label: "Graduation" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white/85 tracking-tight leading-none mb-1">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-white/30 font-medium uppercase tracking-widest">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── ABOUT ─────────────── */}
      <section id="about" className="py-28 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <SectionLabel>About</SectionLabel>
            <SectionHeading>Engineering at the edge of hardware and code</SectionHeading>
          </motion.div>

          <div className="mt-14 grid md:grid-cols-5 gap-12 items-start">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="md:col-span-3 space-y-5 text-[15px] leading-relaxed text-white/45"
            >
              <p>
                I genuinely love working with robots — building them, programming them, breaking
                them, and figuring out why. I'm an{" "}
                <span className="text-white/80 font-medium">EEE undergraduate</span> at{" "}
                <span className="text-white/80 font-medium">New Horizon College of Engineering</span>{" "}
                (2023 – 2027), CGPA{" "}
                <span className="text-white/85 font-semibold">9.24 / 10.0</span>.
              </p>
              <p>
                I spend most of my nights learning something new and building something real —
                whether that's getting a{" "}
                <span className="text-white/75 font-medium">ROS&nbsp;2 navigation stack</span> to
                map a room cleanly, tuning an{" "}
                <span className="text-white/75 font-medium">MPC controller</span> to outrun PID,
                or flashing firmware onto a custom PCB at 2am.
              </p>
              <p>
                The thing that keeps me going is that gap between code and the physical world.
                Closing it — making a robot actually <em className="text-white/60 not-italic">do</em> what
                you intended — never gets old.
              </p>

              <div className="pt-3 border-t border-white/[0.06] space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">Experience</div>
                <div className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400/50 flex-shrink-0" />
                  <div>
                    <div className="text-[13px] font-semibold text-white/65">
                      Project Committee Member — Embedded Systems Club
                    </div>
                    <div className="text-[11px] text-white/30 mt-0.5">
                      New Horizon College of Engineering &nbsp;·&nbsp; Aug 2024 – Sep 2025
                    </div>
                    <div className="text-[12px] text-white/30 mt-2 leading-relaxed">
                      Organised workshops on microcontrollers & embedded development; led prototyping
                      projects with sensor integration, circuit design, and cross-functional teamwork.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Certifications</div>
                <div className="space-y-2">
                  {[
                    "NVIDIA Deep Learning Institute — AI on Jetson Nano",
                    "AWS — Introduction to Robotics",
                    "IBM — Artificial Intelligence Fundamentals",
                    "Universal Robots — Industrial Robot e-Learning",
                  ].map((c) => (
                    <div key={c} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      <span className="text-[12px] text-white/35">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="md:col-span-2 grid grid-cols-2 gap-3"
            >
              {[
                { label: "CGPA", value: "9.24", sub: "Till 5th Semester" },
                { label: "Projects", value: "6+", sub: "Built & Documented" },
                { label: "Focus", value: "ROS 2", sub: "Robotics · Control · EE" },
                { label: "Location", value: "BLR", sub: "Bengaluru, India" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] transition-colors"
                  data-testid={`stat-${s.label.toLowerCase()}`}
                >
                  <div className="text-2xl font-bold text-white/85 tracking-tight leading-none mb-1.5">
                    {s.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/28">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-white/22 mt-1">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── SKILLS ─────────────── */}
      <section id="skills" className="py-28 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <SectionLabel>Technical Arsenal</SectionLabel>
            <SectionHeading>What I work with</SectionHeading>
          </motion.div>

          <div className="mt-14">
            {skillsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-36 rounded-2xl bg-white/[0.03] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills?.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease }}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] transition-colors"
                    data-testid={`skill-category-${cat.id}`}
                  >
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                      {cat.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11.5px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.06] text-white/55 border border-transparent hover:bg-white/[0.1] hover:text-white/80 transition-all cursor-default font-mono"
                          data-testid={`skill-item-${skill}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────── PROJECTS ─────────────── */}
      <section id="projects" className="py-28 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <SectionLabel>Work</SectionLabel>
            <SectionHeading>Featured Projects</SectionHeading>
          </motion.div>

          <div className="mt-14">
            {projectsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-56 rounded-2xl bg-white/[0.03] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects?.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section id="contact" className="py-28 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <SectionLabel>Contact</SectionLabel>
            <SectionHeading>Let's work together</SectionHeading>
          </motion.div>

          <div className="mt-14 grid md:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="md:col-span-2 space-y-8"
            >
              <p className="text-[15px] text-white/38 leading-relaxed">
                Open to internships, research collaborations, and projects at the
                intersection of robotics, control systems, and embedded engineering.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", val: "deeeeps06@gmail.com", href: "mailto:deeeeps06@gmail.com" },
                  { icon: Phone, label: "Phone", val: "+91 9606137475", href: "tel:+919606137475" },
                  { icon: MapPin, label: "Location", val: "Bengaluru, India", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3.5">
                    <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-white/35" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/22 font-semibold mb-0.5">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-white/50 hover:text-white/80 transition-colors" data-testid={`contact-${item.label.toLowerCase()}`}>
                          {item.val}
                        </a>
                      ) : (
                        <span className="text-sm text-white/50">{item.val}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/deepk6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/38 hover:text-white/70 hover:border-white/[0.15] transition-all text-sm"
                  data-testid="contact-linkedin"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Deepakk-06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/38 hover:text-white/70 hover:border-white/[0.15] transition-all text-sm"
                  data-testid="contact-github"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="md:col-span-3 p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07]"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="py-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/[0.07] border border-white/[0.1] flex items-center justify-center">
              <span className="text-[9px] font-extrabold text-white/55">DK</span>
            </div>
            <span className="text-sm font-medium text-white/22">Deepak K</span>
          </div>
          <p className="text-xs text-white/18">
            &copy; {new Date().getFullYear()} — Built with React &amp; Tailwind
          </p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/deepk6" target="_blank" rel="noopener noreferrer" className="text-white/18 hover:text-white/45 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com/Deepakk-06" target="_blank" rel="noopener noreferrer" className="text-white/18 hover:text-white/45 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="mailto:deeeeps06@gmail.com" className="text-white/18 hover:text-white/45 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
