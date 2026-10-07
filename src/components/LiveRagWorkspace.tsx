import React, { useState, useEffect } from 'react';
import {
  SourceDocument,
  DocumentPage,
  QueryResult,
  BoundingBox,
  Citation,
  TestCase,
} from '../types';
import { PageRenderer } from './PageRenderer';
import {
  Search,
  Sparkles,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Calculator,
  Compass,
  FileSpreadsheet,
  LineChart,
  Layers,
  BookOpen,
  Clock,
  ShieldCheck,
  Plus,
  Trash2,
  X,
  Copy,
  Check,
  HelpCircle,
  Calendar,
  BarChart3,
  FileText,
} from 'lucide-react';

interface LiveRagWorkspaceProps {
  documents: SourceDocument[];
  testCases: TestCase[];
  selectedDoc: SourceDocument;
  setSelectedDoc: (doc: SourceDocument) => void;
  selectedPage: DocumentPage;
  setSelectedPage: (page: DocumentPage) => void;
  queryResult: QueryResult | null;
  onRunQuery: (query: string, docIds: string[], mode: string, testCaseId?: string) => Promise<void>;
  isLoading: boolean;
  onOpenAddDocument: () => void;
  onRemoveDocument: (docId: string) => void;
  initialSearchQuery?: string;
}

