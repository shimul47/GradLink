import { Clock, ShieldCheck, AlertTriangle } from "lucide-react";

const StatusCard = ({ verificationStatus }) => {
  if (verificationStatus === "none") return null;

  const statusConfig = {
    pending: {
      icon: Clock,
      title: "Verification Pending",
      description: "Your verification request is under review. It usually takes 24–48 hours.",
      bgClass: "bg-yellow-500/10 border-yellow-500/20"
    },
    verified: {
      icon: ShieldCheck,
      title: "Verified Successfully",
      description: "You are verified! Start connecting with alumni and students.",
      bgClass: "bg-emerald-500/10 border-emerald-500/20"
    },
    rejected: {
      icon: AlertTriangle,
      title: "Verification Rejected",
      description: "Your verification was rejected. Please check your information and try again.",
      bgClass: "bg-red-500/10 border-red-500/20"
    }
  };

  const config = statusConfig[verificationStatus];
  const IconComponent = config.icon;

  return (
    <div className={`${config.bgClass} border rounded-lg p-4 mb-8`}>
      <div className="flex items-start gap-3">
        <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-semibold text-white">{config.title}</div>
          <div className="text-sm text-gray-300 mt-1">{config.description}</div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;