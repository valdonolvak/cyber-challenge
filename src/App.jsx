import React, { useState, useEffect } from "react";

// 20 eestikeelset küsimust, igaühele 10 minutit (600 sekundit)
const QUESTIONS = [
  { id: 1, prompt: "Mis termin tähistab kolme peamist infoturbe eesmärki: konfidentsiaalsus, terviklikkus ja kättesaadavus? (3-täheline lühend)", answer: "cia", hint: "Algustähed sõnadest Confidentiality, Integrity, Availability.", solution: "Vastus on CIA.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 2, prompt: "Too ühe lause pikkune nimi krüptograafilisele meetodile, kus sama võti kasutatakse nii andmete krüpteerimiseks kui dekrüpteerimiseks.", answer: "sümmeetriline", hint: "Võti on sama mõlemas suunas.", solution: "Õige vastus on 'sümmeetriline'.", timeLimitSeconds: 6000, basePoints: 60 },
  { id: 3, prompt: "Millist porti kasutab tavaliselt SSH protokoll?", answer: "22", hint: "Tavaline SSH port on väike kahekohaline number.", solution: "SSH vaikimisi port on 22.", timeLimitSeconds: 6000, basePoints: 40 },
  { id: 4, prompt: "Mis on tuntud andmete ründeviis, kus ründaja esitab liiga palju päringuid teenusele?", answer: "ddos", hint: "Lühend sõnadest Distributed Denial of Service.", solution: "Õige vastus on DDoS.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 5, prompt: "Milline krüptograafiline avaliku võtme süsteem võimaldab turvalist andmeside ka avalikus võrgus?", answer: "rsa", hint: "Sageli kasutatakse HTTPS sertifikaatides.", solution: "Õige vastus on RSA.", timeLimitSeconds: 6000, basePoints: 60 },
  { id: 6, prompt: "Mis tähendab lühend VPN?", answer: "virtuaalne privaatvõrk", hint: "See loob turvalise krüpteeritud tunnel internetis.", solution: "Õige vastus on 'virtuaalne privaatvõrk'.", timeLimitSeconds: 6000, basePoints: 40 },
  { id: 7, prompt: "Mis on failide terviklikkuse kontrollimiseks levinud meetod?", answer: "kontrollsumma", hint: "Näiteks SHA-256 või MD5.", solution: "Õige vastus on kontrollsumma.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 8, prompt: "Milline rünnakutüüp kasutab ära veebi sisestatud koodi täitmist ohvri brauseris?", answer: "xss", hint: "Lühend sõnadest Cross-Site Scripting.", solution: "Õige vastus on XSS.", timeLimitSeconds: 6000, basePoints: 60 },
  { id: 9, prompt: "Mis on lühend SQL-i turvaaukude nimetuseks, kus ründaja manipuleerib andmebaasi päringutega?", answer: "sqli", hint: "SQL Injection.", solution: "Õige vastus on SQLi.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 10, prompt: "Mis meetod võimaldab tuvastada võrgu seadmete olemasolu ja avatud porte?", answer: "skännimine", hint: "Sageli kasutatakse tööriistu nagu Nmap.", solution: "Õige vastus on skännimine.", timeLimitSeconds: 6000, basePoints: 40 },
  { id: 11, prompt: "Mis on lühend IDS, mis tuvastab pahatahtlikku tegevust võrgus?", answer: "intrusion detection system", hint: "IDS jälgib võrguliiklust ja avastab ründeid.", solution: "Õige vastus on IDS.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 12, prompt: "Milline turvamehhanism blokeerib sissetungija juurdepääsu võrku?", answer: "firewall", hint: "Tavaline seadistus, mis filtreerib liiklust.", solution: "Õige vastus on firewall.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 13, prompt: "Mis tähendab lühend MFA?", answer: "mitmefaktoriline autentimine", hint: "Võib sisaldada salasõna + telefoni koodi.", solution: "Õige vastus on mitmefaktoriline autentimine.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 14, prompt: "Milline protokoll tagab turvalise veebisuhtluse?", answer: "https", hint: "HTTP üle TLS.", solution: "Õige vastus on HTTPS.", timeLimitSeconds: 6000, basePoints: 40 },
  { id: 15, prompt: "Mis tüüpi pahavara salvestab arvuti andmed ja nõuab lunaraha?", answer: "ransomware", hint: "See krüpteerib faile.", solution: "Õige vastus on ransomware.", timeLimitSeconds: 6000, basePoints: 60 },
  { id: 16, prompt: "Mis on lühend DoS ründe jaoks?", answer: "denial of service", hint: "Teenuse katkestamine.", solution: "Õige vastus on DoS.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 17, prompt: "Mis on tuntud krüptograafiline algoritm, mis kasutab erinevat avalikku ja privaatvõtit?", answer: "asümeetriline", hint: "Võti on erinev mõlemas suunas.", solution: "Õige vastus on asümeetriline.", timeLimitSeconds: 6000, basePoints: 60 },
  { id: 18, prompt: "Mis protokolli kasutatakse e-posti turvaliseks edastamiseks?", answer: "smtp", hint: "Turvaline versioon SMTPS.", solution: "Õige vastus on SMTP.", timeLimitSeconds: 6000, basePoints: 40 },
  { id: 19, prompt: "Mis tähendab lühend DLP turvasüsteemis?", answer: "data loss prevention", hint: "Kontrollib, et andmeid ei lekiks.", solution: "Õige vastus on DLP.", timeLimitSeconds: 6000, basePoints: 50 },
  { id: 20, prompt: "Milline autentimismeetod kasutab sõrmejälge?", answer: "biomeetriline", hint: "Tavaliselt telefonides ja töökohtade turvalisuses.", solution: "Õige vastus on biomeetriline.", timeLimitSeconds: 6000, basePoints: 40 },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTIONS[0].timeLimitSeconds);

  useEffect(() => {
    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setScore(score + currentQuestion.basePoints);
      alert("Õige vastus!");
    } else {
      alert(`Vale vastus. Õige vastus: ${currentQuestion.solution}`);
    }
    setUserAnswer("");
    setTimeLeft(
      QUESTIONS[currentQuestionIndex + 1]
        ? QUESTIONS[currentQuestionIndex + 1].timeLimitSeconds
        : 0
    );
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= QUESTIONS.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Mäng läbi!</h1>
        <p className="text-xl">Sinu punktid: {score}</p>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100">
      {/* Küljeriba progress ja punktid */}
      <div className="w-64 bg-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Progress</h2>
          <div className="w-full bg-slate-700 rounded h-6 mb-4">
            <div
              className="bg-blue-600 h-6 rounded"
              style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <p>{currentQuestionIndex + 1} / {QUESTIONS.length} küsimust</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Punktid</h2>
          <p className="text-lg">{score}</p>
        </div>
      </div>

      {/* Põhisisu */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-xl w-full bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{currentQuestion.prompt}</h2>
          <p className="mb-2 text-slate-400">Aeg jäänud: {timeLeft}s</p>
          <input
            type="text"
            className="w-full p-2 mb-4 rounded text-slate-900"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Esita vastus
          </button>
          <p className="mt-4 text-slate-400">Vihje: {currentQuestion.hint}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
