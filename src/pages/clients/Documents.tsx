import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DocumentList } from "@/components/documents/DocumentList";
import { DocumentUpload } from "@/components/documents/DocumentUpload";

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
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (!userId) throw new Error("User not authenticated");

      const fileExt = file.name.split(".").pop();
      // Include userId in the storage path to comply with RLS policy
      const filePath = `${userId}/${clientId}/${crypto.randomUUID()}.${fileExt}`;

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
        created_by: userId,
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
      const { error: storageError } = await supabase.storage
        .from("client_documents")
        .remove([filePath]);

      if (storageError) throw storageError;

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
        <DocumentUpload onUpload={handleFileUpload} uploading={uploading} />
      </div>

      <DocumentList
        documents={documents}
        onDownload={handleDownload}
        onDelete={handleDelete}
        formatFileSize={formatFileSize}
      />
    </div>
  );
};

export default Documents;