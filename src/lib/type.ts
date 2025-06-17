export type StatusType = "draft" | "published" | "archived";
export type PolicyType = "term" | "privacy" | "cookie";

export interface Policy {
  id: string;
  title: string;
  user_id: string;
  markdown: string;
  status?: StatusType | null;
  inputs?: string | null;
  effect_date?: Date | string | null;
  policy_type: PolicyType;
  view_count?: number;
  created_at: Date | string;
  updated_at?: Date | string | null;
}

export type User = {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatar?: string;
  permissions?: string[];
  preferences?: Record<string, FIX_ME>;
};
