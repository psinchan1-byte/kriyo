"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/common/GlassCard";
import {
  ShieldCheck,
  User,
  Building2,
  Mail,
  Briefcase,
  MapPin,
  Lock,
  Smartphone,
  Key,
  Bell,
  CheckCircle2,
  AlertTriangle,
  History,
  Laptop,
  FileText,
  LogOut,
  Ban,
  Activity,
  ToggleLeft,
  ToggleRight,
  Eye,
  Server,
  FileSearch,
  CheckCircle,
  X
} from "lucide-react";

// Mini Toggle Switch Component
const Toggle = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? "bg-[#B96D43]" : "bg-[#6E5D53]/30"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-4.5" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default function SettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Modals
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [showDeactivation, setShowDeactivation] = useState(false);

  // Notification States
  const [notifs, setNotifs] = useState({
    critical: true,
    watchlist: true,
    aiAlerts: true,
    systemHealth: true,
    dailySummary: false,
    weeklyReport: true,
    email: true,
    dashboard: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggle = (key: keyof typeof notifs) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
    showToast("Preference updated");
  };

  const handleSignOutOther = () => {
    showToast("Signed out of all other sessions securely.");
  };

  return (
    <PageContainer title="Profile & System Settings">
      <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#2C221E] mb-1">Profile & System Settings</h1>
            <p className="text-sm text-[#6E5D53]">
              Manage your official identity, security preferences, government access and account activity.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#DCEDE3]/40 text-[#28765D] rounded-full border border-[#28765D]/20 font-bold">
              <span className="w-1.5 h-1.5 bg-[#28765D] rounded-full animate-pulse" />
              Active
            </span>
            <span className="flex items-center gap-1.5 text-[#B96D43] font-bold">
              <ShieldCheck className="w-4 h-4" />
              Verified Government Account
            </span>
          </div>
        </div>

        {/* Section 1: Profile & Identity */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#2C221E]">Profile & Identity</h2>
              <p className="text-xs text-[#6E5D53]">Official account information associated with this KRIYO administrator account.</p>
            </div>
            <button 
              onClick={() => setShowEditProfile(true)}
              className="px-4 py-2 bg-white text-[#B96D43] border border-[#B96D43]/30 rounded-lg text-xs font-bold hover:bg-[#B96D43]/5 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 bg-[#EFE7DA] border border-[#B96D43]/20 rounded-2xl flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-[#B96D43]/60" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 flex-1 w-full text-sm">
              <div>
                <div className="text-xs text-[#6E5D53] mb-1">Name</div>
                <div className="font-bold text-[#2C221E]">Admin Director</div>
              </div>
              <div>
                <div className="text-xs text-[#6E5D53] mb-1">Designation</div>
                <div className="font-bold text-[#2C221E] flex items-center gap-2">
                  Director — Handicrafts & Heritage Intelligence
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6E5D53] mb-1">Official Email</div>
                <div className="font-medium text-[#2C221E] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#B96D43]" />
                  admin@kriyo.gov.in
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6E5D53] mb-1">Office</div>
                <div className="font-medium text-[#2C221E] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B96D43]" />
                  New Delhi, India
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6E5D53] mb-1">Role</div>
                <div className="font-bold text-[#B96D43] flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  National Administrator
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6E5D53] mb-1">Account Status</div>
                <div className="font-bold text-[#28765D] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Section 2: Government Access */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-[#2C221E]">Government Access</h2>
              <p className="text-xs text-[#6E5D53]">Your authorized access scope within the KRIYO intelligence platform.</p>
            </div>
            <div className="px-3 py-1.5 bg-[#FFFDF8] border border-[#B96D43]/20 rounded-lg flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#B96D43]" />
              <span className="text-[10px] font-bold text-[#B96D43] tracking-widest uppercase">Authorized Government Access</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Organization</div>
              <div className="text-sm font-bold text-[#2C221E] flex items-center justify-between">
                Government of India
                <span className="text-[9px] bg-[#EFE7DA] text-[#6E5D53] px-1.5 py-0.5 rounded">Government Managed</span>
              </div>
            </div>
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Ministry</div>
              <div className="text-sm font-bold text-[#2C221E] flex items-center justify-between">
                Ministry of Textiles
                <span className="text-[9px] bg-[#EFE7DA] text-[#6E5D53] px-1.5 py-0.5 rounded">Government Managed</span>
              </div>
            </div>
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Department</div>
              <div className="text-sm font-bold text-[#2C221E] flex items-center justify-between">
                Handicrafts Div.
                <span className="text-[9px] bg-[#EFE7DA] text-[#6E5D53] px-1.5 py-0.5 rounded">Government Managed</span>
              </div>
            </div>
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Access Level</div>
              <div className="text-sm font-bold text-[#2C221E] flex items-center justify-between">
                National Admin
                <span className="text-[9px] bg-[#EFE7DA] text-[#6E5D53] px-1.5 py-0.5 rounded">Government Managed</span>
              </div>
            </div>
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Data Scope</div>
              <div className="text-sm font-bold text-[#2C221E] flex items-center justify-between">
                Pan-India
                <span className="text-[9px] bg-[#EFE7DA] text-[#6E5D53] px-1.5 py-0.5 rounded">Government Managed</span>
              </div>
            </div>
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Employee ID</div>
              <div className="text-sm font-bold text-[#2C221E] flex items-center justify-between">
                GOI-HTX-28491
                <span className="text-[9px] bg-[#EFE7DA] text-[#6E5D53] px-1.5 py-0.5 rounded">Government Managed</span>
              </div>
            </div>
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Authentication</div>
              <div className="text-sm font-bold text-[#2C221E]">Government SSO</div>
            </div>
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Account Verification</div>
              <div className="text-sm font-bold text-[#28765D] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Government Verified
              </div>
            </div>
            <div className="p-3 bg-white/50 border border-[#B96D43]/10 rounded-xl">
              <div className="text-[10px] font-bold text-[#6E5D53] uppercase tracking-wider mb-1">Access Status</div>
              <div className="text-sm font-bold text-[#28765D] flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#28765D] rounded-full" /> Active
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Section 3 & 4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 3: Security & Authentication */}
          <GlassCard className="p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-[#2C221E]">Security & Authentication</h2>
              <p className="text-xs text-[#6E5D53]">Manage your login security and sessions.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#B96D43]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DCEDE3]/50 flex items-center justify-center text-[#28765D]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#2C221E]">Two-Factor Authentication</div>
                    <div className="text-xs text-[#28765D] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Enabled
                    </div>
                  </div>
                </div>
                <button onClick={() => showToast("Manage 2FA dialog opened")} className="text-xs font-bold text-[#B96D43] hover:underline">Manage</button>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-[#B96D43]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DCEDE3]/50 flex items-center justify-center text-[#28765D]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#2C221E]">Government SSO</div>
                    <div className="text-xs text-[#28765D] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#6E5D53]">Last successful login:</span>
                  <span className="font-mono text-[#2C221E]">12 Sep 2026 • 02:36 AM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6E5D53]">Last failed login:</span>
                  <span className="font-mono text-[#B34F4F]">11 Sep 2026 • 09:14 PM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6E5D53]">Session timeout:</span>
                  <span className="font-mono text-[#2C221E]">30 minutes</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button onClick={() => showToast("Change password workflow initiated")} className="flex-1 py-2 bg-white border border-[#B96D43]/20 text-[#B96D43] rounded-lg text-xs font-bold hover:bg-[#B96D43]/5 transition-colors">
                  Change Password
                </button>
                <button onClick={() => showToast("Manage sessions opened")} className="flex-1 py-2 bg-white border border-[#B96D43]/20 text-[#B96D43] rounded-lg text-xs font-bold hover:bg-[#B96D43]/5 transition-colors">
                  Manage Sessions
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Section 4: Notifications */}
          <GlassCard className="p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-[#2C221E]">Notification Preferences</h2>
              <p className="text-xs text-[#6E5D53]">Manage alerts and intelligence summaries.</p>
            </div>
            
            <div className="space-y-3">
              {[
                { key: "critical", label: "Critical Risk Alerts", icon: AlertTriangle, color: "text-[#B34F4F]" },
                { key: "watchlist", label: "Intervention Watchlist Alerts", icon: Eye, color: "text-[#B96D43]" },
                { key: "aiAlerts", label: "AI Intelligence Alerts", icon: Activity, color: "text-[#B58A50]" },
                { key: "systemHealth", label: "System Health Alerts", icon: Server, color: "text-[#28765D]" },
                { key: "dailySummary", label: "Daily Intelligence Summary", icon: FileText, color: "text-[#6E5D53]" },
                { key: "weeklyReport", label: "Weekly Ecosystem Report", icon: FileSearch, color: "text-[#6E5D53]" },
                { key: "email", label: "Email Notifications", icon: Mail, color: "text-[#6E5D53]" },
                { key: "dashboard", label: "In-Dashboard Notifications", icon: Bell, color: "text-[#6E5D53]" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    <span className="text-sm text-[#2C221E] font-medium">{item.label}</span>
                  </div>
                  <Toggle enabled={notifs[item.key as keyof typeof notifs]} onChange={() => handleToggle(item.key as keyof typeof notifs)} />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Section 5: Audit & Compliance */}
        <GlassCard className="p-6 border-l-4 border-l-[#28765D]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-5">
            <div>
              <h2 className="text-base font-bold text-[#2C221E] flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-[#28765D]" />
                Audit & Compliance
              </h2>
              <p className="text-xs text-[#6E5D53] mt-1">Security, access and administrative activity are recorded for accountability and compliance.</p>
            </div>
            <button 
              onClick={() => setShowAuditLog(true)}
              className="px-4 py-2 bg-[#FFFDF8] border border-[#28765D]/30 text-[#28765D] rounded-lg text-xs font-bold hover:bg-[#28765D]/5 transition-colors whitespace-nowrap"
            >
              View Full Audit Log &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="px-3 py-2 bg-[#DCEDE3]/30 border border-[#28765D]/20 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#28765D]" />
              <div>
                <div className="text-[10px] text-[#6E5D53] font-bold uppercase">Audit Logging</div>
                <div className="text-xs font-bold text-[#28765D]">Enabled</div>
              </div>
            </div>
            <div className="px-3 py-2 bg-[#DCEDE3]/30 border border-[#28765D]/20 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#28765D]" />
              <div>
                <div className="text-[10px] text-[#6E5D53] font-bold uppercase">Data Access Logging</div>
                <div className="text-xs font-bold text-[#28765D]">Enabled</div>
              </div>
            </div>
            <div className="px-3 py-2 bg-[#DCEDE3]/30 border border-[#28765D]/20 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#28765D]" />
              <div>
                <div className="text-[10px] text-[#6E5D53] font-bold uppercase">Security Monitoring</div>
                <div className="text-xs font-bold text-[#28765D]">Active</div>
              </div>
            </div>
            <div className="px-3 py-2 bg-[#DCEDE3]/30 border border-[#28765D]/20 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#28765D]" />
              <div>
                <div className="text-[10px] text-[#6E5D53] font-bold uppercase">Compliance Status</div>
                <div className="text-xs font-bold text-[#28765D]">Operational</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#6E5D53] uppercase tracking-wider mb-3">Recent Account Activity</h3>
            <div className="space-y-2">
              {[
                { time: "12 Sep 2026 • 02:41 AM", action: "Viewed Risk & Revival", source: "103.119.56.2 (Gov VPN)", status: "Success", color: "text-[#28765D]" },
                { time: "12 Sep 2026 • 02:39 AM", action: "Exported Payout Ledger", source: "103.119.56.2 (Gov VPN)", status: "Success", color: "text-[#28765D]" },
                { time: "12 Sep 2026 • 02:36 AM", action: "Successful Government SSO login", source: "103.119.56.2 (Gov VPN)", status: "Success", color: "text-[#28765D]" },
                { time: "11 Sep 2026 • 09:14 PM", action: "Failed login attempt", source: "14.139.24.1 (Unknown)", status: "Failed", color: "text-[#B34F4F]" },
              ].map((log, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white/50 border border-[#B96D43]/10 rounded-lg text-sm">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#6E5D53] min-w-[150px]">{log.time}</span>
                    <span className="font-medium text-[#2C221E]">{log.action}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0 text-xs">
                    <span className="text-[#6E5D53] font-mono">{log.source}</span>
                    <span className={`font-bold ${log.color}`}>{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Section 6 & 7 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 6: Active Sessions */}
          <GlassCard className="p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-[#2C221E]">Active Sessions</h2>
              <p className="text-xs text-[#6E5D53]">Devices currently logged into this account.</p>
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="p-3 border border-[#B96D43]/20 bg-[#FFFDF8] rounded-xl flex items-start gap-3">
                <Laptop className="w-5 h-5 text-[#28765D] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#2C221E]">Chrome • Windows</span>
                    <span className="text-[10px] font-bold text-[#28765D] bg-[#DCEDE3]/60 px-2 py-0.5 rounded">Current Session</span>
                  </div>
                  <div className="text-xs text-[#6E5D53] mt-1">Government Network • New Delhi</div>
                  <div className="text-xs font-medium text-[#28765D] mt-1">Active now</div>
                </div>
              </div>

              <div className="p-3 border border-[#B96D43]/10 bg-white/50 rounded-xl flex items-start gap-3 opacity-80">
                <Laptop className="w-5 h-5 text-[#6E5D53] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#2C221E]">Microsoft Edge • Windows</div>
                  <div className="text-xs text-[#6E5D53] mt-1">Government Network • New Delhi</div>
                  <div className="text-xs font-medium text-[#6E5D53] mt-1">Last active: 2 hours ago</div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSignOutOther}
              className="w-full py-2.5 bg-white border border-[#B96D43]/30 text-[#2C221E] rounded-lg text-xs font-bold hover:bg-[#B96D43]/5 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out other sessions
            </button>
          </GlassCard>

          {/* Section 7: Data & Privacy */}
          <GlassCard className="p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-[#2C221E]">Data & Privacy</h2>
              <p className="text-xs text-[#6E5D53]">Platform telemetry and monitoring settings.</p>
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between p-3 border border-[#B96D43]/10 bg-white/50 rounded-lg">
                <span className="text-sm text-[#2C221E] font-medium">Data Access Logging</span>
                <span className="text-xs font-bold text-[#28765D] flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[#B96D43]/10 bg-white/50 rounded-lg">
                <span className="text-sm text-[#2C221E] font-medium">Analytics Telemetry</span>
                <span className="text-xs font-bold text-[#28765D] flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[#B96D43]/10 bg-white/50 rounded-lg">
                <span className="text-sm text-[#2C221E] font-medium">AI Decision Logging</span>
                <span className="text-xs font-bold text-[#28765D] flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[#B96D43]/10 bg-white/50 rounded-lg">
                <span className="text-sm text-[#2C221E] font-medium">Gov Compliance Mode</span>
                <span className="text-xs font-bold text-[#28765D] flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Enabled</span>
              </div>
            </div>

            <div className="p-3 bg-[#EFE7DA]/50 rounded-lg text-xs text-[#6E5D53] leading-relaxed border border-[#B96D43]/10">
              KRIYO records relevant administrative activity and data access events to support accountability, security monitoring and government audit requirements.
            </div>
          </GlassCard>

        </div>

        {/* Danger Zone */}
        <div className="mt-12">
          <h2 className="text-sm font-bold text-[#B34F4F] uppercase tracking-wider mb-3 ml-1">Administrative Actions</h2>
          <GlassCard className="p-6 border-l-4 border-l-[#B34F4F] bg-gradient-to-r from-[#B34F4F]/5 to-transparent">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#2C221E] font-medium max-w-lg">
                Account deactivation must be requested through your departmental IT administrator.
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => showToast("Signed out successfully")}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-[#B96D43]/30 text-[#2C221E] rounded-lg text-sm font-bold hover:bg-[#EFE7DA] transition-colors"
                >
                  Sign Out
                </button>
                <button 
                  onClick={() => setShowDeactivation(true)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-[#B34F4F]/10 border border-[#B34F4F]/30 text-[#B34F4F] rounded-lg text-sm font-bold hover:bg-[#B34F4F]/20 transition-colors"
                >
                  Request Account Deactivation
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* --- Modals & Toasts --- */}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#2C221E] text-white px-6 py-3 rounded-xl shadow-xl text-sm font-bold animate-in fade-in slide-in-from-bottom-4 z-50 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#B58A50]" />
          {toastMessage}
        </div>
      )}

      {/* Edit Profile Modal (Mock) */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <GlassCard className="w-full max-w-md p-6 bg-[#FFFCF7]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#2C221E]">Edit Profile</h3>
              <button onClick={() => setShowEditProfile(false)} className="text-[#6E5D53] hover:text-[#2C221E]"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#6E5D53] mb-1">Name</label>
                <input type="text" defaultValue="Admin Director" className="w-full px-3 py-2 bg-white border border-[#B96D43]/20 rounded-lg text-sm outline-none focus:border-[#B96D43]/60" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#6E5D53] mb-1">Official Email</label>
                <input type="email" defaultValue="admin@kriyo.gov.in" disabled className="w-full px-3 py-2 bg-[#EFE7DA]/50 border border-[#B96D43]/10 rounded-lg text-sm text-[#6E5D53] cursor-not-allowed" />
                <p className="text-[10px] text-[#B96D43] mt-1">Government managed field. Cannot be changed.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#6E5D53] mb-1">Department</label>
                <input type="text" defaultValue="Ministry of Textiles" disabled className="w-full px-3 py-2 bg-[#EFE7DA]/50 border border-[#B96D43]/10 rounded-lg text-sm text-[#6E5D53] cursor-not-allowed" />
              </div>

              <button 
                onClick={() => {
                  setShowEditProfile(false);
                  showToast("Profile updated successfully");
                }}
                className="w-full py-2.5 mt-2 bg-[#B96D43] text-white rounded-lg text-sm font-bold hover:bg-[#A35D38] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Audit Log Modal (Mock) */}
      {showAuditLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <GlassCard className="w-full max-w-2xl p-6 bg-[#FFFCF7] max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-5 shrink-0">
              <h3 className="text-lg font-bold text-[#2C221E] flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-[#28765D]" />
                Full Audit Log
              </h3>
              <button onClick={() => setShowAuditLog(false)} className="text-[#6E5D53] hover:text-[#2C221E]"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
               {Array.from({length: 15}).map((_, i) => (
                 <div key={i} className="p-3 border-b border-[#B96D43]/10 text-sm flex justify-between items-center">
                   <div>
                     <div className="font-medium text-[#2C221E]">System access event {1000 - i}</div>
                     <div className="text-xs text-[#6E5D53] font-mono mt-0.5">12 Sep 2026 • 103.119.56.{i}</div>
                   </div>
                   <span className="text-xs font-bold text-[#28765D]">Verified</span>
                 </div>
               ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Deactivation Modal (Mock) */}
      {showDeactivation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <GlassCard className="w-full max-w-md p-6 bg-[#FFFCF7] border-l-4 border-l-[#B34F4F]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#B34F4F]/10 flex items-center justify-center shrink-0">
                <Ban className="w-5 h-5 text-[#B34F4F]" />
              </div>
              <h3 className="text-lg font-bold text-[#2C221E]">Request Account Deactivation</h3>
            </div>
            
            <p className="text-sm text-[#6E5D53] mb-6">
              Government-managed accounts cannot be permanently deleted from this interface. 
              Submitting this request will alert your departmental IT administrator to initiate the offboarding protocol.
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeactivation(false)}
                className="flex-1 py-2.5 bg-white border border-[#B96D43]/30 text-[#2C221E] rounded-lg text-sm font-bold hover:bg-[#EFE7DA] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowDeactivation(false);
                  showToast("Deactivation request submitted to IT Admin.");
                }}
                className="flex-1 py-2.5 bg-[#B34F4F] text-white rounded-lg text-sm font-bold hover:bg-[#8B3D3D] transition-colors"
              >
                Submit Request
              </button>
            </div>
          </GlassCard>
        </div>
      )}

    </PageContainer>
  );
}
