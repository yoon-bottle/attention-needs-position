# Attention Playground Implementation Plan

**Goal:** Publish a reviewable GitHub Pages draft explaining permutation equivariance through token movement.
**Architecture:** Static English article and paired deterministic attention experiments. Pure numerical model is independent of UI; no network/model dependency.
**Tech Stack:** HTML, CSS, ES modules, Node test runner, GitHub Pages.

## Global constraints
- Article at most 1,200 English words excluding references.
- Preserve sources/ and original lecture PDF.
- Show calculated outputs, never claim semantic understanding.

## Tasks
- [x] Create model.js exporting tokens, attention(order, positional, carry), delta(a,b), and baseline order; test all six permutations for equivariance, row normalization and finite outputs; test carried position vectors restore equivariance.
- [x] Create index.html, styles.css, app.js with paired panels, synchronized drag reorder, arrow-key and button alternatives, selected-token weight lines, output fingerprints and baseline deltas; reset all settings.
- [x] Validate numerical tests, word count, browser desktop/mobile interaction and console. Record actual checks in README and collaboration notes.
- [x] Create public yoon-bottle/attention-needs-position repository, push reviewed source, configure Pages from main root, verify deployment.
