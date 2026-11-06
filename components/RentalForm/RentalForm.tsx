"use client";

import { useId, useRef, useState, type SubmitEvent } from "react";
import { createBookingRequest } from "@/lib/api/rentals";
import css from "./RentalForm.module.css";

interface RentalFormProps {
  carId: string;
}

type FieldName = "name" | "email" | "bookingDate" | "comment";
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
  {
    name: "bookingDate",
    label: "Booking date",
    type: "date",
    autoComplete: "off",
  },
] as const;

function getToday() {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function RentalForm({ carId }: RentalFormProps) {
  const formId = useId();
  const submittingRef = useRef(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  function clearFeedback(field: FieldName) {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
    setSuccess("");
    setSubmitError("");
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const bookingDate = String(formData.get("bookingDate") ?? "");
    const comment = String(formData.get("comment") ?? "").trim();

    const nextErrors: FieldErrors = {};
    const emailInput = form.querySelector<HTMLInputElement>(
      'input[name="email"]',
    );

    if (!name) {
      nextErrors.name = "Please enter your name.";
    } else if (name.length > 100) {
      nextErrors.name = "Use no more than 100 characters.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (emailInput?.validity.typeMismatch) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!bookingDate) {
      nextErrors.bookingDate = "Please choose a booking date.";
    } else if (bookingDate < getToday()) {
      nextErrors.bookingDate = "Choose today or a future date.";
    }

    if (comment.length > 1000) {
      nextErrors.comment = "Use no more than 1,000 characters.";
    }

    setErrors(nextErrors);
    setSuccess("");
    setSubmitError("");

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
        comment: [`Requested booking date: ${bookingDate}`, comment]
          .filter(Boolean)
          .join("\n"),
      });

      form.reset();
      setSuccess(
        "Your booking request has been sent! We will contact you to confirm the details.",
      );
    } catch {
      setSubmitError("Could not send your request. Please try again.");
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
              <label className={css.visuallyHidden} htmlFor={inputId}>
                {field.label} (required)
              </label>

              <input
                id={inputId}
                className={css.input}
                name={field.name}
                type={field.type}
                placeholder={`${field.label}*`}
                autoComplete={field.autoComplete}
                maxLength={field.name === "name" ? 100 : undefined}
                min={field.type === "date" ? getToday() : undefined}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${inputId}-error` : undefined}
                onChange={() => clearFeedback(field.name)}
                required
              />

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
            onChange={() => clearFeedback("comment")}
          />

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

      <div role="status" aria-atomic="true">
        {success && <p className={css.success}>{success}</p>}
      </div>

      <div role="alert" aria-atomic="true">
        {submitError && <p className={css.submitError}>{submitError}</p>}
      </div>
    </form>
  );
}
