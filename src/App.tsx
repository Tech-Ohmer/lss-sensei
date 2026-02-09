import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

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

const Curriculum = {
  white: [
    { id: 'intro', title: 'Welcome to Six Sigma', content: WhiteIntro },
    { id: 'history', title: 'History & Origins', content: WhiteHistory },
    { id: 'concepts', title: 'Core Concepts (VOC, CTQ)', content: WhiteConcepts },
    { id: 'roles', title: 'Roles & Belts', content: WhiteRoles },
  ],
  yellow: [
    { id: 'define', title: 'Define Phase', content: YellowDefine },
    { id: 'measure', title: 'Measure Phase', content: YellowMeasure },
    { id: 'analyze', title: 'Analyze Phase', content: YellowAnalyze },
    { id: 'improve', title: 'Improve Phase', content: YellowImprove },
    { id: 'control', title: 'Control Phase', content: YellowControl },
  ],
  green: [
    { id: 'stats', title: 'Stats & Capability', content: GreenStats },
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
  { id: 'white', name: 'White Belt', color: 'bg-white border-slate-300 text-slate-600' },
  { id: 'yellow', name: 'Yellow Belt', color: 'bg-yellow-400 text-yellow-900' },
  { id: 'green', name: 'Green Belt', color: 'bg-green-600 text-white' },
  { id: 'black', name: 'Black Belt', color: 'bg-slate-900 text-white' },
  { id: 'mbb', name: 'Master Black Belt', color: 'bg-red-700 text-white shadow-lg' },
];

function App() {
  const [currentBelt, setCurrentBelt] = useState('white');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const closeLesson = () => setSelectedLesson(null);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50">
      <header className="bg-slate-900 text-white p-4 shadow-md z-20">
        <h1 className="text-xl font-bold tracking-tight">Six Sigma Sensei</h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest">Road to Mastery</p>
      </header>

      <nav className="flex overflow-x-auto p-4 gap-3 bg-white border-b sticky top-0 z-10 no-scrollbar shadow-sm">
        {Belts.map((belt) => (
          <button
            key={belt.id}
            onClick={() => { setCurrentBelt(belt.id); closeLesson(); }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              currentBelt === belt.id 
                ? `${belt.color} scale-105 shadow-md ring-2 ring-offset-1 ring-slate-200` 
                : 'bg-slate-50 text-slate-400 border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            {belt.name}
          </button>
        ))}
      </nav>

      <main className="flex-1 p-6 max-w-2xl mx-auto w-full pb-20">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 capitalize border-b pb-4">
            {currentBelt.replace('-', ' ')} Modules
          </h2>
          
          <div className="space-y-3">
            {Curriculum[currentBelt as keyof typeof Curriculum]?.map((lesson, index) => (
              <div 
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className="flex items-center p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer group active:scale-95"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 group-hover:text-blue-700">{lesson.title}</h3>
                  <p className="text-xs text-slate-400 group-hover:text-blue-400">Tap to start lesson</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedLesson && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-up">
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-lg">
            <button onClick={closeLesson} className="text-sm font-bold uppercase tracking-wider text-slate-300 hover:text-white">
              &larr; Back
            </button>
            <span className="font-bold truncate max-w-[200px]">{selectedLesson.title}</span>
            <div className="w-8"></div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 prose prose-slate max-w-none">
            <ReactMarkdown>{selectedLesson.content}</ReactMarkdown>
          </div>

          <div className="p-4 border-t bg-slate-50 flex justify-center">
            <button onClick={closeLesson} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg w-full max-w-md">
              Complete Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;