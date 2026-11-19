
function Experience({ experience = [], setExperience }) {
  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        position: "",
        employmentType: "Full-time",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Work Experience
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Showcase your professional journey.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600"
        >
          + Add
        </button>
      </div>

      {experience.map((item, index) => (
        <div key={index} className="mb-5 rounded-xl border border-slate-200 p-5">
          <div className="mb-4 flex justify-between">
            <h3 className="font-semibold">Experience {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-sm text-red-500"
            >
              Remove
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["position", "Job Title"],
              ["company", "Company"],
            ].map(([field, label]) => (
              <input
                key={field}
                placeholder={label}
                value={item[field] || ""}
                onChange={(e) =>
                  updateExperience(index, field, e.target.value)
                }
                className="rounded-lg border p-3"
              />
            ))}

            <select
              value={item.employmentType || "Full-time"}
              onChange={(e) =>
                updateExperience(index, "employmentType", e.target.value)
              }
              className="rounded-lg border p-3"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Freelance</option>
              <option>Contract</option>
            </select>

            <input
              type="date"
              value={item.startDate ? item.startDate.slice(0, 10) : ""}
              onChange={(e) =>
                updateExperience(index, "startDate", e.target.value)
              }
              className="rounded-lg border p-3"
            />

            <input
              type="date"
              disabled={item.currentlyWorking}
              value={item.endDate ? item.endDate.slice(0, 10) : ""}
              onChange={(e) =>
                updateExperience(index, "endDate", e.target.value)
              }
              className="rounded-lg border p-3 disabled:bg-slate-100"
            />
          </div>

          <label className="my-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(item.currentlyWorking)}
              onChange={(e) => {
                updateExperience(
                  index,
                  "currentlyWorking",
                  e.target.checked
                );
                if (e.target.checked) {
                  updateExperience(index, "endDate", "");
                }
              }}
            />
            I currently work here
          </label>

          <textarea
            placeholder="Describe your responsibilities and achievements..."
            value={item.description || ""}
            onChange={(e) =>
              updateExperience(index, "description", e.target.value)
            }
            rows="3"
            className="w-full rounded-lg border p-3"
          />
        </div>
      ))}
    </section>
  );
}

export default Experience;
