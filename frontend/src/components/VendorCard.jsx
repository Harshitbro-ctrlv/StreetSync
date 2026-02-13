function VendorCard({ vendor }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold">{vendor.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{vendor.category}</p>
      <p className="mt-2 text-sm text-slate-700">{vendor.location}</p>
      <p className="mt-1 text-sm text-slate-700">{vendor.contact}</p>
      <p className="mt-2 text-xs text-slate-500">{vendor.status}</p>
    </article>
  )
}

export default VendorCard
