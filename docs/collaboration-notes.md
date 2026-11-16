# AI collaboration working notes

These are implementation notes, not a finished student report or a verbatim chat log.

## Decisions explicitly made by the student in conversation
- Chose the Transformer topic after providing lecture slides.
- Selected the positional-encoding experiment.
- Emphasized moving words and seeing immediate intuitive results.
- Requested a GitHub Pages draft and a repository under yoon-bottle.

## AI contributions in this draft
- Proposed paired position-OFF/ON panels and the carried-position control.
- Drafted English explanations, visual design, model, UI and tests.
- Added identity-aligned output comparisons to avoid mistaking row permutation for changed representations.
- Explicitly distinguished changing vectors from semantic understanding and limited the equivariance claim to unmasked attention.

## Student review still needed
Run the experiments yourself and record your own predictions, observations, questions, corrections, and decisions. Do not claim the AI's numerical checks as experiments you personally performed. Retain the original conversation/export for the required chat-log submission.

## Attention heatmap follow-up
The student asked what the output strips meant, then explicitly requested an attention-weight heatmap. AI added 3×3 probability tables, query/key labels, a shared 0–100% color scale, and selected-row highlighting. Both axes remain aligned by token identity so mere reordering cannot look like a weight change. Browser checks verified all displayed cells against the numerical model after reordering, unchanged OFF weights, changed ON weights, recovery with carried positions, and mobile width.

## Standalone position-pair experiment
The student found the small collapsed control insufficient and requested a new interactive visual below the original. AI replaced the checkbox with an independent paired experiment: fixed slot vectors versus carried word–position bundles. It shows selected-token input expressions and token-aligned output deltas using the same numerical model. Browser checks covered independent state, swap/reset, drag, keyboard, mobile buttons, and correct zero deltas when pairs travel together.
