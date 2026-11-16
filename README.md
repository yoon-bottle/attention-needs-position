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

## Attention-weight heatmaps
Each panel includes a 3×3 query-by-key probability table. Rows and columns stay in dog/bites/man identity order, independently of the sentence order. Colors share a fixed 0–100% scale across both panels; displayed percentages round to one decimal. The selected query row corresponds to the connection diagram. Browser verification covers cell-by-cell model agreement after reordering and carried-position recovery. The earlier 706-word count describes the first draft; the added labels and explanations remain below the 1,200-word limit.

## Second experiment
`position-lab.js` owns independent state for the fixed-versus-carried position-vector comparison. Both panels include position information, unlike the first experiment's OFF/ON comparison. Dragging, arrow keys, mobile move buttons, swapping dog/man, and reset are supported. Output bars use a fixed 0–0.5 scale with uncapped numeric deltas. Browser validation confirmed independence, input labels, fixed-position changes and carried-position preservation. Full rendered text including references/UI remains under 1,200 words (approximately 1,120).
