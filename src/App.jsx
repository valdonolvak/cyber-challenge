import React, { useEffect, useState, useRef } from "react";

// Cyber Challenge React component
// Tailwind-based single-file app. Default export a React component.

export default function App() {
  // 20 keerulisemat küsimust (eesti keeles). Iga küsimuse juures: prompt, answer (lowercase, trimmed), hint, solution, timeLimitSeconds, basePoints
  const QUESTIONS = [
    {
      id: 1,
      prompt:
        "Tase 1 — Mis termin tähistab kolme peamist infoturbe eesmärki: konfidentsiaalsus, terviklikkus ja kättesaadavus? (3-täheline lühend)",
      answer: "cia",
      hint: "Algustähed sõnadest Confidentiality, Integrity, Availability.",
      solution: "Vastus on CIA (Confidentiality, Integrity, Availability).",
      timeLimitSeconds: 45,
      basePoints: 50,
    },
    {
      id: 2,
      prompt:
        "Tase 2 — Too ühe lause pikkune nimi krüptograafilisele meetodile, kus sama võti kasutatakse nii andmete krüpteerimiseks kui dekrüpteerimiseks (eesti keeles).",
      answer: "sümmeetriline",
      hint: "Võti on sama mõlemas suunas — kiire ja levinud salastusmeetod.",
      solution:
        "Sõna on 'sümmeetriline' (inglise keeles 'symmetric').",
      timeLimitSeconds: 60,
      basePoints: 60,
    },
    {
      id: 3,
      prompt:
        "Tase 3 — Millist porti kasutab tavaliselt SSH protokoll (lihtne number)?",
      answer: "22",
      hint: "See on väike kahekohaline number, tavaline SSH port.",
      solution: "SSH vaikimisi port on 22.",
      timeLimitSeconds: 30,
      basePoints: 40,
    },
    {
      id: 4,
      prompt:
        "Tase 4 — Antud Base64: 'Q1JFU1RFRF9QVUJJQ0k=' — dekrüpteeri ja anna tulemus SUURTEGA tähtedega.",
      answer: "CRESTED_PUBIC",
      hint: "Base64 lõppmärgiks on '=' ja string tundub koosneb ingliskeelsetest sõnadest ja alakriipsust.",
      solution:
        "Base64 dekoodides saad: CRESTED_PUBIC (sisesta täpselt, suurtähtedega).",
      timeLimitSeconds: 90,
      basePoints: 80,
    },
    {
      id: 5,
      prompt:
        "Tase 5 — Mis tüüpi rünnakut teostatakse, kui ründaja kasutab ettevalmistatud nimekirja levinud paroolidest? (üks sõna)",
      answer: "dictionary",
      hint: "See pole bruteforce täies mõttes, vaid 'sõnaraamatul põhinev'.",
      solution:
        "Tavaliselt nimetatakse seda 'dictionary' rünnakuks (sõnastikurünnak).",
      timeLimitSeconds: 60,
      basePoints: 60,
    },
    {
      id: 6,
      prompt:
        "Tase 6 — Caesar-saladus: dekrüpteeri sõna, mis on nihutatud +5 (algne: 'mfqqt'). Mis on algne sõna?",
      answer: "happy",
      hint: "Proovi nihutada tähti vasakule 5 sammu.",
      solution:
        "'mfqqt' tagasi nihutades -5 saad 'happy' (tõlk: rõõmus).",
      timeLimitSeconds: 45,
      basePoints: 70,
    },
    {
      id: 7,
      prompt:
        "Tase 7 — Mis DNS-kirje tüüp seob domeeni IPv4 aadressiga (üks täht)?",
      answer: "a",
      hint: "See on ühe tähega kirje nagu 'A' või 'AAAA'.",
      solution: "IPv4 aadressi kirjet nimetatakse 'A' kirjeks.",
      timeLimitSeconds: 30,
      basePoints: 40,
    },
    {
      id: 8,
      prompt:
        "Tase 8 — Logirida: '2025-11-12T08:12:33Z POST /login 401 from 192.168.100.12' — mis on IP aadress?",
      answer: "192.168.100.12",
      hint: "IP on lõpus, pärast sõna 'from'.",
      solution: "IP on 192.168.100.12.",
      timeLimitSeconds: 30,
      basePoints: 40,
    },
    {
      id: 9,
      prompt:
        "Tase 9 — Mis on kõige levinum viis veebirakenduse SQL injection vältimiseks (üks sõna)?",
      answer: "parametreerimine",
      hint: "Tuleb kasutada ettevalmistatud lauseid / prepared statements.",
      solution:
        "Õige on 'parametreerimine' (prepared statements / parameterized queries).",
      timeLimitSeconds: 75,
      basePoints: 70,
    },
    {
      id: 10,
      prompt:
        "Tase 10 — Mis tööriist võimaldab võrgu liiklust 'kuulata' (inglise üks sõna)?",
      answer: "wireshark",
      hint: "See on GUI/CLI tööriist tuntud pakettide uurimiseks.",
      solution: "Tööriist on Wireshark.",
      timeLimitSeconds: 60,
      basePoints: 60,
    },
    {
      id: 11,
      prompt:
        "Tase 11 — Mis räsi-funktsioon annab fikseeritud pikkusega väljundi ja on vastupidav kokkupõrgetele (ühe sõnaga, nt 'sha256')?",
      answer: "sha256",
      hint: "Tavaliselt kasutatakse see failide tervikluse kontrolliks ja paroolide räsi hoidmiseks.",
      solution: "Näide vastusest: 'sha256'.",
      timeLimitSeconds: 60,
      basePoints: 80,
    },
    {
      id: 12,
      prompt:
        "Tase 12 — Milline HTTP staatuskood tähendab 'Liiga palju päringuid' (kirjuta number)?",
      answer: "429",
      hint: "See kood on 4xx perekonnast ja viitab limiitidele.",
      solution: "429 - Too Many Requests.",
      timeLimitSeconds: 30,
      basePoints: 40,
    },
    {
      id: 13,
      prompt:
        "Tase 13 — XOR operaatoriga: '0110 XOR 1100 = ?' (anna binaarne tulemus).",
      answer: "1010",
      hint: "XOR = erinevus; kui bitid erinevad siis 1.",
      solution: "0110 XOR 1100 = 1010.",
      timeLimitSeconds: 30,
      basePoints: 50,
    },
    {
      id: 14,
      prompt:
        "Tase 14 — Mis meetodiga saad kaitsta API-d, andes igale kliendile unikaalse võtme (inglise, üks sõna)?",
      answer: "apikey",
      hint: "Paljud teenused kasutavad seda lihtsat võtme kontseptsiooni. (kirjuta kokku ilma tühikuteta)",
      solution: "Vastus: 'apikey' (API key).",
      timeLimitSeconds: 60,
      basePoints: 60,
    },
    {
      id: 15,
      prompt:
        "Tase 15 — Mis on tavaliselt kõige paremini sobiv meede rünnete avastamiseks ja logide analüüsiks? (tõlkes ühe sõnaga, näiteks 'SIEM')",
      answer: "siem",
      hint: "Lühend, mis sisaldab sõna 'Event' (sündmus).",
      solution:
        "SIEM (Security Information and Event Management) — lühend 'siem'.",
      timeLimitSeconds: 45,
      basePoints: 70,
    },
    {
      id: 16,
      prompt:
        "Tase 16 — Mis tüüpi krüptograafiline rünnak üritab leida privaatvõtit, kasutades avaliku võtme informatsiooni? (inglise üks sõna)",
      answer: "bruteforce",
      hint: "Selle rünnaku nimetus on sama mis tavalisel parooli bruteforce'il — proovib kõiki võimalusi.",
      solution: "'bruteforce' ehk jõurünnak.",
      timeLimitSeconds: 75,
      basePoints: 80,
    },
    {
      id: 17,
      prompt:
        "Tase 17 — Mis CLI käsk kuvab aktiivseid võrguühendusi Linuxis (üks sõna - tavaliselt algab 'ss' või 'netstat')?",
      answer: "ss",
      hint: "Modernne asendus 'netstat' käsule, lihtne 2-täheline käsk.",
      solution: "'ss' kuvab sokleid ning aktiivseid ühendusi.",
      timeLimitSeconds: 45,
      basePoints: 50,
    },
    {
      id: 18,
      prompt:
        "Tase 18 — Mis termin kirjeldab tegevust, kus ründaja petab DNS-i, et suunata liiklust vale serveri poole? (inglise üks sõna)",
      answer: "dnsspoofing",
      hint: "DNS + spoofing/poisoning - kombineeritud termin.",
      solution: "See on DNS spoofing (või DNS poisoning). Vastus 'dnsspoofing'.",
      timeLimitSeconds: 90,
      basePoints: 90,
    },
    {
      id: 19,
      prompt:
        "Tase 19 — Antud SHA-256 räsi on tuntud näideline räsi (täielik): '8d969eef6ecad3c29a3a629280e686cff8f...'. Mis lihtne parool võib selle räsi taga olla? (üks sõna)",
      answer: "123456",
      hint: "See on maailma üks levinumaid parooliridu - eestikeelne tähendus pole oluline.",
      solution: "Tuntud näide: räsi vastab paroolile '123456'.",
      timeLimitSeconds: 120,
      basePoints: 100,
    },
    {
      id: 20,
      prompt:
        "Tase 20 — Lõpumõistatus: Krüpteeritud tekst on AES-GCM-iga (simuleeritud). Kirjuta sõna, mis kokkuvõttes tähendab 'turvaline'. (eesti keeles, üks sõna)",
      answer: "turvaline",
      hint: "See on sõna, mida oled varem mängu alguses näinud kui ühe infoturbeeesmärgi osa ('confidentiality' ei ole see).",
      solution: "Õige sõna on 'turvaline'.",
      timeLimitSeconds: 180,
      basePoints: 200,
    },
  ];

  // State
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem("cyber_level");
    return saved ? Number(saved) : 1;
  });
  const [score, setScore] = useState(() => {
    const s = localStorage.getItem("cyber_score");
    return s ? Number(s) : 0;
  });
  const [usedHints, setUsedHints] = useState(() => {
    const h = localStorage.getItem("cyber_hints");
    return h ? Number(h) : 0;
  });

  const [input, setInput] = useState("");
  const [message, setMessage] = useState(null);
  const [stage, setStage] = useState(1); // 1 = vastus, 2 = kinnita (kaheastmeline)
  const [timeLeft, setTimeLeft] = useState(() => QUESTIONS[0].timeLimitSeconds);
  const timerRef = useRef(null);
  const [showHintText, setShowHintText] = useState(false);
  const [showSolutionText, setShowSolutionText] = useState(false);

  const maxHints = 3;

  // Update timeLeft when level changes
  useEffect(() => {
    const q = QUESTIONS.find((q) => q.id === level) || QUESTIONS[0];
    setTimeLeft(q.timeLimitSeconds);
    setInput("");
    setMessage(null);
    setStage(1);
    setShowHintText(false);
    setShowSolutionText(false);
    // save
    localStorage.setItem("cyber_level", level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem("cyber_score", score);
  }, [score]);

  useEffect(() => {
    localStorage.setItem("cyber_hints", usedHints);
  }, [usedHints]);

  useEffect(() => {
    // start timer
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
    const q = QUESTIONS.find((q) => q.id === level);
    if (!q) return;
    if (timeLeft <= 0) {
      setMessage("Aeg on läbi — taset ei õnnestu lõpetada.");
      return;
    }
    if (normalize(input) === normalize(q.answer)) {
      // Correct -> move to stage 2 (kinnitamine)
      setMessage("Vastus õige! Liigume kinnituse etappi — vajuta 'Kinnita' 15 sekundi jooksul.");
      setStage(2);
      // start 15s confirmation timer
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
    // Only allowed in stage 2
    if (stage !== 2) return;
    const q = QUESTIONS.find((q) => q.id === level);
    // Points = basePoints * (timeLeft / timeLimit) rounded + bonus for unused hints
    const timeFactor = Math.max(0.1, timeLeft / q.timeLimitSeconds);
    const awarded = Math.round(q.basePoints * timeFactor) + ((maxHints - usedHints) * 10);
    setScore((s) => s + awarded);
    setMessage(`Tase läbitud! Saad ${awarded} punkti.`);
    // advance level
    const next = Math.min(20, level + 1);
    setLevel(next);
    setStage(1);
  }

  function handleUseHint() {
    if (usedHints >= maxHints) {
      setMessage("Sul õlekõrsi enam ei jagu.");
      return;
    }
    // Show hint first; allow user to optionally reveal solution that will consume one õlekõrt
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

  const q = QUESTIONS.find((q) => q.id === level) || QUESTIONS[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 grid gap-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Küberväljakutse — 20 taset</h1>
            <p className="text-sm text-slate-300 mt-1">Iga tase lukustub järgmise jaoks — kasuta maksimaalselt 3 õlekõrt.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-300">Tase</div>
            <div className="font-mono text-xl">{level} / 20</div>
          </div>
        </header>

        <main className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-2 p-4 bg-slate-700/40 rounded-xl">
            <div className="mb-4">
              <h2 className="font-semibold">{`Tase ${q.id}`}</h2>
              <p className="mt-2 text-slate-200 leading-relaxed">{q.prompt}</p>
            </div>

            <form onSubmit={handleSubmitAnswer} className="flex gap-3 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-600 placeholder-slate-400 focus:outline-none"
                placeholder="Sisesta vastus siia..."
                aria-label="vastus"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
              >
                Esita
              </button>
              <button
                type="button"
                onClick={handleUseHint}
                className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                Kasuta õlekõrt ({maxHints - usedHints} jäänud)
              </button>
            </form>

            <div className="mt-4">
              <div className="flex items-center gap-4">
                <div className="bg-slate-900/40 p-3 rounded-md">
                  <div className="text-xs text-slate-400">Aeg jäänud</div>
                  <div className="font-mono text-lg">{timeLeft}s</div>
                </div>

                <div className="bg-slate-900/40 p-3 rounded-md">
                  <div className="text-xs text-slate-400">Põhipunktid</div>
                  <div className="font-mono text-lg">{q.basePoints}</div>
                </div>

                <div className="bg-slate-900/40 p-3 rounded-md">
                  <div className="text-xs text-slate-400">Skoor kokku</div>
                  <div className="font-mono text-lg">{score}</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {message && (
                <div className="bg-slate-700/60 p-3 rounded border border-slate-600 text-slate-200">{message}</div>
              )}

              {showHintText && (
                <div className="mt-3 bg-slate-700/60 p-3 rounded border border-slate-600">
                  <div className="text-sm text-amber-200 font-semibold">Vihje:</div>
                  <div className="mt-1 text-slate-200">{q.hint}</div>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => setShowHintText(false)}
                      className="px-3 py-1 rounded bg-slate-600 text-sm"
                    >
                      Sule
                    </button>
                    <button
                      onClick={handleRevealSolution}
                      className="px-3 py-1 rounded bg-red-600 text-sm text-white"
                    >
                      Näita lahendust (kasutab 1 õlekõrt)
                    </button>
                  </div>
                </div>
              )}

              {showSolutionText && (
                <div className="mt-3 bg-slate-700/60 p-3 rounded border border-slate-600">
                  <div className="text-sm text-red-200 font-semibold">Lahenduskäik:</div>
                  <div className="mt-1 text-slate-200 whitespace-pre-wrap">{q.solution}</div>
                </div>
              )}
            </div>
          </section>

          <aside className="p-4 bg-slate-700/40 rounded-xl">
            <div className="mb-4">
              <h3 className="text-sm text-slate-300">Mängu seaded</h3>
              <div className="mt-2 text-xs text-slate-400">Õlekõrsed jäänud: {maxHints - usedHints}</div>
              <div className="mt-1 text-xs text-slate-400">Sinu skoor: {score}</div>
              <div className="mt-1 text-xs text-slate-400">Tase: {level}/20</div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold">Kaheastmeline kinnitamine</h4>
              <p className="text-xs text-slate-400 mt-2">Kui vastus on õige, pead veel kinnitama (vajuta &quot;Kinnita&quot;) — see on teine etapp, et vältida automaatseid läbilööke.</p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={handleConfirmClaim}
                  className={`px-3 py-2 rounded ${stage === 2 ? "bg-emerald-500" : "bg-slate-600 cursor-not-allowed"} text-black font-semibold`}
                  disabled={stage !== 2}
                >
                  Kinnita
                </button>
                <button
                  onClick={resetProgress}
                  className="px-3 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-semibold"
                >
                  Lähtesta edusammud
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold">Reeglid & näpunäited</h4>
              <ul className="list-disc ml-4 mt-2 text-xs text-slate-400">
                <li>Iga õlekõrs näitab vihje — võid enne lahenduse näitamist proovida vihjet kasutada.</li>
                <li>Kinnituse etapp kestab 15 sekundit pärast õiget vastust — enne kinnitamist peab vajutama &quot;Kinnita&quot;.</li>
                <li>Punktid sõltuvad aegajäägist ja kasutamata õlekõrrest.</li>
              </ul>
            </div>
          </aside>
        </main>

        <footer className="flex items-center justify-between text-xs text-slate-400">
          <div>Arendatud: õppematerjaliks — muuda küsimusi vastavalt kursusele</div>
          <div>Salvestatud kohalikku brauserisse (localStorage)</div>
        </footer>
      </div>
    </div>
  );
}
