/**
 * IBPS Clerk Pre 2025 Memory Based — 4 Oct 1st Shift
 * Answers solved from the questions (PDF had no printed key).
 * Mall line-graph values reconstructed to fit Q6–Q10 options: A=220, B=340, C=280, D=420.
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(
  __dirname,
  '..',
  'src',
  'data',
  'papers',
  'ibps-clerk-pre-2025-4-oct-1st-shift.ts',
)

const ans = (letter) => 'abcde'.indexOf(letter.toLowerCase())
function q(id, text, options, letter, figureRef) {
  return { id, text, options, correctIndex: ans(letter), figureRef }
}

const booksTableFigure = {
  type: 'table',
  title: 'Languages books sold by A and B',
  headers: ['Books', 'English', 'Hindi', 'Urdu'],
  rows: [
    ['A', 28, 50, 36],
    ['B', 55, 54, 32],
  ],
}

const mallsLineFigure = {
  type: 'line',
  title: 'Number of people visiting malls A, B, C and D',
  yLabel: 'Number of people',
  xLabel: 'Mall',
  points: [
    { label: 'A', value: 220 },
    { label: 'B', value: 340 },
    { label: 'C', value: 280 },
    { label: 'D', value: 420 },
  ],
}

const PASSAGE = `Passage:
In the world of armed forces, dogs play an extraordinary role that goes far beyond companionship. They serve as trackers, guards, messengers, and protectors, often working in harsh terrains and unpredictable missions. Military dogs are essential for detecting hidden explosives, tracking infiltrators, and alerting troops to potential threats. Their sharp instincts, unmatched loyalty, and rigorous preparation make them indispensable partners in critical operations. They are not just supporting figures; they are front-line defenders. Far from being fillers in military structures, these brave animals are sentinels, standing watch when danger lurks and acting with courage when every second counts.

Among these remarkable canines was Snowy, a spirited dog with a gleaming white coat that earned him his name. From the moment he arrived at the training center, his alert eyes and quick learning impressed everyone. Snowy was trained at a specialized military academy where he mastered complex commands, learned to detect explosives, and adapted to challenging terrains. He was conditioned to remain calm under pressure, respond to silent signals, and work seamlessly with his handler. His training was not merely about obedience; it was about building instincts, discipline, and trust.

Once Snowy joined the unit at a remote border post, he quickly became a beloved member of the team. Soldiers admired his energy, while his handler relied on his sharp senses during night patrols. One freezing night, the camp lay quiet under a pale moonlight. The soldiers were resting after a long day when Snowy’s ears suddenly __________________. He sensed movement near the perimeter. Without hesitation, he barked sharply and ran toward the fence, alerting the guards. His timely reaction allowed the soldiers to spot and intercept a group trying to cross the border secretly. Snowy’s vigilance averted a potential threat, and that night, he truly embodied the role of a sentinel—watchful, fearless, and devoted.

Beyond his operational duties, Snowy shared a deep emotional bond with the soldiers. He sensed when someone was anxious, resting his head gently on their knees, as if offering silent comfort. He celebrated victories with wagging enthusiasm and stood quietly beside those who missed home. Snowy was more than a military dog; he was a loyal friend, a trusted partner, and a hero in his own right. His story reflects the invaluable role dogs play in safeguarding lives and supporting those who protect the nation.

`

const CLOZE = `Cloze passage:
Medical research in Country X has recently ____(A)____ a remarkable step by combining modern science with ancient discoveries. During a/an ____(B)____ in a remote desert region, the archaeological department unearthed ancient ruins believed to be more than two thousand years old. Among the artifacts and broken pottery, researchers found a nearly intact human skeleton. This discovery opened the door to a unique ____(C)____ between archaeologists and medical scientists.

The team decided to reconstruct the skeleton using advanced imaging and 3D modeling techniques. Each bone was carefully scanned to ____(D)____ the physical structure and study the individual’s health conditions. Early findings revealed signs of joint wear, healed fractures, and dental patterns that gave clues about diet and lifestyle. Interestingly, traces on some bones suggested the use of basic surgical techniques, indicating a surprisingly advanced medical understanding in ancient times.

This interdisciplinary research provided valuable ____(E)____ not only into historical practices but also into genetic traits and disease patterns relevant today. By merging archaeology with medical science, Country X demonstrated how ancient ____(F)____ can guide modern research. Through this reconstruction, the past was revived, offering a clearer picture of human history and medical evolution.

`

const BOXES = `Puzzle — Eight boxes P, Q, R, S, T, U, V and W one above another:
Three boxes between W and R. T is two boxes above R. P is just below T but above W. Two boxes between P and V. S is three boxes below V. Q is adjacent to W.

`

const INEQ =
  'Conclusions based on the statements. Choose:\n(a) Only I true  (b) Only II true  (c) Either I or II  (d) Both true  (e) Neither true\n\n'

const DIR = `Direction sense (typo in source “D east of D” treated as D east of C):
A is 5m west of B; B is 9m north of C; D is 12m east of C; E is 15m north of D; F is 12m west of E; G is 4m north of F.

`

const CIRC = `Circular arrangement — Eight persons H, K, M, P, O, T, X, Y face the centre:
P sits second to the right of T. Two persons sit between P and O. Three persons sit between M and H. K sits immediate left of H who sits second to the left of Y.

`

const ROW = `Linear row facing north:
Two persons between B and E. C sits immediate right of E. Three persons between D and C. No one sits to the left of D. Four persons between A and C. Number of persons to the left of B equals number to the right of A.

`

const SERIES = `Series: 2 # 4 5 $ * 8 3 ^ 9 2 7 1 & 1 6 % 4 9 3 @ 2 5

`

const BLOOD = `Family of eight persons:
G is mother-in-law of M who is father of V and B only. D is sister-in-law of V who is not married. H is the son of G’s spouse. K has one daughter. C is a male member.

`

const MONTHS = `Month puzzle — Born in Feb, Mar, Apr, May, Jun, Jul, Oct, Nov:
S was born after June. Three persons between S and T. Q was born just before T but not in March. Number born before Q equals number born after P. R was born three persons before P. V was born just before U.

`

const numerical = [
  q('num-1', 'Directions (1–5): Study the table and answer.\n\nQ1. English books sold by A and B together is what percentage of Hindi books sold by A?', ['166%', '120%', '66%', '20%', '100%'], 'a', 'booksTableFigure'),
  q('num-2', 'Q2. If X sold 25% more English books than A, find the difference between English books sold by X and Hindi books sold by B.', ['16', '19', '20', '22', '24'], 'b', 'booksTableFigure'),
  q('num-3', 'Q3. Find the ratio of Hindi books sold by B to Urdu books sold by A.', ['3:2', '2:3', '2:1', '2:5', '2:9'], 'a', 'booksTableFigure'),
  q('num-4', 'Q4. Find the average number of books of three languages sold by B.', ['46', '49', '47', '42', '44'], 'c', 'booksTableFigure'),
  q('num-5', 'Q5. Find the difference between total books sold by A and B.', ['16', '32', '20', '27', '18'], 'd', 'booksTableFigure'),
  q('num-6', 'Directions (6–10): Study the line graph and answer.\n\nQ6. Find the ratio of total people visiting A to total people visiting C.', ['11:14', '12:13', '14:11', '12:5', '12:19'], 'a', 'mallsLineFigure'),
  q('num-7', 'Q7. Find the average of total people visiting A, B and C.', ['280', '320', '200', '210', '220'], 'a', 'mallsLineFigure'),
  q('num-8', 'Q8. The people visiting B is what percentage of people visiting D?', ['180.96%', '70.95%', '80.95%', '127.65%', '118.77%'], 'c', 'mallsLineFigure'),
  q('num-9', 'Q9. The ratio of male to female visitors in C is 3:1. Find the male visitors in C.', ['160', '132', '120', '210', '180'], 'd', 'mallsLineFigure'),
  q('num-10', 'Q10. The ratio of people visiting mall D to mall E is 4:5. Find the difference between people visiting mall E and mall A.', ['316', '325', '320', '277', '305'], 'e', 'mallsLineFigure'),
  q('num-11', 'Q11. 784 + 1297 – 613 = ?', ['1468', '1342', '1454', '1086', '1338'], 'a'),
  q('num-12', 'Q12. ? = 225 ÷ 45 ÷ 5 × 75', ['25', '75', '50', '15', '90'], 'b'),
  q('num-13', 'Q13. 7^? = 343 ÷ 512 × 64 × 56 ÷ 49', ['1', '3', '5', '4', '2'], 'e'),
  q('num-14', 'Q14. (120 + 36) ÷ (12 – 6) = ?', ['21.5', '26', '23.5', '22.5', '24.5'], 'b'),
  q('num-15', 'Q15. (3080 + 6160) ÷ ? = 330', ['26', '22', '28', '29', '18'], 'c'),
  q('num-16', 'Q16. 144 − (10800 ÷ 36) + ?² = 100', ['10', '18', '15', '9', '16'], 'e'),
  q('num-17', 'Q17. (4/5) of √1225 ÷ (1/3) of (729)^(1/3) = ? + 1/3', ['10', '18', '15', '9', '3'], 'd'),
  q('num-18', 'Q18. (5/8)th of 160% of ? = √225 × 4', ['70', '80', '60', '40', '50'], 'c'),
  q('num-19', 'Q19. 24 × ? = 225% of 2400', ['144', '121', '225', '324', '81'], 'c'),
  q('num-20', 'Q20. [(40)² × 8] ÷ 50 ÷ 16 = ?', ['3', '9', '16', '12', '15'], 'c'),
  q('num-21', 'Q21. (65% of 1700) ÷ 13 + 172 = ?', ['257', '413', '374', '339', '328'], 'a'),
  q('num-22', 'Q22. (35% of 40 × 10) + 29 = ?', ['144', '169', '225', '81', '25'], 'b'),
  q('num-23', 'Q23. A vessel has 56 litres milk and water in ratio 4:3. Y litres water are added so milk:water becomes 8:7. Find Y.', ['2', '4', '5', '3', '6'], 'b'),
  q('num-24', 'Q24. A invested Rs 2400; after 3 months B joined with Rs X. Year-end profit A:B = 2:1. Find X.', ['1600', '1200', '1800', '1500', '1000'], 'a'),
  q('num-25', 'Q25. A:B = 3:2. If 16 is subtracted from A and added to B, ratio becomes 19:26. Find initial A.', ['42', '48', '56', '40', '54'], 'e'),
  q('num-26', 'Q26. Rs 1600 at X% p.a. SI for 5 years gives Rs 840 interest. Same amount at (X+5)% for 3 years — interest?', ['650', '840', '744', '966', '624'], 'c'),
  q('num-27', 'Q27. Right triangle area 180 cm², height 24 cm. Side of square is 3 cm less than the base. Area of square?', ['100', '196', '144', '169', '121'], 'c'),
  q('num-28', 'Q28. Present ages A:B = 9:5. (A after 5 years):(B 5 years ago) = 16:5. Sum of ages after 10 years?', ['42', '77', '72', '57', '62'], 'e'),
  q('num-29', 'Q29. Boat covers 192 km downstream in 4 h and 210 km upstream in 5 h. Still-water speed decreased 20% — distance in still water in 3 h?', ['102 km', '120 km', '110 km', '108 km', '116 km'], 'd'),
  q('num-30', 'Q30. X chocolates for 30 friends equally; 3 absent so each of remaining gets 1 more. Find X.', ['300', '270', '240', '210', '180'], 'b'),
  q('num-31', 'Q31. 50 adults+children visited a park. Adult ticket Rs 30, child Rs 20, total Rs 1350. Number of adults?', ['15', '27', '25', '20', '35'], 'e'),
  q('num-32', 'Q32. Article A marked 25% above CP with 10% discount; profit Rs 75. CP of B is 40% more than A; 20% loss on B. SP of B?', ['642', '688', '672', '698', '666'], 'c'),
  q('num-33', 'Q33. Car goes A→B at 60 km/h and returns at 90 km/h. Average speed for the journey?', ['60 km/hr', '78 km/hr', '72 km/hr', '66 km/hr', '50 km/hr'], 'c'),
  q('num-34', 'Q34. A, B, C together finish work in 10 days; B and C in 25 days. Days for A alone?', ['6.67', '8.33', '12.5', '13.33', '16.67'], 'e'),
  q('num-35', 'Q35. 40% students in science fair, 25% in sports, rest cultural. Cultural = 315. Difference between science fair and sports?', ['125', '135', '130', '120', '115'], 'b'),
]

const english = [
  q('eng-1', PASSAGE + 'Q36. Synonym of “trained” as used in the passage:', ['adapted', 'rehearsed', 'conditioned', 'informed', 'corrected'], 'c'),
  q('eng-2', PASSAGE + 'Q37. Synonym of “just” as used in the passage:', ['only', 'fair', 'upright', 'balanced', 'truthful'], 'a'),
  q('eng-3', PASSAGE + 'Q38. Which best reflects the role of military dogs in the passage?', ['Mostly companionship and stress relief', 'Mostly ceremonial/parade roles', 'Essential field operatives with specialized skills for real-time threats', 'Occasionally supportive, rarely in combat', 'Preferred mainly for obedience in camps'], 'c'),
  q('eng-4', PASSAGE + 'Q39. Most suitable word for the blank (ears suddenly _____):', ['flattened down', 'tuned out', 'perked up', 'drooped slowly', 'looked away'], 'c'),
  q('eng-5', PASSAGE + 'Q40. Which is NOT TRUE according to the passage?', ['Snowy was recognized early for adapting to silent cues', 'Soldiers trusted Snowy with night-time surveillance', 'Snowy’s training included emotional sensitivity training towards soldiers', 'Snowy averted a potential border infiltration promptly', 'Snowy supported both operational and emotional needs'], 'c'),
  q('eng-6', PASSAGE + 'Q41. Which statement is correct as per the passage?', ['Dogs operate under constant supervision due to unpredictability', 'Snowy captured multiple terrorists in a direct assault', 'Emotional bonds develop mainly through training exercises', 'Snowy adapted to hostile environments and acted proactively in critical moments', 'Dogs mainly bridge communication between units'], 'd'),
  q('eng-7', PASSAGE + 'Q42. Synonym of “sentinel” as used in the passage:', ['officer', 'guardian', 'warrior', 'protectorate', 'disciplinarian'], 'b'),
  q('eng-8', PASSAGE + 'Q43. Why is Snowy’s reaction on the freezing night significant?', ['Animals become hyperactive in cold', 'Highlights failure of automated systems', 'Exemplifies how a trained dog can respond faster than human guards', 'First instance of disobeying his handler', 'Shows untrained dogs create panic'], 'c'),
  q('eng-9', PASSAGE + 'Q44. Identify the incorrect statement:', ['Snowy’s bond helped him recognize soldiers’ emotional states', 'Army dogs are trained in endurance and situational response', 'Snowy’s white coat was the primary reason for his placement at the snowy border', 'The narrative uses Snowy to exemplify military dogs’ role', 'Dogs like Snowy act without hesitation when sensing suspicious activity'], 'c'),
  q('eng-10', CLOZE + 'Q45. Word for blank (A)?', ['built', 'given', 'taken', 'produced', 'shifted'], 'c'),
  q('eng-11', CLOZE + 'Q46. Word for blank (B)?', ['excavation', 'production', 'elevation', 'execution', 'implementation'], 'a'),
  q('eng-12', CLOZE + 'Q47. Word for blank (C)?', ['continuation', 'collaboration', 'joint', 'merge', 'togetherness'], 'b'),
  q('eng-13', CLOZE + 'Q48. Word for blank (D)?', ['initiate', 'entangle', 'chain', 'recreate', 'revolve'], 'd'),
  q('eng-14', CLOZE + 'Q49. Word for blank (E)?', ['point', 'intuition', 'perceiving', 'understands', 'insights'], 'e'),
  q('eng-15', CLOZE + 'Q50. Word for blank (F)?', ['ruin', 'remains', 'decayed', 'dispose', 'excesses'], 'b'),
  q('eng-16', 'Q51. DISCORD — which sentences use it correctly?\n(I) Growing discord among team members after a missed deadline.\n(II) The sweet discord of the violin filled the hall with peace.\n(III) Political discord between countries led to years of tension.', ['Only (I)', 'Only (II)', 'Both (I) and (III)', 'Both (II) and (III)', 'All of these'], 'c'),
  q('eng-17', 'Q52. Replace if needed: “She couldn’t restrain her excitement upon hearing the news.”', ['express her excitement', 'hide her disappointment', 'control her excitement', 'intensify her excitement', 'No replacement required'], 'e'),
  q('eng-18', 'Q53. Replace if needed: “The leader attempted to curb the growing unrest among the workers.”', ['ignore the unrest', 'control the increasing unrest', 'provoke the unrest', 'spread the unrest further', 'No replacement required'], 'e'),
  q('eng-19', 'Q54. Replace if needed: “She tried to mask her embarrassment after making the mistake.”', ['explain her action', 'reveal her shame', 'hide her discomfort', 'increase her confidence', 'No replacement required'], 'e'),
  q('eng-20', 'Q55. Replace if needed: “She managed to temper her frustration despite the delay.”', ['amplify her annoyance', 'moderate her anger', 'dismiss her patience', 'prolong her agitation', 'No replacement required'], 'e'),
  q('eng-21', 'Q56. Error: The judge have (A)/ ordered an inquiry (B)/ into the financial irregularities (C)/ reported by the media. (D)', ['A', 'B', 'C', 'D', 'No error'], 'a'),
  q('eng-22', 'Q57. Error: The cyberattack (A)/ was so severe (B)/ that it disrupted services (C)/ across several countries yesterday. (D)', ['A', 'B', 'C', 'D', 'No error'], 'e'),
  q('eng-23', 'Q58. Error: The government is (A)/ planning to increase (B)/ the number of EV charging station (C)/ in the next fiscal year. (D)', ['A', 'B', 'C', 'D', 'No error'], 'c'),
  q('eng-24', 'Q59. Error: The journalist has being (A)/ reporting live (B)/ from the conflict zone (C)/ for over a week now. (D)', ['A', 'B', 'C', 'D', 'No error'], 'a'),
  q('eng-25', 'Q60. Error: Many voters (A)/ expressed their concerns (B)/ about how the new law will affects (C)/ digital privacy rights. (D)', ['A', 'B', 'C', 'D', 'No error'], 'c'),
  q('eng-26', 'Q61. Rearrange highlighted words:\nUrban demand (A) projects often threaten historical (B) sites, prompting activists to development (C) stricter cultural preservation laws.', ['ACB', 'BAC', 'CAB', 'CBA', 'No rearrangement required'], 'd'),
  q('eng-27', 'Q62. Rearrange:\nNew enforcement (A) aim to protect user data online, yet regulations (B) across international platforms remains (C) inconsistent.', ['ACB', 'BAC', 'CAB', 'CBA', 'No rearrangement required'], 'b'),
  q('eng-28', 'Q63. Rearrange:\nTrade tensions (A) between major businesses (B) have disrupted supply chains, forcing economies (C) to diversify their sourcing strategies.', ['ACB', 'BAC', 'CAB', 'CBA', 'No rearrangement required'], 'a'),
  q('eng-29', 'Q64. Rearrange:\nRising ocean temperatures are leading (A) marine ecosystems, altering (B) to shifts in species distribution (C) and coral reef degradation.', ['ACB', 'BAC', 'CAB', 'CBA', 'No rearrangement required'], 'b'),
  q('eng-30', 'Q65. Rearrange:\nAlthough turnout influenced (A) in the recent election, misinformation campaigns still behavior (B) public perception and voter increased (C).', ['ACB', 'BAC', 'CAB', 'CBA', 'No rearrangement required'], 'a'),
]

const reasoning = [
  q('rea-1', BOXES + 'Q66. How many boxes are placed above box U?', ['One', 'Two', 'Three', 'Four', 'More than four'], 'c'),
  q('rea-2', BOXES + 'Q67. Which box is placed just above box Q?', ['Box U', 'Box R', 'Box P', 'Box S', 'Box V'], 'e'),
  q('rea-3', BOXES + 'Q68. Which statement(s) is/are correct?\nI. Two boxes between Q and S\nII. Box R is adjacent to box U\nIII. Box T is at the topmost position', ['Only I', 'Only II', 'Only I and II', 'Only II and III', 'Only I and III'], 'd'),
  q('rea-4', BOXES + 'Q69. If boxes are placed alphabetically top to bottom, how many remain in the same position?', ['None', 'One', 'Two', 'Three', 'Four'], 'a'),
  q('rea-5', BOXES + 'Q70. Which box is placed five boxes below box T?', ['Box Q', 'Box W', 'Box S', 'Box V', 'Box U'], 'a'),
  q('rea-6', INEQ + 'Q71. Statements: K ≥ R > M = J > T ≤ F > H\nI. M > F\nII. R > T', ['Only I', 'Only II', 'Either', 'Both', 'Neither'], 'b'),
  q('rea-7', INEQ + 'Q72. Statements: L ≤ T < W < Z = D ≤ P < G\nI. P > T\nII. L < Z', ['Only I', 'Only II', 'Either', 'Both', 'Neither'], 'd'),
  q('rea-8', INEQ + 'Q73. Statements: A ≤ M > Y > B ≥ X > C ≤ F\nI. Y > C\nII. M ≥ F', ['Only I', 'Only II', 'Either', 'Both', 'Neither'], 'a'),
  q('rea-9', 'Q74. How many pairs of digits in ‘37481265’ have as many digits between them as in the number series (forward and backward)?', ['Three', 'One', 'Four', 'Two', 'None'], 'd'),
  q('rea-10', DIR + 'Q75. Shortest distance between C and G?', ['19m', '27m', '15m', '21m', 'None of the above'], 'a'),
  q('rea-11', DIR + 'Q76. Direction of D with respect to A?', ['North', 'North-west', 'North-east', 'East', 'South-east'], 'e'),
  q('rea-12', DIR + 'Q77. Odd one out (four are alike):', ['A - D', 'B - E', 'A - C', 'G - E', 'F - D'], 'b'),
  q('rea-13', CIRC + 'Q78. Position of X with respect to Y?', ['Third to the left', 'Second to the left', 'Third to the right', 'Immediate right', 'Second to the right'], 'c'),
  q('rea-14', CIRC + 'Q79. How many persons sit between O and T when counted from the left of T?', ['Two', 'One', 'Three', 'None', 'Four'], 'a'),
  q('rea-15', CIRC + 'Q80. Who sits second to the right of X?', ['Y', 'O', 'T', 'K', 'M'], 'd'),
  q('rea-16', CIRC + 'Q81. Odd one out:', ['K - P', 'H - M', 'X - T', 'O - Y', 'K - O'], 'e'),
  q('rea-17', CIRC + 'Q82. Who sits fourth to the left of Y?', ['X', 'O', 'K', 'P', 'T'], 'b'),
  q('rea-18', ROW + 'Q83. Position of B with respect to D?', ['Second to the left', 'Sixth to the right', 'Eighth to the left', 'Fifth to the right', 'Second to the right'], 'b'),
  q('rea-19', ROW + 'Q84. How many persons sit in the row?', ['13', '18', '15', '17', '16'], 'e'),
  q('rea-20', ROW + 'Q85. How many persons sit between A and D?', ['Six', 'Nine', 'Eight', 'Seven', 'Ten'], 'c'),
  q('rea-21', SERIES + 'Q86. How many symbols are immediately followed by an even digit?', ['One', 'Two', 'Three', 'Four', 'More than four'], 'd'),
  q('rea-22', SERIES + 'Q87. Which element is 11th from the right end?', ['1', '&', '7', '6', '2'], 'a'),
  q('rea-23', SERIES + 'Q88. How many odd digits are between % and #?', ['Four', 'Five', 'Six', 'Three', 'Seven'], 'c'),
  q('rea-24', SERIES + 'Q89. Second symbol to the right of the third even digit from the left end?', ['%', '&', '@', '$', '*'], 'b'),
  q('rea-25', SERIES + 'Q90. How many digits are immediately followed and immediately preceded by a symbol?', ['Two', 'Three', 'Four', 'One', 'None'], 'e'),
  q('rea-26', 'Q91. Find the odd one out.', ['ROU', 'JGM', 'DFA', 'LIO', 'VSX'], 'c'),
  q('rea-27', 'Q92. Using 1st, 2nd, 4th and 8th letters of CATEGORIZE, form a meaningful 4-letter word. Second letter from right of that word? (X = none, Y = more than one)', ['C', 'E', 'A', 'X', 'Y'], 'd'),
  q('rea-28', BLOOD + 'Q93. Relation of C with respect to M?', ['Father-in-law', 'Uncle', 'Father', 'Cousin', 'Brother-in-law'], 'e'),
  q('rea-29', BLOOD + 'Q94. Who is K’s daughter?', ['G', 'V', 'D', 'B', 'Either B or V'], 'e'),
  q('rea-30', BLOOD + 'Q95. Relation of B with respect to H?', ['Niece', 'Nephew', 'Son-in-law', 'Daughter-in-law', 'Granddaughter'], 'b'),
  // Month order: Q(Feb), T(Mar), V(Apr), R(May), U(Jun), S(Jul), W(Oct), P(Nov)
  q('rea-31', MONTHS + 'Q96. Who was born in April?', ['W', 'Q', 'T', 'U', 'V'], 'e'),
  q('rea-32', MONTHS + 'Q97. How many persons were born between W and T?', ['One', 'Two', 'Three', 'Four', 'None'], 'd'),
  q('rea-33', MONTHS + 'Q98. W was born in which month?', ['February', 'October', 'June', 'November', 'July'], 'b'),
  q('rea-34', MONTHS + 'Q99. Odd one out:', ['T', 'U', 'S', 'W', 'R'], 'd'),
  q('rea-35', MONTHS + 'Q100. Which statement(s) is/are true?\nI. One person between R and P\nII. Two persons born before V\nIII. S is older than U', ['Only I', 'Only III', 'Only II', 'Only I and II', 'Only II and III'], 'c'),
]

function emit(qs) {
  return qs
    .map((item) => {
      const opts = item.options.map((o) => JSON.stringify(o)).join(', ')
      const fig = item.figureRef ? `, ${item.figureRef}` : ''
      return `        q(${JSON.stringify(item.id)}, ${JSON.stringify(item.text)}, [${opts}], ${item.correctIndex}${fig}),`
    })
    .join('\n')
}

const file = `import type { Paper, QuestionFigure } from '../../types/exam'
import { q } from './helpers'

/**
 * IBPS Clerk Prelims 2025 — Memory Based Paper
 * 4 October 2025, 1st Shift
 *
 * Source: IBPS-Clerk-Pre-2025-Memory-Based-Paper-Based-on-4-Oct-1st-Shift.pdf
 * Answer key solved from the questions (PDF had no printed key).
 * Mall line-graph values reconstructed to be consistent with Q6–Q10 options.
 * Q14 option "26.5" in source corrected to "26" (exact value).
 * Q21 option set adjusted so the mathematically correct value 257 is present.
 */

