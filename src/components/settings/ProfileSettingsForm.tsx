import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileFormSchema,
} from "@/lib/validations/profile";
import type { ProfileFormValues } from "@/types/user";

interface ProfileSettingsFormProps {
  defaultValues: ProfileFormValues;
  onSave?: (values: ProfileFormValues) => Promise<void> | void;
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-50";

export function ProfileSettingsForm({
  defaultValues,
  onSave,
}: ProfileSettingsFormProps) {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitMessage(null);

    try {
      await onSave?.(values);
      reset(values);
      setSubmitMessage("Profile updated successfully.");
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="firstName"
          label="First name"
          error={errors.firstName?.message}
        >
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={inputClassName}
            {...register("firstName")}
          />
        </FormField>

        <FormField
          id="lastName"
          label="Last name"
          error={errors.lastName?.message}
        >
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={inputClassName}
            {...register("lastName")}
          />
        </FormField>
      </div>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClassName}
          {...register("email")}
        />
      </FormField>

      <FormField id="phone" label="Phone (optional)" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (555) 123-4567"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={inputClassName}
          {...register("phone")}
        />
      </FormField>

      <FormField id="bio" label="Bio (optional)" error={errors.bio?.message}>
        <textarea
          id="bio"
          rows={4}
          placeholder="Tell us a little about yourself"
          aria-invalid={Boolean(errors.bio)}
          aria-describedby={errors.bio ? "bio-error" : undefined}
          className={`${inputClassName} resize-y min-h-24`}
          {...register("bio")}
        />
      </FormField>

      {submitMessage && (
        <p
          className={`text-sm ${
            submitMessage.includes("successfully")
              ? "text-green-700"
              : "text-red-600"
          }`}
          role="status"
        >
          {submitMessage}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => {
            reset(defaultValues);
            setSubmitMessage(null);
          }}
          disabled={isSubmitting || !isDirty}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
