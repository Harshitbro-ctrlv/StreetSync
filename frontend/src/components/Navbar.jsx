function Navbar() {
  return (
    <div className="navbar border-b border-base-200 bg-base-100 px-4 md:px-8">
      <div className="flex-1">
        <a className="text-xl font-bold">StreetSync</a>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-ghost btn-sm">Login</button>
        <button className="btn btn-primary btn-sm">Join as Vendor</button>
      </div>
    </div>
  )
}

export default Navbar
