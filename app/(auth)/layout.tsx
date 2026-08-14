import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    switch (session.user.role) {
      case "ADMIN":
        redirect("/admin/dashboard");
      case "RECRUITER":
        redirect("/recruiter/dashboard");
      default:
        redirect("/student/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Column: Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-16">
        
        {/* Top Header: Logo + Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-white btn-primary">
              F
            </div>
            <span className="font-bold text-xl tracking-tight">FastJoin</span>
          </div>

          {/* Theme Toggle Switcher Button */}
          <ThemeToggle />
        </div>

        {/* Center: Auth Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          {children}
        </div>

        {/* Footer */}
        <div className="text-xs text-zinc-500 text-center lg:text-left">
          © {new Date().getFullYear()} FastJoin. All rights reserved.
        </div>
      </div>

      {/* Right Column: Hero Graphic / Info */}
      <div 
        className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 text-white"
        style={{
          background: "linear-gradient(135deg, var(--brand-primary) 0%, #000000 100%)"
        }}
      >
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-md mb-4">
            Campus Recruitment Platform
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Connecting Talent <br /> with Opportunity.
          </h2>
        </div>

        {/* Decorative Graphic Element / Quote Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
          <p className="text-sm font-medium leading-relaxed mb-4">
            "Streamlining application tracking, interviews, and corporate hiring all in one modern workspace."
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
              🎓
            </div>
            <div>
              <div className="text-sm font-semibold">Smart Placement Portal</div>
              <div className="text-xs text-white/70">Role-Based Dashboard for Students, Recruiters & Admins</div>
            </div>
          </div>
        </div>

        {/* Subtle Background Overlay Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      </div>
    </div>
  );
}