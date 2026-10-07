import React, { useState } from 'react';
import { DocumentPage, BoundingBox } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, Grid3X3, Eye, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

interface PageRendererProps {
  page: DocumentPage;
  docTitle: string;
  activeBoundingBox?: BoundingBox | null;
  onSelectBox?: (box: BoundingBox) => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  docTitle,
  activeBoundingBox,
  onSelectBox,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showOcrText, setShowOcrText] = useState<boolean>(false);
  const [hoveredBox, setHoveredBox] = useState<BoundingBox | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            Page {page.pageNumber}
          </span>
          <span className="text-slate-300 font-medium truncate max-w-xs sm:max-w-md">
            {page.title}
          </span>
          {page.visualType && (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              {page.visualType.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2 py-1 rounded flex items-center gap-1 transition ${
              showGrid
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle 4x4 Visual Patch Grid"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Patch Grid</span>
          </button>

          <button
            onClick={() => setShowOcrText(!showOcrText)}
            className={`px-2 py-1 rounded flex items-center gap-1 transition ${
              showOcrText
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle OCR Text Overlay"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">OCR Layer</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            onClick={handleZoomOut}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-400 w-9 text-center font-mono text-[11px]">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-900/40">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
          }}
          className="relative w-[600px] h-[820px] bg-white text-slate-900 shadow-2xl rounded-sm border border-slate-300 select-none overflow-hidden shrink-0"
        >
          {/* Render Page Visual Content based on type */}
          <PageContentGraphic page={page} docTitle={docTitle} />

          {/* Vision-First 4x4 Grid Patch Overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-4 grid-rows-4 border-2 border-emerald-500/20">
              {Array.from({ length: 16 }).map((_, idx) => {
                const row = Math.floor(idx / 4);
                const col = idx % 4;
                return (
                  <div
                    key={idx}
                    className="border border-emerald-500/15 p-1 relative flex flex-col justify-between"
                  >
                    <span className="text-[8px] font-mono text-emerald-600/70 bg-emerald-50/80 px-1 rounded-sm w-fit">
                      P[{row},{col}]
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Grounded Bounding Boxes Overlay */}
          {page.boundingBoxes.map((box, bIdx) => {
            const isActive =
              activeBoundingBox &&
              Math.abs(activeBoundingBox.ymin - box.ymin) < 3 &&
              Math.abs(activeBoundingBox.xmin - box.xmin) < 3;
            const isHovered = hoveredBox === box;

            return (
              <div
                key={bIdx}
                onClick={() => onSelectBox && onSelectBox(box)}
                onMouseEnter={() => setHoveredBox(box)}
                onMouseLeave={() => setHoveredBox(null)}
                style={{
                  top: `${box.ymin}%`,
                  left: `${box.xmin}%`,
                  width: `${box.xmax - box.xmin}%`,
                  height: `${box.ymax - box.ymin}%`,
                }}
                className={`absolute cursor-pointer transition-all duration-200 z-20 ${
                  isActive
                    ? 'border-2 border-amber-500 bg-amber-500/25 ring-4 ring-amber-400/40 shadow-lg'
                    : isHovered
                    ? 'border-2 border-indigo-500 bg-indigo-500/20'
                    : 'border border-dashed border-emerald-600/60 bg-emerald-500/10 hover:border-emerald-500 hover:bg-emerald-500/20'
                }`}
              >
                <div
                  className={`absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-tight whitespace-nowrap shadow flex items-center gap-1 ${
                    isActive
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-900/90 text-emerald-300 border border-emerald-700/60'
                  }`}
                >
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>{box.label}</span>
                  <span className="font-mono text-[8px] opacity-80">
                    ({Math.round(box.confidence * 100)}%)
                  </span>
                </div>
              </div>
            );
          })}

          {/* Raw OCR Text Mode Drawer / Layer */}
          {showOcrText && (
            <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-md p-6 text-emerald-400 font-mono text-[11px] overflow-auto z-30 leading-relaxed border-2 border-amber-500/60">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-800/60">
                <span className="font-bold text-amber-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  OCR Text Stream Extraction (Page {page.pageNumber})
                </span>
                <span className="text-[10px] text-slate-400">
                  {page.ocrText.length} characters
                </span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200">
                {page.ocrText}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status / Citation Bar */}
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {page.boundingBoxes.length} visual regions identified on this page
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-500">Target Doc:</span>
          <span className="text-slate-300 font-medium truncate max-w-xs">{docTitle}</span>
        </div>
      </div>
    </div>
  );
};

// Subcomponent rendering realistic document contents faithfully matching the prompt screenshots
const PageContentGraphic: React.FC<{ page: DocumentPage; docTitle: string }> = ({
  page,
  docTitle,
}) => {
  // If custom uploaded image is present, render it directly
  if (page.imageUrl) {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
        <img
          src={page.imageUrl}
          alt={page.title}
          className="w-full h-full object-contain select-none"
        />
        {page.summary && (
          <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-sm p-2 text-[10px] text-slate-300 border-t border-slate-800 line-clamp-2">
            <span className="font-bold text-emerald-400">Extracted Content: </span>
            {page.summary}
          </div>
        )}
      </div>
    );
  }

  // Calendar Render Type (Document 1)
  if (page.renderType === 'calendar_grid') {
    return (
      <div className="w-full h-full p-4 flex flex-col font-sans bg-emerald-50/20 text-slate-800 text-[10px]">
        {/* Header */}
        <div className="border border-indigo-900 p-2 text-center bg-white shadow-sm mb-2">
          <div className="font-extrabold text-indigo-900 text-xs tracking-wider">
            KARUNYA INSTITUTE OF TECHNOLOGY AND SCIENCES
          </div>
          <div className="text-[9px] text-indigo-700 font-semibold">
            DEEMED TO BE UNIVERSITY
          </div>
          <div className="text-[11px] font-bold text-slate-900 mt-1 uppercase tracking-wide">
            {page.title.replace('Academic Calendar - ', 'ACADEMIC CALENDAR - ')}
          </div>
        </div>

        {/* Calendar Matrix */}
        <div className="border border-indigo-950 flex-1 flex flex-col bg-white overflow-hidden text-[9px]">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-amber-400 text-slate-900 font-bold border-b border-indigo-900 text-center py-1">
            <div className="col-span-1 border-r border-indigo-900">Day</div>
            <div className="col-span-1 border-r border-indigo-900">Date</div>
            <div className="col-span-3 border-r border-indigo-900 bg-sky-200">B.Tech</div>
            <div className="col-span-2 border-r border-indigo-900 bg-cyan-200">M.Tech/MBA</div>
            <div className="col-span-2 border-r border-indigo-900 bg-emerald-200">B.Sc/Agri</div>
            <div className="col-span-3 bg-amber-300 font-extrabold">Events & Remarks</div>
          </div>

          {/* Sub Header for Years */}
          <div className="grid grid-cols-12 bg-slate-100 border-b border-slate-300 text-[8px] text-center font-semibold text-slate-700 py-0.5">
            <div className="col-span-2 border-r border-slate-300">-</div>
            <div className="col-span-1 border-r border-slate-300">IV</div>
            <div className="col-span-1 border-r border-slate-300">III</div>
            <div className="col-span-1 border-r border-slate-300">II</div>
            <div className="col-span-1 border-r border-slate-300">II</div>
            <div className="col-span-1 border-r border-slate-300">I</div>
            <div className="col-span-1 border-r border-slate-300">IV</div>
            <div className="col-span-1 border-r border-slate-300">I</div>
            <div className="col-span-3 text-slate-500 font-normal">Official Notes</div>
          </div>

          {/* Body Rows representing monthly calendar */}
          <div className="flex-1 divide-y divide-slate-200 overflow-hidden flex flex-col justify-around py-1 text-[8.5px]">
            {/* Row sample 1 */}
            <div className="grid grid-cols-12 px-1 items-center bg-slate-50/50">
              <div className="col-span-1 font-semibold text-slate-600">Mon</div>
              <div className="col-span-1 font-bold text-center">1</div>
              <div className="col-span-3 grid grid-cols-3 text-center bg-sky-50 text-sky-950 font-medium">
                <span>{page.pageNumber === 4 ? '32' : page.pageNumber === 7 ? '98' : 'Day 1'}</span>
                <span>{page.pageNumber === 4 ? '20' : page.pageNumber === 7 ? '86' : 'Day 1'}</span>
                <span>{page.pageNumber === 4 ? '20' : page.pageNumber === 7 ? '86' : 'Day 1'}</span>
              </div>
              <div className="col-span-2 grid grid-cols-2 text-center bg-cyan-50">
                <span>E12</span>
                <span>-</span>
              </div>
              <div className="col-span-2 grid grid-cols-2 text-center bg-emerald-50">
                <span>107E7</span>
                <span>100E5</span>
              </div>
              <div className="col-span-3 font-semibold text-indigo-900 truncate pl-1">
                {page.pageNumber === 3
                  ? 'Bro. Dr. DGS Dhinakaran 91st Birthday'
                  : page.pageNumber === 9
                  ? 'New Year (Holiday)'
                  : page.pageNumber === 10
                  ? 'T1 - 1st Internal Exam Window'
                  : 'Classes scheduled'}
              </div>
            </div>

            {/* Event Highlight Row (Convocation / Exams) */}
            <div className="grid grid-cols-12 px-1 items-center bg-amber-50/90 border-y border-amber-300 font-semibold">
              <div className="col-span-1 font-bold text-amber-900">
                {page.pageNumber === 3 ? 'Sat' : page.pageNumber === 4 ? 'Mon' : 'Thu'}
              </div>
              <div className="col-span-1 font-bold text-amber-900 text-center">
                {page.pageNumber === 3 ? '4' : page.pageNumber === 4 ? '10' : '15'}
              </div>
              <div className="col-span-7 bg-amber-100/90 text-amber-950 px-2 py-0.5 text-center font-bold tracking-tight rounded-sm">
                {page.pageNumber === 3
                  ? '🎓 33rd CONVOCATION'
                  : page.pageNumber === 4
                  ? '📝 T1 - 1st INTERNAL EXAM (25T1 - 29T1)'
                  : page.pageNumber === 6
                  ? '📝 T3 - 3rd INTERNAL EXAM (93T3 - 97T3)'
                  : page.pageNumber === 7
                  ? '🔬 L1-L5 LAB EXAMINATIONS & E1-E13 END SEMESTER'
                  : 'ACADEMIC MILESTONE'}
              </div>
              <div className="col-span-3 text-[8px] font-bold text-amber-900 pl-1">
                {page.pageNumber === 3 ? 'Chief Guest Address' : 'Strict Hall Rules'}
              </div>
            </div>

            {/* Row Sample 3: Holidays / Enrollments */}
            <div className="grid grid-cols-12 px-1 items-center bg-white">
              <div className="col-span-1 text-slate-600">Wed</div>
              <div className="col-span-1 font-bold text-center">22</div>
              <div className="col-span-3 grid grid-cols-3 text-center bg-sky-50">
                <span>{page.pageNumber === 3 ? '24' : '48'}</span>
                <span>{page.pageNumber === 3 ? '12' : '36'}</span>
                <span>{page.pageNumber === 3 ? '12' : '36'}</span>
              </div>
              <div className="col-span-2 text-center bg-cyan-50">#</div>
              <div className="col-span-2 text-center bg-emerald-50">#</div>
              <div className="col-span-3 text-indigo-700 font-medium truncate pl-1">
                {page.pageNumber === 3 ? '# I Yr UG Enrollment (July 22-24)' : 'Working Day'}
              </div>
            </div>

            {/* Row Sample 4: Commencement */}
            <div className="grid grid-cols-12 px-1 items-center bg-emerald-50/70 border-t border-emerald-200">
              <div className="col-span-1 text-emerald-900 font-bold">Mon</div>
              <div className="col-span-1 font-bold text-center text-emerald-900">27</div>
              <div className="col-span-3 grid grid-cols-3 text-center bg-sky-100 text-sky-950 font-bold">
                <span>27</span>
                <span>15</span>
                <span>15</span>
              </div>
              <div className="col-span-2 text-center bg-cyan-100 font-bold">1</div>
              <div className="col-span-2 text-center bg-emerald-100 font-bold">1</div>
              <div className="col-span-3 text-emerald-800 font-bold truncate pl-1">
                {page.pageNumber === 3 ? 'Class commencement (I Yr UG)' : 'Routine Classes'}
              </div>
            </div>
          </div>

          {/* Footer Legend */}
          <div className="p-1.5 bg-slate-100 border-t border-slate-300 text-[8px] text-slate-600 flex justify-between">
            <span>* - Non-academic working day</span>
            <span className="font-semibold text-indigo-900">
              E - End Semester | T - Internal Exam | L - Lab Exam
            </span>
            <span className="font-mono">Ver 1.1.1</span>
          </div>
        </div>
      </div>
    );
  }

  // Cover Page
  if (page.renderType === 'cover') {
    return (
      <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-b from-blue-900 via-sky-800 to-indigo-950 text-white font-sans relative overflow-hidden">
        {/* University Header */}
        <div className="bg-white/95 text-slate-900 p-4 rounded-lg shadow-lg border border-slate-200">
          <div className="text-sm font-black text-rose-800 tracking-wider">
            Karunya INSTITUTE OF TECHNOLOGY AND SCIENCES
          </div>
          <div className="text-[10px] text-slate-600 font-medium">
            (Declared as Deemed to be University under Sec.3 of the UGC Act, 1956)
          </div>
          <div className="text-[10px] text-indigo-900 font-bold mt-1">
            MoE, UGC & AICTE Approved, NAAC A++ Accredited
          </div>
          <div className="text-[9px] text-slate-500">
            Karunya Nagar, Coimbatore - 641 114, Tamil Nadu, India.
          </div>
        </div>

        {/* Center Banner */}
        <div className="my-auto py-8">
          <div className="inline-block bg-amber-400 text-slate-950 font-black px-4 py-1.5 rounded-md text-sm uppercase tracking-widest shadow-md">
            Academic Calendar
          </div>
          <div className="text-4xl font-extrabold text-white mt-2 tracking-tight drop-shadow-md">
            2026–2027
          </div>
          <div className="text-xs text-sky-200 mt-2 font-mono">
            Version 1.1.1 · Complete Schedule & Internal Assessment Manual
          </div>
        </div>

        {/* Mission Pillars & Category 1 Badge */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded border border-white/20">
            <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              Solving Human Problems
            </div>
            <div className="text-xs font-black text-white mt-1 space-y-0.5">
              <div>🌿 Food</div>
              <div>💧 Water</div>
              <div>🩺 Health</div>
              <div>⚡ Energy</div>
            </div>
          </div>

          <div className="bg-amber-500/90 text-slate-950 p-3 rounded font-black text-center flex flex-col justify-center shadow-lg">
            <div className="text-[10px] uppercase tracking-wider text-amber-950">
              Accreditation
            </div>
            <div className="text-xs font-black">CATEGORY 1 INSTITUTION</div>
            <div className="text-[10px] text-amber-950">UGC GoI Approved</div>
          </div>
        </div>
      </div>
    );
  }

  // Chart / Plot Render Type (Gemini 1.5 paper or IJDAR curves)
  if (page.renderType === 'chart_plot') {
    return (
      <div className="w-full h-full p-5 flex flex-col font-sans bg-white text-slate-900 text-[10px]">
        {/* Paper Top Title Bar */}
        <div className="border-b border-slate-300 pb-2 mb-3">
          <div className="text-[9px] text-slate-500 font-mono">{docTitle}</div>
          <div className="text-xs font-bold text-slate-900">{page.title}</div>
        </div>

        {/* Dynamic Graphic Based on Page */}
        <div className="flex-1 flex flex-col justify-between">
          {page.pageNumber === 2 && (
            <div className="space-y-3">
              <div className="text-center font-bold text-[11px] text-slate-700">
                Figure 1 | Multimodal Needle-in-a-Haystack Recall (&gt;99.7%)
              </div>
              {/* Video Needle Heatmap Grid */}
              <div className="border border-slate-300 p-2 rounded bg-slate-50">
                <div className="flex justify-between text-[9px] font-bold text-slate-700 mb-1">
                  <span>🎥 Video Haystack (up to 10.5 Hours / 9.9M tokens)</span>
                  <span className="text-emerald-700">100% Green Recall</span>
                </div>
                <div className="h-14 w-full bg-emerald-500 rounded-sm relative overflow-hidden shadow-inner flex items-center justify-center text-white font-mono text-[10px] font-bold tracking-wider">
                  ALL SAMPLES RETRIEVED (ALPHA GO DOCUMENTARY)
                </div>
              </div>

              {/* Audio Needle Heatmap Grid */}
              <div className="border border-slate-300 p-2 rounded bg-slate-50">
                <div className="flex justify-between text-[9px] font-bold text-slate-700 mb-1">
                  <span>🎙️ Audio Haystack (up to 107 Hours / 9.7M tokens)</span>
                  <span className="text-emerald-700">100% vs Whisper 94.5%</span>
                </div>
                <div className="h-14 w-full bg-emerald-500 rounded-sm relative shadow-inner flex items-center justify-center text-white font-mono text-[10px] font-bold tracking-wider">
                  ALL SAMPLES RETRIEVED (VOXPOPULI DATASET)
                </div>
              </div>

              {/* Text Needle Heatmap Grid */}
              <div className="border border-slate-300 p-2 rounded bg-slate-50">
                <div className="flex justify-between text-[9px] font-bold text-slate-700 mb-1">
                  <span>📄 Text Haystack (up to 10M tokens / 7M words)</span>
                  <span className="text-emerald-700">99.2% Recall</span>
                </div>
                <div className="h-14 w-full bg-emerald-500 rounded-sm relative shadow-inner flex items-center justify-center text-white font-mono text-[10px] font-bold tracking-wider">
                  PAUL GRAHAM ESSAYS (1K TO 10M TOKENS)
                </div>
              </div>
            </div>
          )}

          {/* Table 1 Benchmark Win Rate or Table 10 Vision */}
          {(page.pageNumber === 3 || page.pageNumber === 24) && (
            <div className="border border-slate-300 rounded overflow-hidden shadow-sm">
              <div className="bg-slate-100 p-2 font-bold border-b border-slate-300 text-slate-800">
                {page.pageNumber === 3
                  ? 'Table 1 | Gemini 1.5 Pro Win-Rate Matrix'
                  : 'Table 10 | Core Vision Benchmarks (DocVQA & ChartQA)'}
              </div>
              <table className="w-full text-[9px] divide-y divide-slate-200">
                <thead className="bg-slate-50 font-bold text-slate-600">
                  <tr>
                    <th className="p-2 text-left">Benchmark / Capability</th>
                    <th className="p-2 text-center">Gemini 1.0 Pro</th>
                    <th className="p-2 text-center">Gemini 1.0 Ultra</th>
                    <th className="p-2 text-center bg-indigo-50 text-indigo-900 font-extrabold">
                      Gemini 1.5 Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {page.pageNumber === 3 ? (
                    <>
                      <tr>
                        <td className="p-2 font-semibold">Core Capabilities Win-Rate</td>
                        <td className="p-2 text-center">Baseline</td>
                        <td className="p-2 text-center">57.6% (19/33)</td>
                        <td className="p-2 text-center bg-indigo-50/70 font-bold text-indigo-950">
                          87.9% (29/33)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Text Tasks</td>
                        <td className="p-2 text-center">Baseline</td>
                        <td className="p-2 text-center">80% (12/15)</td>
                        <td className="p-2 text-center bg-indigo-50/70 font-bold text-indigo-950">
                          100% (15/15)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Vision Multimodal Tasks</td>
                        <td className="p-2 text-center">Baseline</td>
                        <td className="p-2 text-center">46% (6/13)</td>
                        <td className="p-2 text-center bg-indigo-50/70 font-bold text-indigo-950">
                          77% (10/13)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Audio Understanding</td>
                        <td className="p-2 text-center">Baseline</td>
                        <td className="p-2 text-center">20% (1/5)</td>
                        <td className="p-2 text-center bg-indigo-50/70 font-bold text-indigo-950">
                          60% (3/5)
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="p-2 font-semibold">ChartQA (Chart Reasoning)</td>
                        <td className="p-2 text-center">74.1%</td>
                        <td className="p-2 text-center">80.8%</td>
                        <td className="p-2 text-center bg-indigo-50/70 font-bold text-emerald-700">
                          81.3% (SOTA)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Ai2D (Science Diagrams)</td>
                        <td className="p-2 text-center">73.9%</td>
                        <td className="p-2 text-center">79.5%</td>
                        <td className="p-2 text-center bg-indigo-50/70 font-bold text-emerald-700">
                          80.3% (SOTA)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">DocVQA (Document Images)</td>
                        <td className="p-2 text-center">88.1%</td>
                        <td className="p-2 text-center">90.9%</td>
                        <td className="p-2 text-center bg-indigo-50/70 font-bold text-indigo-950">
                          86.5%
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">EgoSchema (Video QA)</td>
                        <td className="p-2 text-center">55.7%</td>
                        <td className="p-2 text-center">61.5%</td>
                        <td className="p-2 text-center bg-indigo-50/70 font-bold text-emerald-700">
                          63.2%
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* IJDAR 2009 PSNR vs OCR Curves (Pages 14-15) */}
          {(page.pageNumber === 14 || page.pageNumber === 15) && (
            <div className="space-y-4">
              <div className="border border-slate-300 p-3 rounded bg-slate-50">
                <div className="font-bold text-slate-800 text-[10px] mb-2">
                  {page.pageNumber === 14
                    ? 'Fig. 20(a) PSNR Performance vs Iterations n'
                    : 'Fig. 21(a) OCR Recognition Rate (%) vs Iterations n'}
                </div>
                {/* Simulated Curve Plotting Canvas/SVG */}
                <svg viewBox="0 0 400 180" className="w-full h-44 bg-white border border-slate-200 rounded">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="40" y2="150" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="40" y1="150" x2="380" y2="150" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="40" y1="85" x2="380" y2="85" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Y Axis Labels */}
                  <text x="10" y="25" fontSize="8" fill="#64748b">
                    {page.pageNumber === 14 ? '45 dB' : '100%'}
                  </text>
                  <text x="10" y="88" fontSize="8" fill="#64748b">
                    {page.pageNumber === 14 ? '25 dB' : '50%'}
                  </text>
                  <text x="15" y="152" fontSize="8" fill="#64748b">
                    0
                  </text>

                  {/* X Axis Labels */}
                  <text x="40" y="165" fontSize="8" fill="#64748b">
                    0
                  </text>
                  <text x="110" y="165" fontSize="8" fill="#64748b">
                    10
                  </text>
                  <text x="180" y="165" fontSize="8" fill="#64748b">
                    20
                  </text>
                  <text x="250" y="165" fontSize="8" fill="#64748b">
                    30
                  </text>
                  <text x="320" y="165" fontSize="8" fill="#64748b">
                    40
                  </text>
                  <text x="370" y="165" fontSize="8" fill="#64748b">
                    50 (n)
                  </text>

                  {page.pageNumber === 14 ? (
                    <>
                      {/* Proposed Method Line (Solid Circle) - steady ~22 dB */}
                      <path
                        d="M 40 92 L 110 94 L 180 95 L 250 96 L 320 98 L 370 102"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                      />
                      <circle cx="40" cy="92" r="3" fill="#059669" />
                      <circle cx="110" cy="94" r="3" fill="#059669" />
                      <circle cx="180" cy="95" r="3" fill="#059669" />
                      <circle cx="250" cy="96" r="3" fill="#059669" />
                      <circle cx="320" cy="98" r="3" fill="#059669" />
                      <circle cx="370" cy="102" r="3" fill="#059669" />

                      {/* Degraded Input Line (Dash-Dot Square) - drops 42 to 7 dB */}
                      <path
                        d="M 40 28 L 110 82 L 180 110 L 250 120 L 320 128 L 370 136"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />

                      {/* ICA Line (Dashed Cross) - drops rapidly */}
                      <path
                        d="M 40 40 L 110 90 L 180 124 L 250 132 L 320 138 L 370 142"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray="2 2"
                      />
                    </>
                  ) : (
                    <>
                      {/* Proposed Method OCR Line - flat ~100% until n=40 */}
                      <path
                        d="M 40 24 L 110 24 L 180 25 L 250 26 L 320 30 L 370 135"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                      />
                      <circle cx="40" cy="24" r="3" fill="#059669" />
                      <circle cx="110" cy="24" r="3" fill="#059669" />
                      <circle cx="180" cy="25" r="3" fill="#059669" />
                      <circle cx="250" cy="26" r="3" fill="#059669" />
                      <circle cx="320" cy="30" r="3" fill="#059669" />
                      <circle cx="370" cy="135" r="3" fill="#059669" />

                      {/* ICA Baseline OCR Line - collapses to 0% after n=20 */}
                      <path
                        d="M 40 26 L 110 32 L 180 85 L 215 150 L 370 150"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray="2 2"
                      />
                    </>
                  )}
                </svg>

                <div className="flex items-center justify-around mt-2 text-[9px] font-semibold">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-3 h-0.5 bg-emerald-600 inline-block" />
                    <span>Proposed Reverse Diffusion (Robust)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-600">
                    <span className="w-3 h-0.5 bg-blue-600 border-dashed inline-block" />
                    <span>ICA Method (Linear - Fails at severe bleed)</span>
                  </div>
                  {page.pageNumber === 14 && (
                    <div className="flex items-center gap-1.5 text-rose-600">
                      <span className="w-3 h-0.5 bg-rose-600 inline-block" />
                      <span>Degraded Input (Uncleaned)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* AlphaGo Video Needle Screenshot (Page 56) */}
          {page.pageNumber === 56 && (
            <div className="border border-slate-300 rounded overflow-hidden shadow-md">
              <div className="bg-slate-900 text-white p-2 font-mono text-[9px] flex justify-between items-center">
                <span>AlphaGo Documentary Frame #3151</span>
                <span className="text-amber-400 font-bold">Timestamp: 52:31</span>
              </div>
              <div className="bg-slate-950 p-4 text-center relative">
                {/* Target Secret Needle Banner Overlay */}
                <div className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded inline-block shadow-lg animate-pulse mb-3 border-2 border-amber-300">
                  "The secret word is 'needle'"
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  DeepMind Challenge Match: Lee Sedol vs AlphaGo (March 2016)
                </div>
                <div className="text-[9px] text-slate-500 mt-1 italic">
                  "This move was really creative and beautiful."
                </div>
              </div>
            </div>
          )}

          {/* Section Summary Box */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700 leading-relaxed">
            <div className="font-bold text-slate-900 mb-1">Visual Grounding Summary:</div>
            {page.summary}
          </div>
        </div>
      </div>
    );
  }

  // Equation / Formula Render Type (IJDAR Equations 1-6)
  if (page.renderType === 'equation_scan') {
    return (
      <div className="w-full h-full p-6 flex flex-col font-serif bg-slate-50/70 text-slate-900 text-[11px]">
        <div className="border-b border-slate-300 pb-2 mb-4 font-sans text-xs font-bold text-indigo-900">
          IJDAR (2009) · Mathematical Formulation & PDE Governing Equations
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-white p-4 border border-slate-300 rounded shadow-sm">
            <div className="text-[10px] font-sans font-bold text-slate-500 mb-1">
              Equation (1) — General Anisotropic Diffusion Operator:
            </div>
            <div className="text-center font-mono text-xs py-2 bg-slate-50 border border-slate-200 rounded">
              ∂u / ∂t = ∇ · (c(∇u) ∇u) =: DIFF(u, u, c)
            </div>
          </div>

          <div className="bg-white p-4 border border-slate-300 rounded shadow-sm">
            <div className="text-[10px] font-sans font-bold text-slate-500 mb-1">
              Equation (2) — Diffusion Coefficient Formulation:
            </div>
            <div className="text-center font-mono text-xs py-2 bg-slate-50 border border-slate-200 rounded">
              c = 1 / [1 + (∇u / σ)²]
            </div>
          </div>

          <div className="bg-white p-4 border border-slate-300 rounded shadow-sm">
            <div className="text-[10px] font-sans font-bold text-slate-500 mb-1">
              Equation (5) — Verso-to-Recto Seepage Coefficient:
            </div>
            <div className="text-center font-mono text-xs py-2 bg-slate-50 border border-slate-200 rounded">
              c_verso = [d / (1 + (s - u)² / σ_b²)] · [1 / (1 + s² / σ_ink²)]
            </div>
            <div className="text-[9px] font-sans text-slate-500 mt-2">
              where d is the diffusion ratio, σ_b represents paper thickness, and σ_ink = 0.2 restricts flow strictly to ink pixels.
            </div>
          </div>

          <div className="bg-white p-4 border border-slate-300 rounded shadow-sm">
            <div className="text-[10px] font-sans font-bold text-slate-500 mb-1">
              Equation (6) — Reverse Diffusion Restoration PDE:
            </div>
            <div className="text-center font-mono text-xs py-2 bg-amber-50 border border-amber-300 rounded font-bold text-amber-950">
              ∂u_r / ∂t = DIFF(u_r, u_r, c_i,recto) + DIFF(u_r, s_i,bg, c_i,bg) − DIFF(u_r, u_v, c_i,verso)
            </div>
            <div className="text-[9px] font-sans text-slate-600 mt-2">
              Note the minus sign subtracting the verso interference layer u_v from recto side u_r.
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded font-sans text-[10px] text-emerald-900">
          <span className="font-bold">Numerical Discretization:</span> 8-pixel neighborhood scheme with maximum time step bound 1 / (4 + 2√2) ≈ 0.1464 for stable convergence.
        </div>
      </div>
    );
  }

  // Generic Academic Document Page
  return (
    <div className="w-full h-full p-6 flex flex-col font-serif bg-white text-slate-900 text-xs leading-relaxed">
      <div className="border-b border-slate-300 pb-2 mb-4 font-sans flex justify-between items-center text-[10px] text-slate-500">
        <span>{docTitle}</span>
        <span className="font-mono">Page {page.pageNumber}</span>
      </div>

      <div className="font-sans font-bold text-base text-slate-900 mb-2">
        {page.title}
      </div>

      <div className="font-sans text-[10px] font-semibold text-indigo-700 uppercase tracking-wider mb-4">
        {page.section}
      </div>

      <div className="flex-1 space-y-3 overflow-hidden text-justify">
        <p className="text-slate-700">{page.summary}</p>
        <div className="p-3 bg-slate-50 border-l-4 border-indigo-600 text-[11px] font-sans my-4">
          <div className="font-bold text-slate-900 mb-1">Key Document Elements:</div>
          <ul className="list-disc pl-4 space-y-1 text-slate-700">
            {page.keyElements.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>
        <p className="text-slate-600 text-[11px]">
          {page.ocrText.substring(0, 500)}...
        </p>
      </div>

      <div className="border-t border-slate-200 pt-3 font-sans text-[10px] text-slate-400 flex justify-between">
        <span>Attributed to Identified Sources (AIS Protocol)</span>
        <span>© Published Academic Archive</span>
      </div>
    </div>
  );
};
