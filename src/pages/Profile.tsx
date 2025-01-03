import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container py-6">
        <Card className="p-6">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Company Profile</h1>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Company Name</h3>
            <p className="text-lg">{profile?.company_name}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
            <p className="text-lg">{profile?.contact_person}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p className="text-lg">{profile?.email}</p>
          </div>
          
          {profile?.phone && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p className="text-lg">{profile?.phone}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Business Type</h3>
            <p className="text-lg">
              {profile?.business_type}
              {profile?.other_business_type && ` - ${profile.other_business_type}`}
            </p>
          </div>
          
          {profile?.selected_tools && profile.selected_tools.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tools</h3>
              <p className="text-lg">
                {profile.selected_tools.join(', ')}
                {profile?.other_tools && profile.other_tools.length > 0 && (
                  <>, {profile.other_tools.join(', ')}</>
                )}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;