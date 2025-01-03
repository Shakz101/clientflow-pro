import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Trash2, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const Documents = () => {
  const { id: clientId } = useParams();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const { data: documents, refetch: refetchDocuments } = useQuery({
    queryKey: ["client-documents", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_documents")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !clientId) return;

    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const filePath = `${clientId}/${crypto.randomUUID()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("client_documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save file metadata to database
      const { error: dbError } = await supabase.from("client_documents").insert({
        client_id: clientId,
        filename: file.name,
        file_path: filePath,
        content_type: file.type,
        size: file.size,
        created_by: (await supabase.auth.getUser()).data.user?.id,
      });

      if (dbError) throw dbError;

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });

      refetchDocuments();
    } catch (error: any) {
      toast({
        title: "Error uploading file",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (filePath: string, filename: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("client_documents")
        .download(filePath);

      if (error) throw error;

      // Create a download link
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Error downloading file",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("client_documents")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("client_documents")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      toast({
        title: "File deleted successfully",
        description: "The file has been removed.",
      });

      refetchDocuments();
    } catch (error: any) {
      toast({
        title: "Error deleting file",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
          <p className="text-sm text-muted-foreground">
            Upload and manage documents for this client
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="max-w-[300px]"
          />
          {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
        </div>
      </div>

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
                      onClick={() => handleDownload(doc.file_path, doc.filename)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(doc.id, doc.file_path)}
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
    </div>
  );
};

export default Documents;