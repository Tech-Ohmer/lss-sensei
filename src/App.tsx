import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Quizzes } from './data/quizzes';

// Import Content
import WhiteIntro from './content/white/intro.md?raw';
import WhiteHistory from './content/white/history.md?raw';
import WhiteConcepts from './content/white/concepts.md?raw';
import WhiteRoles from './content/white/roles.md?raw';

import YellowDefine from './content/yellow/define.md?raw';
import YellowMeasure from './content/yellow/measure.md?raw';
import YellowAnalyze from './content/yellow/analyze.md?raw';
import YellowImprove from './content/yellow/improve.md?raw';
import YellowControl from './content/yellow/control.md?raw';

import GreenStats from './content/green/stats.md?raw';
import GreenFmea from './content/green/fmea.md?raw';

import BlackStats from './content/black/advanced_stats.md?raw';
import BlackLeadership from './content/black/leadership.md?raw';

import MbbStrategy from './content/mbb/strategy.md?raw';

const Curriculum: any = {
  white: [
    { id: 'intro', title: 'Welcome to Six Sigma', content: WhiteIntro, video: 's2HCrhNVfak' },
    { id: 'history', title: 'History & Origins', content: WhiteHistory, video: 'KfFez57ay6E' },
    { id: 'concepts', title: 'Core Concepts (VOC, CTQ)', content: WhiteConcepts },
    { id: 'roles', title: 'Roles & Belts', content: WhiteRoles },
  ],
  yellow: [
    { id: 'define', title: 'Define Phase', content: YellowDefine, video: 'CZfSpkL4-fE' },
    { id: 'measure', title: 'Measure Phase', content: YellowMeasure },
    { id: 'analyze', title: 'Analyze Phase', content: YellowAnalyze },
    { id: 'improve', title: 'Improve Phase', content: YellowImprove },
    { id: 'control', title: 'Control Phase', content: YellowControl },
  ],
  green: [
    { id: 'stats', title: 'Stats & Capability', content: GreenStats, video: 'EHkvdJE-k_M' },
    { id: 'fmea', title: 'Analyze & FMEA', content: GreenFmea },
  ],
  black: [
    { id: 'adv_stats', title: 'Advanced Stats & DOE', content: BlackStats },
    { id: 'leadership', title: 'Leadership & Change', content: BlackLeadership },
  ],
  mbb: [
    { id: 'strategy', title: 'Enterprise Strategy', content: MbbStrategy },
  ],
};

const Belts = [
  { id: 'white', name: 'White Belt', color: 'bg-white border-slate-300 text-slate-600', textColor: 'text-slate-600' },
  { id: 'yellow', name: 'Yellow Belt', color: 'bg-yellow-400 text-yellow-900', textColor: 'text-yellow-900' },
  { id: 'green', name: 'Green Belt', color: 'bg-green-600 text-white', textColor: 'text-green-600' },
  { id: 'black', name: 'Black Belt', color: 'bg-slate-900 text-white', textColor: 'text-slate-900' },
  { id: 'mbb', name: 'Master Black Belt', color: 'bg-red-700 text-white shadow-lg', textColor: 'text-red-700' },
];

