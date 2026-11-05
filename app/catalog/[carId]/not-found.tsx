import Link from "next/link";

export default function CarNotFound() {
  return (
    <main>
      <h1>Автомобіль не знайдено</h1>
      <Link href="/catalog">Повернутися до каталогу</Link>
    </main>
  );
}
