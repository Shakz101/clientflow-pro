import { FileText, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  return (
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
  );
};