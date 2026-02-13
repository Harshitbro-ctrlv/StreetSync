import { useState } from 'react'

const initialForm = {
  name: '',
  category: '',
  location: '',
  contact: '',
}

function VendorForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(form)
    }
    setForm(initialForm)
  }

  return (
    <form onSubmit={handleSubmit} className="card border border-base-200 bg-base-100 p-4 shadow-sm">
      <div className="grid gap-3">
        <input
          className="input input-bordered w-full"
          name="name"
          onChange={handleChange}
          placeholder="Vendor name"
          value={form.name}
        />
        <input
          className="input input-bordered w-full"
          name="category"
          onChange={handleChange}
          placeholder="Category"
          value={form.category}
        />
        <input
          className="input input-bordered w-full"
          name="location"
          onChange={handleChange}
          placeholder="Location"
          value={form.location}
        />
        <input
          className="input input-bordered w-full"
          name="contact"
          onChange={handleChange}
          placeholder="Contact"
          value={form.contact}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  )
}

export default VendorForm
