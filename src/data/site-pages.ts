import type { Locale } from "@/i18n/routing";

export type SitePage = {
  /** Matches the directory under src/app/[locale], or "home" for the index route. */
  id: string;
  /** Locale-less path; the locale prefix is added wherever the page is linked. */
  path: string;
  titles: Record<Locale, string>;
  blurbs: Record<Locale, string>;
  /** Indexed but never displayed — the words people search with rather than the words on the page. */
  keywords?: Record<Locale, string[]>;
  /** Help articles worth offering alongside this page. */
  related?: string[];
};

/**
 * The marketing routes, written by hand rather than derived from src/messages.
 *
 * Deriving looks tempting and does not survive contact with the data: the message keys are
 * machine-generated, no per-page description leaf exists, many values carry rich-text markup,
 * and site.titles is missing contact and help. Writing the table out also lets each page
 * declare the words people actually search with and the help articles it pairs with, which
 * no derivation rule could produce.
 *
 * Adding a route under src/app/[locale] means adding it here too — assertPageCoverage() in
 * retrieval.ts fails loudly in development when the two drift apart.
 */
export const SITE_PAGES: SitePage[] = [
  {
    id: "home",
    path: "",
    titles: { en: "Pulse", ja: "Pulse" },
    blurbs: {
      en: "What Pulse is: a context AI agent that prepares you before a meeting, takes notes during it, and drafts the follow-up afterwards.",
      ja: "Pulseの概要。会議の前に準備し、会議中にノートを取り、終わったあとのフォローアップまで下書きするコンテキストAIエージェントです。",
    },
    keywords: {
      en: ["what is pulse", "overview", "product", "about", "how it works", "ai notepad"],
      ja: ["pulseとは", "概要", "製品", "できること", "仕組み", "AIノート"],
    },
    related: ["getting-started/first-time-setup"],
  },
  {
    id: "notepad",
    path: "/notepad",
    titles: { en: "The notepad", ja: "ノートパッド" },
    blurbs: {
      en: "How capture works: transcription on your device, your own notes alongside it, terminology, and the follow-up Pulse drafts from them.",
      ja: "記録の仕組み。デバイス上での文字起こし、自分のメモとの併記、用語辞書、そこから作成されるフォローアップまで。",
    },
    keywords: {
      en: ["notepad", "transcription", "notes", "recording", "capture", "follow up", "terminology"],
      ja: ["ノート", "文字起こし", "メモ", "録音", "記録", "フォローアップ", "用語"],
    },
    related: ["taking-notes/transcription"],
  },
  {
    id: "integrations",
    path: "/integrations",
    titles: { en: "Integrations", ja: "連携" },
    blurbs: {
      en: "The tools Pulse connects to: CRM, email and chat, knowledge bases, calendars, project trackers and AI assistants.",
      ja: "Pulseが連携するツール。CRM、メールとチャット、ナレッジベース、カレンダー、プロジェクト管理、AIアシスタント。",
    },
    keywords: {
      en: ["integration", "connect", "salesforce", "hubspot", "slack", "notion", "zoom", "teams", "google meet", "calendar", "crm", "api"],
      ja: ["連携", "接続", "セールスフォース", "ハブスポット", "スラック", "ノーション", "ズーム", "チームズ", "カレンダー", "CRM", "API"],
    },
    related: ["sharing/sharing-notes"],
  },
  {
    id: "pricing",
    path: "/pricing",
    titles: { en: "Pricing", ja: "料金" },
    blurbs: {
      en: "Plans and what each one includes: the free trial, Business per user per month, and Enterprise.",
      ja: "プランと各プランの内容。無料トライアル、ユーザー単位の月額であるBusiness、そしてEnterprise。",
    },
    keywords: {
      en: ["price", "pricing", "cost", "how much", "plan", "billing", "payment", "subscription", "free", "trial", "enterprise", "business"],
      ja: ["料金", "価格", "値段", "いくら", "費用", "プラン", "請求", "支払い", "契約", "無料", "トライアル", "月額"],
    },
    related: ["managing-your-account/subscriptions-and-billing"],
  },
  {
    id: "enterprise",
    path: "/enterprise",
    titles: { en: "Enterprise", ja: "Enterprise" },
    blurbs: {
      en: "Rolling Pulse out across an organisation: administration, deployment support and bespoke integration work.",
      ja: "組織全体へのPulse導入。管理機能、導入支援、個別の連携開発について。",
    },
    keywords: {
      en: ["enterprise", "rollout", "deployment", "admin", "administration", "sso", "organisation", "team", "procurement"],
      ja: ["エンタープライズ", "導入", "展開", "管理", "組織", "全社", "調達"],
    },
  },
  {
    id: "security",
    path: "/security",
    titles: { en: "Security", ja: "セキュリティ" },
    blurbs: {
      en: "How Pulse handles recordings and data: it runs on your device and does not join meetings as a bot, plus how third-party providers and model training are handled.",
      ja: "録音とデータの取り扱い。Pulseはデバイス上で動作し、ボットとして会議に参加しません。外部プロバイダーやモデル学習の扱いも記載しています。",
    },
    keywords: {
      en: ["security", "privacy", "data", "bot", "meeting bot", "consent", "recording", "encryption", "training", "compliance", "vulnerability"],
      ja: ["セキュリティ", "プライバシー", "データ", "ボット", "同意", "録音", "暗号化", "学習", "コンプライアンス", "脆弱性"],
    },
    related: ["consent-security-privacy/getting-consent", "consent-security-privacy/our-security-standards"],
  },
  {
    id: "help",
    path: "/help",
    titles: { en: "Help centre", ja: "ヘルプセンター" },
    blurbs: {
      en: "Every guide, from first-time setup to troubleshooting, sharing and account management.",
      ja: "初期設定からトラブルシューティング、共有、アカウント管理まで、すべてのガイド。",
    },
    keywords: {
      en: ["help", "support", "guide", "documentation", "docs", "how to", "manual", "faq"],
      ja: ["ヘルプ", "サポート", "ガイド", "ドキュメント", "使い方", "マニュアル", "よくある質問"],
    },
  },
  {
    id: "contact",
    path: "/contact",
    titles: { en: "Contact us", ja: "お問い合わせ" },
    blurbs: {
      en: "Talk to the team about a trial, a rollout, or anything the help centre does not cover.",
      ja: "トライアル、導入、ヘルプセンターに載っていないことについて、担当者にご相談いただけます。",
    },
    keywords: {
      en: ["contact", "talk to", "sales", "email", "support", "get in touch", "question", "ask"],
      ja: ["問い合わせ", "連絡", "相談", "営業", "メール", "質問"],
    },
  },
  {
    id: "demo",
    path: "/demo",
    titles: { en: "Book a demo", ja: "デモを予約" },
    blurbs: {
      en: "See Pulse walked through on a real workflow with someone from the team.",
      ja: "実際のワークフローに沿って、担当者がPulseをご説明します。",
    },
    keywords: {
      en: ["demo", "demonstration", "book", "walkthrough", "meeting", "call"],
      ja: ["デモ", "予約", "説明", "商談"],
    },
  },
  {
    id: "waitlist",
    path: "/waitlist",
    titles: { en: "Waitlist", ja: "ウェイトリスト" },
    blurbs: {
      en: "Join the waitlist to be told when Pulse opens up.",
      ja: "Pulseの提供開始をお知らせするウェイトリストにご登録いただけます。",
    },
    keywords: {
      en: ["waitlist", "sign up", "early access", "join", "register"],
      ja: ["ウェイトリスト", "登録", "先行", "申し込み"],
    },
  },
  {
    id: "customers",
    path: "/customers",
    titles: { en: "Use cases", ja: "活用シーン" },
    blurbs: {
      en: "How different teams put Pulse to work day to day.",
      ja: "さまざまなチームが日々の業務でPulseをどう使っているか。",
    },
    keywords: {
      en: ["use case", "customers", "examples", "stories", "who uses"],
      ja: ["活用", "事例", "導入事例", "お客様", "使い方"],
    },
  },
  {
    id: "careers",
    path: "/careers",
    titles: { en: "Careers", ja: "採用" },
    blurbs: {
      en: "Working at UNCHAIN, and the roles currently open.",
      ja: "UNCHAINで働くことと、現在募集中のポジション。",
    },
    keywords: {
      en: ["careers", "jobs", "hiring", "work", "role", "vacancy", "apply"],
      ja: ["採用", "求人", "募集", "キャリア", "応募"],
    },
  },
  {
    id: "privacy",
    path: "/privacy",
    titles: { en: "Privacy policy", ja: "プライバシーポリシー" },
    blurbs: {
      en: "The privacy policy for Pulse and the UNCHAIN website.",
      ja: "PulseおよびUNCHAINウェブサイトのプライバシーポリシー。",
    },
    keywords: {
      en: ["privacy", "policy", "gdpr", "personal data", "data protection"],
      ja: ["プライバシー", "ポリシー", "個人情報", "保護"],
    },
  },
  {
    id: "terms",
    path: "/terms",
    titles: { en: "Terms of service", ja: "利用規約" },
    blurbs: {
      en: "The terms that govern using Pulse.",
      ja: "Pulseのご利用にあたっての規約。",
    },
    keywords: {
      en: ["terms", "conditions", "legal", "agreement", "contract", "tos"],
      ja: ["規約", "利用規約", "法的", "契約"],
    },
  },
  {
    id: "solutions-sales",
    path: "/solutions-sales",
    titles: { en: "Pulse for sales", ja: "営業向けPulse" },
    blurbs: {
      en: "Briefs before customer calls, notes during them, and CRM updates and follow-up email afterwards.",
      ja: "商談前のブリーフ、商談中のノート、そして商談後のCRM更新とフォローアップメール。",
    },
    keywords: {
      en: ["sales", "selling", "deal", "pipeline", "crm", "prospect", "account executive"],
      ja: ["営業", "セールス", "商談", "案件", "パイプライン", "顧客"],
    },
  },
  {
    id: "solutions-customer-success",
    path: "/solutions-customer-success",
    titles: { en: "Pulse for customer success", ja: "カスタマーサクセス向けPulse" },
    blurbs: {
      en: "Keeping the history of every account in one place, so renewals and check-ins start prepared.",
      ja: "アカウントごとの履歴を一箇所にまとめ、更新面談や定例を準備された状態で始められます。",
    },
    keywords: {
      en: ["customer success", "csm", "renewal", "churn", "account", "onboarding", "support"],
      ja: ["カスタマーサクセス", "CS", "更新", "解約", "オンボーディング", "顧客対応"],
    },
  },
  {
    id: "solutions-product",
    path: "/solutions-product",
    titles: { en: "Pulse for product and engineering", ja: "プロダクト開発向けPulse" },
    blurbs: {
      en: "Turning user interviews, planning sessions and reviews into decisions the team can find again.",
      ja: "ユーザーインタビュー、計画、レビューを、あとから探せる決定事項に変えます。",
    },
    keywords: {
      en: ["product", "engineering", "user research", "interview", "planning", "standup", "retro", "decision"],
      ja: ["プロダクト", "開発", "ユーザー調査", "インタビュー", "計画", "定例", "意思決定"],
    },
  },
  {
    id: "solutions-marketing",
    path: "/solutions-marketing",
    titles: { en: "Pulse for marketing", ja: "マーケティング向けPulse" },
    blurbs: {
      en: "Keeping what customers actually say close to the people writing about the product.",
      ja: "お客様が実際に話した言葉を、製品について書く人の手元に残します。",
    },
    keywords: {
      en: ["marketing", "campaign", "content", "messaging", "positioning", "voice of customer"],
      ja: ["マーケティング", "施策", "コンテンツ", "メッセージ", "顧客の声"],
    },
  },
  {
    id: "solutions-operations",
    path: "/solutions-operations",
    titles: { en: "Pulse for operations", ja: "経営・業務向けPulse" },
    blurbs: {
      en: "Decisions, owners and next steps captured from the meetings that set them.",
      ja: "意思決定、担当者、次のアクションを、それらが決まった会議から記録します。",
    },
    keywords: {
      en: ["operations", "ops", "management", "process", "leadership", "board", "planning"],
      ja: ["業務", "経営", "オペレーション", "管理", "プロセス", "経営会議"],
    },
  },
  {
    id: "solutions-hr",
    path: "/solutions-hr",
    titles: { en: "Pulse for HR and talent", ja: "採用・人事向けPulse" },
    blurbs: {
      en: "Interview notes and one-to-ones written up consistently, without typing through the conversation.",
      ja: "面接や1on1の記録を、会話中にタイピングすることなく一貫した形で残せます。",
    },
    keywords: {
      en: ["hr", "talent", "recruiting", "interview", "candidate", "one to one", "1on1", "people"],
      ja: ["人事", "採用", "面接", "候補者", "1on1", "評価"],
    },
  },
];

export const pageById = (id: string): SitePage | undefined => SITE_PAGES.find((page) => page.id === id);
