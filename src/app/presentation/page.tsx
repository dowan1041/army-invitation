"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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

const RANK_IMAGES: Record<string, string> = {
  PV2: "/ranks/pv2.svg",
  PFC: "/ranks/pfc.svg",
  SPC: "/ranks/spc.svg",
  SGT: "/ranks/sgt.svg",
  SSG: "/ranks/ssg.svg",
  SFC: "/ranks/sfc.svg",
};

const PASSCODE = "dowan";

export default function PresentationPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("presentation_auth");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === PASSCODE) {
      sessionStorage.setItem("presentation_auth", "true");
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
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
        if (data.length > 0) {
          setSelectedParticipant(data[0]);
        }
      } catch (err) {
        console.error("Error fetching participants:", err);
        setError(err instanceof Error ? err.message : "Failed to load participants");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5C518] flex items-center justify-center px-4">
        <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Enter Passcode
          </h2>
          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <input
              type="password"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              placeholder="Passcode"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-900 text-center text-lg focus:outline-none focus:border-gray-800"
              autoFocus
            />
            {passcodeError && (
              <p className="text-red-600 text-center text-sm">Incorrect passcode</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Enter
            </button>
          </form>
          <a
            href="/"
            className="block mt-4 text-center text-gray-600 hover:text-gray-800 text-sm"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5C518] flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5C518] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 mb-2">Error</p>
          <p className="text-gray-800">{error}</p>
        </div>
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5C518] flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900">No participants yet</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5C518] flex flex-col lg:flex-row">
      {/* Left Side - Presentation Card */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        {selectedParticipant && (
          <div className="bg-white/90 rounded-2xl shadow-2xl p-6 lg:p-10 max-w-xl w-full">
            {/* Photo with Rank Overlay */}
            <div className="relative mb-6 lg:mb-8">
              <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto rounded-xl overflow-hidden bg-gray-200 shadow-lg">
                {selectedParticipant.imageUrl ? (
                  <img
                    src={selectedParticipant.imageUrl}
                    alt={selectedParticipant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <svg
                      className="w-24 h-24 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {/* Rank Badge Overlay */}
              {selectedParticipant.rank && RANK_IMAGES[selectedParticipant.rank] && (
                <div className="absolute -top-4 -left-4 lg:left-[calc(50%-8rem-1rem)] w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full shadow-lg flex items-center justify-center p-2">
                  <img
                    src={RANK_IMAGES[selectedParticipant.rank]}
                    alt={selectedParticipant.rank}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Participant Info */}
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm lg:text-base text-gray-500 font-medium">
                  {selectedParticipant.rank}
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {selectedParticipant.name}
                </h2>
              </div>

              <div className="flex justify-center gap-6 text-gray-700">
                <div>
                  <p className="text-xs lg:text-sm text-gray-500">Age</p>
                  <p className="text-lg lg:text-xl font-semibold">{selectedParticipant.age}</p>
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-500">Occupation</p>
                  <p className="text-lg lg:text-xl font-semibold">{selectedParticipant.occupation}</p>
                </div>
              </div>

              <div>
                <p className="text-xs lg:text-sm text-gray-500">Hobby / Interest</p>
                <p className="text-lg lg:text-xl font-semibold text-gray-700">
                  {selectedParticipant.hobby}
                </p>
              </div>

              {selectedParticipant.comments && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs lg:text-sm text-gray-500 mb-2">Comments</p>
                  <p className="text-base lg:text-lg text-gray-700 italic">
                    &ldquo;{selectedParticipant.comments}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Participant List */}
      <div className="w-full lg:w-80 bg-gray-900/90 p-6 lg:p-8">
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 text-center lg:text-left">
          Participants ({participants.length})
        </h3>
        <div className="space-y-2 max-h-[60vh] lg:max-h-[80vh] overflow-y-auto">
          {participants.map((participant) => (
            <button
              key={participant.id}
              onClick={() => setSelectedParticipant(participant)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                selectedParticipant?.id === participant.id
                  ? "bg-[#F5C518] text-gray-900"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span className="font-medium">{participant.rank}</span>{" "}
              <span className="font-bold">{participant.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
