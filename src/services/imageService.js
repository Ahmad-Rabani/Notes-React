import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const STORAGE_ERROR_MESSAGES = {
  "storage/unauthorized":
    "Permission denied — Firebase Storage rules are blocking the upload. " +
    "Open Firebase Console → Storage → Rules and publish the rules from firebase.storage.rules.",
  "storage/unauthenticated":
    "You must be signed in to upload images.",
  "storage/canceled":
    "Upload was cancelled.",
  "storage/quota-exceeded":
    "Storage quota exceeded. Please check your Firebase plan.",
  "storage/invalid-checksum":
    "File corrupted during upload. Please try again.",
  "storage/retry-limit-exceeded":
    "Upload timed out. Check your internet connection and try again.",
  "storage/unknown":
    "An unknown Storage error occurred. Check the browser console for details.",
};

export function validateImageFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPEG, PNG, and WebP images are supported.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "Image must be smaller than 5 MB.";
  }
  return null;
}

/**
 * Upload a file to Firebase Storage.
 * @param {File} file
 * @param {string} path  – Storage path, e.g. "users/uid/notes/noteId/image"
 * @param {(progress: number) => void} [onProgress]  – 0–100
 * @returns {Promise<string>} – download URL
 */
export function uploadImage(file, path, onProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress?.(pct);
      },
      (err) => {
        // Translate Firebase Storage error codes into readable messages
        const msg = STORAGE_ERROR_MESSAGES[err.code] ?? err.message;
        const readable = new Error(msg);
        readable.code = err.code;
        reject(readable);
      },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        } catch (err) {
          const msg = STORAGE_ERROR_MESSAGES[err.code] ?? err.message;
          const readable = new Error(msg);
          readable.code = err.code;
          reject(readable);
        }
      }
    );
  });
}

/**
 * Delete a file from Firebase Storage by its path.
 * Silently ignores "object-not-found" errors.
 */
export async function deleteImage(path) {
  if (!path) return;
  try {
    await deleteObject(ref(storage, path));
  } catch (err) {
    if (err.code !== "storage/object-not-found") {
      console.error("Failed to delete image from Storage:", err);
    }
  }
}
