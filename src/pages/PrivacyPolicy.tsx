import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollArea className="h-[calc(100vh-120px)] glass rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-4">Last Updated: January 2025*</p>

            <p className="mb-6">
              Welcome to Devircle, a business management platform designed to simplify client management for modern businesses. Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal data and the data of your clients when you use Devircle.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-6">
              Devircle is a centralized platform designed for agencies, consultants, and small to medium-sized businesses. It integrates tools like Stripe, Facebook, and TikTok to streamline client management and operations. This Privacy Policy applies to all users of the Devircle platform and outlines our practices for handling data.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Data We Collect</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">A. Data You Provide</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Account Information: Name, email address, business name, and payment information.</li>
              <li>Client Information: Names, contact details, communication records, and preferences uploaded to the platform.</li>
              <li>Messages and Files: Any content you create or upload, including emails, documents, and media files.</li>
            </ul>

            {/* ... Continue with the rest of the sections in a similar format */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
            <p className="mb-6">
              If you have questions or concerns about this Privacy Policy, contact us at:
            </p>
            <p className="mb-2">Devircle Privacy Team</p>
            <p className="mb-2">Email: admin@devircle.com</p>

            <p className="mt-8 text-muted-foreground">
              Thank you for trusting Devircle to simplify and enhance your client management experience.
            </p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}