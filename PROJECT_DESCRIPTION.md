# Project Description — Vibrant LMS Full-Stack Assessment (Ant Design Edition, Table Embedded Sort/Filter)

## Elevator pitch
Build a realistic slice of Vibrant America’s **Laboratory Management System (LMS)**. You’ll implement typed React components that use **Ant Design Table and Form**, stateful data flows with **TanStack Query** (including optimistic updates), and a **JWT-protected** Express/Knex API with validation and pagination. A Tailwind-based status badge rounds out the UI.

> **Important:** For the inventory table, you **must use Ant Design Table’s embedded sort and filter mechanisms** (`sorter`, `filters`/`filterDropdown`, `onFilter`, Table pagination). Do **not** pre-sort or pre-filter the array outside the Table; the Table should drive state via `onChange`.

---

## What you will implement

### 1) Inventory table (React + TypeScript + Ant Design Table)
A reusable `<InventoryTable />` for browsing inventory with:
- Columns: `id`, `name`, `quantity`, `expirationDate`, `supplier`, `category`
- Sorting: by **name** and **quantity** using **Table’s `sorter`**
- Filtering:
  - By **category** using column **`filters`** + `onFilter`
  - **Name search** using column **`filterDropdown`** (embedded input), not an external input
- Pagination: **AntD Table pagination** (client-side is fine)
- **URL state**: persist `q` (name filter), `category`, `sort`, `order`, `page` in the query string

**Acceptance checks (no code examples shown)**
- All sorting and filtering are defined **on the Table columns** (embedded), not via manual array transforms.
- Refresh/back/forward preserves Table state (sort/filter/page) by controlling `filteredValue`, `sortOrder`, and `pagination.current` from URL params.
- `onChange(pagination, filters, sorter)` updates the URL. URL is treated as the source of truth for restoring state.

**Constraints**
- Strict TypeScript (no `any`).
- Keep headers keyboard-accessible; AntD handles `aria-sort` when `sortOrder` is controlled.
- No additional table/grid libraries beyond AntD.

> Reviewer note: We purposely omit code here. Candidates must wire `filters`, `filterDropdown`, `sorter`, `onFilter`, `onChange`, and URL sync without a template.

---

### 2) Test results hooks (TanStack Query)
Two hooks with robust cache behavior and **optimistic updates**:
- `useTestResults()` → **GET** `/api/test-results`
- `useUpdateTestStatus()` → **PATCH** `/api/test-results/:id` body `{status}`

**Requirements**
- Loading + error UI (retry button).
- Sensible `staleTime` (e.g., 10–30s) and **disable refetch on window focus** (document why).
- Use `select` to shape data.
- Mutation: optimistic update, rollback on error, reconcile on success, narrow invalidation.

---

### 3) Maintenance API (Express + Knex)
- **Route**: `GET /api/maintenance/:equipmentId` (JWT required)
- **Query params**: `page` (1), `pageSize` (20, max 100)
- **Response**: `{ equipment, records, page, pageSize, total }`
- Errors: 400/401/404/500 (no stack traces). Index `(equipment_id, performed_at)`.

---

### 4) Sample submission form (React + Ant Design Form)
A form with **client + server** validation parity.

- Fields: `sampleId` (`^[A-Z]-\d{3,5}$`), `collectionDate` (≤ today), `sampleType`, `priority`.
- Submit to `POST /api/samples` and map server field errors into Form via `form.setFields(...)`.

**Acceptance checks**
- Friendly field-level errors for both client and server validation.
- Submit button disabled during pending submit.
- Keyboard-first flow; proper labels and aria descriptions.

---

### 5) Status badge (Tailwind + accessibility)
- `<StatusBadge status="pending|in-progress|completed|failed" />`
- Contrast-safe classes; `role="status"` & `aria-label`.

---

## API contracts (concise)
- `GET /api/test-results` → list
- `PATCH /api/test-results/:id` → updated item
- `GET /api/maintenance/:equipmentId?page=&pageSize=` → paged results
- `POST /api/samples` → 201 or 400 with `{ details: { field: msg } }`

---

## Quality guidelines
- **Frontend**: strict TS, **Table-embedded** sort/filter only, URL is source-of-truth for Table state.
- **Backend**: parameterized Knex, stable ordering, proper pagination + `total`, consistent error envelope.
- **Accessibility**: focusable headers, meaningful labels & errors.
