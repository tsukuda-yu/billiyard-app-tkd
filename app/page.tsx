import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>ビリヤードアプリ</h1>
      <Link href="/game">ゲーム開始</Link>
    </div>
  );
}