import VendorCard from '../components/VendorCard'

const mockVendors = [
  {
    name: 'Ravi Chaat Stall',
    category: 'Street Food',
    location: 'Karol Bagh',
    contact: '+91 98XXXXXX12',
    status: 'Open now',
  },
  {
    name: 'Fresh Juice Corner',
    category: 'Beverages',
    location: 'Connaught Place',
    contact: '+91 99XXXXXX87',
    status: 'Taking orders',
  },
]

function VendorDashboard() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold">Vendor Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {mockVendors.map((vendor) => (
          <VendorCard key={vendor.name} vendor={vendor} />
        ))}
      </div>
    </section>
  )
}

export default VendorDashboard
