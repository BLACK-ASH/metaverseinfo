"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Input } from "./ui/input";

const ImageUpload = ({ name, imageUrls, setImageUrls, uniqeFileName = true }) => {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error("Auth failed");
    return res.json();
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) {
      toast.error("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];
    let authParams;
    try {
      authParams = await authenticator();
    } catch (err) {
      toast.error("Failed to authenticate");
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: name || file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
        useUniqueFileName: uniqeFileName,
      });

      fileInput.value = null;
      setProgress(0);
      toast.success("Image uploaded successfully");
      setImageUrls([...imageUrls, uploadResponse.url]);

    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2">
        <Input type="file" accept="image/*" ref={fileInputRef} />
        <Button type="button" onClick={handleUpload}>
          Upload file
        </Button>
      </div>
      <Progress value={progress} max={100}></Progress>
    </div>
  );
};

export default ImageUpload;
