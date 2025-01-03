import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center scroll-animation">
        <div className="glass rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Agency?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join hundreds of agencies already using our platform to streamline
            their operations and delight their clients.
          </p>
          <Button asChild size="lg" className="text-lg px-8 glass-button">
            <Link to="/register" className="inline-flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}