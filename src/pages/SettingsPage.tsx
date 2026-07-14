import { ProfileSettingsForm } from "@/components/settings/ProfileSettingsForm";
import type { ProfileFormValues } from "@/types/user";

const mockProfile: ProfileFormValues = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Frontend developer passionate about accessible, responsive UI.",
};

async function saveProfile(values: ProfileFormValues) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  console.log("Saved profile:", values);
}

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-indigo-600">Account</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Profile settings
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Update your personal information. Fields marked as optional can be
            left blank.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <ProfileSettingsForm
            defaultValues={mockProfile}
            onSave={saveProfile}
          />
        </section>
      </div>
    </div>
  );
}
