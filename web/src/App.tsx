import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryTable from './components/InventoryTable';

export default function App() {
  return (
    <Router>
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Vibrant LMS — Assessment Starter</h1>
      <p className="text-sm text-gray-600">Open <code>ASSESSMENT.md</code> for full instructions. Implement the tasks below.</p>

      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium">1) Inventory Table</h2>
        <InventoryTable />
      </section>

      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium">2) TanStack Query Hooks</h2>
        <p className="text-sm text-gray-600">Implement <code>useTestResults</code> and <code>useUpdateTestStatus</code> in <code>src/hooks/useTestResults.ts</code> with optimistic updates.</p>
      </section>

      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium">3) Maintenance API</h2>
        <p className="text-sm text-gray-600">Fill in <code>api/src/routes/maintenance.js</code> with JWT auth, validation, pagination, and proper error responses.</p>
      </section>

      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium">4) Sample Form</h2>
        <p className="text-sm text-gray-600">Build <code>SampleForm</code> in <code>src/components/SampleForm.tsx</code> with client/server validation parity.</p>
      </section>

      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-medium">5) Status Badge</h2>
        <p className="text-sm text-gray-600">Implement <code>StatusBadge</code> in <code>src/components/StatusBadge.tsx</code> with accessible Tailwind styles.</p>
      </section>
    </div>
    </Router>
  )
}
