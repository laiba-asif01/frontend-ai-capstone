# AI-Assisted Workflow Comparison: Vague vs. Precise Prompting

This document analyzes the differences, efficiencies, and code quality outcomes when building a user profile settings form feature using two contrasting AI prompting approaches.

---

## ⚖️ Comparison Overview

| Metric | Round 1 (Vague Prompt) | Round 2 (Precise Prompt) |
| :--- | :--- | :--- |
| **Prompt Used** | `"Create a settings form for user profile with basic validation"` | Multi-criteria specification (with Zod, React Hook Form, spinner loaders, ARIA tags, and test assertions). |
| **Code Correctness** | Medium. Generated broad inputs but lacked edge-case boundaries. | High. Covered exact character limits, allowed empty bios correctly, and simulated realistic async feedback loops. |
| **Accessibility (a11y)** | Low. Basic standard inputs without structural error linking. | High. Explicit usage of `aria-invalid`, linked descriptive error block IDs, and custom focus states. |
| **Review & Debugging Time** | ~15 minutes (to manually inspect and catch unhandled error boundaries). | ~2 minutes (ready-to-go, self-verifying suite). |

---

## 🔍 Specific Diff Analysis

The actual code generated in both branches differed substantially in engineering structure:

1. **Schema Definiteness:** 
   The vague prompt used standard validation handlers which did not scale. The precise prompt enforced specific schema logic:
   - Username regex constraints: `/^[a-zA-Z0-9]+$/` (alphanumeric check).
   - Bio boundary limits: Max 200 characters while allowing optional empty strings cleanly using Zod's `.optional().or(z.literal(''))`.

2. **User Experience & Feedback Loops:**
   - Round 1 was highly synchronous and instantly submitted values with raw layouts.
   - Round 2 integrated state management for simulated API latency (1.5s delay) with interactive spinner controls and locked action buttons while saving.

3. **Accessibility Integration:**
   Round 2 explicitly utilized standard modern accessibility workflows:
   - `aria-invalid={errors.username ? 'true' : 'false'}`
   - `aria-describedby` linked to helper text.

---

## 🛠️ AI Mistakes & Limitations Caught

1. **Cursor Limits:** During the precise implementation stage, the premium agent/composer limits were exhausted. The prompt could not finish rendering its planned code blocks. To overcome this, the code structure was audited and manual configurations were introduced to match the strict test expectations.
2. **Context Contamination:** If run in the same thread, the model carries styling decisions from the previous generation. Isolating the branches and clearing session sessions completely solved this constraint.