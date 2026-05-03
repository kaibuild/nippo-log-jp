export type FieldOption = {
  label: string;
  value: string;
};

export type ToolField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "checkbox-group";
  placeholder?: string;
  help?: string;
  rows?: number;
  min?: number;
  max?: number;
  defaultValue?: string | string[];
  options?: FieldOption[];
};

export type ToolExample = {
  label: string;
  values: Record<string, string | string[]>;
};

export type ToolConfig = {
  id: string;
  slug: string;
  title: string;
  h1: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  primaryKeyword: string;
  targetKeywords: string[];
  resultLabel: string;
  fields: ToolField[];
  options: FieldOption[];
  templates: string[];
  examples: ToolExample[];
  faq: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
  cta: string;
  seoBody: Array<{ heading: string; body: string }>;
  structuredData: {
    faqPage: boolean;
    webApplication: boolean;
  };
};

type RawToolConfig = Omit<
  ToolConfig,
  | "h1"
  | "metaDescription"
  | "targetKeywords"
  | "options"
  | "templates"
  | "cta"
  | "seoBody"
  | "structuredData"
>;

const ctaText = "無料テンプレートで始めて、チーム共有は日報ログへ。";

function buildOptions(fields: ToolField[]): FieldOption[] {
  return fields.flatMap((field) => field.options ?? []);
}

function buildSeoBody(tool: RawToolConfig): ToolConfig["seoBody"] {
  return [
    {
      heading: `${tool.shortTitle}で整理できること`,
      body: `${tool.description} フォーマットがばらつきやすい現場作業、小規模建設、設備保守、清掃、制作・運用チームで、作業内容の共有を軽くするためのたたき台として使えます。`
    },
    {
      heading: "入力内容の取り扱い",
      body: "入力内容はブラウザ内でテンプレートに差し込まれ、外部送信やサーバー保存、localStorage保存は行いません。結果はコピーして、Excelや社内ドキュメントに貼り付けて調整できます。"
    },
    {
      heading: "利用時の注意",
      body: "本ツールはチーム内の記録整理を支援する一般的な無料ツールです。勤怠、労務、法務、税務、医療、法定帳票の個別判断や完全な対応を保証するものではありません。"
    }
  ];
}

