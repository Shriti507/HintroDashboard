"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function LogoutModal({ isOpen, onClose, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && cancelRef.current) {
      cancelRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/30 animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-desc"
        className="fixed z-50 inset-0 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200 overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close (X) button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="px-8 pt-8 pb-5">
            <h2
              id="logout-title"
              className="text-2xl font-bold text-gray-900"
            >
              Leaving already?
            </h2>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200" />

          {/* Description */}
          <div className="px-8 py-7">
            <p
              id="logout-desc"
              className="text-sm text-gray-600 leading-relaxed"
            >
              You can log back in anytime to continue your meetings with Hintro.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200" />

          {/* Buttons */}
          <div className="px-8 py-6 flex items-center gap-4">
            <button
              ref={cancelRef}
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white text-gray-800 text-sm font-medium px-6 py-2.5 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-black text-white text-sm font-semibold py-2.5 hover:bg-gray-900 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
