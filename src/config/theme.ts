export const themeConfig = {
  cookie: {
    light: {
      primary: {
        from: "from-emerald-600",
        to: "to-teal-600",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: "text-emerald-600",
        badge: {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
        },
      },
    },
    dark: {
      primary: {
        from: "from-emerald-400",
        to: "to-teal-400",
        bg: "bg-emerald-900/30",
        text: "text-emerald-300",
        border: "border-emerald-800",
        icon: "text-emerald-400",
        badge: {
          bg: "bg-emerald-900/30",
          text: "text-emerald-300",
          border: "border-emerald-800",
        },
      },
    },
  },
  privacy: {
    light: {
      primary: {
        from: "from-blue-600",
        to: "to-purple-600",
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: "text-blue-600",
        badge: {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
        },
      },
    },
    dark: {
      primary: {
        from: "from-blue-400",
        to: "to-purple-400",
        bg: "bg-blue-900/30",
        text: "text-blue-300",
        border: "border-blue-800",
        icon: "text-blue-400",
        badge: {
          bg: "bg-blue-900/30",
          text: "text-blue-300",
          border: "border-blue-800",
        },
      },
    },
  },
  terms: {
    light: {
      primary: {
        from: "from-indigo-600",
        to: "to-violet-600",
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        icon: "text-indigo-600",
        badge: {
          bg: "bg-indigo-50",
          text: "text-indigo-700",
          border: "border-indigo-200",
        },
      },
    },
    dark: {
      primary: {
        from: "from-indigo-400",
        to: "to-violet-400",
        bg: "bg-indigo-900/30",
        text: "text-indigo-300",
        border: "border-indigo-800",
        icon: "text-indigo-400",
        badge: {
          bg: "bg-indigo-900/30",
          text: "text-indigo-300",
          border: "border-indigo-800",
        },
      },
    },
  },
} as const;

export type PolicyType = keyof typeof themeConfig;
