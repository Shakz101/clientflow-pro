import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface DocumentUploadProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

export const DocumentUpload = ({ onUpload, uploading }: DocumentUploadProps) => {
  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        onChange={onUpload}
        disabled={uploading}
        className="max-w-[300px]"
      />
      {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
};