export const LiveRagWorkspace: React.FC<LiveRagWorkspaceProps> = ({
  documents,
  testCases,
  selectedDoc,
  setSelectedDoc,
  selectedPage,
  setSelectedPage,
  queryResult,
  onRunQuery,
  isLoading,
  onOpenAddDocument,
  onRemoveDocument,
  initialSearchQuery,
}) => {
  const [inputText, setInputText] = useState<string>(initialSearchQuery || '');
  const [activeBox, setActiveBox] = useState<BoundingBox | null>(null);
  const [filterDocId, setFilterDocId] = useState<string>('all');
  const [copiedAnswer, setCopiedAnswer] = useState<boolean>(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setInputText(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Curated suggested questions with human-readable titles
  const suggestedQuestions = [
    {
      title: '1st Year Class Dates',
      query: 'When do classes start for first year students?',
      docCategory: 'Calendar Table',
      icon: Calendar,
      color: 'text-emerald-400',
    },
    {
      title: '33rd Convocation',
      query: 'When is the 33rd convocation date?',
      docCategory: 'Event Schedule',
      icon: Calendar,
      color: 'text-amber-400',
    },
    {
      title: 'Q2 vs Q4 Efficiency & Reasons',
      query: 'Compare production efficiency between Q2 and Q4, identify the three biggest reasons for the change, and show me the proof',
      docCategory: 'Operations Chart',
      icon: LineChart,
      color: 'text-sky-400',
    },
    {
      title: 'Helios Solar PV Specs',
      query: 'What is the maximum power Pmax and open circuit voltage Voc of the Helios-X solar panel?',
      docCategory: 'Technical Datasheet',
      icon: FileSpreadsheet,
      color: 'text-purple-400',
    },
    {
      title: 'Diffusion vs ICA (PSNR & OCR)',
      query: 'Compare PSNR and OCR recognition rate of the proposed diffusion restoration versus ICA in Farrahi Moghaddam 2009',
      docCategory: 'Scientific Paper',
      icon: LineChart,
      color: 'text-rose-400',
    },
    {
      title: 'Karunya 4 Pillars',
      query: 'What are the four pillars of Karunya Institute?',
      docCategory: 'Accreditation',
      icon: BookOpen,
      color: 'text-teal-400',
    },
    {
      title: 'Ph.D. Enrollment Windows',
      query: 'When is Ph.D. enrollment held in the academic calendar?',
      docCategory: 'Calendar Schedule',
      icon: Calendar,
      color: 'text-indigo-400',
    },
    {
      title: 'T1 Internal Exams',
      query: 'When is the first internal exam (T1) conducted?',
      docCategory: 'Exam Matrix',
      icon: FileSpreadsheet,
      color: 'text-amber-400',
    },
  ];

  const handleSelectSuggestedQuestion = (query: string) => {
    setInputText(query);
    const docIds = filterDocId === 'all' ? documents.map((d) => d.id) : [filterDocId];
    onRunQuery(query, docIds, 'vision_first');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const docIds = filterDocId === 'all' ? documents.map((d) => d.id) : [filterDocId];
    onRunQuery(inputText.trim(), docIds, 'vision_first');
  };

  const handleCitationClick = (citation: Citation) => {
    const doc = documents.find((d) => d.id === citation.documentId);
    if (doc) {
      setSelectedDoc(doc);
      const page = doc.pages.find((p) => p.pageNumber === citation.pageNumber);
      if (page) {
        setSelectedPage(page);
        if (citation.boundingBox) {
          setActiveBox(citation.boundingBox);
        } else if (page.boundingBoxes.length > 0) {
          setActiveBox(page.boundingBoxes[0]);
        }
      }
    }
  };

  const handleCopyAnswer = () => {
    if (queryResult) {
      navigator.clipboard.writeText(
        `${queryResult.directAnswerSummary}\n\n${queryResult.answer}`
      );
      setCopiedAnswer(true);
      setTimeout(() => setCopiedAnswer(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950 text-slate-100">
      {/* Search & Query Bar */}
      <div className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-slate-800 shrink-0">
        <div className="max-w-7xl mx-auto space-y-2.5">
          {/* Query Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-stretch">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask any question about your documents (e.g. When do classes start? Compare Q2 vs Q4 efficiency...)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-inner"
              />
              {inputText && (
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Document Selector */}
            <select
              value={filterDocId}
              onChange={(e) => {
                if (e.target.value === 'ADD_NEW') {
                  onOpenAddDocument();
                } else {
                  setFilterDocId(e.target.value);
                }
              }}
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium shrink-0"
            >
              <option value="all">Search All Documents ({documents.length})</option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.totalPages}p)
                </option>
              ))}
              <option value="ADD_NEW" className="text-emerald-400 font-bold">
                + Upload / Add New Document...
              </option>
            </select>

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition shrink-0 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Ask Question</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Suggested Searches Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Suggested Searches:
            </span>
            {suggestedQuestions.map((sq, idx) => {
              const Icon = sq.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestedQuestion(sq.query)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 hover:border-emerald-500/50 text-[11px] whitespace-nowrap transition flex items-center gap-1.5 shrink-0 cursor-pointer group"
                  title={sq.query}
                >
                  <Icon className={`w-3 h-3 ${sq.color}`} />
                  <span className="font-medium group-hover:text-emerald-300 transition">
                    {sq.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Answer & Citations / Right Document Page Viewer */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* Left Column: Multimodal Answer & Evidence */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-slate-800 bg-slate-950/60 overflow-y-auto p-4 sm:p-5 space-y-4">
          {isLoading ? (
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-center my-auto">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-200">
                  Analyzing Multimodal Document Corpus...
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Rasterizing pages into visual patch grids, scanning dense tables, curves, equations, and localizing bounding boxes.
                </p>
              </div>
            </div>
          ) : queryResult ? (
            <div className="space-y-4">
              {/* Question Header & Actions */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
                  <span className="font-bold text-emerald-400 font-mono">Q:</span>
                  <span className="font-semibold text-slate-100 truncate max-w-md">
                    {queryResult.query}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyAnswer}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1 transition"
                    title="Copy Answer"
                  >
                    {copiedAnswer ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setInputText('')}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1 transition"
                    title="Ask another question"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="text-[10px]">New Q</span>
                  </button>
                </div>
              </div>

              {/* Executive Answer Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-800/40 shadow-xl">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-900/50">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Answer Summary</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-400">Confidence:</span>
                    <span className="font-mono font-bold text-emerald-300">
                      {Math.round(queryResult.confidenceScore * 100)}%
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {queryResult.executionTimeMs}ms
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                  {queryResult.directAnswerSummary}
                </p>

                {/* Verification Tags */}
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-emerald-900/40 text-[11px]">
                  {queryResult.visualAnalyzed && (
                    <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/60 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-sky-400" />
                      Visual Content Analyzed as Direct Pixels
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {queryResult.citations.length} Grounded Citations
                  </span>
                </div>
              </div>

              {/* Source Citations with Click-to-Locate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    Source Citations (Click to Highlight Page Region)
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {queryResult.citations.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCitationClick(c)}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/70 cursor-pointer transition shadow-md group"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono font-bold text-[10px]">
                            Page {c.pageNumber}
                          </span>
                          <span className="font-semibold text-slate-200 group-hover:text-emerald-300 transition truncate max-w-xs">
                            {c.section}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-emerald-400 font-mono">
                          <span>View on Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {c.snippetOrProof}
                      </p>

                      {c.boundingBox && (
                        <div className="mt-1.5 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                          <span className="text-emerald-500 font-medium">Box:</span>
                          <span className="bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800 text-slate-300">
                            [{c.boundingBox.ymin.toFixed(0)}%, {c.boundingBox.xmin.toFixed(0)}%,{' '}
                            {c.boundingBox.ymax.toFixed(0)}%, {c.boundingBox.xmax.toFixed(0)}%]
                          </span>
                          <span className="text-slate-500">· {c.boundingBox.label}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Reasoning Trace */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  Detailed Evidence &amp; Explanation
                </h3>
                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {queryResult.answer}
                </div>
              </div>

              {/* Mathematical Proof Box */}
              {queryResult.mathProof && (
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/50 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                    <Calculator className="w-4 h-4 text-indigo-400" />
                    <span>Mathematical / Numeric Verification Proof</span>
                  </div>
                  <div className="text-xs text-indigo-100 font-mono bg-indigo-950/50 p-2.5 rounded-lg border border-indigo-800/30 leading-relaxed">
                    {queryResult.mathProof}
                  </div>
                </div>
              )}

              {/* Execution Steps */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  Reasoning Steps
                </h3>
                <div className="space-y-1.5 border-l-2 border-slate-800 ml-2 pl-3">
                  {queryResult.reasoningSteps.map((step) => (
                    <div key={step.step} className="text-xs">
                      <div className="flex items-center gap-2 text-slate-300 font-medium">
                        <span className="text-emerald-400 font-mono">Step {step.step}:</span>
                        <span>{step.action}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-sky-300 font-mono">
                          {step.modality}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {step.observation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center p-4 sm:p-6 text-slate-400 space-y-6 my-auto">
              <div className="text-center space-y-2 max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Ask Any Question or Search Documents
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Type your question in the search bar above, or choose a category below to test Vision-First document intelligence with instant page-level source citations and bounding box grounding.
                </p>
              </div>

              {/* Interactive Category Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto w-full">
                <div
                  onClick={() =>
                    handleSelectSuggestedQuestion(
                      'When do classes start for first year students?'
                    )
                  }
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 cursor-pointer transition shadow group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Academic Schedules</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    &ldquo;When do classes start for first year students?&rdquo;
                  </p>
                </div>

                <div
                  onClick={() =>
                    handleSelectSuggestedQuestion(
                      'Compare production efficiency between Q2 and Q4, identify the three biggest reasons for the change, and show me the proof'
                    )
                  }
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/60 cursor-pointer transition shadow group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1">
                    <LineChart className="w-3.5 h-3.5" />
                    <span>Operations &amp; Charts</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    &ldquo;Compare Q2 vs Q4 efficiency and 3 biggest reasons&rdquo;
                  </p>
                </div>

                <div
                  onClick={() =>
                    handleSelectSuggestedQuestion(
                      'Compare PSNR and OCR recognition rate of the proposed diffusion restoration versus ICA in Farrahi Moghaddam 2009'
                    )
                  }
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/60 cursor-pointer transition shadow group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Scans &amp; Degradation</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    &ldquo;Compare PSNR and OCR for diffusion vs ICA&rdquo;
                  </p>
                </div>

                <div
                  onClick={() =>
                    handleSelectSuggestedQuestion(
                      'What is the maximum power Pmax and open circuit voltage Voc of the Helios-X solar panel?'
                    )
                  }
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/60 cursor-pointer transition shadow group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Technical Datasheets</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    &ldquo;What is Pmax and Voc of Helios-X solar module?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visual Document Page Viewer */}
        <div className="w-full lg:w-1/2 flex flex-col bg-slate-950 min-h-0 overflow-hidden">
          {/* Document Picker Tabs */}
          <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1">
              {documents.map((doc) => {
                const isSelected = selectedDoc.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoc(doc);
                      setSelectedPage(doc.pages[0]);
                      setActiveBox(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 group ${
                      isSelected
                        ? 'bg-slate-800 text-emerald-300 border border-emerald-500/50 shadow'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <BookOpen className="w-3 h-3" />
                    <span className="truncate max-w-[120px] sm:max-w-xs">{doc.title.split(':')[0]}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      ({doc.totalPages}p)
                    </span>
                    {isSelected && documents.length > 1 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Remove "${doc.title}" from active corpus?`)) {
                            onRemoveDocument(doc.id);
                          }
                        }}
                        className="hover:text-rose-400 text-slate-500 p-0.5 rounded transition ml-0.5"
                        title={`Remove "${doc.title}"`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Add Document Action Button */}
            <button
              onClick={onOpenAddDocument}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 shadow shrink-0"
              title="Add more documents"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Doc</span>
            </button>
          </div>

          {/* Page Number Carousel */}
          <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
            <span className="text-[11px] text-slate-400 font-semibold shrink-0">
              Pages:
            </span>
            {selectedDoc.pages.map((p) => {
              const isCurrent = selectedPage.pageNumber === p.pageNumber;
              return (
                <button
                  key={p.pageNumber}
                  onClick={() => {
                    setSelectedPage(p);
                    setActiveBox(p.boundingBoxes.length > 0 ? p.boundingBoxes[0] : null);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition flex items-center gap-1 shrink-0 ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>P.{p.pageNumber}</span>
                  {p.hasVisualContent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Visual Canvas */}
          <div className="flex-1 min-h-0 p-3 sm:p-4 overflow-hidden">
            <PageRenderer
              page={selectedPage}
              docTitle={selectedDoc.title}
              activeBoundingBox={activeBox}
              onSelectBox={(box) => setActiveBox(box)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
