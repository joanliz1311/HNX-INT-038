import { SourceDocument, TestCase } from '../types';

export const DOCUMENTS_DATA: SourceDocument[] = [
  {
    id: 'doc-karunya-calendar',
    title: 'Karunya Institute Academic Calendar 2026–2027',
    subtitle: 'Version 1.1.1 — B.Tech, M.Tech/MBA, B.Sc/B.Com, B.Sc (Hons) Agriculture, M.Sc',
    category: 'Institutional Schedule & Complex Color Tables',
    totalPages: 14,
    published: '2026-06-01',
    authorsOrOrg: 'Karunya Institute of Technology and Sciences (Deemed to be University)',
    description: '14-page university calendar featuring dense multi-column date tables, internal examinations (T1, T2, T3), lab exams (L1-L5), end semester schedules (E1-E15), convocation, and student enrollment dates.',
    tags: ['PDF Tables', 'Academic Calendar', 'Multi-column Matrix', 'Date Arithmetic'],
    pages: [
      {
        pageNumber: 1,
        title: 'Cover Page: University Accreditation & Mission Pillars',
        section: 'Title Page',
        hasVisualContent: true,
        visualType: 'photo',
        renderType: 'cover',
        summary: 'Official cover displaying NAAC A++ accreditation, MoE UGC & AICTE approval, Category 1 Institution UGC GoI badge, and the 4 human problem-solving pillars: Food, Water, Health, Energy.',
        ocrText: 'Karunya INSTITUTE OF TECHNOLOGY AND SCIENCES\nDeclared as Deemed to be University under Sec.3 of the UGC Act, 1956\nMoE, UGC & AICTE Approved, NAAC A++ Accredited\nKarunya Nagar, Coimbatore - 641 114, Tamil Nadu, India.\nAcademic Calendar 2026-2027 - Version: 1.1.1\nSolving Human Problems: Food, Water, Health, Energy\nCATEGORY 1 INSTITUTION UGC GoI.',
        keyElements: ['NAAC A++ Accredited', 'Category 1 Institution', 'Pillars: Food, Water, Health, Energy', 'Version 1.1.1'],
        boundingBoxes: [
          { ymin: 4, xmin: 6, ymax: 18, xmax: 94, label: 'Institution Header & Accreditation', confidence: 0.99 },
          { ymin: 52, xmin: 6, ymax: 64, xmax: 40, label: 'Academic Calendar Title 2026-2027', confidence: 0.98 },
          { ymin: 84, xmin: 8, ymax: 96, xmax: 42, label: 'Mission: Food, Water, Health, Energy', confidence: 0.97 },
          { ymin: 84, xmin: 70, ymax: 96, xmax: 94, label: 'Category 1 Institution Badge', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 2,
        title: 'Academic Calendar - June 2026',
        section: 'Monthly Schedule: June 2026',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'First academic month schedule showing End Semester Examinations (E12-E15 for M.Tech/MBA), Ph.D. Enrollment on Friday June 19, Class commencement for Final Year UG on Monday June 22, Muharram holiday on Friday June 26, and Friday Timetable observed on Saturday June 27.',
        ocrText: 'ACADEMIC CALENDAR - JUNE 2026\nMon 1: E12 (M.Tech), 107E7 (Agri)\nTue 2: E13, Wed 3: E14, Thu 4: E15\nFri 19: Ph.D. Enrollment\nMon 22: Day 1* (*Class commencement for Final Year UG Students)\nFri 26: Muharram (Holiday)\nSat 27: Day 5 (Friday Timetable observed)\nTue 30: Day 7 (Working day)',
        keyElements: ['Ph.D. Enrollment: June 19', 'Final Year UG Commencement: June 22', 'Muharram: June 26', 'E-End Semester Examinations'],
        boundingBoxes: [
          { ymin: 58, xmin: 78, ymax: 64, xmax: 96, label: 'Ph.D. Enrollment (June 19)', confidence: 0.97 },
          { ymin: 66, xmin: 12, ymax: 72, xmax: 96, label: 'Class Commencement Final Year UG (June 22)', confidence: 0.98 },
          { ymin: 74, xmin: 30, ymax: 80, xmax: 70, label: 'Muharram Holiday (June 26)', confidence: 0.96 }
        ]
      },
      {
        pageNumber: 3,
        title: 'Academic Calendar - July 2026',
        section: 'Monthly Schedule: July 2026',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'July 2026 calendar highlighting Staff Retreat (July 1-2), Bro. Dr. D.G.S. Dhinakaran 91st Birth Anniversary (July 1), 33rd Convocation on Saturday July 4, Lateral Entry Enrollment on July 7, Class commencement day for continuing students on July 8, 1st Year UG Enrollment (July 22-24), and Class commencement day for 1st Year UG Students on Monday July 27.',
        ocrText: 'ACADEMIC CALENDAR - JULY 2026\nWed 1 - Thu 2: Staff Retreat, Bro. Dr. D.G.S. Dhinakaran 91st Birth Anniversary\nSat 4: 33rd Convocation\nTue 7: Lateral Entry Enrollment\nWed 8: Class commencement day (Day 1 for B.Tech III/II, M.Tech II, B.Sc III/II)\nWed 22 - Fri 24: # I Yr UG Enrollment\nMon 27: Class commencement day (I Year UG Students - Day 1)',
        keyElements: ['33rd Convocation: July 4', 'Lateral Entry: July 7', 'Continuing Class Commencement: July 8', '1st Year UG Enrollment: July 22-24', '1st Year UG Commencement: July 27'],
        boundingBoxes: [
          { ymin: 19, xmin: 38, ymax: 25, xmax: 62, label: '33rd Convocation (July 4)', confidence: 0.99 },
          { ymin: 27, xmin: 80, ymax: 33, xmax: 96, label: 'Lateral Entry Enrollment (July 7)', confidence: 0.98 },
          { ymin: 30, xmin: 80, ymax: 36, xmax: 96, label: 'Class Commencement (July 8)', confidence: 0.98 },
          { ymin: 65, xmin: 80, ymax: 74, xmax: 96, label: 'I Yr UG Enrollment (July 22-24)', confidence: 0.98 },
          { ymin: 76, xmin: 80, ymax: 84, xmax: 96, label: 'Class Commencement I Yr UG (July 27)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 4,
        title: 'Academic Calendar - August 2026',
        section: 'Monthly Schedule: August 2026',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'August 2026 schedule: First Internal Exam (T1) conducted from Monday Aug 10 to Friday Aug 14 for senior batches; Independence Day holiday on Saturday Aug 15; Tuesday timetable observed on Saturday Aug 22; Onam / Milad-un-Nabi holiday on Wednesday Aug 26; Wednesday timetable on Saturday Aug 29.',
        ocrText: 'ACADEMIC CALENDAR - AUGUST 2026\nMon 10 - Fri 14: 25T1, 26T1, 27T1, 28T1, 29T1 (T1 - 1st Internal Exam)\nSat 15: Independence Day (Holiday)\nSat 22: Day 47* / 35* (Tuesday Timetable observed)\nWed 26: Onam / Milad-un-Nabi (Holiday)\nSat 29: Day 52* / 40* (Wednesday Timetable observed)',
        keyElements: ['T1 - 1st Internal Exam: August 10–14', 'Independence Day: August 15', 'Onam / Milad-un-Nabi: August 26'],
        boundingBoxes: [
          { ymin: 35, xmin: 14, ymax: 48, xmax: 96, label: 'T1 - 1st Internal Exam Window (Aug 10-14)', confidence: 0.99 },
          { ymin: 49, xmin: 35, ymax: 54, xmax: 65, label: 'Independence Day (Aug 15)', confidence: 0.98 },
          { ymin: 74, xmin: 35, ymax: 79, xmax: 65, label: 'Onam / Milad-un-Nabi (Aug 26)', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 5,
        title: 'Academic Calendar - September 2026',
        section: 'Monthly Schedule: September 2026',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'September 2026 schedule: Krishna Jayanthi holiday on Sept 4; KEMT events on Sept 10, 11, 12; Vinayakar Chathurthi holiday on Sept 14; 2nd Internal Exam (T2) for senior students and 1st Internal Exam (T1) for I Year UG conducted from Sept 15 to Sept 19; Tuesday timetable on Sept 26.',
        ocrText: 'ACADEMIC CALENDAR - SEPTEMBER 2026\nFri 4: Krishna Jayanthi (Holiday)\nThu 10 - Sat 12: KEMT\nMon 14: Vinayakar Chathurthi (Holiday)\nTue 15 - Sat 19: 51T2 - 55T2 (T2 - 2nd Internal Exam senior) & 37T1 - 41T1 (T1 - 1st Internal Exam I Year UG)\nSat 19: Monday Timetable observed\nSat 26: Tuesday Timetable observed',
        keyElements: ['Krishna Jayanthi: Sept 4', 'KEMT: Sept 10–12', 'Vinayakar Chathurthi: Sept 14', 'Internal Exams: Sept 15–19 (T2 Senior & T1 1st Year)'],
        boundingBoxes: [
          { ymin: 20, xmin: 35, ymax: 25, xmax: 65, label: 'Krishna Jayanthi (Sept 4)', confidence: 0.98 },
          { ymin: 44, xmin: 35, ymax: 49, xmax: 65, label: 'Vinayakar Chathurthi (Sept 14)', confidence: 0.98 },
          { ymin: 50, xmin: 14, ymax: 62, xmax: 96, label: 'T2 & T1 Internal Exams (Sept 15-19)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 6,
        title: 'Academic Calendar - October 2026',
        section: 'Monthly Schedule: October 2026',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'October 2026 schedule: Gandhi Jayanthi holiday on Oct 2; Friday Timetable on Oct 10; Ayutha Pooja holiday on Oct 19; Vijaya Dasami holiday on Oct 20; Monday Timetable on Oct 24; 3rd Internal Exam (T3) for senior students and 2nd Internal Exam (T2) for I Year UG from Oct 26 to Oct 30.',
        ocrText: 'ACADEMIC CALENDAR - OCTOBER 2026\nFri 2: Gandhi Jayanthi (Holiday)\nMon 19: Ayutha Pooja (Holiday)\nTue 20: Vijaya Dasami (Holiday)\nMon 26 - Fri 30: 93T3-97T3 (T3 - 3rd Internal Exam Senior) & 67T2-71T2 (T2 - 2nd Internal Exam I Year UG)',
        keyElements: ['Gandhi Jayanthi: Oct 2', 'Ayutha Pooja: Oct 19', 'Vijaya Dasami: Oct 20', 'T3 & T2 Internal Exams: Oct 26–30'],
        boundingBoxes: [
          { ymin: 17, xmin: 35, ymax: 23, xmax: 65, label: 'Gandhi Jayanthi (Oct 2)', confidence: 0.99 },
          { ymin: 58, xmin: 35, ymax: 64, xmax: 65, label: 'Ayutha Pooja (Oct 19)', confidence: 0.98 },
          { ymin: 63, xmin: 35, ymax: 69, xmax: 65, label: 'Vijaya Dasami (Oct 20)', confidence: 0.98 },
          { ymin: 77, xmin: 14, ymax: 90, xmax: 96, label: 'T3 & T2 Internal Exams (Oct 26-30)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 7,
        title: 'Academic Calendar - November 2026',
        section: 'Monthly Schedule: November 2026',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'November 2026: Deepavali holiday on Sun Nov 8; Laboratory Examinations (L1–L5) for Senior batches Nov 9–13 while I Year UG writes T3 internal exam (77T3-81T3); End Semester Examinations (E1–E13) begin Mon Nov 16 through Nov 30; Wednesday timetable on Nov 28.',
        ocrText: 'ACADEMIC CALENDAR - NOVEMBER 2026\nSun 8: Deepavali (Holiday)\nMon 9 - Fri 13: L1, L2, L3, L4, L5 (Laboratory Examinations Senior) & 77T3-81T3 (T3 for I Year UG)\nMon 16 - Mon 30: E1 to E13 (End Semester Examinations Senior)\nThu 26 - Mon 30: L1 to L4 (Laboratory Examinations I Year UG)',
        keyElements: ['Deepavali: Nov 8', 'Lab Exams Senior L1-L5: Nov 9–13', 'T3 1st Year UG: Nov 9–13', 'End Sem Senior E1-E13: Nov 16–30', 'Lab Exams 1st Year L1-L4: Nov 26–30'],
        boundingBoxes: [
          { ymin: 33, xmin: 35, ymax: 38, xmax: 65, label: 'Deepavali Holiday (Nov 8)', confidence: 0.99 },
          { ymin: 39, xmin: 14, ymax: 52, xmax: 42, label: 'Lab Exams L1-L5 (Nov 9-13)', confidence: 0.98 },
          { ymin: 39, xmin: 27, ymax: 52, xmax: 32, label: 'T3 for 1st Year UG (Nov 9-13)', confidence: 0.99 },
          { ymin: 53, xmin: 14, ymax: 90, xmax: 42, label: 'End Semester Exams E1-E13 (Nov 16-30)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 8,
        title: 'Academic Calendar - December 2026',
        section: 'Monthly Schedule: December 2026',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'December 2026: Senior batches End Semester Exams conclude with E14-E15 on Dec 1-2, new semester begins Thu Dec 3; I Year UG writes End Semester Exams E1-E10 from Dec 2 to Dec 14; Annual Thanksgiving Day on Dec 16; Staff Christmas on Dec 17; Christmas holiday on Dec 25; Winter Vacation begins Dec 26 through Dec 31.',
        ocrText: 'ACADEMIC CALENDAR - DECEMBER 2026\nTue 1 - Wed 2: E14, E15 (Senior End Sem Exams conclude)\nThu 3: Day 1 (Even Semester commencement for Senior batches)\nWed 2 - Mon 14: E1 to E10 (End Semester Exams for I Year UG)\nWed 16: Annual Thanksgiving day\nThu 17: Staff Christmas\nFri 25: Christmas (Holiday)\nSat 26 - Thu 31: Winter Vacation',
        keyElements: ['Annual Thanksgiving: Dec 16', 'Staff Christmas: Dec 17', 'Christmas: Dec 25', 'Winter Vacation: Dec 26–31', 'Even Semester Commencement Senior: Dec 3'],
        boundingBoxes: [
          { ymin: 52, xmin: 80, ymax: 57, xmax: 96, label: 'Annual Thanksgiving (Dec 16)', confidence: 0.99 },
          { ymin: 56, xmin: 80, ymax: 61, xmax: 96, label: 'Staff Christmas (Dec 17)', confidence: 0.99 },
          { ymin: 75, xmin: 35, ymax: 80, xmax: 65, label: 'Christmas Day (Dec 25)', confidence: 0.99 },
          { ymin: 80, xmin: 26, ymax: 92, xmax: 32, label: 'Winter Vacation (Dec 26-31)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 9,
        title: 'Academic Calendar - January 2027',
        section: 'Monthly Schedule: January 2027',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'January 2027 schedule: New Year holiday Jan 1; Staff Retreat on Mon Jan 4; Classes resume Tue Jan 5; Pongal festival holidays: Pongal Jan 15, Thiruvalluvar Day Jan 16, Uzhavar Thirunal Jan 17; Thai Poosam holiday on Sat Jan 23; Republic Day holiday on Tue Jan 26; Tuesday timetable on Jan 30.',
        ocrText: 'ACADEMIC CALENDAR - JANUARY 2027\nFri 1: New Year (Holiday)\nMon 4: Staff Retreat\nTue 5: Classes resume (Day 15/6)\nFri 15: Pongal (Holiday)\nSat 16: Thiruvalluvar Day (Holiday)\nSun 17: Uzhavar Thirunal (Holiday)\nSat 23: Thai Poosam (Holiday)\nTue 26: Republic Day (Holiday)\nSat 30: Tuesday Timetable observed',
        keyElements: ['New Year: Jan 1', 'Staff Retreat: Jan 4', 'Pongal Holidays: Jan 15–17', 'Thai Poosam: Jan 23', 'Republic Day: Jan 26'],
        boundingBoxes: [
          { ymin: 15, xmin: 35, ymax: 20, xmax: 65, label: 'New Year (Jan 1)', confidence: 0.99 },
          { ymin: 22, xmin: 35, ymax: 27, xmax: 65, label: 'Staff Retreat (Jan 4)', confidence: 0.98 },
          { ymin: 48, xmin: 35, ymax: 58, xmax: 65, label: 'Pongal / Thiruvalluvar / Uzhavar Thirunal (Jan 15-17)', confidence: 0.99 },
          { ymin: 69, xmin: 35, ymax: 74, xmax: 65, label: 'Thai Poosam (Jan 23)', confidence: 0.98 },
          { ymin: 77, xmin: 35, ymax: 82, xmax: 65, label: 'Republic Day (Jan 26)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 10,
        title: 'Academic Calendar - February 2027',
        section: 'Monthly Schedule: February 2027',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'February 2027 schedule: T1 - 1st Internal Examination of Even Semester conducted from Monday Feb 1 to Friday Feb 5 across all streams; Friday Timetable observed on Saturday Feb 27.',
        ocrText: 'ACADEMIC CALENDAR - FEBRUARY 2027\nMon 1 - Fri 5: 34T1 - 38T1 (T1 - 1st Internal Exam)\nWed 10: Working day 41/32\nSat 13: Wednesday Timetable observed\nSat 27: Friday Timetable observed',
        keyElements: ['T1 - 1st Internal Exam Even Sem: February 1–5'],
        boundingBoxes: [
          { ymin: 14, xmin: 14, ymax: 27, xmax: 96, label: 'T1 - 1st Internal Exam Window (Feb 1-5)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 11,
        title: 'Academic Calendar - March 2027',
        section: 'Monthly Schedule: March 2027',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'March 2027: T2 - 2nd Internal Exam from Mon March 8 to Sat March 13 (except Wed March 10 which is Ramzan holiday); Mindkraft technical fest on Fri March 19 & Sat March 20; Holy Week holidays: Maundy Thursday on March 25, Good Friday on March 26, Easter Sunday on March 28.',
        ocrText: 'ACADEMIC CALENDAR - MARCH 2027\nMon 8 - Sat 13: 61T2 - 65T2 (T2 - 2nd Internal Exam)\nWed 10: Ramzan (Holiday)\nFri 19 - Sat 20: Mindkraft (Technical Fest)\nThu 25: Maundy Thursday (Holiday)\nFri 26: Good Friday (Holiday)\nSun 28: Easter (Holiday)',
        keyElements: ['T2 Internal Exam: March 8–13', 'Ramzan: March 10', 'Mindkraft Tech Fest: March 19–20', 'Easter Holidays: March 25, 26, 28'],
        boundingBoxes: [
          { ymin: 31, xmin: 14, ymax: 45, xmax: 96, label: 'T2 - 2nd Internal Exam (March 8-13)', confidence: 0.99 },
          { ymin: 36, xmin: 35, ymax: 41, xmax: 65, label: 'Ramzan Holiday (March 10)', confidence: 0.98 },
          { ymin: 58, xmin: 80, ymax: 65, xmax: 96, label: 'Mindkraft Tech Fest (March 19-20)', confidence: 0.99 },
          { ymin: 71, xmin: 35, ymax: 85, xmax: 65, label: 'Maundy Thursday, Good Friday, Easter (March 25, 26, 28)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 12,
        title: 'Academic Calendar - April 2027',
        section: 'Monthly Schedule: April 2027',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'April 2027 schedule: T3 - 3rd Internal Exam from Mon April 5 to Sat April 10 (except Wed April 7 Telugu New Year); Tamil New Year / Dr. B.R. Ambedkar Birthday holiday on Wed April 14; Mahaveer Jayanthi holiday on Mon April 19; Laboratory Exams L1-L5 from April 21 to April 26; End Semester Exams E1-E4 begin Tue April 27 to April 30.',
        ocrText: 'ACADEMIC CALENDAR - APRIL 2027\nMon 5 - Sat 10: 80T3 - 84T3 (T3 - 3rd Internal Exam)\nWed 7: Telugu New Year (Holiday)\nWed 14: Tamil New Year / Dr. B.R. Ambedkar\'s Birthday (Holiday)\nMon 19: Mahaveer Jayanthi (Holiday)\nWed 21 - Mon 26: L1 to L5 (Laboratory Examinations)\nTue 27 - Fri 30: E1 to E4 (End Semester Examinations)',
        keyElements: ['T3 - 3rd Internal Exam: April 5–10', 'Telugu New Year: April 7', 'Tamil New Year / Ambedkar Jayanthi: April 14', 'Mahaveer Jayanthi: April 19', 'Lab Exams L1-L5: April 21–26', 'End Sem Exams E1-E4: April 27–30'],
        boundingBoxes: [
          { ymin: 24, xmin: 14, ymax: 38, xmax: 96, label: 'T3 - 3rd Internal Exam (April 5-10)', confidence: 0.99 },
          { ymin: 29, xmin: 35, ymax: 34, xmax: 65, label: 'Telugu New Year (April 7)', confidence: 0.98 },
          { ymin: 47, xmin: 25, ymax: 52, xmax: 75, label: 'Tamil New Year / Dr Ambedkar Birthday (April 14)', confidence: 0.99 },
          { ymin: 58, xmin: 35, ymax: 63, xmax: 65, label: 'Mahaveer Jayanthi (April 19)', confidence: 0.98 },
          { ymin: 64, xmin: 14, ymax: 76, xmax: 42, label: 'Lab Examinations L1-L5 (April 21-26)', confidence: 0.99 },
          { ymin: 77, xmin: 14, ymax: 88, xmax: 42, label: 'End Semester Examinations E1-E4 (April 27-30)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 13,
        title: 'Academic Calendar - May 2027',
        section: 'Monthly Schedule: May 2027',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'May 2027 schedule: May Day holiday on Sat May 1; Senior End Sem Exams E5-E15 continue from Mon May 3 to Sat May 15; I Year UG Laboratory Exams L1-L5 from May 3 to May 7; Bakrid holiday on Mon May 17; I Year UG End Semester Exams E7-E15 from May 18 to May 27.',
        ocrText: 'ACADEMIC CALENDAR - MAY 2027\nSat 1: May Day (Holiday)\nMon 3 - Sat 15: E5 to E15 (End Semester Examinations Senior)\nMon 3 - Fri 7: L1 to L5 (Laboratory Examinations I Year UG)\nMon 17: Bakrid (Holiday)\nTue 18 - Thu 27: E7 to E15 (End Semester Examinations I Year UG)',
        keyElements: ['May Day: May 1', 'End Sem Senior E5-E15: May 3–15', 'Lab Exams I Year L1-L5: May 3–7', 'Bakrid: May 17', 'End Sem I Year E7-E15: May 18–27'],
        boundingBoxes: [
          { ymin: 14, xmin: 35, ymax: 19, xmax: 65, label: 'May Day (May 1)', confidence: 0.99 },
          { ymin: 20, xmin: 14, ymax: 50, xmax: 42, label: 'End Sem Senior E5-E15 (May 3-15)', confidence: 0.99 },
          { ymin: 52, xmin: 35, ymax: 57, xmax: 65, label: 'Bakrid Holiday (May 17)', confidence: 0.99 },
          { ymin: 58, xmin: 26, ymax: 80, xmax: 32, label: 'End Sem I Year E7-E15 (May 18-27)', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 14,
        title: 'Academic Calendar - June 2027',
        section: 'Monthly Schedule: June 2027',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'calendar_grid',
        summary: 'Closing month of the 2026-2027 academic year: Agriculture M.Sc End Semester Exams 109E9 and 110E10 on June 1-2; Ph.D. Enrollment on Friday June 11; Muharram holiday on Tuesday June 15.',
        ocrText: 'ACADEMIC CALENDAR - JUNE 2027\nTue 1 - Wed 2: 109E9, 110E10 (End Semester Examinations Agri)\nFri 11: Ph.D. Enrollment\nTue 15: Muharram (Holiday)',
        keyElements: ['Ph.D. Enrollment: June 11', 'Muharram: June 15'],
        boundingBoxes: [
          { ymin: 40, xmin: 78, ymax: 46, xmax: 96, label: 'Ph.D. Enrollment (June 11)', confidence: 0.98 },
          { ymin: 47, xmin: 35, ymax: 53, xmax: 65, label: 'Muharram (June 15)', confidence: 0.98 }
        ]
      }
    ]
  },
  {
    id: 'doc-gemini-1-5-report',
    title: 'Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens',
    subtitle: 'Google DeepMind Technical Report (2024) — 77 Pages',
    category: 'Vision-Language AI Research & Multi-Modal Evaluation Benchmarks',
    totalPages: 77,
    published: '2024-02-15',
    authorsOrOrg: 'Gemini Team, Google DeepMind (Machel Reid, Nikolay Savinov, Demis Hassabis, Oriol Vinyals, Jeffrey Dean)',
    description: 'Landmark foundational research paper detailing Gemini 1.5 Pro MoE architecture, 10M token context window, multimodal needle-in-a-haystack (text, video, audio), in-context language learning for Kalamang (MTOB), and benchmark comparisons with Claude 2.1 and GPT-4 Turbo.',
    tags: ['Vision-Language Models', 'Needle-in-a-Haystack', 'Video & Audio RAG', 'Benchmark Tables', 'Chart Reasoning'],
    pages: [
      {
        pageNumber: 1,
        title: 'Title, Abstract & Introduction',
        section: '1. Introduction',
        hasVisualContent: false,
        renderType: 'generic',
        summary: 'Introduces Gemini 1.5 Pro, a compute-efficient multimodal MoE model with up to 10M token context window, near-perfect recall (>99%), Kalamang language translation learning from a single grammar book, and matching/surpassing Gemini 1.0 Ultra.',
        ocrText: 'Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context.\nGemini 1.5 Pro achieves near-perfect recall on long-context retrieval tasks across modalities, improves SOTA in long-document QA, long-video QA, and long-context ASR. Near-perfect retrieval (>99%) up to at least 10M tokens. Translates English to Kalamang, an endangered Papuan language with <200 speakers.',
        keyElements: ['10M tokens context window', 'MoE architecture', 'Kalamang translation', '>99% retrieval recall'],
        boundingBoxes: [
          { ymin: 7, xmin: 12, ymax: 18, xmax: 88, label: 'Paper Title: Gemini 1.5', confidence: 0.99 },
          { ymin: 22, xmin: 12, ymax: 42, xmax: 88, label: 'Abstract: Key Discoveries', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 2,
        title: 'Figure 1: Multimodal Needle-in-a-Haystack Visual Heatmaps',
        section: 'Figure 1 & Synthetic Needle Evaluation',
        hasVisualContent: true,
        visualType: 'plot',
        renderType: 'chart_plot',
        summary: 'Key multi-modal heatmap figure showing near-perfect needle recall (>99.7%) across context lengths up to 1M and 10M tokens across all 3 modalities: Text (up to 10M tokens / 7M words), Audio (up to 107 hours / 9.7M tokens), and Video (up to 10.5 hours / 9.9M tokens). The x-axis is context length, y-axis is depth percentage (0-100%). Green = success, Red = failure.',
        ocrText: 'Figure 1 | Gemini 1.5 Pro achieves near-perfect "needle" recall (>99.7%) up to 1M tokens of "haystack" in all modalities, i.e., text, video and audio. Extends to 10M tokens text (7M words), 9.7M tokens audio (107 hours), 9.9M tokens video (10.5 hours). X-axis: context window. Y-axis: depth percentage. Green = success, red = unsuccessful.',
        keyElements: ['Text Haystack: 10M tokens (7M words)', 'Audio Haystack: 9.7M tokens (107 hours)', 'Video Haystack: 9.9M tokens (10.5 hours)', 'Recall >99.7%'],
        boundingBoxes: [
          { ymin: 11, xmin: 12, ymax: 21, xmax: 88, label: 'Video Haystack Heatmap (10 hours / 9.9M tokens)', confidence: 0.99 },
          { ymin: 22, xmin: 12, ymax: 32, xmax: 88, label: 'Audio Haystack Heatmap (107 hours / 9.7M tokens)', confidence: 0.99 },
          { ymin: 33, xmin: 12, ymax: 44, xmax: 88, label: 'Text Haystack Heatmap (10M tokens)', confidence: 0.99 },
          { ymin: 45, xmin: 12, ymax: 56, xmax: 88, label: 'Figure 1 Caption & Multi-Modal Specs', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 3,
        title: 'Table 1: Benchmark Win-Rates Against Gemini 1.0 Pro & Ultra',
        section: 'Table 1 & Model Architecture',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'chart_plot',
        summary: 'Table 1 comparing Gemini 1.5 Pro to 1.0 Pro and 1.0 Ultra. Overall Core Capabilities: 87.9% win-rate vs 1.0 Pro (29/33 benchmarks), 57.6% win-rate vs 1.0 Ultra (19/33 benchmarks). Text: 100% win-rate vs Pro (15/15), 80% vs Ultra (12/15). Vision: 77% vs Pro (10/13), 46% vs Ultra (6/13). Audio: 60% vs Pro (3/5), 20% vs Ultra (1/5).',
        ocrText: 'Table 1 | Gemini 1.5 Pro compared to Gemini 1.0 family.\nCore Capabilities Win-rate: Relative to 1.0 Pro: 87.9% (29/33), Relative to 1.0 Ultra: 57.6% (19/33).\nText Win-rate: 100% (15/15) vs 1.0 Pro, 80% (12/15) vs 1.0 Ultra.\nVision Win-rate: 77% (10/13) vs 1.0 Pro, 46% (6/13) vs 1.0 Ultra.\nAudio Win-rate: 60% (3/5) vs 1.0 Pro, 20% (1/5) vs 1.0 Ultra.',
        keyElements: ['Win-rate vs 1.0 Pro: 87.9%', 'Win-rate vs 1.0 Ultra: 57.6%', 'Text win-rate vs Pro: 100%', 'Vision win-rate vs Pro: 77%'],
        boundingBoxes: [
          { ymin: 7, xmin: 18, ymax: 28, xmax: 82, label: 'Table 1: Head-to-Head Win-Rate Matrix', confidence: 0.99 },
          { ymin: 52, xmin: 12, ymax: 85, xmax: 88, label: 'Section 2: Sparse MoE Transformer Architecture', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 8,
        title: 'Figure 6: Cumulative Negative Log-Likelihood Power Law Fit',
        section: '4.2.1.1 Perplexity over Long Sequences',
        hasVisualContent: true,
        visualType: 'chart',
        renderType: 'chart_plot',
        summary: 'Figure 6 showing negative log-likelihood (NLL) decreasing monotonically as a function of token position for long documents (up to 1M tokens) and code (up to 10M tokens). Fits power law L(x) = αx^β + γ (r^2 = 0.998). Gemini 1.0 Pro flattens out at 32K tokens, while 1.5 Pro continues improving predictions out to millions of tokens.',
        ocrText: 'Figure 6 | Cumulative average negative log-likelihood (NLL) as a function of token position in long documents and code data. Lower value demonstrates better prediction. Gemini 1.5 Pro shows improved predictions up to 1M tokens for long-documents and 10M tokens for code, whereas Gemini 1.0 Pro improves up to only 32K tokens. Power law fit: L(x) = ax^β + γ (r^2 = 0.998).',
        keyElements: ['Power law fit r^2 = 0.998', '1M tokens for documents', '10M tokens for code', '1.0 Pro flattens at 32K'],
        boundingBoxes: [
          { ymin: 8, xmin: 14, ymax: 27, xmax: 86, label: 'Figure 6: Cumulative NLL Log-Loss Curves', confidence: 0.99 },
          { ymin: 28, xmin: 12, ymax: 35, xmax: 88, label: 'Figure 6 Caption: Power-Law Scaling', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 9,
        title: 'Figure 7: Text Needle-in-a-Haystack (Gemini 1.5 Pro vs GPT-4 Turbo)',
        section: '4.2.1.2 Text Haystack',
        hasVisualContent: true,
        visualType: 'plot',
        renderType: 'chart_plot',
        summary: 'Figure 7 comparing Gemini 1.5 Pro with GPT-4 Turbo on text needle-in-a-haystack using Paul Graham essays. Gemini 1.5 Pro achieves 100% recall up to 530k tokens, >99.7% recall up to 1M tokens, and 99.2% accuracy up to 10M tokens. GPT-4 Turbo is limited to 128k tokens.',
        ocrText: 'Figure 7 | Text Haystack. Compares Gemini 1.5 Pro with GPT-4 Turbo. Gemini 1.5 Pro achieves 100% recall up to 530k tokens and >99.7% recall up to 1M tokens. Extends to 10M tokens with 99.2% accuracy. GPT-4 Turbo supported context length is limited to 128k tokens.',
        keyElements: ['100% recall up to 530k tokens', '>99.7% recall up to 1M tokens', '99.2% accuracy at 10M tokens', 'GPT-4 Turbo limit: 128k tokens'],
        boundingBoxes: [
          { ymin: 8, xmin: 14, ymax: 33, xmax: 86, label: 'Figure 7: Text Haystack Visual Comparison Grid', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 10,
        title: 'Figure 8: Video Needle-in-a-Haystack (10.5 Hours AlphaGo Documentary)',
        section: '4.2.1.3 Video Haystack',
        hasVisualContent: true,
        visualType: 'plot',
        renderType: 'chart_plot',
        summary: 'Figure 8 evaluating video needle retrieval across up to 10.5 hours of video (37,994 frames sampled at 1 fps, or 9.9M tokens) formed by concatenating 7 copies of the AlphaGo documentary (2017). Needle text "The secret word is \'needle\'" is embedded in a random frame. Gemini 1.5 Pro achieves perfect green retrieval across all depths up to 10.5 hours. GPT-4V only supports ~3 minutes.',
        ocrText: 'Figure 8 | Compares Gemini 1.5 Pro with GPT-4V for the video needle-in-a-haystack task up to 10.5 hours of video. Needle text: "The secret word is \\"needle\\"" on single randomly sampled frame in 10.5 hour video (AlphaGo documentary, 37994 frames, 9.9M tokens). Gemini 1.5 Pro achieves perfect retrieval across all depths. GPT-4V API supports video lengths only up to ~3 minutes.',
        keyElements: ['AlphaGo documentary (7 concatenated copies)', '37,994 frames at 1 fps', '10.5 hours / 9.9M tokens', 'Needle: "The secret word is \'needle\'"', 'GPT-4V limit: 3 minutes'],
        boundingBoxes: [
          { ymin: 8, xmin: 14, ymax: 33, xmax: 86, label: 'Figure 8: Video Haystack Depth Matrix', confidence: 0.99 },
          { ymin: 50, xmin: 12, ymax: 75, xmax: 88, label: 'Section 4.2.1.3 Methodology Details', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 11,
        title: 'Figure 9: Audio Needle-in-a-Haystack (VoxPopuli 107 Hours)',
        section: '4.2.1.4 Audio Haystack',
        hasVisualContent: true,
        visualType: 'plot',
        renderType: 'chart_plot',
        summary: 'Figure 9 comparing Gemini 1.5 Pro with Whisper + GPT-4 Turbo across audio signals from 12 minutes to 107 hours (9.9M tokens) using the VoxPopuli dataset. Short audio needle says "the secret keyword is needle". Gemini 1.5 Pro achieves 100% accuracy. Whisper + GPT-4 Turbo achieves 94.5% overall accuracy with noticeable red failure clusters at long contexts.',
        ocrText: 'Figure 9 | Audio Haystack. Compares Gemini 1.5 Pro and Whisper + GPT-4 Turbo up to 107 hours (9.9M tokens) VoxPopuli dataset. Gemini 1.5 Pro achieves 100% accuracy. Whisper combined with GPT-4 Turbo achieves around 94.5% accuracy.',
        keyElements: ['VoxPopuli dataset up to 107 hours', 'Gemini 1.5 Pro: 100% accuracy', 'Whisper + GPT-4 Turbo: 94.5% accuracy'],
        boundingBoxes: [
          { ymin: 8, xmin: 14, ymax: 33, xmax: 86, label: 'Figure 9: Audio Haystack Depth Grid', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 13,
        title: 'Figure 11: Multi-round Co-reference Resolution (MRCR)',
        section: 'Figure 11 & MRCR Task',
        hasVisualContent: true,
        visualType: 'chart',
        renderType: 'chart_plot',
        summary: 'Figure 11 showing cumulative average string similarity score over 2000 MRCR instances across context lengths from 2K to 1M tokens. Gemini 1.5 Pro overtakes GPT-4 Turbo at 8K tokens and maintains ~80% score at 1M tokens. GPT-4 Turbo falls off to 60% at 128K. Claude 2.1 drops to ~20% at 128K due to refusal/hallucination.',
        ocrText: 'Figure 11 | Cumulative average string similarity score as a function of context length over 2000 instances of the MRCR task. Gemini 1.5 Pro overtakes GPT-4 Turbo at around 8K tokens and achieves ~80% at 1M tokens. GPT-4 Turbo falls steadily to ~60% at 128K. Claude 2.1 scores around 20% at 128K.',
        keyElements: ['MRCR at 1M tokens: ~80% score', 'GPT-4 Turbo: 60% at 128K', 'Claude 2.1: 20% at 128K'],
        boundingBoxes: [
          { ymin: 8, xmin: 24, ymax: 32, xmax: 76, label: 'Figure 11: MRCR Score vs Context Length Curve', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 15,
        title: 'Table 2: Kalamang Language Translation Benchmark (MTOB)',
        section: 'Table 2: Machine Translation from One Book',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'chart_plot',
        summary: 'Table 2 quantitative results on Kalamang (an endangered language with <200 speakers) translation on MTOB. Human evaluation (0 to 6 scale): Gemini 1.5 Pro (full book) achieves 4.36 (BLEURT 65.0) on kgv->eng and 5.52 (chrF 56.9) on eng->kgv, approaching human language learner scores (5.52 and 5.60). In 0-shot without book, all models get near 0 (0.24 and 0.08).',
        ocrText: 'Table 2 | Quantitative results for Kalamang<->English translation on MTOB.\nGemini 1.5 Pro (full book): kgv->eng human eval 4.36 (BLEURT 65.0); eng->kgv human eval 5.52 (chrF 56.9).\nHuman language learner: kgv->eng 5.52 (BLEURT 70.3); eng->kgv 5.60 (chrF 57.0).\nGPT-4 Turbo (half book): kgv->eng 2.38; eng->kgv 4.02.\nClaude 2.1 (half book): kgv->eng 3.68; eng->kgv 4.54.',
        keyElements: ['kgv->eng: 4.36 vs 5.52 human', 'eng->kgv: 5.52 vs 5.60 human', 'MTOB benchmark (<200 speakers)'],
        boundingBoxes: [
          { ymin: 7, xmin: 14, ymax: 30, xmax: 86, label: 'Table 2: MTOB Human Evaluation Scores', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 17,
        title: 'Table 4: Long-Document QA on Les Misérables (710K Tokens)',
        section: 'Table 4: Attributable to Identified Sources (AIS)',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'chart_plot',
        summary: 'Table 4 evaluating question answering over the full 1,462 page book "Les Misérables" (710k tokens). Gemini 1.5 Pro with full 710k book achieves 91.4 AutoAIS and 80.0 ±1.0 Human AIS score (with 5.8 sentences per answer), surpassing 4k retrieved RAG (84.8 AutoAIS / 78.2 Human AIS). Claude 2.1 with 4k retrieval achieves only 29.1 AutoAIS / 42.2 Human AIS.',
        ocrText: 'Table 4 | Evaluating the ability to answer questions about large collections of text.\nGemini 1.5 Pro (710k book): AutoAIS 91.4, Human Evaluation 80.0 ±1.0, Num Sentences: 5.8.\nGemini 1.5 Pro (4k retrieved): AutoAIS 84.8, Human Evaluation 78.2 ±1.4.\nClaude 2.1 (4k retrieved): AutoAIS 29.1, Human Evaluation 42.2 ±3.0.\nGemini 1.0 Pro (4k retrieved): AutoAIS 75.3, Human Evaluation 72.1 ±2.3.',
        keyElements: ['Full 710k book: AutoAIS 91.4 vs 84.8 4k RAG', 'Claude 2.1 4k RAG: 29.1 AutoAIS', 'Les Misérables 1,462 pages'],
        boundingBoxes: [
          { ymin: 7, xmin: 14, ymax: 27, xmax: 86, label: 'Table 4: AutoAIS & Human Evaluation Scores', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 21,
        title: 'Table 8: Core Academic & Reasoning Benchmarks',
        section: 'Table 8: Quantitative Core Evaluations',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'chart_plot',
        summary: 'Comprehensive Table 8 comparing Gemini 1.5 Pro, 1.0 Ultra, and 1.0 Pro on standard academic benchmarks: GSM8K: 91.7% (1.5 Pro) vs 88.9% (1.0 Ultra); MATH: 58.5% (4-shot) / 59.4% (7-shot) vs 53.2% (1.0 Ultra); PhysicsFinals: 60.7% vs 41.0%; AMC 2022-23: 37.2% vs 30%; Natural2Code: 77.7% vs 74.9%; MGSM multilingual math: 88.73% vs 78.95%.',
        ocrText: 'Table 8 | Evaluation results of Gemini 1.5 Pro and Gemini 1.0 models.\nGSM8K (Grade school math): 91.7% (1.5 Pro) vs 88.9% (1.0 Ultra) vs 77.9% (1.0 Pro)\nMATH (Competition math): 58.5% (4-shot) vs 53.2% (1.0 Ultra) vs 32.6% (1.0 Pro)\nPhysicsFinals (Undergraduate): 60.7% (1.5 Pro) vs 41.0% (1.0 Ultra)\nAMC 2022-23: 37.2% vs 30.0%\nNatural2Code: 77.7% vs 74.9%\nMGSM multilingual math: 88.73% vs 78.95%\nHellaswag: 92.5% vs 87.8%',
        keyElements: ['GSM8K: 91.7%', 'MATH: 58.5%', 'PhysicsFinals: 60.7%', 'Natural2Code: 77.7%', 'MGSM: 88.73%'],
        boundingBoxes: [
          { ymin: 8, xmin: 14, ymax: 80, xmax: 86, label: 'Table 8: Core Benchmark Matrix', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 24,
        title: 'Table 10: Multimodal Image & Video Understanding Benchmarks',
        section: 'Table 10: Core Vision Evaluations',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'chart_plot',
        summary: 'Table 10 reporting core vision and multimodal benchmarks: ChartQA: 81.3% (Gemini 1.5 Pro) vs 80.8% (1.0 Ultra) vs 74.1% (1.0 Pro); Ai2D science diagrams: 80.3% vs 79.5%; MMMU college-level: 58.5% vs 59.4%; MathVista: 52.1% vs 53.0%; DocVQA: 86.5% vs 90.9%; InfographicVQA: 72.7% vs 80.3%; ActivityNet-QA: 56.7% vs 52.2%; EgoSchema: 63.2% vs 61.5%.',
        ocrText: 'Table 10 | Comparison of Gemini 1.5 Pro with Gemini 1.0 Pro and Ultra on image and video understanding.\nChartQA (test): 81.3% (1.5 Pro) vs 80.8% (1.0 Ultra) vs 74.1% (1.0 Pro)\nAi2D (test science diagrams): 80.3% vs 79.5% vs 73.9%\nDocVQA (test): 86.5% vs 90.9% vs 88.1%\nInfographicVQA: 72.7% vs 80.3% vs 75.2%\nActivityNet-QA: 56.7% vs 52.2%\nEgoSchema: 63.2% vs 61.5%',
        keyElements: ['ChartQA: 81.3% (SOTA)', 'Ai2D: 80.3%', 'DocVQA: 86.5%', 'EgoSchema: 63.2%'],
        boundingBoxes: [
          { ymin: 8, xmin: 14, ymax: 82, xmax: 86, label: 'Table 10: Vision & Video Benchmark Matrix', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 56,
        title: 'Figure 15 & Table 18: Video Needle Frame & 1H-VideoQA Hard Examples',
        section: 'Appendix 9.5: Video Needle & Hard Examples',
        hasVisualContent: true,
        visualType: 'plot',
        renderType: 'chart_plot',
        summary: 'Figure 15 shows the exact video needle frame embedded at timestamp 52:31 (frame 3151) of the AlphaGo documentary with the banner text "The secret word is \'needle\'". Below it, Table 18 lists hard examples in 1H-VideoQA that neither GPT-4V nor Gemini 1.5 Pro got correct, including question on how many lions let out (answer: 1, timestamp 1:05:25), hotel room temperature (answer: 21, timestamp 4:10), and word on green trash cans (Mizuda, timestamp 39:32).',
        ocrText: 'Figure 15 | An example of the needle used in the video needle-in-a-haystack task, embedded at timestamp 52:31, or frame 3151, of the AlphaGo documentary.\nTable 18 | Questions in 1H-VideoQA that neither Gemini 1.5 Pro nor GPT-4V got correct.\nLions let out: 1 (timestamp 1:05:25 to 1:05:55)\nHotel room temperature: 21 (timestamp 4:10)\nWord written on green trash cans: Mizuda (timestamp 39:32)',
        keyElements: ['Timestamp 52:31 / frame 3151', 'Needle: "The secret word is \'needle\'"', 'Hard questions: Lions (1), Hotel Temp (21), Trash Can (Mizuda)'],
        boundingBoxes: [
          { ymin: 7, xmin: 14, ymax: 38, xmax: 86, label: 'Figure 15: Embedded Needle Frame 3151', confidence: 0.99 },
          { ymin: 44, xmin: 14, ymax: 82, xmax: 86, label: 'Table 18: 1H-VideoQA Hard Failure Cases', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 58,
        title: 'Table 19: Intermediate Algebra with In-Context SymPy / SciPy Prompting',
        section: '9.6. Generic Long Context Math Prompting',
        hasVisualContent: true,
        visualType: 'table',
        renderType: 'chart_plot',
        summary: 'Table 19 showing Intermediate Algebra (Levels 4 & 5 in Hendrycks MATH). Gemini 1.5 Pro with generic SymPy/SciPy prompt (730,000 tokens of official library examples) jumps from baseline 18.6% to 25.8% solve rate, surpassing GPT-4 (12.5%) and GPT-4-turbo (20.6%). Accompanied by Python code for recursive GitHub repository concatenation.',
        ocrText: 'Table 19 | Performance of different models on Intermediate Algebra (Levels 4 & 5) in Hendrycks\' MATH dataset.\nGPT-4: 12.5%\nGemini 1.5 Pro baseline: 18.6%\nGPT-4-turbo: 20.6%\nGemini 1.5 Pro (0-shot Python): 21.4%\nGemini 1.5 Pro (Minerva Python prompt): 22.0%\nGemini 1.5 Pro (with generic SymPy/SciPy prompt, 730k tokens): 25.8%',
        keyElements: ['Generic SymPy/SciPy prompt: 25.8%', 'Baseline: 18.6%', 'GPT-4 Turbo: 20.6%', '730,000 tokens of in-context code'],
        boundingBoxes: [
          { ymin: 7, xmin: 14, ymax: 24, xmax: 86, label: 'Table 19: Intermediate Algebra Solve Rates', confidence: 0.99 },
          { ymin: 27, xmin: 14, ymax: 88, xmax: 86, label: 'Section 9.6.6 Python Data Pipeline Code', confidence: 0.98 }
        ]
      }
    ]
  },
  {
    id: 'doc-low-quality-ijdar-2009',
    title: 'Low Quality Document Image Modeling and Enhancement',
    subtitle: 'IJDAR (2009) 11:183–201 — Reza Farrahi Moghaddam & Mohamed Cheriet',
    category: 'Physics-Based Degradation & Document Image Restoration',
    totalPages: 19,
    published: '2009-02-28',
    authorsOrOrg: 'Reza Farrahi Moghaddam, Mohamed Cheriet (Synchromedia Laboratory, École de Technologie Supérieure, Montréal)',
    description: 'Seminal paper proposing a virtual diffusion partial differential equation (PDE) model for physical document degradation (bleed-through, shadow-through, aging) and reverse-diffusion restoration evaluated against Independent Component Analysis (ICA) with PSNR and FineReader OCR.',
    tags: ['Scanned Documents', 'Bleed-Through', 'PDE Diffusion', 'PSNR & OCR Curves', 'Nonlinear Modeling'],
    pages: [
      {
        pageNumber: 1,
        title: 'Title, Abstract & Introduction to Document Defects',
        section: '1. Introduction',
        hasVisualContent: false,
        renderType: 'generic',
        summary: 'Paper addresses physical degradation such as aging, ink seepage, bleed-through, and shadow-through. Formulates degradation as virtual diffusion processes and proposes reverse diffusion restoration for double-sided document images.',
        ocrText: 'Low quality document image modeling and enhancement.\nReza Farrahi Moghaddam, Mohamed Cheriet. IJDAR (2009) 11:183-201.\nIn order to tackle problems such as shadow-through and bleed-through, a novel defect model is developed which generates physically damaged document images using virtual diffusion processes. A restoration method is proposed based on reverse diffusion. Defects arise from printing-imaging processes and physical phenomena (cellulose degradation, ink seepage).',
        keyElements: ['Anisotropic diffusion', 'Bleed-through & shadow-through', 'Reverse diffusion restoration', 'Physical vs process defects'],
        boundingBoxes: [
          { ymin: 6, xmin: 8, ymax: 18, xmax: 92, label: 'Paper Title & Authors', confidence: 0.99 },
          { ymin: 24, xmin: 8, ymax: 42, xmax: 48, label: 'Abstract: Physical Degradation Framework', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 3,
        title: 'Section 2: Anisotropic Diffusion Operator & Equation (1)-(2)',
        section: '2. Diffusion-based Modeling of Degradation',
        hasVisualContent: true,
        visualType: 'formula',
        renderType: 'equation_scan',
        summary: 'Defines general diffusion operator DIFF(u, s, c). Formulates Anisotropic Diffusion Method (ADM) in Equation (1): ∂u/∂t = ∇·(c(∇u)∇u) =: DIFF(u, u, c). Equation (2) defines the diffusion coefficient: c = 1 / (1 + (∇u/σ)^2). Explains scale factor σscale based on noise variation.',
        ocrText: '2 Diffusion-based modeling of degradation in very old documents\nDIFF(u, s, c) represents a diffusion process from source s to target u with coefficient c.\nEq. (1): ∂u/∂t = ∇·(c(∇u)∇u) =: DIFF(u, u, c)\nEq. (2): c = 1 / (1 + (∇u/σ)^2)\nValue of σ is set at every time step based on estimated noise variation with scale factor σscale.',
        keyElements: ['Eq. 1: ∂u/∂t = DIFF(u,u,c)', 'Eq. 2: c = 1 / (1 + (∇u/σ)^2)', 'Diffusion operator DIFF(u,s,c)', 'Noise scale σscale'],
        boundingBoxes: [
          { ymin: 17, xmin: 50, ymax: 24, xmax: 94, label: 'Equation (1): Anisotropic Diffusion Operator', confidence: 0.99 },
          { ymin: 26, xmin: 50, ymax: 33, xmax: 94, label: 'Equation (2): Diffusion Coefficient c', confidence: 0.99 },
          { ymin: 66, xmin: 8, ymax: 88, xmax: 94, label: 'Figure 4: Simulated Aging Effect at 300 & 600 iterations', confidence: 0.97 }
        ]
      },
      {
        pageNumber: 4,
        title: 'Section 2: Governing Degradation Equation (3) & (4)',
        section: '2. Multi-source Diffusion PDE',
        hasVisualContent: true,
        visualType: 'formula',
        renderType: 'equation_scan',
        summary: 'Derives the three-component degradation governing PDE in Equation (3): ∂u/∂t = DIFF(u, srecto, crecto) + DIFF(u, sbg, cbg) + DIFF(u, sverso, cverso). Background diffusion coefficient cbg = dbg(1 + tanh(u - sbg - δbg)/σbg) where δbg = 0.2 and σbg = 0.3. Equation (4) generalizes across arbitrary sources.',
        ocrText: 'Eq. (3): ∂u/∂t = DIFF(u, srecto, crecto) + DIFF(u, sbg, cbg) + DIFF(u, sverso, cverso)\nsrecto is recto-side image, sbg background information, sverso verso side image.\nFirst term: ink spread on recto. Second term: paper aging/dust. Third term: verso-to-recto seepage.\ncbg = dbg(1 + tanh(u - sbg - δbg)/σbg). Parameters: δbg = 0.2, σbg = 0.3.\nEq. (4): ∂u/∂t = Σ_{i∈sources} DIFF(u, si, ci)',
        keyElements: ['Eq. 3: Multi-source degradation PDE', 'cbg tanh formulation', 'δbg = 0.2, σbg = 0.3', 'Eq. 4: General superposition'],
        boundingBoxes: [
          { ymin: 12, xmin: 50, ymax: 20, xmax: 94, label: 'Equation (3): 3-Source Degradation PDE', confidence: 0.99 },
          { ymin: 35, xmin: 50, ymax: 42, xmax: 94, label: 'cbg Background Diffusion Coefficient', confidence: 0.98 },
          { ymin: 55, xmin: 50, ymax: 63, xmax: 94, label: 'Equation (4): Superposition of Sources', confidence: 0.99 },
          { ymin: 7, xmin: 8, ymax: 46, xmax: 48, label: 'Figure 5: Bleed-Through Generation (1/d=6.0, σb=100.0, 20 iters)', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 5,
        title: 'Equation (5): Verso-to-Recto Seepage Coefficient',
        section: '2. Ink Seepage Physics',
        hasVisualContent: true,
        visualType: 'formula',
        renderType: 'equation_scan',
        summary: 'Presents Equation (5) for verso-to-recto seepage: cverso = [d / (1 + (s-u)^2 / σb^2)] * [1 / (1 + s^2 / σink^2)]. Parameter d is the ratio of verso diffusion to normal recto diffusion; σb controls paper thickness/seepage degree; σink restricts diffusion to ink only (set to 0.2).',
        ocrText: 'Eq. (5): cverso = [d / (1 + (s - u)^2 / σb^2)] * [1 / (1 + s^2 / σink^2)]\ns is gray value of verso side pixel, u is gray value of recto pixel.\nParameter d: ratio of verso diffusion to normal diffusion.\nParameter σb: controls paper thickness and degree of ink seepage.\nParameter σink: restricts diffusion to ink only, set to 0.2.',
        keyElements: ['Eq. 5: cverso formulation', 'd = ratio of verso to recto diffusion', 'σb = paper thickness parameter', 'σink = 0.2 (ink selectivity)'],
        boundingBoxes: [
          { ymin: 63, xmin: 50, ymax: 71, xmax: 94, label: 'Equation (5): Seepage Diffusion Coefficient', confidence: 0.99 },
          { ymin: 8, xmin: 36, ymax: 38, xmax: 94, label: 'Figure 6: Reverse Diffusion Restoration Schematic', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 7,
        title: 'Section 3: Equation (6) Reverse Diffusion Restoration PDE',
        section: '3. Restoration Method for Double-Sided Documents',
        hasVisualContent: true,
        visualType: 'formula',
        renderType: 'equation_scan',
        summary: 'Presents Equation (6), the governing PDE for double-sided restoration: ∂ur/∂t = DIFF(ur, ur, ci,recto) + DIFF(ur, si,bg, ci,bg) - DIFF(ur, uv, ci,verso). Reverse diffusion subtracts the interference pattern from verso side uv while target background fills gaps.',
        ocrText: 'Eq. (6): ∂ur/∂t = DIFF(ur, ur, ci,recto) + DIFF(ur, si,bg, ci,bg) - DIFF(ur, uv, ci,verso)\nur and uv represent recto and verso sides.\nReverse diffusion weakens and removes unwanted information layers while diffusion from target background si,bg and image itself fill gaps and sharpen strokes.',
        keyElements: ['Eq. 6: Reverse diffusion PDE', 'Subtraction of verso interference -DIFF(ur, uv, ci,verso)', 'Target background replenishment'],
        boundingBoxes: [
          { ymin: 82, xmin: 50, ymax: 92, xmax: 94, label: 'Equation (6): Restoration PDE', confidence: 0.99 },
          { ymin: 7, xmin: 52, ymax: 46, xmax: 94, label: 'Figure 10: Bleed-Through Restoration vs ICA Method', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 8,
        title: 'Section 4: Numerical Scheme & Parameter Setup',
        section: '4. Experimental Results and Discussion',
        hasVisualContent: true,
        visualType: 'formula',
        renderType: 'equation_scan',
        summary: 'Details finite-difference discretization on an 8-pixel neighborhood. Maximum stable time step upper limit is the reciprocal sum of neighbor distances: 1 / (4 + 2√2) ≈ 0.1464. Fixed restoration parameters: 1/di,bg = 6.0, 1/di = 6.0, σi,b = 0.1, σi,bg = 0.3, δi,bg = -0.01.',
        ocrText: 'Finite-difference scheme on 8-pixel neighborhood.\nUpper limit of time step: 1/(4 + 2√2) ≈ 0.1464.\nRestoration parameters: 1/di,bg = 6.0, 1/di = 6.0, σi,b = 0.1, σi,bg = 0.3, δi,bg = -0.01.\nDemonstrates robustness to parameter variation.',
        keyElements: ['8-pixel neighborhood scheme', 'Time step bound: 1/(4 + 2√2) ≈ 0.1464', '1/di = 6.0, σi,b = 0.1'],
        boundingBoxes: [
          { ymin: 51, xmin: 50, ymax: 67, xmax: 94, label: 'Section 4 Numerical Parameters & Time-Step Limit', confidence: 0.99 }
        ]
      },
      {
        pageNumber: 14,
        title: 'Figure 20: PSNR Performance Comparison vs ICA',
        section: 'Figure 20: Peak Signal-to-Noise Ratio Analysis',
        hasVisualContent: true,
        visualType: 'plot',
        renderType: 'chart_plot',
        summary: 'Figure 20 comparing Peak Signal-to-Noise Ratio (PSNR) of the proposed restoration method (continuous line with circles) vs ICA (dashed line with crosses) vs degraded input (dashed-dotted with squares) across 4 parameters: (a) n iterations (0 to 50), (b) 1/d (1 to 100), (c) σb paper thickness (10^-4 to 10^4), (d) σink (10^-3 to 10^-1). Proposed method stays near ~21-23 dB PSNR while degraded input plummets to ~7 dB at n=50.',
        ocrText: 'Fig. 20 Comparison of PSNR performance of restoration method with ICA method for variations of several parameters.\n(a) n (iterations: 0 to 50): Proposed method maintains ~21-22 dB PSNR across all n. Degraded input drops from 42 dB down to 7 dB. ICA drops below 10 dB at n=40.\n(b) 1/d: PSNR rises to 21 dB and plateaus.\n(c) σb: Proposed method maintains steady ~22 dB from σb=10^-4 to 10^4.\n(d) σink: Proposed method outperforms ICA across all values.',
        keyElements: ['Proposed method: ~22 dB stable PSNR across n=0..50', 'Degraded input drops from 42 dB to 7 dB', 'ICA fails at severe bleed-through'],
        boundingBoxes: [
          { ymin: 7, xmin: 8, ymax: 54, xmax: 92, label: 'Figure 20: Four PSNR Subplots (n, 1/d, σb, σink)', confidence: 0.99 },
          { ymin: 55, xmin: 8, ymax: 64, xmax: 92, label: 'Figure 20 Caption', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 15,
        title: 'Figure 21: OCR Recognition Rate (%) Using FineReader 9.0',
        section: 'Figure 21: OCR Evaluation Analysis',
        hasVisualContent: true,
        visualType: 'plot',
        renderType: 'chart_plot',
        summary: 'Figure 21 evaluates OCR recognition rate (%) with ABBYY FineReader 9.0. (a) Across iterations n: proposed method maintains ~98-100% recognition rate up to n=40 before dropping at n=50, while ICA drops sharply from 95% at n=10 to ~0% at n=25. (b) Across 1/d: proposed method achieves ~100% rate above 1/d=10. (c) Across σb: proposed method stays at 100% recognition throughout while ICA collapses to 0% for σb > 10^1.',
        ocrText: 'Fig. 21 Comparison of OCR recognition rate of restoration method with ICA method.\n(a) n: Proposed method maintains ~98-100% up to n=40. ICA collapses to 0% after n=20.\n(b) 1/d: Proposed method reaches 100% at 1/d=10.\n(c) σb: Proposed method maintains 100% across all thicknesses; ICA drops to 0% above σb=10.\n(d) σink: Proposed method achieves superior OCR accuracy.',
        keyElements: ['Proposed OCR: ~98-100% up to n=40', 'ICA collapses to 0% for n > 20', 'ICA collapses for σb > 10'],
        boundingBoxes: [
          { ymin: 7, xmin: 8, ymax: 54, xmax: 92, label: 'Figure 21: Four OCR Recognition Rate Subplots', confidence: 0.99 },
          { ymin: 55, xmin: 8, ymax: 64, xmax: 92, label: 'Figure 21 Caption', confidence: 0.98 }
        ]
      },
      {
        pageNumber: 16,
        title: 'Figure 22: OCR Incorrect Characters (%) & Computational Cost',
        section: 'Figure 22 & Computational Performance',
        hasVisualContent: true,
        visualType: 'plot',
        renderType: 'chart_plot',
        summary: 'Figure 22 plots OCR incorrect characters percentage. For proposed method, error remains near 0% across n, 1/d, σb, and σink, whereas ICA error spikes to 100-110%. Discusses computational cost: 10 iterations take ~1 second for 512x512 image; restoration method reaches steady state in ~100 iterations.',
        ocrText: 'Fig. 22 Comparison of OCR incorrectly recognized character rate.\nProposed method error remains ~0% while ICA error climbs above 100%.\nComputational cost: 10 iterations take ~1 second for 512x512 image. Steady state reached in ~100 iterations.',
        keyElements: ['Proposed character error: ~0%', 'ICA character error: spikes to >100%', '10 iterations = ~1s for 512x512 image'],
        boundingBoxes: [
          { ymin: 7, xmin: 8, ymax: 54, xmax: 92, label: 'Figure 22: OCR Character Error Curves', confidence: 0.99 }
        ]
      }
    ]
  }
];

export const BENCHMARK_TEST_CASES: TestCase[] = [
  {
    id: 'tc-01-chart-psnr-ocr',
    category: 'Chart & Graph Reasoning',
    question: 'Compare the PSNR and OCR recognition rate of the proposed diffusion restoration method versus the ICA method as the degradation iterations n increase from 0 to 50 in Farrahi Moghaddam (2009). Show the exact visual data from the plots and explain why ICA fails.',
    targetDocIds: ['doc-low-quality-ijdar-2009'],
    description: 'Demands reading numerical values from dual 4-panel subplots (Fig 20a and Fig 21a) and explaining the physical mechanism why ICA fails on nonlinear diffusion.',
    difficulty: 'Advanced',
    expectedPage: 14,
    expectedKeyFacts: [
      'In Figure 20a (PSNR vs n), proposed method holds steady at ~21-22 dB PSNR across n=0 to 50, whereas degraded input drops from 42 dB down to 7 dB.',
      'In Figure 21a (OCR vs n), proposed method maintains ~98-100% recognition rate up to n=40 before declining at n=50.',
      'ICA collapses abruptly: OCR drops from 95% at n=10 down to 0% at n=25.',
      'Why ICA fails: ICA assumes a linear instantaneous mixture model, but ink bleed-through is a nonlinear diffusion process with deformed edges and spatial dependencies.'
    ]
  },
  {
    id: 'tc-02-academic-calendar-table',
    category: 'Table Reasoning',
    question: 'Identify all three internal exam windows (T1, T2, T3) for B.Tech students in both Odd and Even Semesters from the Karunya 2026-2027 Academic Calendar, and list the exact dates and page sources.',
    targetDocIds: ['doc-karunya-calendar'],
    description: 'Requires parsing color-coded table cells and legend notations (T1, T2, T3) across multiple monthly calendar pages.',
    difficulty: 'Standard',
    expectedPage: 4,
    expectedKeyFacts: [
      'Odd Semester T1: August 10 to August 14, 2026 (Page 4, Days 25T1-29T1)',
      'Odd Semester T2: September 15 to September 19, 2026 (Page 5, Days 51T2-55T2)',
      'Odd Semester T3: October 26 to October 30, 2026 (Page 6, Days 93T3-97T3)',
      'Even Semester T1: February 1 to February 5, 2027 (Page 10, Days 34T1-38T1)',
      'Even Semester T2: March 8 to March 13, 2027 (Page 11, Days 61T2-65T2, excluding March 10 Ramzan)',
      'Even Semester T3: April 5 to April 10, 2027 (Page 12, Days 80T3-84T3, excluding April 7 Telugu New Year)'
    ]
  },
  {
    id: 'tc-03-needle-haystack-video',
    category: 'Chart & Graph Reasoning',
    question: 'In the Gemini 1.5 paper, what was the exact secret text embedded in the video needle-in-a-haystack experiment, which documentary video was used, what was the total duration and frame count, and at what timestamp/frame did the sample needle appear?',
    targetDocIds: ['doc-gemini-1-5-report'],
    description: 'Requires cross-referencing text from Section 4.2.1.3, Figure 8, and the exact visual screenshot in Figure 15 / Table 18.',
    difficulty: 'Expert',
    expectedPage: 10,
    expectedKeyFacts: [
      'Secret needle text: "The secret word is \\"needle\\""',
      'Documentary used: AlphaGo (Kohs, 2017) - 7 concatenated copies back-to-back',
      'Total duration & frame count: 10.5 hours (10:33:14), 37,994 frames sampled at 1 fps (~9.9 million tokens)',
      'Sample needle location shown in Figure 15: timestamp 52:31, or frame 3151',
      'Gemini 1.5 Pro achieved 100% retrieval across all depths, whereas GPT-4V API only supported videos up to ~3 minutes'
    ]
  },
  {
    id: 'tc-04-cross-doc-synthesis',
    category: 'Cross-Document Synthesis',
    question: 'How do the multimodal vision benchmarks in the Gemini 1.5 paper (specifically DocVQA and ChartQA) relate to the physical degradation and document enhancement problems tackled in the 2009 IJDAR paper? Compare their approaches to handling degraded or non-text document elements.',
    targetDocIds: ['doc-gemini-1-5-report', 'doc-low-quality-ijdar-2009'],
    description: 'Cross-document evaluation connecting classic PDE image restoration with modern vision-language end-to-end multimodal intelligence.',
    difficulty: 'Expert',
    expectedPage: 24,
    expectedKeyFacts: [
      'The 2009 IJDAR paper (Page 1-3, Farrahi Moghaddam) shows that classic OCR systems (like FineReader 9.0) fail catastrophicallly when bleed-through or physical noise obscures text (OCR collapses to 0% after 20 iterations under ICA). They required explicit PDE-based reverse diffusion (Eq. 6) to pre-clean pixels before OCR.',
      'The Gemini 1.5 paper (Table 10, Page 24) proves modern Vision-Language Models (VLMs) operate natively on raw pixels without OCR pre-cleaning: ChartQA reaches 81.3% and DocVQA reaches 86.5%.',
      'Gemini 1.5 bypasses explicit binarization and pixel-level restoration by encoding visual patches directly into multimodal embeddings, preserving spatial geometry and handwritten/faded artifacts.'
    ]
  },
  {
    id: 'tc-05-math-proof-algebra',
    category: 'Mathematical Proof',
    question: 'In the Gemini 1.5 report (Section 9.6), how did the authors dramatically improve the model\'s solve rate on Intermediate Algebra (Levels 4 & 5), what exact optimization problem is solved using SciPy in Section 9.6.9, and what was the numerical result compared to the exact theoretical answer?',
    targetDocIds: ['doc-gemini-1-5-report'],
    description: 'Requires mathematical verification of an inequality constrained optimization problem with SciPy and exact algebraic AM-GM proof.',
    difficulty: 'Advanced',
    expectedPage: 61,
    expectedKeyFacts: [
      'Performance jump: Providing 730,000 tokens of in-context SymPy and SciPy examples increased solve rate from 18.6% baseline (and 12.5% for GPT-4) to 25.8% (Table 19, Page 58).',
      'Optimization problem: Maximize a*(a+b)^2*(b+c)^3*(a+c)^4 subject to a, b, c >= 0 and a + b + c = 1.',
      'Numerical result from SciPy SLSQP: 0.015624507088912548',
      'Exact theoretical answer: 1/64 = 0.015625 (achieved via weighted AM-GM inequality, difference is only 0.00000049).'
    ]
  }
];
