import ProjectCard from "@/components/links/ProjectCard";

export default function ProjectsGrid({ projects, emptyMessage = "No projects here yet." }) {
  const visibleProjects = (projects ?? []).filter((project) => project.show);

  if (visibleProjects.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-16 text-center">
        <i className="ri-folder-code-line text-3xl text-(--color-muted)" aria-hidden="true" />
        <p className="text-sm text-(--color-muted)">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-4">
      {visibleProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}