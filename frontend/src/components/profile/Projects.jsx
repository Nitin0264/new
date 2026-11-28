
function Projects({ projects = [], setProjects }) {
  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        technologies: [],
        projectLink: "",
      },
    ]);
  };

  const updateProject = (index, field, value) => {
    setProjects(
      projects.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Projects
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Highlight your best development projects.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          No projects added yet. Showcase your best work here.
        </p>
      )}

      {projects.map((item, index) => (
        <div
          key={index}
          className="mb-5 rounded-xl border border-slate-200 p-5 last:mb-0"
        >
          <div className="mb-4 flex justify-between">
            <h3 className="font-semibold text-slate-800">
              Project {index + 1}
            </h3>

            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-sm font-medium text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <input
            placeholder="Project Title"
            value={item.title || ""}
            onChange={(e) =>
              updateProject(index, "title", e.target.value)
            }
            className="mb-4 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Describe your project..."
            value={item.description || ""}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
            rows={3}
            className="mb-4 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
          />

          <input
            placeholder="Technologies: React, Node.js, MongoDB"
            value={(item.technologies || []).join(", ")}
            onChange={(e) =>
              updateProject(
                index,
                "technologies",
                e.target.value
                  .split(",")
                  .map((value) => value.trim())
                  .filter(Boolean)
              )
            }
            className="mb-4 w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="url"
            placeholder="Project URL"
            value={item.projectLink || ""}
            onChange={(e) =>
              updateProject(index, "projectLink", e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
          />
        </div>
      ))}
    </section>
  );
}

export default Projects;
