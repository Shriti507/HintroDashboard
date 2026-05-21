"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

export function LogoutModal({ isOpen, onClose, onConfirm }) {
  const cancelRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Focus trap: focus Cancel button when modal opens
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
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-desc"
        className="fixed z-50 inset-0 flex items-center justify-center p-4"
      >
        <div
          className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            id="logout-title"
            className="text-lg font-semibold text-[var(--foreground)] mb-2"
          >
            Leaving already?
          </h2>
          <p
            id="logout-desc"
            className="text-sm text-[var(--muted-foreground)] mb-6"
          >
            You can log back in anytime to continue your meetings with Hintro.
          </p>

          <div className="flex gap-3">
            <button
              ref={cancelRef}
              onClick={onClose}
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-medium py-2.5 hover:bg-[var(--muted)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-red-600 text-white text-sm font-medium py-2.5 hover:bg-red-700 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
