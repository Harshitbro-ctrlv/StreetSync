import VendorForm from '../components/VendorForm'

function VendorRegister() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="mb-4 text-2xl font-bold">Join as Vendor</h2>
      <p className="mb-6 text-base-content/80">Register your street business in minutes.</p>
      <VendorForm />
    </section>
  )
}

export default VendorRegister
