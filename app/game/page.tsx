"use client";

import { useState } from "react";

export default function GamePage() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <h1>ビリヤード スコア</h1>

      <div>
        <h2>プレイヤーA: {scoreA}</h2>
        <button onClick={() => setScoreA(scoreA + 1)}>
          +1
        </button>
      </div>

      <div>
        <h2>プレイヤーB: {scoreB}</h2>
        <button onClick={() => setScoreB(scoreB + 1)}>
          +1
        </button>
      </div>
    </div>
  );
}