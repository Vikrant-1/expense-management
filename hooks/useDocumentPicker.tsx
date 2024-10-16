import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";

export const useDocumentPicker = () => {
  // Define state to hold an array of selected documents
  const [docs, setDocs] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false); // To track the loading state
  const [error, setError] = useState<string | null>(null); // To track errors

  const uploadDocs = async () => {
    if (docs.length >= 5) return;
    try {
      setIsLoading(true);
      setError(null);

      const res = await DocumentPicker.getDocumentAsync({
        multiple: true,
        type: "*/*",
      });

      if (res.canceled === false && res.assets) {
        setDocs((prevDocs) => [...prevDocs, ...res.assets]);
      }
    } catch (err) {
      setError("Failed to pick documents.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetDocs = () => {
    setDocs([]);
  };

  const removeDocs = (index: number) => {
    const filteredDocs = docs.filter((_, i) => i !== index);
    setDocs(filteredDocs);
  };

  return {
    docs,
    isLoading,
    error,
    uploadDocs,
    resetDocs,
    removeDocs,
  };
};
