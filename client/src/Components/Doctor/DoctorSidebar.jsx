import { MessageSquareText, Share2, Wallet, CheckCircle2 } from "lucide-react";
import DoctorPricingCard from "./DoctorPricingCard";
import { useState } from "react";
import DoctorChatBox from "./DoctorChatBox";

export default function DoctorSidebar({ doctor }) {
  const [showChat, setShowChat] = useState(false);

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: `Book with ${doctor.name} - ShebaPoint`,
          text: `Check out ${doctor.name}'s profile on ShebaPoint`,
          url: shareUrl,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          alert("Profile link copied!");
        })
        .catch(() => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`,
            "_blank"
          );
        });
    }
  };

  return (
    <aside className="space-y-6 md:sticky md:top-10">
      {/* Pricing Card */}
      <DoctorPricingCard doctor={doctor} />

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow rounded-xl">
        <div className="card-body">
          <h2 className="card-title text-base font-semibold">Quick Actions</h2>
          <p className="text-sm text-base-content/70 mb-3">
            Fast access to common tasks
          </p>
          <div className="grid gap-2">
            <button
              className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform"
              onClick={() => setShowChat(true)}
            >
              <MessageSquareText className="h-4 w-4" /> Message
            </button>
            <button
              className="btn btn-outline btn-sm gap-2 hover:bg-base-200 transition-colors"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Profile Verification */}
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow rounded-xl">
        <div className="card-body">
          <h2 className="card-title text-base font-semibold">Profile Verification</h2>
          <p className="text-sm text-base-content/70 mb-3">Trust & safety</p>
          <div className="space-y-2 text-sm">
            {[
              "Medical license verified",
              "Identity verified",
              "Background check cleared",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 transition-colors cursor-default"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Box */}
      {showChat && <DoctorChatBox doctor={doctor} onClose={() => setShowChat(false)} />}
    </aside>
  );
}
