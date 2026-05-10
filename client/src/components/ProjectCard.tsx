import { motion } from "framer-motion";
import { ExternalLink, Video, ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl: string | null;
  videoUrl: string | null;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const categoryColors: Record<string, string> = {
  "Robotics": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Computer Vision": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Embedded Systems": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "AI / ML": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "AI/CV": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Control Systems": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Embedded": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const defaultCategoryColor = "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";

export function ProjectCard({ project, index }: ProjectCardProps) {
  const categoryStyle = categoryColors[project.category] ?? defaultCategoryColor;
  const link = project.videoUrl || project.githubUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex flex-col h-full"
      data-testid={`project-card-${project.id}`}
    >
      <div className="relative flex flex-col h-full bg-[hsl(240_5%_7%)] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-0.5">
        {/* Top accent bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="p-6 flex flex-col flex-1 gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span
                className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${categoryStyle} mb-3`}
              >
                {project.category}
              </span>
              <h3 className="text-base font-semibold text-white/90 leading-snug group-hover:text-white transition-colors">
                {project.title}
              </h3>
            </div>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.18] transition-all"
                title={project.videoUrl ? "View Demo" : "View on GitHub"}
                data-testid={`project-link-${project.id}`}
              >
                {project.videoUrl ? (
                  <Video className="w-3.5 h-3.5" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                )}
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-white/40 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/40"
                data-testid={`project-tag-${project.id}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
