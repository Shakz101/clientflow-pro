import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function AdminLabel() {
  const { data: role } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .single();
      
      if (error) throw error;
      return data?.role;
    },
  });

  if (role !== "admin") return null;

  return (
    <div className="fixed bottom-0 right-0 w-full bg-red-500 text-white py-1 text-center font-semibold z-50">
      Administrator
    </div>
  );
}