const booksTableFigure: QuestionFigure = ${JSON.stringify(booksTableFigure, null, 2)}

const mallsLineFigure: QuestionFigure = ${JSON.stringify(mallsLineFigure, null, 2)}

export const ibpsClerkPre2025Oct4Shift1: Paper = {
  id: 'ibps-clerk-pre-2025-4-oct-1st-shift',
  exam: 'sbi-clerk-prelims',
  title: 'IBPS Clerk Pre 2025 — Memory Based (4 Oct, 1st Shift)',
  sections: [
    {
      id: 'english',
      name: 'English Language',
      durationSeconds: 20 * 60,
      questions: [
${emit(english)}
      ],
    },
    {
      id: 'numerical',
      name: 'Numerical Ability',
      durationSeconds: 20 * 60,
      questions: [
${emit(numerical)}
      ],
    },
    {
      id: 'reasoning',
      name: 'Reasoning Ability',
      durationSeconds: 20 * 60,
      questions: [
${emit(reasoning)}
      ],
    },
  ],
}

export default ibpsClerkPre2025Oct4Shift1
`

writeFileSync(out, file)
console.log('Wrote', out)
console.log('Counts', english.length, numerical.length, reasoning.length)

// Quick verify digit pairs for Q74
const num = '37481265'
let pairs = 0
for (let i = 0; i < num.length; i++) {
  for (let j = i + 1; j < num.length; j++) {
    const a = Number(num[i])
    const b = Number(num[j])
    const betweenInNum = j - i - 1
    const betweenInSeries = Math.abs(a - b) - 1
    if (betweenInNum === betweenInSeries) pairs++
  }
}
console.log('Q74 digit pairs count:', pairs)
