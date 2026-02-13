import { useEffect, useState } from "react";
import { useAuthStore } from "../../zustand/user.store";
import { searchForVendors } from "../../api/user.auth";
import { ShowToast } from "../../utils/ShowToast";

export const UDashboard = () => {
  const user = useAuthStore((state) => state.user);

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchVendors = async () => {
      setLoading(true);

      const res = await searchForVendors();
      console.log(res)
      if (res.status >= 400 || res.error) {
        ShowToast(res.error?.message || "Failed to fetch vendors", {
          type: "error",
        });
        setLoading(false);
        return;
      }

      setVendors(res.data?.vendors || []);


      setLoading(false);
    };

    fetchVendors();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-6xl mx-auto p-6 space-y-8">

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Vendors Near You
          </h2>

          {loading ? (
            <p className="opacity-70">Loading vendors...</p>
          ) : vendors.length === 0 ? (
            <p className="opacity-70">
              No vendors available in your area yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <div
                  key={vendor._id}
                  className="card bg-base-200 shadow hover:shadow-lg transition"
                >
                  <div className="card-body">
                    <h3 className="card-title">
                      {vendor.stallName}
                    </h3>

                    <p className="text-sm opacity-70">
                      {vendor.address?.city}
                    </p>

                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-outline btn-sm">
                        View Stall
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
