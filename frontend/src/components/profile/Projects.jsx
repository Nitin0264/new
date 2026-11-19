
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
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
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
          className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600"
        >
          + Add Project
        </button>
      </div>

      {projects.map((item, index) => (
        <div key={index} className="mb-5 rounded-xl border border-slate-200 p-5">
          <div className="mb-4 flex justify-between">
            <h3 className="font-semibold">Project {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-sm text-red-500"
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
            className="mb-4 w-full rounded-lg border p-3"
          />

          <textarea
            placeholder="Describe your project..."
            value={item.description || ""}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
            rows="3"
            className="mb-4 w-full rounded-lg border p-3"
          />

          <input
            placeholder="Technologies: React, Node.js, MongoDB"
            value={(item.technologies || []).join(", ")}
            onChange={(e) =>
              updateProject(
                index,
                "technologies",
                e.target.value.split(",").map((v) => v.trim()).filter(Boolean)
              )
            }
            className="mb-4 w-full rounded-lg border p-3"
          />

          <input
            type="url"
            placeholder="Project URL"
            value={item.projectLink || ""}
            onChange={(e) =>
              updateProject(index, "projectLink", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>
      ))}
    </section>
  );
}

export default Projects;
