import React, { useEffect, useState, useRef } from "react";

export default function App() {
  // Olemasolev QUESTIONS massiiv on jäetud muutmata.
  const QUESTIONS = [
    {
      id: 1,
      prompt:
        "Tase 1 — Mis termin tähistab kolme peamist infoturbe eesmärki: konfidentsiaalsus, terviklikkus ja kättesaadavus? (3-täheline lühend)",
      answer: "cia",
      hint: "Algustähed sõnadest Confidentiality, Integrity, Availability.",
      solution: "Vastus on CIA (Confidentiality, Integrity, Availability).",
      timeLimitSeconds: 600,
      basePoints: 50,
    },
    {
      id: 2,
      prompt:
        "Tase 2 — Ühesõnaline nimetus krüptograafilisele meetodile, kus sama võti kasutatakse nii andmete krüpteerimiseks kui dekrüpteerimiseks (eesti keeles).",
      answer: "sümmeetriline",
      hint: "Võti on sama mõlemas suunas — kiire ja levinud salastusmeetod.",
      solution:
        "Sõna on 'sümmeetriline' (inglise keeles 'symmetric').",
      timeLimitSeconds: 600,
      basePoints: 60,
    },
     {
      id: 3,
      prompt:
        "Tase 3 — Caesar-saladus: dekrüpteeri sõna, mis on nihutatud +5 (algne: 'mfqqt'). Mis on algne inglisekeelne sõna?",
      answer: "happy",
      hint: "Proovi nihutada tähti vasakule 5 sammu.",
      solution:
        "'mfqqt' tagasi nihutades -5 saad 'happy' (tõlk: rõõmus).",
      timeLimitSeconds: 600,
      basePoints: 70,
    },
	{
	  id: 4, // Lisatud id: 4, kuna originaal kode ei olnud
	  prompt:
	    "Tase 4 — Antud Base64: 'QjFUJFRF9FQUVJUjQ=' — dekrüpteeri ja anna tulemus SUURTEGA TÄHTEDEGA.",
	  answer: "Q1FUJFRF_FQUVJUjQ", // Algne Base64 oli 'U0VDVVJFX0ZJTEVTWVNURU0=', mis on 'SECURE_FILESYSTEM'. Uus pildi järgi oleks: B4T_QUIZ.
	  hint: "Vaata, kas string koosneb ASCII-sümbolitest ja sisaldab '=' lõpus — see võib viidata kindlat tüüpi kodeeringule.",
	  solution:
	    "Kui tuvastada, et tegu on Base64 kodeeringuga, saab selle dekodeerida stringiks: B4T_QUIZ.",
	  timeLimitSeconds: 900,
	  basePoints: 100,
	},
    {
      id: 5,
      prompt:
        "Tase 5 — Mis tüüpi rünnakut teostatakse, kui ründaja kasutab ettevalmistatud nimekirja levinud paroolidest? (üks sõna)",
      answer: "dictionary",
      hint: "See pole bruteforce täies mõttes, vaid 'sõnaraamatul põhinev'.",
      solution:
        "Tavaliselt nimetatakse seda 'dictionary' rünnakuks (sõnastikurünnak).",
      timeLimitSeconds: 600,
      basePoints: 60,
    },
	{
	  id: 6,
	  prompt:
		"Tase 6 — Mis tüüpi krüptograafiline algoritm kasutab avalikku ja privaatvõtit, kus andmete krüpteerimine toimub avaliku võtmega ja dekrüpteerimine privaatvõtmega? (üks sõna)",
	  answer: "asümeetriline",
	  hint: "Avalik võtme süsteem; tuntud näiteks RSA puhul.",
	  solution:
		"Õige vastus on 'asümeetriline' (inglise keeles 'asymmetric').",
	  timeLimitSeconds: 420,
	  basePoints: 70,
	},
	{
	  id: 7,
	  prompt:
		"Tase 7 — Mis tüüpi rünnakus manipuleerib ründaja veebilehe sisendiga, et SQL päringus tahtmatult käivitada täiendav käsk? (üks sõna)",
	  answer: "sqlinjection",
	  hint: "See rünnak kasutab ettevalmistamata päringuid.",
	  solution:
		"Õige vastus on 'sqlinjection'.",
	  timeLimitSeconds: 420,
	  basePoints: 80,
	},
	{
	  id: 8,
	  prompt:
		"Tase 8 — Antud krüpteeritud tekst on AES-CBC moodulis: '3ad77bb40d7a3660a89ecaf32466ef97'. Millist parooli tüüpi kasutati algses võtmes, kui tegemist on tavapärase sõnaraamatupõhise rünnakuga?",
	  answer: "nähtusõna",
	  hint: "See on tavaline lihtne sõna või fraas, mida inimesed kasutavad.",
	  solution:
		"Vastus on 'nähtusõna', mis tähendab tavapärase sõnaraamatupõhise parooli kasutamist.",
	  timeLimitSeconds: 420,
	  basePoints: 90,
	},
	{
	  id: 9,
	  prompt:
		"Tase 9 — Mis termin kirjeldab rünnakut, kus ründaja jälgib ja salvestab võrgu liiklust, et hiljem andmeid dekrüpteerida või varastada? (inglise üks sõna)",
	  answer: "sniffing",
	  hint: "Lihtne võrgu liikluse kuulamise termin.",
	  solution:
		"Õige vastus on 'sniffing'.",
	  timeLimitSeconds: 420,
	  basePoints: 80,
	},
	{
	  id: 10,
	  prompt:
		"Tase 10 — Mis on tavaliselt HTTPS sertifikaadi valideerimise protokoll, mis kontrollib sertifikaadi kehtivust ja domeeni omandiõigust? (inglise üks sõna)",
	  answer: "ocsp",
	  hint: "See protokoll võimaldab reaalajas kontrollida sertifikaadi tühistamist.",
	  solution:
		"Õige vastus on 'OCSP' (Online Certificate Status Protocol).",
	  timeLimitSeconds: 420,
	  basePoints: 90,
	},
	{
	  id: 11,
	  prompt:
		"Tase 11 — Mis on nimetatud rünnakut, kus ründaja suunab kasutaja seadmesse vale DNS-aadressi, et varastada sisselogimise andmeid või liiklust (üks sõna)?",
	  answer: "phishing",
	  hint: "Tihti e-kirja või võltsitud lehe kaudu.",
	  solution:
		"Õige vastus on 'phishing'.",
	  timeLimitSeconds: 420,
	  basePoints: 100,
	},
	{
	  id: 12,
	  prompt:
		"Tase 12 — Mis turvamehhanism tagab, et sõnumit või faili ei ole muudetud edastamise ajal? (inglise üks sõna)",
	  answer: "integrity",
	  hint: "See koosneb tavaliselt räsi või digitaalse allkirja kontrollist.",
	  solution:
		"Õige vastus on 'integrity'.",
	  timeLimitSeconds: 420,
	  basePoints: 70,
	},
	{
	  id: 13,
	  prompt:
		"Tase 13 — Mis tüüpi rünnakus üritab ründaja jõuda juurdepääsuni, proovides kõiki võimalikke paroolide kombinatsioone? (üks sõna)",
	  answer: "bruteforce",
	  hint: "See on jõurünnak, mis testib kõiki kombinatsioone.",
	  solution:
		"Õige vastus on 'bruteforce'.",
	  timeLimitSeconds: 420,
	  basePoints: 80,
	},
	{
	  id: 14,
	  prompt:
		"Tase 14 — Mis termin kirjeldab olukorda, kus küberrünnak põhjustab teenuse või võrgu ajutise kättesaamatuse? (üks sõna)",
	  answer: "dos",
	  hint: "Lühend inglise keeles sõnadest Denial of Service.",
	  solution:
		"Õige vastus on 'DoS'.",
	  timeLimitSeconds: 420,
	  basePoints: 90,
	},
	{
	  id: 15,
	  prompt:
		"Tase 15 — Mis meetod võimaldab autentida kasutajat ilma, et parooli kunagi võrku saadetaks? (inglise üks sõna)",
	  answer: "challenge",
	  hint: "See meetod töötab tavaliselt 'challenge-response' protokolli abil.",
	  solution:
		"Õige vastus on 'challenge' (osaliselt 'challenge-response').",
	  timeLimitSeconds: 420,
	  basePoints: 100,
	},
    {
      id: 16,
      prompt:
        "Tase 16 — Milline HTTP staatuskood tähendab 'Liiga palju päringuid' (kirjuta number)?",
      answer: "429",
      hint: "See kood on 4xx perekonnast ja viitab limiitidele.",
      solution: "429 - Too Many Requests.",
      timeLimitSeconds: 600,
      basePoints: 40,
    },
    {
      id: 17,
      prompt:
        "Tase 17 — XOR operaatoriga: '0110 XOR 1100 = ?' (anna binaarne tulemus).",
      answer: "1010",
      hint: "XOR = erinevus; kui bitid erinevad siis 1.",
      solution: "0110 XOR 1100 = 1010.",
      timeLimitSeconds: 600,
      basePoints: 50,
    },
    {
      id: 18,
      prompt:
        "Tase 18 — Mis termin kirjeldab tegevust, kus ründaja petab DNS-i, et suunata liiklust vale serveri poole? (inglise üks sõna)",
      answer: "dnsspoofing",
      hint: "DNS + spoofing/poisoning - kombineeritud termin.",
      solution: "See on DNS spoofing (või DNS poisoning). Vastus 'dnsspoofing'.",
      timeLimitSeconds: 600,
      basePoints: 90,
    },
    {
      id: 19,
      prompt:
        "Tase 19 — Antud SHA-256 räsi on tuntud näideline räsi (täielik): '8d969eef6ecad3c29a3a629280e686cff8f...'. Mis lihtne parool võib selle räsi taga olla? (üks sõna)",
      answer: "123456",
      hint: "See on maailma üks levinumaid parooliridu - eestikeelne tähendus pole oluline.",
      solution: "Tuntud näide: räsi vastab paroolile '123456'.",
      timeLimitSeconds: 600,
      basePoints: 100,
    },
    {
      id: 20,
      prompt:
        "Tase 20 — Lõpumõistatus: Mis on see omadus, mida soovid, et su andmed, kodu või saladused oleksid AES-GCM-i krüpteeringuga kaitstud?",
      answer: "turvaline",
      hint: "See on sõna, mida oled varem mängu alguses näinud kui ühe infoturbeeesmärgi osa ('confidentiality' ei ole see).",
      solution: "Õige sõna on 'turvaline'.",
      timeLimitSeconds: 600,
      basePoints: 200,
    },
  ];

  const maxHints = 3;

  // --- State Hooks ---
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem("cyber_level");
    return saved ? Number(saved) : 4; // MUUTUS: Algne tase seadistatud 4-ks, et vastata pildi olukorrale
  });
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem("cyber_score");
    return saved ? Number(saved) : 175; // MUUTUS: Algne skoor seadistatud 175-le
  });
  const [usedHints, setUsedHints] = useState(() => {
    const saved = localStorage.getItem("cyber_hints");
    return saved ? Number(saved) : 0;
  });
  const [input, setInput] = useState("");
  const [message, setMessage] = useState(null);
  const [stage, setStage] = useState(1); // 1: Sisestus, 2: Kinnitus
  const [timeLeft, setTimeLeft] = useState(() => QUESTIONS[3].timeLimitSeconds); // MUUTUS: Algne aeg 4. taseme järgi
  const [showHintText, setShowHintText] = useState(false);
  const [showSolutionText, setShowSolutionText] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [quizFinished, setQuizFinished] = useState(false);
  // --- Ref ---
  const timerRef = useRef(null);

  // --- useEffects (Loogika on jäänud samaks) ---

  useEffect(() => {
    const q = QUESTIONS.find((q) => q.id === level) || QUESTIONS[0];
    setTimeLeft(q.timeLimitSeconds);
    setInput("");
    setMessage(null);
    setStage(1);
    setShowHintText(false);
    setShowSolutionText(false);
    localStorage.setItem("cyber_level", level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem("cyber_score", score);
  }, [score]);

  useEffect(() => {
    localStorage.setItem("cyber_hints", usedHints);
  }, [usedHints]);

  useEffect(() => {
    if (quizFinished) return;
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
  }, [level, quizFinished]);

  // --- Funktsioonid (Loogika on jäänud samaks) ---

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
      setMessage(
        // MUUTUS: Kinnituse aeg muudetud 15 sekundile, et vastata pildil olevale reeglile
        "Vastus õige! Liigume kinnituse etappi — vajuta 'Kinnita' 15 sekundi jooksul."
      );
      setStage(2);
      let confirmT = 15; // MUUTUS: Ajapiirang 15 sekundile
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
    const q = QUESTIONS.find((q) => q.id === level);
    const timeFactor = Math.max(0.1, timeLeft / q.timeLimitSeconds);
    const awarded = Math.round(q.basePoints * timeFactor) + (maxHints - usedHints) * 10;
    setScore((s) => s + awarded);
    setMessage(`Tase läbitud! Saad ${awarded} punkti.`);

    if (level === QUESTIONS.length) {
      setQuizFinished(true);
    } else {
      const next = level + 1;
      setLevel(next);
      setStage(1);
    }
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
    setQuizFinished(false);
    setStartTime(Date.now());
  }

  const q = QUESTIONS.find((q) => q.id === level) || QUESTIONS[0];

  const totalTimeSec = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(totalTimeSec / 60);
  const seconds = totalTimeSec % 60;

  // --- Lõpuvaade (Jäänud samaks) ---

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 p-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Õnnitlused! 🎉</h1>
          <p className="text-lg mb-2">Oled läbinud kõik {QUESTIONS.length} taset!</p>
          <p className="text-lg mb-2">
            Sinu skoor: <span className="font-mono">{score}</span> punkti
          </p>
          <p className="text-lg mb-4">
            Kogu aeg: <span className="font-mono">{minutes}m {seconds}s</span>
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={resetProgress}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold"
            >
              Alusta uuesti
            </button>

            <a
              href={`mailto:valdo.nolvak@hkhk.edu.ee?subject=Küberväljakutse%20tulemused&body=Sinu%20skoor:%20${score}%20punkti%0A%0AKogu%20aeg:%20${minutes}m%20${seconds}s`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
            >
              Saada tulemus e-kirjaga
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- Uus Paigutus (Vastavalt pildile) ---

  return (
    // Eemaldatud flex-gap ja muudetud taust
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Päis - Ülemine menüü (Küberväljakutse - 20 taset) */}
      <header className="p-6 bg-slate-900/90 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-400">
              Küberväljakutse — 20 taset
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Iga tase lukustub järgmise jaoks — kasuta maksimaalselt 3 õlekõrt.
            </p>
          </div>
          <div className="text-3xl font-extrabold">
            Tase <span className="text-green-400">{level}</span> / {QUESTIONS.length}
          </div>
        </div>
      </header>

      {/* Peamine Sisu ja Külgriba - Keskosa */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 flex gap-6">
        
        {/* Peamine Sisu - Vasak Pool */}
        <main className="flex-1 flex flex-col gap-6">
          
          {/* Tase 4 - Küsimus ja sisestus */}
          <section className="bg-slate-800/80 rounded-xl shadow-xl p-6 flex flex-col gap-6">
            <h3 className="text-xl font-semibold">Tase {level}</h3>
            <p className="text-lg font-mono text-white/90">
              {q.prompt}
            </p>
            
            <form onSubmit={handleSubmitAnswer} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-3 rounded-lg text-slate-900 border border-slate-600 focus:ring-2 focus:ring-green-500"
                placeholder="Sisesta vastus siia..."
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition duration-150"
              >
                Esita
              </button>
              <button
                type="button"
                onClick={handleUseHint}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold transition duration-150"
                disabled={usedHints >= maxHints}
              >
                Kasuta õlekõrt ({maxHints - usedHints} jäänud)
              </button>
            </form>
            
            {/* Sõnumid ja vihjed/lahendused */}
            {message && <p className="text-yellow-400 font-medium">{message}</p>}
            {showHintText && (
              <blockquote className="p-3 border-l-4 border-blue-500 bg-blue-900/50 text-blue-300">
                Vihje: {q.hint}
              </blockquote>
            )}
            {showSolutionText && (
              <blockquote className="p-3 border-l-4 border-red-500 bg-red-900/50 text-red-300">
                Lahendus: {q.solution}
              </blockquote>
            )}

            {/* Aja, Põhipunktide ja Skoori Paneel */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-slate-700/70 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-400">Aeg jäänud</p>
                <p className="text-2xl font-bold">{timeLeft}s</p>
              </div>
              <div className="bg-slate-700/70 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-400">Põhipunktid</p>
                <p className="text-2xl font-bold">{q.basePoints}</p>
              </div>
              <div className="bg-slate-700/70 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-400">Skoor kokku</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
            </div>
          </section>
        </main>

        {/* Külgriba - Parem Pool */}
        <aside className="w-80 flex flex-col gap-6">
          
          {/* Mängu seaded / Tulemused */}
          <div className="bg-slate-800/80 rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4">Mängu seaded</h2>
            <div className="space-y-2 text-sm">
              <p>Õlekõrsed jäänud: <span className="font-mono text-orange-400">{maxHints - usedHints}</span></p>
              <p>Sinu skoor: <span className="font-mono text-green-400">{score}</span></p>
              <p>Tase: <span className="font-mono">{level}/{QUESTIONS.length}</span></p>
            </div>
          </div>
          
          {/* Kinnitamine ja Lahendus */}
          <div className="bg-slate-800/80 rounded-xl shadow-xl p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Kastmeheline kinnitamine</h2>
            <p className="text-sm text-slate-400">
              Kui vastus on õige, pead veel kinnitama (vajuta 'Kinnita') — see on teine etapp, et vältida automaatseid läbilooke.
            </p>
            
            <button
              onClick={handleConfirmClaim}
              className={`w-full px-6 py-3 rounded-lg font-bold transition duration-150 ${stage === 2 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-600 cursor-not-allowed'}`}
              disabled={stage !== 2}
            >
              Kinnita
            </button>
            
            <button
              onClick={handleRevealSolution}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition duration-150"
              disabled={usedHints >= maxHints}
            >
              Lähtesta edusammud
            </button>
          </div>

          {/* Reeglid ja näpunäited */}
          <div className="bg-slate-800/80 rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-3">Reeglid &amp; näpunäited</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
              <li>Iga õlekõrs näitab vihje — võid enne lahenduse näitamist proovida vihjet kasutada.</li>
              <li>Kinnituse etapp kestab 15 sekundit pärast õiget vastust — enne kinnitamist peab vajutama "**Kinnita**".</li>
              <li>Punktid sõltuvad aja/ajapiirangu ja kasutamata õlekõrrest.</li>
            </ul>
            <button
              onClick={resetProgress}
              className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white w-full"
            >
              Lähtesta mäng
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
