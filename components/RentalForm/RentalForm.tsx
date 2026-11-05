"use client";

import { useState, type SubmitEvent } from "react";
import css from "./RentalForm.module.css";
import { createBookingRequest } from "@/lib/api/rentals";

interface RentalFormProps {
  carId: string;
}

export default function RentalForm({ carId }: RentalFormProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const bookingDate = String(formData.get("bookingDate") ?? "");
    const comment = String(formData.get("comment") ?? "").trim();

    if (!name || !email || !bookingDate) {
      setMessage("Заповніть усі обов’язкові поля.");
      return;
    }

    if (bookingDate < minDate) {
      setMessage("Оберіть сьогоднішню або майбутню дату.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await createBookingRequest(carId, {
        name,
        email,
        comment: [`Requested booking date: ${bookingDate}`, comment]
          .filter(Boolean)
          .join("\n"),
      });

      form.reset();
      setMessage("Заявку надіслано! Очікуйте підтвердження.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Не вдалося надіслати заявку. Спробуйте ще раз.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.header}>
        <h2 className={css.title}>Book your car now</h2>

        <p className={css.description}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <input type="hidden" name="carId" value={carId} />

      <label className={css.field}>
        Name*
        <input
          className={css.input}
          type="text"
          name="name"
          autoComplete="name"
          maxLength={100}
          required
        />
      </label>

      <label className={css.field}>
        Email*
        <input
          className={css.input}
          type="email"
          name="email"
          autoComplete="email"
          required
        />
      </label>

      <label className={css.field}>
        Booking date*
        <input
          className={css.input}
          type="date"
          name="bookingDate"
          min={minDate}
          required
        />
      </label>

      <label className={css.field}>
        Comment
        <textarea
          className={css.textarea}
          name="comment"
          rows={4}
          maxLength={1000}
        />
      </label>

      <button className={css.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>

      <p className={css.message} role="status">
        {message}
      </p>
    </form>
  );
}
