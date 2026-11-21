
function ProfileProgress({ profile }) {
  const checks = [
    {
      title: "Personal Information",
      description: "Name, headline, bio and location",
      completed: Boolean(
        profile.name?.trim() &&
        profile.headline?.trim() &&
        profile.bio?.trim() &&
        profile.location?.trim()
      ),
    },
    {
      title: "Education",
      description: "Add at least one education record",
      completed: profile.education?.some(
        (item) => item.institution?.trim() && item.degree?.trim()
      ) || false,
    },
    {
      title: "Technical Skills",
      description: "Add at least three skills",
      completed: (profile.skills?.filter(Boolean).length || 0) >= 3,
    },
    {
      title: "Work Experience",
      description: "Add at least one work experience",
      completed: profile.experience?.some(
        (item) => item.company?.trim() && item.position?.trim()
      ) || false,
    },
    {
      title: "Projects",
      description: "Add at least one project",
      completed: profile.projects?.some(
        (item) => item.title?.trim() && item.description?.trim()
      ) || false,
    },
    {
      title: "Career Preferences",
      description: "Select job roles and locations",
      completed: Boolean(
        profile.preferredJobRoles?.some(Boolean) &&
        profile.preferredLocations?.some(Boolean)
      ),
    },
  ];

  const completedCount = checks.filter(
    (item) => item.completed
  ).length;

  const percentage = Math.round(
    (completedCount / checks.length) * 100
  );

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Profile Completion
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Complete your profile to improve your AI job recommendations.
          </p>
        </div>

        <div className="text-3xl font-bold text-blue-600">
          {percentage}%
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-slate-500">
        {completedCount} of {checks.length} sections completed
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {checks.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3"
          >
            <div
              className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm ${
                item.completed
                  ? "bg-green-100 text-green-600"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {item.completed ? "✓" : "○"}
            </div>

            <div>
              <h3 className="font-medium text-slate-800">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500">
                {item.completed
                  ? "Completed"
                  : item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {percentage === 100 ? (
        <div className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          Excellent! Your professional profile is complete.
        </div>
      ) : (
        <div className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
          Keep going! Complete the remaining sections to reach 100%.
        </div>
      )}
    </div>
  );
}

export default ProfileProgress;
