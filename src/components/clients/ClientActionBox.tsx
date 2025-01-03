import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ClientActionBoxProps {
  title: string;
  description: string;
  tooltip: string;
  icon: LucideIcon;
  color: string;
  comingSoon: boolean;
  clientId: string;
  path: string;
}

export const ClientActionBox = ({
  title,
  description,
  tooltip,
  icon: Icon,
  color,
  comingSoon,
  clientId,
  path,
}: ClientActionBoxProps) => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <Link 
          to={comingSoon ? "#" : `/dashboard/clients/${clientId}/${path}`}
          className={comingSoon ? 'cursor-not-allowed' : ''}
          onClick={(e) => comingSoon && e.preventDefault()}
        >
          <Card className="glass-card relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
            <div className="p-6 space-y-4">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${color} text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              </div>
              {comingSoon && (
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Coming Soon
                </Badge>
              )}
            </div>
          </Card>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent 
        className="hover-card-content w-80"
        sideOffset={5}
      >
        <div className="space-y-2">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm">
            {tooltip}
          </p>
          {!comingSoon && (
            <p className="text-sm mt-2">
              Click to manage {title.toLowerCase()}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};