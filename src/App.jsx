import React, { useEffect, useState, useRef } from "react";

export default function App() {
  const QUESTIONS = [
    {
      id: 1,
      prompt:
        "Tase 1 — Mis termin tähistab kolme peamist infoturbe eesmärki: konfidentsiaalsus, terviklikkus ja kättesaadavus? (3-täheline lühend)",
      answer: "cia",
      hint: "Algustähed sõnadest Confidentiality, Integrity, Availability.",
      solution: "Vastus on CIA (Confidentiality, Integrity, Availability).",
      timeLimitSeconds: 420,
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
      timeLimitSeconds: 420,
      basePoints: 60,
    },
    {
      id: 3,
      prompt:
        "Tase 3 — Millist porti kasutab tavaliselt SSH protokoll (lihtne number)?",
      answer: "22",
      hint: "See on väike kahekohaline number, tavaline SSH port.",
      solution: "SSH vaikimisi port on 22.",
      timeLimitSeconds: 420,
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
      timeLimitSeconds: 420,
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
      timeLimitSeconds: 420,
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
      timeLimitSeconds: 420,
      basePoints: 70,
    },
    {
      id: 7,
      prompt:
        "Tase 7 — Mis DNS-kirje tüüp seob domeeni IPv4 aadressiga (üks täht)?",
      answer: "a",
      hint: "See on ühe tähega kirje nagu 'A' või 'AAAA'.",
      solution: "IPv4 aadressi kirjet nimetatakse 'A' kirjeks.",
      timeLimitSeconds: 420,
      basePoints: 40,
    },
    {
      id: 8,
      prompt:
        "Tase 8 — Logirida: '2025-11-12T08:12:33Z POST /login 401 from 192.168.100.12' — mis on IP aadress?",
      answer: "192.168.100.12",
      hint: "IP on lõpus, pärast sõna 'from'.",
      solution: "IP on 192.168.100.12.",
      timeLimitSeconds: 420,
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
      timeLimitSeconds: 420,
      basePoints: 70,
    },
    {
      id: 10,
      prompt:
        "Tase 10 — Mis tööriist võimaldab võrgu liiklust 'kuulata' (inglise üks sõna)?",
      answer: "wireshark",
      hint: "See on GUI/CLI tööriist tuntud pakettide uurimiseks.",
      solution: "Tööriist on Wireshark.",
      timeLimitSeconds: 420,
      basePoints: 60,
    },
    {
      id: 11,
      prompt:
        "Tase 11 — Mis räsi-funktsioon annab fikseeritud pikkusega väljundi ja on vastupidav kokkupõrgetele?",
      answer: "sha256",
      hint: "Tavaliselt kasutatakse see failide tervikluse kontrolliks ja paroolide räsi hoidmiseks.",
      solution: "Näide vastusest: 'sha256'.",
      timeLimitSeconds: 420,
      basePoints: 80,
    },
    {
      id: 12,
      prompt:
        "Tase 12 — Milline HTTP staatuskood tähendab 'Liiga palju päringuid' (kirjuta number)?",
      answer: "429",
      hint: "See kood on 4xx perekonnast ja viitab limiitidele.",
      solution: "429 - Too Many Requests.",
      timeLimitSeconds: 420,
      basePoints: 40,
    },
    {
      id: 13,
      prompt:
        "Tase 13 — XOR operaatoriga: '0110 XOR 1100 = ?' (anna binaarne tulemus).",
      answer: "1010",
      hint: "XOR = erinevus; kui bitid erinevad siis 1.",
      solution: "0110 XOR 1100 = 1010.",
      timeLimitSeconds: 420,
      basePoints: 50,
    },
    {
      id: 14,
      prompt:
        "Tase 14 — Mis meetodiga saad kaitsta API-d, andes igale kliendile unikaalse võtme (inglise, üks sõna)?",
      answer: "apikey",
      hint: "Paljud teenused kasutavad seda lihtsat võtme kontseptsiooni. (kirjuta kokku ilma tühikuteta)",
      solution: "Vastus: 'apikey' (API key).",
      timeLimitSeconds: 420,
      basePoints: 60,
    },
    {
      id: 15,
      prompt:
        "Tase 15 — Mis on tavaliselt kõige paremini sobiv meede rünnete avastamiseks ja logide analüüsiks?",
      answer: "siem",
      hint: "Lühend, mis sisaldab sõna 'Event' (sündmus).",
      solution:
        "SIEM (Security Information and Event Management) — lühend 'siem'.",
      timeLimitSeconds: 420,
      basePoints: 70,
    },
    {
      id: 16,
      prompt:
        "Tase 16 — Mis tüüpi krüptograafiline rünnak üritab leida privaatvõtit, kasutades avaliku võtme informatsiooni? (inglise üks sõna)",
      answer: "bruteforce",
      hint: "Selle rünnaku nimetus on sama mis tavalisel parooli bruteforce'il — proovib kõiki võimalusi.",
      solution: "'bruteforce' ehk jõurünnak.",
      timeLimitSeconds: 420,
      basePoints: 80,
    },
    {
      id: 17,
      prompt:
        "Tase 17 — Mis CLI käsk kuvab aktiivseid võrguühendusi Linuxis (üks sõna)?",
      answer: "ss",
      hint: "Modernne asendus 'netstat' käsule, lihtne 2-täheline käsk.",
      solution: "'ss' kuvab sokleid ning aktiivseid ühendusi.",
      timeLimitSeconds: 420,
      basePoints: 50,
    },
    {
      id: 18,
      prompt:
        "Tase 18 — Mis termin kirjeldab tegevust, kus ründaja petab DNS-i, et suunata liiklust vale serveri poole? (inglise üks sõna)",
      answer: "dnsspoofing",
      hint: "DNS + spoofing/poisoning - kombineeritud termin.",
      solution: "See on DNS spoofing (või DNS poisoning). Vastus 'dnsspoofing'.",
      timeLimitSeconds: 420,
      basePoints: 90,
    },
    {
      id: 19,
      prompt:
        "Tase 19 — Antud SHA-256 räsi on tuntud näideline räsi (täielik): '8d969eef6ecad3c29a3a629280e686cff8f...'. Mis lihtne parool võib selle räsi taga olla? (üks sõna)",
      answer: "123456",
      hint: "See on maailma üks levinumaid parooliridu - eestikeelne tähendus pole oluline.",
      solution: "Tuntud näide: räsi vastab paroolile '123456'.",
      timeLimitSeconds: 420,
      basePoints: 100,
    },
    {
      id: 20,
      prompt:
        "Tase 20 — Lõpumõistatus: Mis on see omadus, mida soovid, et su andmed, kodu või saladused oleksid AES-GCM-i krüpteeringuga kaitstud?",
      answer: "turvaline",
      hint: "See on sõna, mida oled varem mängu alguses näinud kui ühe infoturbeeesmärgi osa ('confidentiality' ei ole see).",
      solution: "Õige sõna on 'turvaline'.",
      timeLimitSeconds: 420,
      basePoints: 200,
    },
  ];

  const maxHints = 3;

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
  const [stage, setStage] = useState(1);
  const [timeLeft, setTimeLeft] = useState(() => QUESTIONS[0].timeLimitSeconds);
  const [showHintText, setShowHintText] = useState(false);
  const [showSolutionText, setShowSolutionText] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [quizFinished, setQuizFinished] = useState(false);

  const timerRef = useRef(null);

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
      setMessage("Vastus õige! Liigume kinnituse etappi — vajuta 'Kinnita' 60 sekundi jooksul.");
      setStage(2);
      let confirmT = 60;
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
    const awarded = Math.round(q.basePoints * timeFactor) + ((maxHints - usedHints) * 10);
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

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 p-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Õnnitlused! 🎉</h1>
          <p className="text-lg mb-2">Oled läbinud kõik 20 taset!</p>
          <p className="text-lg mb-2">Sinu skoor: <span className="font-mono">{score}</span> punkti</p>
          <p className="text-lg mb-4">Kogu aeg: <span className="font-mono">{minutes}m {seconds}s</span></p>

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 grid gap-6">
        {/* … ülejäänud UI sama nagu sinu olemasolevas App.jsx */}
      </div>
    </div>
  );
}
