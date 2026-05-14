"use client";

import { useState } from "react";

type Player = {
  name: string;
  actions: string[];
  score: number;
};

type Rack = {
  players: Player[];
};

type GameState = {
  racks: Rack[];
  turnIndex: number;
};

export default function GamePage() {
  const [history, setHistory] = useState<GameState[]>([
    {
      racks: [
        {
          players: [
            { name: "A", actions: [], score: 0 },
            { name: "B", actions: [], score: 0 },
          ],
        },
      ],
      turnIndex: 0,
    },
  ]);

  const current = history[history.length - 1];
  const currentRack = current.racks[current.racks.length - 1];

  // 名前変更
  const updateName = (index: number, newName: string) => {
    const newRacks = [...current.racks];
    const rack = newRacks[newRacks.length - 1];

    rack.players = rack.players.map((p, i) =>
      i === index ? { ...p, name: newName } : p
    );

    setHistory([...history, { ...current, racks: newRacks }]);
  };

  // プレイヤー追加（最大6人）
  const addPlayer = () => {
    if (currentRack.players.length >= 6) return;

    const newPlayers = [
      ...currentRack.players,
      {
        name: `P${currentRack.players.length + 1}`,
        actions: [],
        score: 0,
      },
    ];

    const newRacks = [...current.racks];
    newRacks[newRacks.length - 1].players = newPlayers;

    setHistory([...history, { ...current, racks: newRacks }]);
  };

  // 得点（全員から奪う）
  const addAction = (symbol: "/" | "X") => {
    const point = symbol === "X" ? 2 : 1;

    const newRacks = [...current.racks];
    const rack = newRacks[newRacks.length - 1];

    rack.players = rack.players.map((p, i) => {
      if (i === current.turnIndex) {
        return {
          ...p,
          actions: [...p.actions, symbol],
          score: p.score + point,
        };
      } else {
        return {
          ...p,
          score: p.score - point,
        };
      }
    });

    setHistory([...history, { ...current, racks: newRacks }]);
  };

  // ターン
  const changeTurn = () => {
    setHistory([
      ...history,
      {
        ...current,
        turnIndex:
          (current.turnIndex + 1) % currentRack.players.length,
      },
    ]);
  };

  // ラック追加
  const nextRack = () => {
    const newRack: Rack = {
      players: currentRack.players.map((p) => ({
        name: p.name,
        actions: [],
        score: p.score,
      })),
    };

    setHistory([
      ...history,
      {
        racks: [...current.racks, newRack],
        turnIndex: 0,
      },
    ]);
  };

  // Undo
  const undo = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🎱 5-9</h1>

      {/* プレイヤー（縦並び） */}
      <div>
        {currentRack.players.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              marginBottom: 8,
              borderRadius: 10,
              background:
                i === current.turnIndex ? "#d0ebff" : "#f1f3f5",
            }}
          >
            {/* 名前入力 */}
            <input
              value={p.name}
              onChange={(e) => updateName(i, e.target.value)}
              style={{
                width: 80,
                fontWeight: "bold",
              }}
            />

            {/* スコア */}
            <div
              style={{
                fontSize: 20,
                color:
                  p.score > 0
                    ? "#1971c2"
                    : p.score < 0
                    ? "#c92a2a"
                    : "#495057",
              }}
            >
              {p.score > 0 ? `+${p.score}` : p.score}
            </div>

            {/* 履歴 */}
            <div style={{ width: 100, textAlign: "right" }}>
              {p.actions.join("") || "-"}
            </div>
          </div>
        ))}
      </div>

      {/* プレイヤー追加 */}
      <button onClick={addPlayer} style={{ marginTop: 10 }}>
        ＋プレイヤー追加（最大6人）
      </button>

      {/* 得点ボタン */}
      <div style={{ marginTop: 20 }}>
        <button style={btnBlue} onClick={() => addAction("/")}>
          /（1点）
        </button>

        <button style={btnRed} onClick={() => addAction("X")}>
          X（2点）
        </button>
      </div>

      {/* 操作 */}
      <div style={{ marginTop: 10 }}>
        <button style={btnGray} onClick={changeTurn}>
          ターン
        </button>

        <button style={btnGray} onClick={nextRack}>
          ラック
        </button>

        <button style={btnGray} onClick={undo}>
          Undo
        </button>
      </div>

      {/* ラック履歴（横スクロール） */}
      <h3 style={{ marginTop: 20 }}>ラック履歴</h3>

      <div style={{ display: "flex", overflowX: "auto", gap: 10 }}>
        {current.racks.map((rack, i) => (
          <div
            key={i}
            style={{
              minWidth: 120,
              padding: 10,
              borderRadius: 10,
              background:
                i === current.racks.length - 1
                  ? "#e7f5ff"
                  : "#f8f9fa",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              R{i + 1}
            </div>

            {rack.players.map((p, idx) => (
              <div key={idx}>
                {p.name}: {p.actions.join("") || "-"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const btnBlue = {
  width: "48%",
  padding: 16,
  fontSize: 18,
  marginRight: "4%",
  borderRadius: 10,
  background: "#4dabf7",
  color: "white",
  border: "none",
};

const btnRed = {
  width: "48%",
  padding: 16,
  fontSize: 18,
  borderRadius: 10,
  background: "#fa5252",
  color: "white",
  border: "none",
};

const btnGray = {
  width: "32%",
  padding: 12,
  marginRight: "2%",
  borderRadius: 8,
  border: "none",
  background: "#dee2e6",
};