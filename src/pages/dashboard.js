import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/authContext";
import { Star, StarOff } from "lucide-react"; // or use `lucide-react` icons if you're using that

export default function DashboardPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // default A–Z

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { token } = useAuth(); // Get logged-in user with token

  useEffect(() => {
    if (token) {
      fetchContacts();
    }
  }, [token]);

  const fetchContacts = async () => {
    console.log("Fetching contacts...");
    try {
      const response = await api.get("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Full response from backend:", response);

      const data = response.data;

      if (Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      } else if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.warn("Unexpected data format:", data);
        setContacts([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch contacts.");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/contacts",
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContacts([...contacts, response.data.contact]);
      if (response.status === 201) {
        // setMessage("Contact added successfully.");
        setError(""); // ✅ Clear any previous error message
        setName("");
        setEmail("");
        setPhone("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add contact.");
    }
  };

  const { logout } = useAuth();

  // right before return (
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  const toggleFavorite = async (contactId, isFav) => {
    console.log("Toggling favorite for:", contactId, "->", isFav);
    try {
      await api.put(`/contacts/${contactId}/favorite`, { favorite: isFav });
      const updated = sortedContacts.map((c) =>
        c._id === contactId ? { ...c, favorite: isFav } : c
      );
      setContacts(updated);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>

      <form
        onSubmit={handleAddContact}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          {/* <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full max-w-xs"
          /> */}

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="ml-4 p-2 border border-gray-300 rounded"
          >
            <option value="" disabled hidden>
              Sort contacts by...
            </option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="newest">Recently Created</option>
            <option value="oldest">Oldest Created</option>
          </select>
        </div>

        <h3 className="text-xl font-semibold mb-4">Add New Contact</h3>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Contact
          </button>
        </div>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className="space-y-2">
          {sortedContacts.map((contact) => (
            <li
              key={contact._id}
              className="p-4 bg-white rounded shadow border flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Name:</strong> {contact.name}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {contact.phone}
                </p>
              </div>
              {/* <button
                onClick={() => toggleFavorite(contact._id, !contact.isFavorite)}
                className="text-yellow-500 hover:text-yellow-600"
                title={
                  contact.isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {contact.isFavorite ? (
                  <Star fill="currentColor" />
                ) : (
                  <StarOff />
                )}
              </button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
