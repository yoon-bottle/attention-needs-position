# Same words, different meaning

An English interactive article about permutation equivariance and positional encoding. Draft for a deep learning assignment.

- Website: https://yoon-bottle.github.io/attention-needs-position/
- No build or dependencies: serve this folder with `python3 -m http.server 4173` and visit http://localhost:4173.
- Tests: `npm test` (Node.js 18+).
- GitHub Pages: deploy from `main`, `/ (root)`.

## Model
`model.js` implements a single unmasked attention head with D=8. Embeddings and projection matrices are deterministic trigonometric fixtures, not learned language representations. Position uses the original sinusoidal formula, positions 0,1,2. Both panels use identical embeddings/projections. Color mapping is fixed to [-3,3] and clamped outside that range; numeric tooltips remain exact to five decimal places. Δ is max absolute feature difference, aligned by token identity. Values below 1e-12 are displayed as zero to suppress floating-point noise.

`app.js` handles input and visualization. `tests/model.test.js` checks all six permutations, carried-position equivariance, fixed-position sensitivity, finite outputs and row normalization.

## Assignment follow-up
The article is an AI-assisted draft. Review the explanation, perform and record your own experiments, prepare the English AI Collaboration Report (maximum 3 pages), and retain actual AI chat logs separately. Do not substitute the collaboration notes for actual chat logs. The lecture PDF and personal chat history are deliberately not included in this public repository.

## Validation (2026-11-16)
Four Node numerical tests passed. Headless Chrome checks passed for desktop drag, keyboard moves, carried-position deltas, reset, mobile move buttons, 390px overflow, and no page errors. The static HTML contains 706 whitespace-separated words including references and UI copy.
