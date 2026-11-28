
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
    setExperience(
      experience.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleCurrentlyWorking = (index, checked) => {
    setExperience(
      experience.map((item, i) =>
        i === index
          ? {
              ...item,
              currentlyWorking: checked,
              endDate: checked ? "" : item.endDate,
            }
          : item
      )
    );
  };

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
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
          className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
        >
          + Add
        </button>
      </div>

      {experience.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          No work experience added yet. Add your internship or professional experience.
        </p>
      )}

      {experience.map((item, index) => (
        <div
          key={index}
          className="mb-5 rounded-xl border border-slate-200 p-5 last:mb-0"
        >
          <div className="mb-4 flex justify-between">
            <h3 className="font-semibold text-slate-800">
              Experience {index + 1}
            </h3>

            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-sm font-medium text-red-500 hover:text-red-700"
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
                className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
              />
            ))}

            <select
              value={item.employmentType || "Full-time"}
              onChange={(e) =>
                updateExperience(index, "employmentType", e.target.value)
              }
              className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
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
              className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
            />

            <input
              type="date"
              disabled={item.currentlyWorking}
              value={item.endDate ? item.endDate.slice(0, 10) : ""}
              onChange={(e) =>
                updateExperience(index, "endDate", e.target.value)
              }
              className="rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
            />
          </div>

          <label className="my-4 flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={Boolean(item.currentlyWorking)}
              onChange={(e) =>
                handleCurrentlyWorking(index, e.target.checked)
              }
              className="h-4 w-4 accent-blue-600"
            />
            I currently work here
          </label>

          <textarea
            placeholder="Describe your responsibilities and achievements..."
            value={item.description || ""}
            onChange={(e) =>
              updateExperience(index, "description", e.target.value)
            }
            rows={3}
            className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
          />
        </div>
      ))}
    </section>
  );
}

export default Experience;
