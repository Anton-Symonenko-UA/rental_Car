"use client";

import { useState, type SubmitEvent } from "react";
import css from "./RentalForm.module.css";

interface RentalFormProps {
  carId: string;
}

export default function RentalForm({ carId }: RentalFormProps) {
  const [message, setMessage] = useState("");

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const bookingDate = String(formData.get("bookingDate") ?? "");

    if (!name || !email || !bookingDate) {
      setMessage("Заповніть усі обов’язкові поля.");
      return;
    }

    if (bookingDate < minDate) {
      setMessage("Оберіть сьогоднішню або майбутню дату.");
      return;
    }

    setMessage("Дані перевірено. Надсилання заявки ще не підключено.");
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

      <button className={css.button} type="submit">
        Send
      </button>

      <p className={css.message} role="status">
        {message}
      </p>
    </form>
  );
}
