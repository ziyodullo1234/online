// pages/Games.tsx
import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Keyboard, 
  Brain, 
  Calculator, 
  Clock, 
  Target, 
  Zap, 
  Award, 
  RefreshCw,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Gamepad2,
  Lightbulb,
  Puzzle,
  Eye,
  MemoryStick,
  Shuffle,
  Flame,
  Dice6,
  Timer
} from 'lucide-react';

// ----------------------------------------------------
// GLOBAL REKLAMA FUNKSIYASI
// ----------------------------------------------------
const triggerAd = () => {
  try {
    // Siz bergan reklama havolasi yangi oynada ochiladi
    window.open('https://viiukuhe.com/dc/?blockID=426903', '_blank');
  } catch (error) {
    console.error("Reklama ochilmadi:", error);
  }
};

// 1. Typing test component
function TypingTest() {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [bestWpm, setBestWpm] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sampleTexts = [
    "JavaScript dasturlash tili veb-sahifalarni interaktiv qilish uchun ishlatiladi.",
    "React.js bilan zamonaviy va tezkor veb-ilovalar yaratish juda oson va qiziqarli.",
    "TypeScript JavaScriptga tiplar qo'shib, xatoliklarni kamaytiradi va kod sifatini oshiradi.",
    "O'zbekiston Respublikasi mustaqillikka erishgach, rivojlanishning yangi bosqichiga chiqdi.",
    "Dasturlashni o'rganish uchun sabr-toqat va doimiy amaliyot zarur.",
  ];

  useEffect(() => {
    resetTest();
    const savedBest = localStorage.getItem('bestWpm');
    if (savedBest) setBestWpm(parseInt(savedBest));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      finishTest();
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  const resetTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput('');
    setTimeLeft(30);
    setIsActive(false);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(0);
  };

  const startTest = () => {
    triggerAd(); // 💰 REKLAMA
    setIsActive(true);
    inputRef.current?.focus();
  };

  const finishTest = () => {
    setIsActive(false);
    setIsFinished(true);
    const wordsTyped = userInput.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = 0.5;
    const calculatedWpm = Math.round(wordsTyped / minutes);
    setWpm(calculatedWpm);
    let correct = 0;
    const maxLength = Math.min(userInput.length, text.length);
    for (let i = 0; i < maxLength; i++) {
      if (userInput[i] === text[i]) correct++;
    }
    const calculatedAccuracy = Math.round((correct / text.length) * 100);
    setAccuracy(calculatedAccuracy);
    if (calculatedWpm > bestWpm) {
      setBestWpm(calculatedWpm);
      localStorage.setItem('bestWpm', calculatedWpm.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive) return;
    setUserInput(e.target.value);
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return 'text-gray-400';
    if (userInput[index] === text[index]) return 'text-green-600 bg-green-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-indigo-600" />
          Tez yozish testi
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!isActive && !isFinished && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">30 soniyada berilgan matnni iloji boricha tez va xatosiz yozing</p>
            {bestWpm > 0 && <p className="text-sm text-indigo-600 mb-4">Eng yaxshi natija: {bestWpm} WPM</p>}
            <Button onClick={startTest} className="bg-indigo-600 hover:bg-indigo-700">
              <Zap className="w-4 h-4 mr-2" />
              Testni boshlash
            </Button>
          </div>
        )}
        {isActive && (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className={`font-mono text-xl font-bold ${timeLeft <= 5 ? 'text-red-600' : 'text-indigo-600'}`}>{timeLeft}</span>
                <span className="text-gray-500">soniya</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { triggerAd(); resetTest(); }}><RefreshCw className="w-4 h-4" /></Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-32 overflow-y-auto">
              <div className="text-lg leading-relaxed">
                {text.split('').map((char, index) => (<span key={index} className={getCharacterClass(index)}>{char}</span>))}
              </div>
            </div>
            <textarea ref={inputRef} value={userInput} onChange={handleInputChange} className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={4} placeholder="Matnni shu yerga yozing..." />
          </>
        )}
        {isFinished && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4"><Award className="w-10 h-10 text-indigo-600" /></div>
            <h3 className="text-xl font-bold mb-4">Test yakunlandi!</h3>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
              <div className="bg-green-50 p-4 rounded-lg"><div className="text-2xl font-bold text-green-600">{wpm}</div><div className="text-sm text-gray-500">WPM</div></div>
              <div className="bg-blue-50 p-4 rounded-lg"><div className="text-2xl font-bold text-blue-600">{accuracy}%</div><div className="text-sm text-gray-500">Aniqlik</div></div>
            </div>
            <Button onClick={() => { triggerAd(); resetTest(); }} className="bg-indigo-600 hover:bg-indigo-700"><RefreshCw className="w-4 h-4 mr-2" />Yangi test</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 2. Math Quiz Component
function MathQuiz() {
  const [questions, setQuestions] = useState<{ question: string; answer: number; userAnswer: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuestions = () => {
    const newQuestions = [];
    for (let i = 0; i < 10; i++) {
      const type = Math.random() > 0.5 ? '+' : '×';
      let num1, num2;
      if (type === '+') { num1 = Math.floor(Math.random() * 50) + 1; num2 = Math.floor(Math.random() * 50) + 1; }
      else { num1 = Math.floor(Math.random() * 12) + 1; num2 = Math.floor(Math.random() * 12) + 1; }
      const answer = type === '+' ? num1 + num2 : num1 * num2;
      newQuestions.push({ question: `${num1} ${type} ${num2} = ?`, answer, userAnswer: '' });
    }
    return newQuestions;
  };

  const startQuiz = () => {
    triggerAd(); // 💰 REKLAMA
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(15);
    setIsActive(true);
    const savedBest = localStorage.getItem('bestMathScore');
    if (savedBest) setBestScore(parseInt(savedBest));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0 && currentIndex < questions.length) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      handleNextQuestion(true);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft, currentIndex]);

  const handleNextQuestion = (isTimeout: boolean = false) => {
    if (!isActive) return;
    if (!isTimeout) {
      const currentQuestion = questions[currentIndex];
      const userAnswerNum = parseInt(currentQuestion.userAnswer);
      if (!isNaN(userAnswerNum) && userAnswerNum === currentQuestion.answer) {
        const newScore = score + 10;
        setScore(newScore);
        if (newScore > bestScore) { setBestScore(newScore); localStorage.setItem('bestMathScore', newScore.toString()); }
      }
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(15);
      inputRef.current?.focus();
    } else {
      setIsActive(false);
      setIsFinished(true);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[currentIndex].userAnswer = e.target.value;
    setQuestions(newQuestions);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleNextQuestion(false); };

  if (!isActive && !isFinished) {
    return (
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader className="border-b border-gray-100"><CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-indigo-600" />Matematik test</CardTitle></CardHeader>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 mb-4">10 ta savol, har biriga 15 soniya vaqtingiz bor</p>
          {bestScore > 0 && <p className="text-sm text-indigo-600 mb-4">Eng yaxshi natija: {bestScore} ball</p>}
          <Button onClick={startQuiz} className="bg-indigo-600 hover:bg-indigo-700"><Brain className="w-4 h-4 mr-2" />Testni boshlash</Button>
        </CardContent>
      </Card>
    );
  }

  if (isFinished) {
    const percentage = (score / 100) * 100;
    const grade = percentage >= 80 ? "A'lo" : percentage >= 60 ? "Yaxshi" : percentage >= 40 ? "Qoniqarli" : "Yomon";
    return (
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader className="border-b border-gray-100"><CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-indigo-600" />Natijalar</CardTitle></CardHeader>
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4"><TrendingUp className="w-10 h-10 text-indigo-600" /></div>
          <h3 className="text-xl font-bold mb-4">Sizning natijangiz</h3>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
            <div className="bg-green-50 p-4 rounded-lg"><div className="text-2xl font-bold text-green-600">{score}</div><div className="text-sm text-gray-500">Ball</div></div>
            <div className="bg-blue-50 p-4 rounded-lg"><div className="text-2xl font-bold text-blue-600">{percentage}%</div><div className="text-sm text-gray-500">Foiz</div></div>
          </div>
          <div className="mb-6"><span className={`px-4 py-2 rounded-full text-sm font-semibold ${grade === "A'lo" ? 'bg-green-100 text-green-700' : grade === "Yaxshi" ? 'bg-blue-100 text-blue-700' : grade === "Qoniqarli" ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{grade}</span></div>
          <Button onClick={startQuiz} className="bg-indigo-600 hover:bg-indigo-700"><RefreshCw className="w-4 h-4 mr-2" />Qayta boshlash</Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-indigo-600" />Matematik test</CardTitle>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" /><span className={`font-mono text-xl font-bold ${timeLeft <= 5 ? 'text-red-600' : 'text-indigo-600'}`}>{timeLeft}</span><span className="text-gray-500">soniya</span></div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4"><div className="flex justify-between text-sm text-gray-500 mb-2"><span>Savol {currentIndex + 1} / {questions.length}</span><span>Ball: {score}</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div></div></div>
        <div className="text-center py-8"><h3 className="text-2xl font-bold mb-6">{currentQ.question}</h3><input ref={inputRef} type="number" value={currentQ.userAnswer} onChange={handleAnswerChange} onKeyPress={handleKeyPress} className="w-32 text-center text-xl p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto" placeholder="?" autoFocus /></div>
        <div className="flex justify-center gap-3"><Button onClick={() => { triggerAd(); handleNextQuestion(false); }} className="bg-indigo-600 hover:bg-indigo-700">Keyingi savol<ChevronRight className="w-4 h-4 ml-2" /></Button></div>
      </CardContent>
    </Card>
  );
}

// 3. Memory Card Game
function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [bestMoves, setBestMoves] = useState(0);

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

  useEffect(() => {
    startNewGame();
    const savedBest = localStorage.getItem('bestMemoryMoves');
    if (savedBest) setBestMoves(parseInt(savedBest));
  }, []);

  const startNewGame = () => {
    triggerAd(); // 💰 REKLAMA
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setSelectedIndex(null);
    setMoves(0);
    setMatchedPairs(0);
    setIsGameComplete(false);
  };

  const handleCardClick = (index: number) => {
    if (cards[index].isMatched || cards[index].isFlipped || isGameComplete) return;
    if (selectedIndex === null) {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);
      setSelectedIndex(index);
    } else {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);
      setMoves(moves + 1);
      if (cards[selectedIndex].emoji === cards[index].emoji) {
        newCards[selectedIndex].isMatched = true;
        newCards[index].isMatched = true;
        setMatchedPairs(matchedPairs + 1);
        setSelectedIndex(null);
        if (matchedPairs + 1 === emojis.length) {
          setIsGameComplete(true);
          const finalMoves = moves + 1;
          if (bestMoves === 0 || finalMoves < bestMoves) {
            setBestMoves(finalMoves);
            localStorage.setItem('bestMemoryMoves', finalMoves.toString());
          }
        }
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[selectedIndex].isFlipped = false;
          resetCards[index].isFlipped = false;
          setCards(resetCards);
          setSelectedIndex(null);
        }, 1000);
      }
      setCards(newCards);
      setSelectedIndex(null);
    }
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2"><MemoryStick className="w-5 h-5 text-indigo-600" />Xotira o'yini</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between mb-4"><div className="text-gray-600">Harakatlar: {moves}</div><div className="text-gray-600">Topilgan juftliklar: {matchedPairs}/{emojis.length}</div><div className="text-indigo-600">Eng yaxshi: {bestMoves || '-'}</div></div>
        {isGameComplete && <div className="text-center mb-4 p-4 bg-green-100 rounded-lg"><Award className="w-8 h-8 text-green-600 mx-auto mb-2" /><h3 className="text-lg font-bold text-green-700">Tabriklaymiz!</h3><p className="text-green-600">{moves} ta harakatda o'yinni tugatdingiz!</p><Button onClick={startNewGame} className="mt-2 bg-green-600 hover:bg-green-700">Yangi o'yin</Button></div>}
        {!isGameComplete && (
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card, index) => (
              <button key={card.id} onClick={() => handleCardClick(index)} className={`aspect-square text-3xl rounded-xl transition-all duration-300 ${card.isMatched ? 'bg-green-100' : card.isFlipped ? 'bg-indigo-100 shadow-md' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center`}>
                {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
              </button>
            ))}
          </div>
        )}
        {!isGameComplete && matchedPairs !== emojis.length && <div className="mt-4 text-center"><Button variant="outline" onClick={startNewGame}>Yangi o'yin</Button></div>}
      </CardContent>
    </Card>
  );
}

// 4. Quick Reaction Game (Reaksiya tezligi)
function ReactionGame() {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'ready' | 'gameover'>('idle');
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const savedBest = localStorage.getItem('bestReactionTime');
    if (savedBest) setBestTime(parseInt(savedBest));
  }, []);

  const startGame = () => {
    triggerAd(); // 💰 REKLAMA
    setGameState('waiting');
    const delay = Math.random() * 3000 + 2000;
    const id = setTimeout(() => {
      setGameState('ready');
      setStartTime(Date.now());
    }, delay);
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === 'ready') {
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      if (timeoutId) clearTimeout(timeoutId);
      setGameState('gameover');
      if (bestTime === 0 || reaction < bestTime) {
        setBestTime(reaction);
        localStorage.setItem('bestReactionTime', reaction.toString());
      }
    } else if (gameState === 'waiting') {
      if (timeoutId) clearTimeout(timeoutId);
      setGameState('gameover');
      setReactionTime(-1);
    }
  };

  const resetGame = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setGameState('idle');
    setReactionTime(0);
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-indigo-600" />Reaksiya tezligi</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <div className="mb-4 text-indigo-600">Eng yaxshi vaqt: {bestTime > 0 ? `${bestTime}ms` : '-'}</div>
        <div onClick={handleClick} className={`h-64 rounded-xl cursor-pointer transition-all flex items-center justify-center text-2xl font-bold ${gameState === 'idle' ? 'bg-gray-100 text-gray-400' : gameState === 'waiting' ? 'bg-yellow-100 text-yellow-600' : gameState === 'ready' ? 'bg-green-500 text-white animate-pulse' : 'bg-red-100 text-red-600'}`}>
          {gameState === 'idle' && 'Boshlash uchun bosing'}
          {gameState === 'waiting' && 'Kuting... Yashil rangni kuting!'}
          {gameState === 'ready' && 'BOSING!!!'}
          {gameState === 'gameover' && reactionTime === -1 ? 'Juda erta bosdingiz!' : gameState === 'gameover' ? `${reactionTime}ms` : ''}
        </div>
        <div className="mt-4 flex gap-3 justify-center">
          {gameState === 'idle' && <Button onClick={startGame} className="bg-indigo-600 hover:bg-indigo-700">Boshlash</Button>}
          {gameState === 'gameover' && <Button onClick={() => { triggerAd(); resetGame(); }} className="bg-indigo-600 hover:bg-indigo-700">Qayta o'ynash</Button>}
        </div>
      </CardContent>
    </Card>
  );
}

// 5. Number Guessing Game
function NumberGuessingGame() {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [bestAttempts, setBestAttempts] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
    const savedBest = localStorage.getItem('bestGuessAttempts');
    if (savedBest) setBestAttempts(parseInt(savedBest));
  }, []);

  const startNewGame = () => {
    triggerAd(); // 💰 REKLAMA
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('1 dan 100 gacha son o\'yladim. Toping!');
    setAttempts(0);
    setIsGameOver(false);
  };

  const handleGuess = () => {
    if (isGameOver) return;
    const guessNum = parseInt(guess);
    if (isNaN(guessNum)) { setMessage('Iltimos, son kiriting!'); return; }
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (guessNum === secretNumber) {
      setMessage(`Tabriklaymiz! ${newAttempts} ta urinishda topdingiz!`);
      setIsGameOver(true);
      if (bestAttempts === 0 || newAttempts < bestAttempts) {
        setBestAttempts(newAttempts);
        localStorage.setItem('bestGuessAttempts', newAttempts.toString());
      }
    } else if (guessNum < secretNumber) setMessage('Kattaroq son kiriting ⬆️');
    else setMessage('Kichikroq son kiriting ⬇️');
    setGuess('');
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-indigo-600" />Son topish o'yini</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <div className="mb-4 text-indigo-600">Eng yaxshi natija: {bestAttempts > 0 ? `${bestAttempts} ta urinish` : '-'}</div>
        <div className="bg-gray-50 p-6 rounded-lg mb-4"><p className="text-gray-600">{message}</p></div>
        {!isGameOver && (
          <div className="flex gap-3 justify-center"><input type="number" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleGuess()} className="w-32 text-center p-2 border border-gray-200 rounded-lg" placeholder="Son" autoFocus /><Button onClick={handleGuess} className="bg-indigo-600 hover:bg-indigo-700">Tekshirish</Button></div>
        )}
        {isGameOver && <Button onClick={startNewGame} className="bg-indigo-600 hover:bg-indigo-700">Yangi o'yin</Button>}
      </CardContent>
    </Card>
  );
}

// 6. Word Scramble (So'z topish)
function WordScramble() {
  const words = ['DASTURLASH', 'REAKSIYA', 'KOMPYUTER', 'PROTSESSOR', 'MONITOR', 'KLAVIATURA', 'INTERNET', 'TEXNOLOGIYA'];
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    loadNewWord();
    const savedBest = localStorage.getItem('bestScrambleScore');
    if (savedBest) setBestScore(parseInt(savedBest));
  }, []);

  const scrambleWord = (word: string) => word.split('').sort(() => Math.random() - 0.5).join('');

  const loadNewWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(newWord);
    setScrambledWord(scrambleWord(newWord));
    setUserGuess('');
    setMessage('');
  };

  const checkAnswer = () => {
    if (userGuess.toUpperCase() === currentWord) {
      const newScore = score + 10;
      setScore(newScore);
      setMessage('✅ To\'g\'ri! +10 ball');
      if (newScore > bestScore) { setBestScore(newScore); localStorage.setItem('bestScrambleScore', newScore.toString()); }
      triggerAd(); // 💰 To'g'ri topsa reklamani ochamiz va yangi so'zni yuklaymiz
      loadNewWord();
    } else {
      setMessage('❌ Noto\'g\'ri! Qaytadan urinib ko\'ring');
    }
    setUserGuess('');
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2"><Shuffle className="w-5 h-5 text-indigo-600" />So'z topish o'yini</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <div className="flex justify-between mb-4"><div className="text-gray-600">Ball: {score}</div><div className="text-indigo-600">Eng yaxshi: {bestScore}</div></div>
        <div className="bg-gray-50 p-8 rounded-lg mb-4"><h3 className="text-2xl font-bold tracking-wider">{scrambledWord}</h3></div>
        <div className="flex gap-3 justify-center mb-4"><input type="text" value={userGuess} onChange={(e) => setUserGuess(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && checkAnswer()} className="flex-1 max-w-xs p-2 border border-gray-200 rounded-lg" placeholder="So'zni yozing" autoFocus /><Button onClick={checkAnswer} className="bg-indigo-600 hover:bg-indigo-700">Tekshirish</Button></div>
        {message && <p className={`text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      </CardContent>
    </Card>
  );
}

// 7. True False Quiz (Mantiqiy savollar)
function TrueFalseQuiz() {
  const questions = [
    { text: "Dasturlash tillari kompyuterga tushunarli tilda buyruq berish imkonini beradi.", answer: true },
    { text: "JavaScript faqat frontend uchun ishlatiladi.", answer: false },
    { text: "Python dasturlash tili 1991 yilda yaratilgan.", answer: true },
    { text: "HTML dasturlash tili hisoblanadi.", answer: false },
    { text: "React.js Facebook tomonidan yaratilgan.", answer: true },
    { text: "CSS yordamida ma'lumotlar bazasi boshqariladi.", answer: false },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const savedBest = localStorage.getItem('bestQuizScore');
    if (savedBest) setBestScore(parseInt(savedBest));
  }, []);

  const handleAnswer = (answer: boolean) => {
    triggerAd(); // 💰 Har bir savol javobidan keyin reklama ochiladi
    if (questions[currentIndex].answer === answer) {
      const newScore = score + 10;
      setScore(newScore);
      if (newScore > bestScore) { setBestScore(newScore); localStorage.setItem('bestQuizScore', newScore.toString()); }
    }
    if (currentIndex + 1 < questions.length) setCurrentIndex(currentIndex + 1);
    else setIsFinished(true);
  };

  const restartQuiz = () => { triggerAd(); setCurrentIndex(0); setScore(0); setIsFinished(false); };

  if (isFinished) {
    return (
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader className="border-b border-gray-100"><CardTitle className="flex items-center gap-2"><Brain className="w-5 h-5 text-indigo-600" />Natijalar</CardTitle></CardHeader>
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4"><Award className="w-10 h-10 text-indigo-600" /></div>
          <h3 className="text-xl font-bold mb-4">Test yakunlandi!</h3>
          <div className="text-4xl font-bold text-indigo-600 mb-2">{score} / {questions.length * 10}</div>
          <div className="mb-6 text-gray-500">Eng yaxshi natija: {bestScore}</div>
          <Button onClick={restartQuiz} className="bg-indigo-600 hover:bg-indigo-700"><RefreshCw className="w-4 h-4 mr-2" />Qayta boshlash</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-100"><CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-indigo-600" />Mantiqiy savollar</CardTitle></CardHeader>
      <CardContent className="p-6">
        <div className="mb-4"><div className="flex justify-between text-sm text-gray-500"><span>Savol {currentIndex + 1} / {questions.length}</span><span>Ball: {score}</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div></div></div>
        <div className="bg-gray-50 p-8 rounded-lg mb-6 min-h-[150px] flex items-center justify-center"><p className="text-lg text-center">{questions[currentIndex].text}</p></div>
        <div className="flex gap-4 justify-center"><Button onClick={() => handleAnswer(true)} className="flex-1 bg-green-600 hover:bg-green-700">✅ To'g'ri</Button><Button onClick={() => handleAnswer(false)} className="flex-1 bg-red-600 hover:bg-red-700">❌ Noto'g'ri</Button></div>
      </CardContent>
    </Card>
  );
}

// 8. Click Counter Challenge
function ClickCounter() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [bestClicks, setBestClicks] = useState(0);

  useEffect(() => {
    const savedBest = localStorage.getItem('bestClickCount');
    if (savedBest) setBestClicks(parseInt(savedBest));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (clicks > bestClicks) { setBestClicks(clicks); localStorage.setItem('bestClickCount', clicks.toString()); }
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  const startGame = () => { triggerAd(); setClicks(0); setTimeLeft(10); setIsActive(true); };
  const handleClick = () => { if (isActive) setClicks(clicks + 1); };

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-gray-100"><CardTitle className="flex items-center gap-2"><Flame className="w-5 h-5 text-indigo-600" />Click tezligi</CardTitle></CardHeader>
      <CardContent className="p-6 text-center">
        <div className="flex justify-between mb-4"><div className="text-gray-600">Eng yaxshi: {bestClicks}</div><div className="text-indigo-600">Vaqt: {timeLeft}s</div></div>
        {!isActive && timeLeft === 10 && <Button onClick={startGame} className="bg-indigo-600 hover:bg-indigo-700">Boshlash</Button>}
        {isActive && <div onClick={handleClick} className="h-64 bg-indigo-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-all"><div className="text-center"><div className="text-6xl font-bold text-white mb-2">{clicks}</div><p className="text-white">Bu yerga bosing!</p></div></div>}
        {!isActive && timeLeft === 0 && <div><div className="text-4xl font-bold text-indigo-600 mb-4">{clicks} marta</div><Button onClick={startGame} className="bg-indigo-600 hover:bg-indigo-700">Qayta o'ynash</Button></div>}
      </CardContent>
    </Card>
  );
}

// Main Games Page
export function Games() {
  const [activeTab, setActiveTab] = useState<'typing' | 'math' | 'memory' | 'reaction' | 'guess' | 'scramble' | 'quiz' | 'clicker'>('typing');

  const tabs = [
    { id: 'typing', name: 'Tez yozish', icon: Keyboard },
    { id: 'math', name: 'Matematika', icon: Calculator },
    { id: 'memory', name: 'Xotira', icon: MemoryStick },
    { id: 'reaction', name: 'Reaksiya', icon: Zap },
    { id: 'guess', name: 'Son topish', icon: Target },
    { id: 'scramble', name: 'So\'z topish', icon: Shuffle },
    { id: 'quiz', name: 'Mantiq', icon: Brain },
    { id: 'clicker', name: 'Click tezligi', icon: Flame }
  ];

  const handleTabChange = (tabId: any) => {
    triggerAd(); // 💰 O'yin toifasini o'zgartirganda ham reklama ochiladi
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Gamepad2 className="w-8 h-8 text-indigo-600" />
            Aqliy o'yinlar va trenajyorlar
          </h1>
          <p className="text-gray-500 mt-2">Miyangizni mashq qildiring va o'yinlar orqali o'z mahoratingizni sinang</p>
        </div>

        {/* Tab navigatsiyasi */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 bg-white p-2 rounded-xl shadow-sm max-w-4xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tanlangan o'yin */}
        <div className="max-w-2xl mx-auto">
          {activeTab === 'typing' && <TypingTest />}
          {activeTab === 'math' && <MathQuiz />}
          {activeTab === 'memory' && <MemoryGame />}
          {activeTab === 'reaction' && <ReactionGame />}
          {activeTab === 'guess' && <NumberGuessingGame />}
          {activeTab === 'scramble' && <WordScramble />}
          {activeTab === 'quiz' && <TrueFalseQuiz />}
          {activeTab === 'clicker' && <ClickCounter />}
        </div>
      </div>
    </div>
  );
}