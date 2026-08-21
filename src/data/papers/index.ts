import type { Paper } from '../../types/exam'
import { ibpsClerkPre2025Oct4Shift1 } from './ibps-clerk-pre-2025-4-oct-1st-shift'
import { ibpsClerkPre2025Oct4Shift2 } from './ibps-clerk-pre-2025-4-oct-2nd-shift'
import { sbiClerkPre202520SepShift1Bengali } from './sbi-clerk-pre-2025-20-sep-1st-shift-bengali'
import { sbiClerkPre202520SepShift2 } from './sbi-clerk-pre-2025-20-sep-2nd-shift'
import { sbiClerkPre202521SepShift1 } from './sbi-clerk-pre-2025-21-sep-1st-shift'
import { sbiClerkPrelimsSample } from './sbi-clerk-prelims-sample'

/**
 * Register every question paper here.
 *
 * To add a new paper:
 * 1. Create a new file in this folder (e.g. `sbi-clerk-prelims-mock-2.ts`)
 * 2. Export a `Paper` object from that file (see `sbi-clerk-prelims-sample.ts`)
 * 3. Import it below and add it to the `papers` array
 */
export const papers: Paper[] = [
  sbiClerkPrelimsSample,
  sbiClerkPre202520SepShift1Bengali,
  sbiClerkPre202520SepShift2,
  sbiClerkPre202521SepShift1,
  ibpsClerkPre2025Oct4Shift1,
  ibpsClerkPre2025Oct4Shift2,
]
