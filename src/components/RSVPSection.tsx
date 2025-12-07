"use client";

import { useState, useRef } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LeafBranch from "./LeafBranch";

const RANKS = ["PV2", "PFC", "SPC", "SGT", "SSG", "SFC"];

interface FormData {
  rank: string;
  name: string;
  age: string;
  occupation: string;
  hobby: string;
  comments: string;
}

export default function RSVPSection() {
  const [formData, setFormData] = useState<FormData>({
    rank: "",
    name: "",
    age: "",
    occupation: "",
    hobby: "",
    comments: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = null;

      // Upload image if exists
      if (imageFile) {
        try {
          const imageRef = ref(storage, `rsvp-photos/${Date.now()}-${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          imageUrl = await getDownloadURL(imageRef);
        } catch (uploadErr) {
          console.error("Image upload error:", uploadErr);
          // Continue without image if upload fails
        }
      }

      // Save to Firestore
      await addDoc(collection(db, "rsvp"), {
        ...formData,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("RSVP가 성공적으로 제출되었습니다!");
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setError("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="snap-section min-h-screen bg-[#F5C518] relative flex flex-col justify-center items-center px-4 sm:px-8 py-12 sm:py-16">
        <div className="max-w-lg w-full text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <LeafBranch />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 mb-6 sm:mb-8">
            참석 등록이 완료되었습니다.
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            12월 13일에 만나요!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="snap-section h-screen bg-[#F5C518] relative flex flex-col justify-start sm:justify-center items-center px-4 sm:px-8 py-6 sm:py-8 overflow-x-hidden overflow-y-auto">
      {/* Admin Info Button - hidden on mobile */}
      <a
        href="/manage"
        className="hidden sm:flex absolute bottom-6 left-6 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full items-center justify-center shadow-lg transition-colors z-20"
        title="Manage RSVPs"
      >
        <span className="text-white font-bold text-lg">i</span>
      </a>

      {/* Vertical title on the right - hidden on mobile */}
      <div className="hidden lg:block absolute right-40 lg:right-52 top-[80%] rotate-90 origin-right text-white/30 font-bold tracking-widest select-none leading-tight text-6xl lg:text-8xl">
        <div>RSVP</div>
      </div>

      <div className="max-w-3xl w-full">
        {/* Decorative leaf branch */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <LeafBranch />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
          RSVP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Row 1: Rank, Name, Age */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Rank */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1">
                Rank
              </label>
              <select
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-800/20 bg-white/80 text-gray-900 text-sm sm:text-base focus:outline-none focus:border-gray-800 transition-colors"
              >
                <option value="">Select Rank</option>
                {RANKS.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-800/20 bg-white/80 text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-gray-800 transition-colors"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="Age"
                min="1"
                max="100"
                className="w-full px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-800/20 bg-white/80 text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-gray-800 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Occupation, Hobby */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Occupation */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                placeholder="Enter your occupation"
                className="w-full px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-800/20 bg-white/80 text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-gray-800 transition-colors"
              />
            </div>

            {/* Hobby/Interest */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1">
                Hobby / Interest
              </label>
              <input
                type="text"
                name="hobby"
                value={formData.hobby}
                onChange={handleChange}
                required
                placeholder="Enter your hobby or interest"
                className="w-full px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-800/20 bg-white/80 text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-gray-800 transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Comments and Picture side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Comments */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1">
                Any Comments?
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={3}
                placeholder="Leave any comments (optional)"
                className="w-full px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-800/20 bg-white/80 text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-gray-800 transition-colors resize-none"
              />
            </div>

            {/* Picture Upload */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1">
                Picture
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-[84px] sm:h-[92px] px-3 rounded-lg border-2 border-dashed border-gray-800/40 bg-white/60 text-center cursor-pointer hover:bg-white/80 transition-colors flex items-center justify-center"
              >
                {imagePreview ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <p className="text-xs text-gray-600">Click to change</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-8 h-8 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="text-left">
                      <p className="text-sm text-gray-600">Upload picture</p>
                      <p className="text-xs text-gray-500">(optional)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-center font-medium text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gray-900 text-white font-bold text-base rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}
