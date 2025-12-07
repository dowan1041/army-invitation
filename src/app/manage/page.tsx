"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

interface Participant {
  id: string;
  rank: string;
  name: string;
  age: string;
  occupation: string;
  hobby: string;
  comments: string;
  imageUrl: string | null;
}

const RANKS = ["PV2", "PFC", "SPC", "SGT", "SSG", "SFC"];
const PASSCODE = "dowan";

export default function ManagePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Participant | null>(null);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("manage_auth");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === PASSCODE) {
      sessionStorage.setItem("manage_auth", "true");
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const fetchParticipants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "rsvp"));
      const data: Participant[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          rank: docData.rank || "",
          name: docData.name || "",
          age: docData.age || "",
          occupation: docData.occupation || "",
          hobby: docData.hobby || "",
          comments: docData.comments || "",
          imageUrl: docData.imageUrl || null,
        });
      });
      setParticipants(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchParticipants();
    }
  }, [isAuthenticated]);

  const handleEdit = (participant: Participant) => {
    setEditingId(participant.id);
    setEditForm({ ...participant });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;
    setSaving(true);
    try {
      const docRef = doc(db, "rsvp", editForm.id);
      await updateDoc(docRef, {
        rank: editForm.rank,
        name: editForm.name,
        age: editForm.age,
        occupation: editForm.occupation,
        hobby: editForm.hobby,
        comments: editForm.comments,
      });
      setParticipants((prev) =>
        prev.map((p) => (p.id === editForm.id ? editForm : p))
      );
      setEditingId(null);
      setEditForm(null);
      alert("수정되었습니다!");
    } catch (error) {
      console.error("Error updating:", error);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`정말 "${name}"님의 RSVP를 삭제하시겠습니까?`)) return;
    try {
      await deleteDoc(doc(db, "rsvp", id));
      setParticipants((prev) => prev.filter((p) => p.id !== id));
      alert("삭제되었습니다!");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEditFormChange = (field: keyof Participant, value: string) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [field]: value });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Enter Passcode
          </h2>
          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <input
              type="password"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              placeholder="Passcode"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white text-center text-lg focus:outline-none focus:border-[#F5C518]"
              autoFocus
            />
            {passcodeError && (
              <p className="text-red-500 text-center text-sm">Incorrect passcode</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#F5C518] text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Enter
            </button>
          </form>
          <a
            href="/"
            className="block mt-4 text-center text-gray-400 hover:text-white text-sm"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-2xl font-bold text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">RSVP Management</h1>
          <a
            href="/"
            className="px-4 py-2 bg-[#F5C518] text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Back to Home
          </a>
        </div>

        <p className="text-gray-400 mb-6">Total: {participants.length} participants</p>

        {participants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No RSVPs yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                {editingId === participant.id && editForm ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Rank</label>
                        <select
                          value={editForm.rank}
                          onChange={(e) => handleEditFormChange("rank", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#F5C518]"
                        >
                          {RANKS.map((rank) => (
                            <option key={rank} value={rank}>{rank}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => handleEditFormChange("name", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#F5C518]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Age</label>
                        <input
                          type="number"
                          value={editForm.age}
                          onChange={(e) => handleEditFormChange("age", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#F5C518]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Occupation</label>
                        <input
                          type="text"
                          value={editForm.occupation}
                          onChange={(e) => handleEditFormChange("occupation", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#F5C518]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Hobby</label>
                        <input
                          type="text"
                          value={editForm.hobby}
                          onChange={(e) => handleEditFormChange("hobby", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#F5C518]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Comments</label>
                      <textarea
                        value={editForm.comments}
                        onChange={(e) => handleEditFormChange("comments", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#F5C518] resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveEdit}
                        disabled={saving}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-start gap-4">
                    {participant.imageUrl && (
                      <img
                        src={participant.imageUrl}
                        alt={participant.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#F5C518] font-bold">{participant.rank}</span>
                        <span className="text-xl font-bold text-white">{participant.name}</span>
                        <span className="text-gray-400">({participant.age})</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <p className="text-gray-300">
                          <span className="text-gray-500">Occupation:</span> {participant.occupation}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-gray-500">Hobby:</span> {participant.hobby}
                        </p>
                      </div>
                      {participant.comments && (
                        <p className="text-gray-400 text-sm mt-2 italic">
                          &quot;{participant.comments}&quot;
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(participant)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(participant.id, participant.name)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
