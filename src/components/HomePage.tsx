import React, { useState } from 'react';
import { SourceDocument } from '../types';
import {
  Sparkles,
  Plus,
  ArrowRight,
  LineChart,
  FileSpreadsheet,
  ShieldCheck,
  CheckCircle2,
  Search,
} from 'lucide-react';

interface HomePageProps {
  documents: SourceDocument[];
  onOpenAddDocument: () => void;
  onGoToWorkspace: () => void;
  onSearchQuestion: (query: string, docId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  documents,
  onOpenAddDocument,
  onGoToWorkspace,
  onSearchQuestion,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDocId, setSelectedDocId] = useState<string>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onSearchQuestion(searchQuery.trim(), selectedDocId === 'all' ? undefined : selectedDocId);
  };

  const sampleSearchPrompts = [
    { label: 'When do first year classes start?', query: 'When do classes start for first year students?' },
    { label: 'When is the 33rd convocation?', query: 'When is the 33rd convocation date?' },
    { label: 'Q2 vs Q4 efficiency reasons', query: 'Compare production efficiency between Q2 and Q4, identify the three biggest reasons for the change' },
    { label: 'Helios-X solar specs', query: 'What is the maximum power Pmax and efficiency of Helios-X solar module?' },
    { label: 'Reverse diffusion vs ICA', query: 'Compare PSNR and OCR recognition rate of diffusion restoration versus ICA' },
    { label: 'Four Pillars of Karunya', query: 'What are the four pillars of Karunya Institute?' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-10">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vision-First Multimodal Document Intelligence</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Read, Reason &amp; Ground Answers Across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Mixed Documents
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Ask any question across PDFs with tables, charts, graphs, formulas, and damaged scanned pages. The system processes visual content directly as high-resolution image patches, pointing you straight to the exact page and visual bounding box.
          </p>
        </div>

        {/* Universal Search & Ask Input Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Ask Any Question or Search Documents</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Searching across {documents.length} active documents
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask any question (e.g. When do classes start? What are the 3 biggest reasons for downtime?)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-inner"
              />
            </div>

            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-emerald-500 font-medium shrink-0"
            >
              <option value="all">All Documents ({documents.length})</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Question</span>
            </button>
          </form>

          {/* Quick Search Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
            <span className="text-[11px] text-slate-400 font-medium">Quick Searches:</span>
            {sampleSearchPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSearchQuestion(p.query)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 hover:border-emerald-500/50 text-[11px] transition flex items-center gap-1 cursor-pointer"
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={onGoToWorkspace}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Open Interactive Q&amp;A Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAddDocument}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add / Upload Document</span>
          </button>
        </div>
      </div>

      {/* Key Capability Highlights */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 shadow-md">
          <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 border border-sky-800/60 flex items-center justify-center">
            <LineChart className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Visual Chart Reading</h3>
          <p className="text-[11px] text-slate-400 leading-snug">
            Decodes axes, lines, legends, and curves directly from pixels without textual transcription.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 shadow-md">
          <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/60 flex items-center justify-center">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Dense Table Matrices</h3>
          <p className="text-[11px] text-slate-400 leading-snug">
            Extracts multi-column schedules, subscripts, and cell relationships preserved in 2D space.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 shadow-md">
          <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 border border-rose-800/60 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Degraded Scan Robustness</h3>
          <p className="text-[11px] text-slate-400 leading-snug">
            Handles ink bleed-through, aging, handwriting, and physical paper defects without OCR collapse.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 shadow-md">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Pixel Bounding Boxes</h3>
          <p className="text-[11px] text-slate-400 leading-snug">
            Every answer includes verified citations with normalized coordinates [ymin, xmin, ymax, xmax].
          </p>
        </div>
      </div>
    </div>
  );
};
