import { supabase } from "@/lib/supabase";
import { FileText, Trash2, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

interface Document {
  id: string;
  filename: string;
  file_path: string;
  content_type: string;
  size: number;
  created_at: string;
}

interface DocumentListProps {
  documents: Document[] | undefined;
  onDownload: (filePath: string, filename: string) => void;
  onDelete: (id: string, filePath: string) => void;
  formatFileSize: (bytes: number) => string;
}

export const DocumentList = ({
  documents,
  onDownload,
  onDelete,
  formatFileSize,
}: DocumentListProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = async (filePath: string, contentType: string) => {
    try {
      const { data: { publicUrl } } = supabase.storage
        .from('client_documents')
        .getPublicUrl(filePath);

      setPreviewUrl(publicUrl);
      setPreviewType(contentType);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error('Error getting preview URL:', error);
    }
  };

  const canPreview = (contentType: string) => {
    return contentType.startsWith('image/') || contentType === 'application/pdf';
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents?.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {doc.filename}
                  </div>
                </TableCell>
                <TableCell>{formatFileSize(doc.size || 0)}</TableCell>
                <TableCell>{doc.content_type}</TableCell>
                <TableCell>
                  {new Date(doc.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {canPreview(doc.content_type) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreview(doc.file_path, doc.content_type)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDownload(doc.file_path, doc.filename)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(doc.id, doc.file_path)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {documents?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No documents yet</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {previewType?.startsWith('image/') ? (
              <AspectRatio ratio={16 / 9}>
                <img
                  src={previewUrl || ''}
                  alt="Preview"
                  className="rounded-lg object-contain w-full h-full"
                />
              </AspectRatio>
            ) : previewType === 'application/pdf' ? (
              <iframe
                src={previewUrl}
                className="w-full h-[600px] rounded-lg"
                title="PDF Preview"
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};