function App() {
  const [currentBelt, setCurrentBelt] = useState('white');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [mode, setMode] = useState<'lessons' | 'exam' | 'certificates'>('lessons');
  
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  const [earnedBelts, setEarnedBelts] = useState<string[]>(() => {
    const saved = localStorage.getItem('earnedBelts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('earnedBelts', JSON.stringify(earnedBelts));
  }, [earnedBelts]);

  const closeLesson = () => setSelectedLesson(null);

  const startExam = () => {
    setQuizIndex(0);
    setScore(0);
    setQuizFinished(false);
    setMode('exam');
  };

  const handleAnswer = (optionIndex: number) => {
    const beltQuizzes: any = Quizzes;
    const currentQuizSet = beltQuizzes[currentBelt];
    
    if (optionIndex === currentQuizSet[quizIndex].answer) {
      setScore(s => s + 1);
    }

    if (quizIndex + 1 < currentQuizSet.length) {
      setQuizIndex(i => i + 1);
    } else {
      setQuizFinished(true);
      const finalScore = ((score + (optionIndex === currentQuizSet[quizIndex].answer ? 1 : 0)) / currentQuizSet.length) * 100;
      if (finalScore >= 80 && !earnedBelts.includes(currentBelt)) {
        setEarnedBelts(prev => [...prev, currentBelt]);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 font-sans">
      <header className="bg-slate-900 text-white p-4 shadow-md z-20 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Six Sigma Sensei</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest">Road to Mastery</p>
        </div>
        <div className="flex gap-1">
          {earnedBelts.map(b => (
            <div key={b} className={`w-3 h-3 rounded-full ${Belts.find(bt => bt.id === b)?.color}`} title={b}></div>
          ))}
        </div>
      </header>

      <nav className="flex overflow-x-auto p-4 gap-3 bg-white border-b sticky top-0 z-10 no-scrollbar shadow-sm">
        {Belts.map((belt) => (
          <button
            key={belt.id}
            onClick={() => { setCurrentBelt(belt.id); closeLesson(); setMode('lessons'); }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              currentBelt === belt.id 
                ? `${belt.color} scale-105 shadow-md ring-2 ring-offset-1 ring-slate-200` 
                : 'bg-slate-50 text-slate-400 border-transparent opacity-60'
            }`}
          >
            {belt.name}
          </button>
        ))}
      </nav>

      <div className="bg-white flex justify-center border-b text-sm font-medium">
        <button onClick={() => setMode('lessons')} className={`px-6 py-3 ${mode === 'lessons' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>Lessons</button>
        <button onClick={() => setMode('exam')} className={`px-6 py-3 ${mode === 'exam' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>Exam</button>
        <button onClick={() => setMode('certificates')} className={`px-6 py-3 ${mode === 'certificates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>Certificates</button>
      </div>

      <main className="flex-1 p-6 max-w-2xl mx-auto w-full pb-20">
        
        {mode === 'lessons' && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 capitalize border-b pb-4">
              {currentBelt.replace('-', ' ')} Modules
            </h2>
            <div className="space-y-3">
              {Curriculum[currentBelt]?.map((lesson: any, index: number) => (
                <div key={lesson.id} onClick={() => setSelectedLesson(lesson)} className="flex items-center p-4 border rounded-xl hover:bg-blue-50 transition-all cursor-pointer group active:scale-95">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">{index + 1}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-700">{lesson.title}</h3>
                    {lesson.video && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">Video Included</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'exam' && (
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            {!quizFinished ? (
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Question {quizIndex + 1} of {(Quizzes as any)[currentBelt].length}</span>
                <h3 className="text-xl font-bold text-slate-800 mt-4 mb-8">{(Quizzes as any)[currentBelt][quizIndex].question}</h3>
                <div className="space-y-3">
                  {(Quizzes as any)[currentBelt][quizIndex].options.map((option: string, i: number) => (
                    <button key={i} onClick={() => handleAnswer(i)} className="w-full p-4 text-left border-2 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700 active:scale-95">
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-10">
                <div className="text-6xl mb-4">{(score / (Quizzes as any)[currentBelt].length) >= 0.8 ? '🎉' : '❌'}</div>
                <h3 className="text-2xl font-bold text-slate-800">Exam Complete!</h3>
                <p className="text-slate-500 mt-2">Your Score: {Math.round((score / (Quizzes as any)[currentBelt].length) * 100)}%</p>
                { (score / (Quizzes as any)[currentBelt].length) >= 0.8 ? (
                  <div className="mt-8 bg-green-50 p-6 rounded-2xl border border-green-200">
                    <p className="text-green-700 font-bold">Congratulations! You've earned the {currentBelt} Belt.</p>
                    <button onClick={() => setMode('certificates')} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow-md">View Certificate</button>
                  </div>
                ) : (
                  <div className="mt-8">
                    <p className="text-red-500">You need 80% to pass. Try reviewing the lessons!</p>
                    <button onClick={startExam} className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg font-bold">Retry Exam</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {mode === 'certificates' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">My Achievements</h2>
            {earnedBelts.length > 0 ? earnedBelts.map(b => (
              <div key={b} className="bg-white border-4 border-slate-800 p-8 rounded-lg shadow-xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 rotate-45 ${Belts.find(bt => bt.id === b)?.color}`}></div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-4 italic text-center">Official Six Sigma Sensei Certification</h4>
                <h3 className="text-3xl font-serif text-center font-bold text-slate-800 uppercase tracking-widest">CERTIFICATE</h3>
                <p className="text-center text-sm text-slate-500 mt-4">This acknowledges that</p>
                <h2 className="text-2xl text-center font-bold font-serif underline decoration-blue-500 underline-offset-8 mt-2">Ohmer Sulit</h2>
                <p className="text-center text-sm text-slate-500 mt-6">has mastered the principles of</p>
                <h4 className={`text-2xl text-center font-bold my-4 uppercase tracking-widest ${Belts.find(bt => bt.id === b)?.textColor}`}>
                  {Belts.find(bt => bt.id === b)?.name}
                </h4>
                <div className="flex justify-between items-end mt-12 px-4">
                  <div className="text-center border-t border-slate-200 pt-2 flex-1 mx-2">
                    <div className="font-serif italic text-sm">Gemini Sensei</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">Program Director</div>
                  </div>
                  <div className="text-center border-t border-slate-200 pt-2 flex-1 mx-2">
                    <div className="font-serif italic text-sm">{new Date().toLocaleDateString()}</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">Date Issued</div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
                <p className="text-slate-400 italic">No certificates earned yet. Pass an exam to unlock!</p>
              </div>
            )}
          </div>
        )}
      </main>

      {selectedLesson && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-up">
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-lg">
            <button onClick={closeLesson} className="text-sm font-bold uppercase tracking-wider text-slate-300 hover:text-white">&larr; Back</button>
            <span className="font-bold truncate max-w-[200px]">{selectedLesson.title}</span>
            <div className="w-8"></div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 pb-24 prose prose-slate max-w-none">
            {selectedLesson.video && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg aspect-video bg-black">
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedLesson.video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            )}
            <ReactMarkdown>{selectedLesson.content}</ReactMarkdown>
          </div>

          <div className="p-4 border-t bg-slate-50 flex justify-center fixed bottom-0 left-0 right-0 z-50">
            <button onClick={closeLesson} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg w-full max-w-md active:scale-95">Complete Lesson</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;