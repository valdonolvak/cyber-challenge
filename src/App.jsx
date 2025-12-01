import React, { useEffect, useState, useRef } from "react";

export default function App() {
  const QUESTIONS = [
    // kõik 20 küsimust, igaühel timeLimitSeconds: 420
  ];

  const [level, setLevel] = useState(() => Number(localStorage.getItem("cyber_level") || 1));
  const [score, setScore] = useState(() => Number(localStorage.getItem("cyber_score") || 0));
  const [usedHints, setUsedHints] = useState(() => Number(localStorage.getItem("cyber_hints") || 0));
  const [input, setInput] = useState("");
  const [message, setMessage] = useState(null);
  const [stage, setStage] = useState(1); // 1 = vastus, 2 = kinnita
  const [timeLeft, setTimeLeft] = useState(() => QUESTIONS[0].timeLimitSeconds);
  const [showHintText, setShowHintText] = useState(false);
  const [showSolutionText, setShowSolutionText] = useState(false);
  const [userName, setUserName] = useState("");
  const timerRef = useRef(null);
  const maxHints = 3;

  const q = QUESTIONS.find((q) => q.id === level) || QUESTIONS[0];

  useEffect(() => {
    setTimeLeft(q.timeLimitSeconds);
    setInput("");
    setMessage(null);
    setStage(1);
    setShowHintText(false);
    setShowSolutionText(false);
    localStorage.setItem("cyber_level", level);
  }, [level]);

  useEffect(() => localStorage.setItem("cyber_score", score), [score]);
  useEffect(() => localStorage.setItem("cyber_hints", usedHints), [usedHints]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setMessage("Aeg otsas! Proovi uuesti.");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [level]);

  const normalize = (s) => s.trim().toLowerCase();

  function handleSubmitAnswer(e) {
    e.preventDefault();
    if (timeLeft <= 0) {
      setMessage("Aeg on läbi — taset ei õnnestu lõpetada.");
      return;
    }
    if (normalize(input) === normalize(q.answer)) {
      setMessage("Vastus õige! Liigume kinnituse etappi — vajuta 'Kinnita' 15 sekundi jooksul.");
      setStage(2);
      let confirmT = 15;
      const confirmId = setInterval(() => {
        confirmT -= 1;
        if (confirmT <= 0) {
          clearInterval(confirmId);
          setMessage("Kinnituse aeg läbi — vastus ei loe, alusta uuesti.");
          setStage(1);
        }
      }, 1000);
    } else {
      setMessage("Vale vastus — proovi uuesti.");
    }
  }

  function handleConfirmClaim() {
    if (stage !== 2) return;
    const timeFactor = Math.max(0.1, timeLeft / q.timeLimitSeconds);
    const awarded = Math.round(q.basePoints * timeFactor) + ((maxHints - usedHints) * 10);
    setScore((s) => s + awarded);
    setMessage(`Tase läbitud! Saad ${awarded} punkti.`);
    setLevel(Math.min(20, level + 1));
    setStage(1);
  }

  function handleUseHint() {
    if (usedHints >= maxHints) {
      setMessage("Sul õlekõrsi enam ei jagu.");
      return;
    }
    setShowHintText(true);
  }

  function handleRevealSolution() {
    if (usedHints >= maxHints) {
      setMessage("Õlekõrsed otsas — ei saa lahendust näidata.");
      return;
    }
    setShowSolutionText(true);
    setUsedHints((h) => h + 1);
  }

  function resetProgress() {
    if (!confirm("Pärast kinnitamist sinu edusammud kustutatakse — oled kindel?")) return;
    localStorage.removeItem("cyber_level");
    localStorage.removeItem("cyber_score");
    localStorage.removeItem("cyber_hints");
    setLevel(1);
    setScore(0);
    setUsedHints(0);
    setInput("");
    setMessage("Edusammud lähtestatud.");
  }

  function handleSendResults() {
    if (!userName) {
      setMessage("Palun sisesta oma nimi.");
      return;
    }
    const subject = encodeURIComponent("Küberväljakutse tulemused");
    const body = encodeURIComponent(
      `Tere!\n\nMinu nimi: ${userName}\nSkoor: ${score}\nTase: ${level - 1}\nKasutatud õlekõrsed: ${usedHints}\n\nParimate soovidega.`
    );
    window.location.href = `mailto:valdo.nolvak@hkhk.edu.ee?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 grid gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Küberväljakutse — 20 taset</h1>
          <div className="text-right">
            <div className="text-sm text-slate-300">Tase</div>
            <div className="font-mono text-xl">{level} / 20</div>
          </div>
        </header>

        <main className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-2 p-4 bg-slate-700/40 rounded-xl">
            <h2 className="font-semibold text-lg">{`Tase ${q.id}`}</h2>
            <p className="mt-2 text-slate-200">{q.prompt}</p>

            <form onSubmit={handleSubmitAnswer} className="mt-4 flex gap-3 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-600 placeholder-slate-400 focus:outline-none"
                placeholder="Sisesta vastus siia..."
                aria-label="Vastus"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
              >
                Esita
              </button>
            </form>

            {showHintText && (
              <div className="mt-3 p-3 bg-amber-700 rounded text-slate-900">
                <strong>Vihje:</strong> {q.hint}
              </div>
            )}
            {showSolutionText && (
              <div className="mt-3 p-3 bg-red-700 rounded text-slate-100">
                <strong>Lahenduskäik:</strong> {q.solution}
              </div>
            )}
          </section>

          <aside className="p-4 bg-slate-700/40 rounded-xl flex flex-col gap-4">
            <div>
              <div className="text-sm text-slate-300">Skoor</div>
              <div className="font-mono text-xl">{score}</div>
            </div>
            <div>
              <div className="text-sm text-slate-300">Õlekõrsed jäänud</div>
              <div className="font-mono text-xl">{maxHints - usedHints}</div>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Kaheastmeline kinnitamine</h4>
              <button
                onClick={handleConfirmClaim}
                disabled={stage !== 2}
                className={`mt-2 px-4 py-2 rounded ${stage === 2 ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-600 cursor-not-allowed"} text-black font-semibold`}
              >
                Kinnita
              </button>
            </div>

            <div className="mt-auto">
              <h4 className="text-sm font-semibold">Saada tulemused</h4>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Sisesta oma nimi"
                className="w-full p-2 rounded bg-slate-800 border border-slate-600 mt-1"
              />
              <button
                onClick={handleSendResults}
                className="mt-2 w-full px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              >
                Saada tulemused
              </button>
            </div>

            <button
              onClick={resetProgress}
              className="mt-4 px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-semibold"
            >
              Lähtesta edusammud
            </button>
          </aside>
        </main>

        <footer className="flex justify-between text-xs text-slate-400 mt-4">
          <div>Arendatud: õppematerjaliks — muuda küsimusi vastavalt kursusele</div>
          <div>Salvestatud brauserisse (localStorage)</div>
        </footer>
      </div>
    </div>
  );
}
