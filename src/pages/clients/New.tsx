import { useState } from "react";
import { SlideShow } from "@/components/register/SlideShow";

const NewClient = () => {
  const [selectedTools] = useState(["stripe", "facebook", "google-ads"]);

  return (
    <div className="container py-8">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <SlideShow selectedTools={selectedTools} />
    </div>
  );
};

export default NewClient;