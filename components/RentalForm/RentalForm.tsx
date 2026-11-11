"use client";

import { useId, useRef, useState, type SubmitEvent } from "react";
import toast from "react-hot-toast";
import { createBookingRequest } from "@/lib/api/rentals";
import css from "./RentalForm.module.css";
import Icon from "@/components/Icons/Icons";

interface RentalFormProps {
  carId: string;
}

type FieldName = "name" | "email" | "comment";
type FieldErrors = Partial<Record<FieldName, string>>;

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
  },
] as const;

export default function RentalForm({ carId }: RentalFormProps) {
  const formId = useId();
  const submittingRef = useRef(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function clearError(field: FieldName) {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const comment = String(formData.get("comment") ?? "").trim();

    const nextErrors: FieldErrors = {};
    const emailInput = form.querySelector<HTMLInputElement>(
      'input[name="email"]',
    );

    if (!name) {
      nextErrors.name = "Please enter your name.";
    } else if (name.length > 100) {
      nextErrors.name = "Use no more than 100 characters.";
    } else if (!/^\p{L}[\p{L}\p{M}]*(?:[ '’ʼ-]\p{L}[\p{L}\p{M}]*)*$/u.test(name)) {
      nextErrors.name = "Use letters, spaces, hyphens or apostrophes. Numbers are not allowed.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (emailInput?.validity.typeMismatch) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (comment.length > 1000) {
      nextErrors.comment = "Use no more than 1,000 characters.";
    }

    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0];

    if (firstInvalidField) {
      form
        .querySelector<
          HTMLInputElement | HTMLTextAreaElement
        >(`[name="${firstInvalidField}"]`)
        ?.focus();

      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      await createBookingRequest(carId, {
        name,
        email,
        ...(comment && { comment }),
      });

      form.reset();
      toast.success(
        "Your booking request has been sent! We will contact you to confirm the details.",
      );
    } catch {
      toast.error("Could not send your request. Please try again.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
      aria-labelledby={`${formId}-title`}
      aria-busy={isSubmitting}
      noValidate
    >
      <div className={css.header}>
        <h2 id={`${formId}-title`} className={css.title}>
          Book your car now
        </h2>

        <p className={css.description}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <fieldset className={css.fields} disabled={isSubmitting}>
        <legend className={css.visuallyHidden}>Booking details</legend>

        {fields.map((field) => {
          const inputId = `${formId}-${field.name}`;
          const error = errors[field.name];

          return (
            <div key={field.name} className={css.field}>
              <label className={error ? css.errorLabel : css.visuallyHidden} htmlFor={inputId}>
                {field.label}*
              </label>

              <div className={css.inputWrap}>
                <input
                  id={inputId}
                  className={css.input}
                  name={field.name}
                  type={field.type}
                  placeholder={`${field.label}*`}
                  autoComplete={field.autoComplete}
                  maxLength={field.name === "name" ? 100 : undefined}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${inputId}-error` : undefined}
                  onChange={() => clearError(field.name)}
                  required
                />
                {error && <Icon name="error" size={24} className={css.errorIcon} />}
              </div>

              {error && (
                <p id={`${inputId}-error`} className={css.fieldError}>
                  {error}
                </p>
              )}
            </div>
          );
        })}

        <div className={css.field}>
          <label className={css.visuallyHidden} htmlFor={`${formId}-comment`}>
            Comment
          </label>

          <div className={css.inputWrap}>
            <textarea
              id={`${formId}-comment`}
              className={css.textarea}
              name="comment"
              placeholder="Comment"
              rows={3}
              maxLength={1000}
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={
                errors.comment ? `${formId}-comment-error` : undefined
              }
              onChange={() => clearError("comment")}
            />
            {errors.comment && <Icon name="error" size={24} className={css.errorIcon} />}
          </div>

          {errors.comment && (
            <p id={`${formId}-comment-error`} className={css.fieldError}>
              {errors.comment}
            </p>
          )}
        </div>
      </fieldset>

      <button className={css.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
