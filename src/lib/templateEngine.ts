export type ToolInputMap = Record<string, string | string[]>;

const fallback = "未入力";

function value(data: ToolInputMap, key: string, defaultValue = fallback): string {
  const raw = data[key];
  if (Array.isArray(raw)) {
    return raw.length > 0 ? raw.join("、") : defaultValue;
  }
  return raw && raw.trim() ? raw.trim() : defaultValue;
}

function listValue(data: ToolInputMap, key: string): string[] {
  const raw = data[key];
  if (Array.isArray(raw)) {
    return raw.filter(Boolean);
  }
  if (!raw) {
    return [];
  }
  return raw
    .split(/\n|,|、/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function lines(data: ToolInputMap, key: string): string[] {
  const raw = data[key];
  if (Array.isArray(raw)) {
    return raw.filter(Boolean);
  }
  return (raw || "")
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function bullets(items: string[], empty = "- 未入力"): string {
  return items.length > 0 ? items.map((item) => `- ${item}`).join("\n") : empty;
}

function checked(items: string[]): string {
  return items.length > 0 ? items.map((item) => `□ ${item}`).join("\n") : "□ 未入力";
}

function csvRow(items: string[]): string {
  return items.map((item) => `"${item.replaceAll('"', '""')}"`).join(",");
}

function buildWorkDailyReportTemplate(data: ToolInputMap): string {
  return `# 作業日報

## 基本情報
- 会社名・チーム名：${value(data, "teamName")}
- 日付：${value(data, "reportDate")}
- 現場・案件名：${value(data, "siteName")}
- 作業者：${value(data, "workers")}

## 本日の作業内容
${bullets(lines(data, "workItems"))}

## 進捗・結果
${value(data, "progress")}

## 申し送り・注意点
${value(data, "handover")}

## 確認欄
- 記入者：＿＿＿＿＿＿＿＿
- 確認者：＿＿＿＿＿＿＿＿
- チーム内共有：□ 未共有　□ 共有済み

注記：このテンプレートは作業内容の共有を支援する一般的な記録フォーマットです。勤怠、労務、法定帳票の判断を保証するものではありません。`;
}

function buildExcelColumns(data: ToolInputMap): string {
  const industry = value(data, "industry");
  const needs = listValue(data, "needs");
  const style = value(data, "reportStyle");
  const baseColumns = [
    "日付",
    "現場・案件名",
    "担当者",
    "作業分類",
    "作業内容",
    "進捗",
    "完了・保留",
    "申し送り",
    "確認者"
  ];

  if (industry === "小規模建設") {
    baseColumns.splice(4, 0, "人数・担当", "資材・機材");
  }

  if (industry === "設備保守") {
    baseColumns.splice(4, 0, "対象設備", "点検結果");
  }

  if (needs.includes("写真メモ")) {
    baseColumns.push("写真メモ", "写真ファイル名");
  }

  if (needs.includes("承認欄")) {
    baseColumns.push("承認状況", "承認日");
  }

  if (needs.includes("月次集計用分類")) {
    baseColumns.push("月次分類", "集計メモ");
  }

  return `# 作業日報Excel項目案

- 業種・現場タイプ：${industry}
- チーム人数：${value(data, "teamSize", "未設定")}
- 記録の粒度：${style}

## 見出し
${baseColumns.map((column, index) => `${index + 1}. ${column}`).join("\n")}

## CSV見出し
${csvRow(baseColumns)}

## 入力例
- 作業分類：定期作業 / 突発対応 / 確認待ち
- 進捗：完了 / 継続 / 保留
- 申し送り：次回確認したい内容、注意点、共有事項を短く記録

注記：項目案はチーム内の記録整理を支援するものです。運用ルールや提出先の指定書式がある場合は、そちらを優先して調整してください。`;
}

function buildWritingExample(data: ToolInputMap): string {
  const tone = value(data, "tone", "簡潔");

  if (tone === "箇条書き") {
    return `# 作業日報の例文

- 担当：${value(data, "role")}
- 本日の作業：${value(data, "workSummary")}
- 結果・進捗：${value(data, "result")}
- 確認事項：${value(data, "issue")}
- 次回予定：${value(data, "nextPlan")}

## まとめ文
本日は${value(data, "workSummary")}を行いました。${value(data, "result")}確認事項として、${value(data, "issue")}があります。次回は${value(data, "nextPlan")}を予定しています。

注記：例文はたたき台です。実際の作業内容、社内表現、共有先に合わせて調整してください。`;
  }

  if (tone === "丁寧") {
    return `# 作業日報の例文

本日は${value(data, "role")}として、${value(data, "workSummary")}を行いました。
結果として、${value(data, "result")}

確認事項は「${value(data, "issue")}」です。
次回は${value(data, "nextPlan")}を進める予定です。

注記：例文は作業内容の共有を支援する文章案です。実際の記録として使う際は、事実関係とチーム内ルールに合わせて確認してください。`;
  }

  return `# 作業日報の例文

本日は${value(data, "workSummary")}を実施しました。${value(data, "result")}
確認事項は${value(data, "issue")}です。次回は${value(data, "nextPlan")}を予定しています。

注記：例文は一般的な日報作成を支援するものです。必要に応じて表現を調整してください。`;
}

function buildConstructionTemplate(data: ToolInputMap): string {
  return `# 建設現場向け 作業日報

## 基本情報
- 工事・案件名：${value(data, "projectName")}
- 現場名・場所：${value(data, "siteAddress")}
- 天候：${value(data, "weather")}
- 人数・担当：${value(data, "workers")}

## 作業内容
${bullets(lines(data, "workItems"))}

## 使用した資材・機材
${bullets(lines(data, "materials"))}

## 写真メモ
- 写真1：＿＿＿＿＿＿＿＿
- 写真2：＿＿＿＿＿＿＿＿
- 写真3：＿＿＿＿＿＿＿＿

## 申し送り
${value(data, "handover")}

## 確認欄
- 記入者：＿＿＿＿＿＿＿＿
- 現場内確認：＿＿＿＿＿＿＿＿

注記：このフォーマットは小規模現場の記録整理を支援する一般的なテンプレートです。法定帳票、契約上の提出書類、労務判断への適合性を保証するものではありません。`;
}

function buildMonthlyFormat(data: ToolInputMap): string {
  const goals = listValue(data, "summaryGoal");
  const categories = lines(data, "categories");

  return `# 月次作業日報フォーマット

## 基本情報
- 対象月：${value(data, "month")}
- チーム名：${value(data, "teamName")}

## 月次で確認する項目
${checked(goals)}

## 分類
${bullets(categories)}

## 週次メモ
### 第1週
- 主な作業：
- 未完了・確認待ち：
- 申し送り：

### 第2週
- 主な作業：
- 未完了・確認待ち：
- 申し送り：

### 第3週
- 主な作業：
- 未完了・確認待ち：
- 申し送り：

### 第4週
- 主な作業：
- 未完了・確認待ち：
- 申し送り：

## 月次まとめ
- よく発生した作業：
- 保留が残った内容：
- 次月に改善したいこと：

## 集計表の見出し
${csvRow(["分類", ...goals, "メモ"])}

注記：このフォーマットは作業記録の振り返りを支援するものです。勤怠、労働時間、法務、税務の判断を提供するものではありません。`;
}

function buildFieldChecklist(data: ToolInputMap): string {
  const includes = listValue(data, "includes");
  const detailLevel = value(data, "detailLevel");
  const baseItems = [
    "日付、現場名、担当者が入っている",
    "作業内容が第三者にも伝わる粒度で書かれている",
    "完了、継続、保留の状態が分かる",
    "次回確認したい内容が申し送りにまとまっている"
  ];

  if (includes.includes("写真メモ")) {
    baseItems.push("写真メモに撮影場所や対象が書かれている");
  }

  if (detailLevel === "詳しめ") {
    baseItems.push("作業前後の違い、追加確認、関係者への共有状況が補足されている");
  }

  if (detailLevel === "短め") {
    baseItems.splice(2, 1, "完了または保留の状態が書かれている");
  }

  return `# 現場作業日報チェックリスト

- 現場タイプ：${value(data, "siteType")}
- 確認の細かさ：${detailLevel}

## 提出前チェック
${checked(baseItems)}

## 今回重視する内容
${checked(includes)}

## チーム内ルール
${value(data, "teamRule", "チーム内の記録ルールをここに記入してください。")}

## 共有前のひとこと確認
- 読む人が次の行動を判断できる内容になっているか
- 確認待ちの内容が埋もれていないか
- 写真や別資料がある場合、参照先が分かるか

注記：このチェックリストはチーム内の記録整理を支援するものです。労務、法務、医療、税務などの個別判断を提供するものではありません。`;
}

export function buildToolOutput(toolId: string, data: ToolInputMap): string {
  switch (toolId) {
    case "workDailyReportTemplate":
      return buildWorkDailyReportTemplate(data);
    case "excelColumnsGenerator":
      return buildExcelColumns(data);
    case "writingExampleMaker":
      return buildWritingExample(data);
    case "constructionTemplate":
      return buildConstructionTemplate(data);
    case "monthlyFormat":
      return buildMonthlyFormat(data);
    case "fieldChecklist":
      return buildFieldChecklist(data);
    default:
      return "ツール設定が見つかりませんでした。";
  }
}