const rawTools: RawToolConfig[] = [
  {
    id: "workDailyReportTemplate",
    slug: "work-daily-report-template",
    title: "作業日報テンプレート作成ツール",
    shortTitle: "日報テンプレート",
    primaryKeyword: "作業日報 テンプレート",
    description:
      "現場名、作業内容、進捗、申し送りを入力して、共有しやすい作業日報テンプレートを作成します。",
    resultLabel: "作成された作業日報テンプレート",
    fields: [
      {
        id: "teamName",
        label: "会社名・チーム名",
        type: "text",
        placeholder: "例：緑町設備保守チーム"
      },
      {
        id: "reportDate",
        label: "日付",
        type: "text",
        placeholder: "例：2026年5月3日"
      },
      {
        id: "siteName",
        label: "現場・案件名",
        type: "text",
        placeholder: "例：中央ビル空調点検"
      },
      {
        id: "workers",
        label: "作業者",
        type: "text",
        placeholder: "例：田中、佐藤、鈴木"
      },
      {
        id: "workItems",
        label: "主な作業内容",
        type: "textarea",
        rows: 5,
        placeholder: "例：空調フィルター清掃\n室外機の動作確認\n管理室への報告"
      },
      {
        id: "progress",
        label: "進捗・結果",
        type: "textarea",
        rows: 3,
        placeholder: "例：予定範囲は完了。追加確認が1件あり、翌営業日に確認予定。"
      },
      {
        id: "handover",
        label: "申し送り・注意点",
        type: "textarea",
        rows: 3,
        placeholder: "例：3階系統の異音を次回点検時に再確認。"
      }
    ],
    examples: [
      {
        label: "設備保守の例",
        values: {
          teamName: "緑町設備保守チーム",
          reportDate: "2026年5月3日",
          siteName: "中央ビル空調点検",
          workers: "田中、佐藤",
          workItems: "空調フィルター清掃\n室外機の動作確認\n管理室への報告",
          progress: "予定していた点検範囲は完了。3階系統で軽微な異音を確認。",
          handover: "次回点検時に3階系統の稼働音を再確認する。"
        }
      }
    ],
    faq: [
      {
        question: "作成した日報は保存されますか？",
        answer:
          "保存されません。入力内容はブラウザ内でテンプレート化するだけで、サーバーへ送信しません。"
      },
      {
        question: "勤怠管理や法定帳票として使えますか？",
        answer:
          "このツールは作業内容の共有を支援する一般的なフォーマット作成ツールです。勤怠、労務、法定帳票の判断は専門家や社内規程を確認してください。"
      }
    ],
    relatedSlugs: [
      "daily-report-excel-columns-generator",
      "daily-report-writing-example-maker",
      "field-daily-report-checklist"
    ]
  },
  {
    id: "excelColumnsGenerator",
    slug: "daily-report-excel-columns-generator",
    title: "作業日報エクセル項目ジェネレーター",
    shortTitle: "Excel項目",
    primaryKeyword: "作業日報 エクセル 項目",
    description:
      "業種や運用に合わせて、Excelで日報を作るときの列項目と入力例を整理します。",
    resultLabel: "おすすめのExcel項目",
    fields: [
      {
        id: "industry",
        label: "業種・現場タイプ",
        type: "select",
        options: [
          { label: "現場作業", value: "現場作業" },
          { label: "小規模建設", value: "小規模建設" },
          { label: "設備保守", value: "設備保守" },
          { label: "清掃", value: "清掃" },
          { label: "制作・運用", value: "制作・運用" }
        ]
      },
      {
        id: "teamSize",
        label: "チーム人数",
        type: "number",
        min: 1,
        max: 200,
        placeholder: "例：8"
      },
      {
        id: "reportStyle",
        label: "日報の粒度",
        type: "select",
        options: [
          { label: "1日1行でまとめる", value: "daily-row" },
          { label: "作業ごとに複数行で記録", value: "task-row" },
          { label: "現場ごとに分けて記録", value: "site-row" }
        ]
      },
      {
        id: "needs",
        label: "入れたい項目",
        type: "checkbox-group",
        options: [
          { label: "写真メモ", value: "写真メモ" },
          { label: "承認欄", value: "承認欄" },
          { label: "申し送り", value: "申し送り" },
          { label: "月次集計用分類", value: "月次集計用分類" }
        ],
        defaultValue: ["申し送り", "月次集計用分類"]
      }
    ],
    examples: [
      {
        label: "小規模建設向け",
        values: {
          industry: "小規模建設",
          teamSize: "6",
          reportStyle: "task-row",
          needs: ["写真メモ", "承認欄", "申し送り"]
        }
      }
    ],
    faq: [
      {
        question: "この項目をそのままExcelに貼れますか？",
        answer:
          "結果にはCSV形式の見出しも含めています。Excelやスプレッドシートに貼り付けて調整できます。"
      },
      {
        question: "月次集計にも使えますか？",
        answer:
          "集計しやすい分類列を提案しますが、実際の集計方法はチームの運用に合わせて調整してください。"
      }
    ],
    relatedSlugs: [
      "work-daily-report-template",
      "monthly-work-daily-report-format",
      "construction-daily-report-template"
    ]
  },
  {
    id: "writingExampleMaker",
    slug: "daily-report-writing-example-maker",
    title: "作業日報の書き方例文メーカー",
    shortTitle: "書き方例文",
    primaryKeyword: "作業日報 書き方 例文",
    description:
      "作業内容、進捗、課題、明日の予定を入力して、日報に使いやすい例文を作成します。",
    resultLabel: "作業日報の例文",
    fields: [
      {
        id: "role",
        label: "担当・役割",
        type: "text",
        placeholder: "例：設備点検担当"
      },
      {
        id: "workSummary",
        label: "今日行った作業",
        type: "textarea",
        rows: 4,
        placeholder: "例：空調設備の点検、フィルター清掃、管理室への報告"
      },
      {
        id: "result",
        label: "結果・進捗",
        type: "textarea",
        rows: 3,
        placeholder: "例：予定分は完了。追加確認が1件残った。"
      },
      {
        id: "issue",
        label: "困ったこと・確認事項",
        type: "textarea",
        rows: 3,
        placeholder: "例：3階系統の稼働音が通常より大きい。"
      },
      {
        id: "nextPlan",
        label: "次回・明日の予定",
        type: "textarea",
        rows: 3,
        placeholder: "例：3階系統の再確認と、写真メモの整理。"
      },
      {
        id: "tone",
        label: "文体",
        type: "select",
        options: [
          { label: "簡潔", value: "簡潔" },
          { label: "丁寧", value: "丁寧" },
          { label: "箇条書き", value: "箇条書き" }
        ]
      }
    ],
    examples: [
      {
        label: "丁寧な例文",
        values: {
          role: "設備点検担当",
          workSummary: "空調設備の点検、フィルター清掃、管理室への報告",
          result: "予定していた点検範囲は完了しました。",
          issue: "3階系統の稼働音が通常より大きく感じられました。",
          nextPlan: "次回点検時に3階系統を再確認し、写真メモを整理します。",
          tone: "丁寧"
        }
      }
    ],
    faq: [
      {
        question: "例文はそのまま提出できますか？",
        answer:
          "たたき台として使い、実際の作業内容やチームの表現ルールに合わせて調整してください。"
      },
      {
        question: "作業内容が短くても使えますか？",
        answer:
          "短いメモでも、進捗、確認事項、次の予定に分けると共有しやすい日報になります。"
      }
    ],
    relatedSlugs: [
      "work-daily-report-template",
      "field-daily-report-checklist",
      "daily-report-excel-columns-generator"
    ]
  },
  {
    id: "constructionTemplate",
    slug: "construction-daily-report-template",
    title: "建設業向け作業日報テンプレート",
    shortTitle: "建設向け日報",
    primaryKeyword: "建設業 作業日報 テンプレート",
    description:
      "小規模建設現場での作業内容、人数、使用機材、申し送りを整理する一般的な日報フォーマットを作ります。",
    resultLabel: "建設現場向け日報テンプレート",
    fields: [
      {
        id: "projectName",
        label: "工事・案件名",
        type: "text",
        placeholder: "例：青葉町内装改修"
      },
      {
        id: "siteAddress",
        label: "現場名・場所",
        type: "text",
        placeholder: "例：青葉町テナント2階"
      },
      {
        id: "weather",
        label: "天候",
        type: "select",
        options: [
          { label: "晴れ", value: "晴れ" },
          { label: "曇り", value: "曇り" },
          { label: "雨", value: "雨" },
          { label: "その他", value: "その他" }
        ]
      },
      {
        id: "workers",
        label: "人数・担当",
        type: "text",
        placeholder: "例：大工2名、電気1名"
      },
      {
        id: "workItems",
        label: "作業内容",
        type: "textarea",
        rows: 5,
        placeholder: "例：下地補修\n配線確認\n資材搬入"
      },
      {
        id: "materials",
        label: "資材・機材",
        type: "textarea",
        rows: 3,
        placeholder: "例：石膏ボード、脚立、電動工具"
      },
      {
        id: "handover",
        label: "申し送り",
        type: "textarea",
        rows: 3,
        placeholder: "例：資材不足分を翌朝確認。"
      }
    ],
    examples: [
      {
        label: "内装改修の例",
        values: {
          projectName: "青葉町内装改修",
          siteAddress: "青葉町テナント2階",
          weather: "晴れ",
          workers: "大工2名、電気1名",
          workItems: "下地補修\n配線確認\n資材搬入",
          materials: "石膏ボード、脚立、電動工具",
          handover: "追加資材の数量を翌朝確認する。"
        }
      }
    ],
    faq: [
      {
        question: "建設業の法定帳票として使えますか？",
        answer:
          "このページは一般的な記録整理を支援するテンプレートです。法定帳票や契約上の提出書類としての適合性は、専門家や発注者の指定書式を確認してください。"
      },
      {
        question: "写真記録の欄はありますか？",
        answer:
          "写真メモ欄を含めたフォーマットを出力します。写真自体はアップロードせず、ファイル名や撮影場所のメモとして整理できます。"
      }
    ],
    relatedSlugs: [
      "field-daily-report-checklist",
      "daily-report-excel-columns-generator",
      "monthly-work-daily-report-format"
    ]
  },
  {
    id: "monthlyFormat",
    slug: "monthly-work-daily-report-format",
    title: "月次作業日報フォーマット作成ツール",
    shortTitle: "月次フォーマット",
    primaryKeyword: "作業日報 月次 フォーマット",
    description:
      "日々の日報を月次で振り返るための集計項目、週次メモ、改善メモのフォーマットを作ります。",
    resultLabel: "月次作業日報フォーマット",
    fields: [
      {
        id: "month",
        label: "対象月",
        type: "text",
        placeholder: "例：2026年5月"
      },
      {
        id: "teamName",
        label: "チーム名",
        type: "text",
        placeholder: "例：清掃Aチーム"
      },
      {
        id: "summaryGoal",
        label: "月次で見たいこと",
        type: "checkbox-group",
        options: [
          { label: "作業件数", value: "作業件数" },
          { label: "未完了・保留", value: "未完了・保留" },
          { label: "申し送り件数", value: "申し送り件数" },
          { label: "写真メモ", value: "写真メモ" },
          { label: "改善メモ", value: "改善メモ" }
        ],
        defaultValue: ["作業件数", "未完了・保留", "改善メモ"]
      },
      {
        id: "categories",
        label: "分類",
        type: "textarea",
        rows: 3,
        placeholder: "例：定期作業\n突発対応\n確認待ち"
      }
    ],
    examples: [
      {
        label: "清掃チームの例",
        values: {
          month: "2026年5月",
          teamName: "清掃Aチーム",
          summaryGoal: ["作業件数", "未完了・保留", "申し送り件数", "改善メモ"],
          categories: "定期作業\n突発対応\n確認待ち"
        }
      }
    ],
    faq: [
      {
        question: "月次集計は自動計算されますか？",
        answer:
          "このツールは集計フォーマットを作成します。集計値はExcelやスプレッドシート上で、チームの記録に合わせて入力してください。"
      },
      {
        question: "労働時間の管理に使えますか？",
        answer:
          "このツールは作業記録の整理用です。労働時間や勤怠の管理には、社内ルールや専門システムの確認が必要です。"
      }
    ],
    relatedSlugs: [
      "daily-report-excel-columns-generator",
      "work-daily-report-template",
      "field-daily-report-checklist"
    ]
  },
  {
    id: "fieldChecklist",
    slug: "field-daily-report-checklist",
    title: "現場作業日報チェックリスト",
    shortTitle: "日報チェックリスト",
    primaryKeyword: "現場作業 日報 チェックリスト",
    description:
      "現場の日報に抜け漏れが出やすい項目を、提出前に確認できるチェックリストとして整理します。",
    resultLabel: "提出前チェックリスト",
    fields: [
      {
        id: "siteType",
        label: "現場タイプ",
        type: "select",
        options: [
          { label: "現場作業", value: "現場作業" },
          { label: "設備保守", value: "設備保守" },
          { label: "清掃", value: "清掃" },
          { label: "制作・運用", value: "制作・運用" }
        ]
      },
      {
        id: "detailLevel",
        label: "確認の細かさ",
        type: "select",
        options: [
          { label: "標準", value: "標準" },
          { label: "詳しめ", value: "詳しめ" },
          { label: "短め", value: "短め" }
        ]
      },
      {
        id: "includes",
        label: "チェックしたい内容",
        type: "checkbox-group",
        options: [
          { label: "作業内容", value: "作業内容" },
          { label: "進捗", value: "進捗" },
          { label: "写真メモ", value: "写真メモ" },
          { label: "申し送り", value: "申し送り" },
          { label: "提出前確認", value: "提出前確認" }
        ],
        defaultValue: ["作業内容", "進捗", "申し送り", "提出前確認"]
      },
      {
        id: "teamRule",
        label: "チーム内の記録ルール",
        type: "textarea",
        rows: 3,
        placeholder: "例：写真ファイル名に現場名と日付を入れる。"
      }
    ],
    examples: [
      {
        label: "設備保守の例",
        values: {
          siteType: "設備保守",
          detailLevel: "詳しめ",
          includes: ["作業内容", "進捗", "写真メモ", "申し送り", "提出前確認"],
          teamRule: "写真ファイル名に現場名と日付を入れる。確認待ちは申し送り欄にまとめる。"
        }
      }
    ],
    faq: [
      {
        question: "提出前チェックは何に役立ちますか？",
        answer:
          "作業内容、進捗、申し送りなどの抜け漏れを減らし、チーム内の記録整理を進めやすくします。"
      },
      {
        question: "チェック結果は保存されますか？",
        answer:
          "保存されません。チェックリストはブラウザ内で作成され、入力内容は外部へ送信されません。"
      }
    ],
    relatedSlugs: [
      "work-daily-report-template",
      "daily-report-writing-example-maker",
      "construction-daily-report-template"
    ]
  }
];

export const tools: ToolConfig[] = rawTools.map((tool) => ({
  ...tool,
  h1: tool.title,
  metaDescription: `${tool.description} 入力内容はブラウザ内で処理され、外部送信や保存は行いません。`,
  targetKeywords: [tool.primaryKeyword, tool.title, tool.shortTitle, "作業日報 無料ツール"],
  options: buildOptions(tool.fields),
  templates: [tool.resultLabel, `${tool.shortTitle}の入力フォーム`, `${tool.shortTitle}のコピー用出力`],
  cta: ctaText,
  seoBody: buildSeoBody(tool),
  structuredData: {
    faqPage: true,
    webApplication: true
  }
}));

export const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

export function getTool(slug: string): ToolConfig | undefined {
  return toolBySlug.get(slug);
}
