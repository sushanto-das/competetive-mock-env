import type { Paper } from '../../types/exam'
import { ibpsClerkPre2025Oct4Shift1 } from './ibps-clerk-pre-2025-4-oct-1st-shift'
import { ibpsClerkPre2025Oct4Shift2 } from './ibps-clerk-pre-2025-4-oct-2nd-shift'
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
  ibpsClerkPre2025Oct4Shift1,
  ibpsClerkPre2025Oct4Shift2,
]
