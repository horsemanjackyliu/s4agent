import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import FeedListItem from "sap/m/FeedListItem";
import List from "sap/m/List";
import Input from "sap/m/Input";
import ScrollContainer from "sap/m/ScrollContainer";
import CustomListItem from "sap/m/CustomListItem";
import VBox from "sap/m/VBox";
import Text from "sap/m/Text";
import HTML from "sap/ui/core/HTML";

/**
 * @namespace com.sap.salesclerkai.controller
 */
export default class Main extends BaseController {
    private threadId: string = crypto.randomUUID();

    public onInit(): void {
        const model = new JSONModel({ sendEnabled: true });
        this.getView()?.setModel(model);
    }

    public async onSend(): Promise<void> {
        const input = this.byId("messageInput") as Input;
        const message = input.getValue().trim();
        if (!message) return;

        input.setValue("");
        this.setSendEnabled(false);
        this.appendMessage("user", message);

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, threadId: this.threadId })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({ error: response.statusText }));
                this.appendMessage("assistant", `Error: ${err.error ?? response.statusText}`);
            } else {
                const data = await response.json() as { reply: string };
                this.appendMessage("assistant", data.reply);
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            this.appendMessage("assistant", `Network error: ${msg}`);
        } finally {
            this.setSendEnabled(true);
            this.scrollToBottom();
        }
    }

    private appendMessage(role: "user" | "assistant", text: string): void {
        const list = this.byId("chatList") as List;

        if (role === "user") {
            const item = new FeedListItem({
                sender: "You",
                text,
                showIcon: false,
                senderActive: false,
                timestamp: new Date().toLocaleTimeString()
            });
            item.addStyleClass("salesClerkUserMessage");
            list.addItem(item);
        } else {
            const label = new Text({ text: `Sales Clerk AI  ·  ${new Date().toLocaleTimeString()}` });
            label.addStyleClass("salesClerkAILabel");

            const htmlContent = new HTML({
                content: `<div class="salesClerkAIText">${this.markdownToHtml(text)}</div>`
            });

            const vbox = new VBox({ items: [label, htmlContent] });
            const item = new CustomListItem({ content: [vbox] });
            item.addStyleClass("salesClerkAssistantMessage");
            list.addItem(item);
        }

        this.scrollToBottom();
    }

    private markdownToHtml(md: string): string {
        const lines = md.split("\n");
        const out: string[] = [];
        let inList = false;

        const escape = (s: string) =>
            s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const inline = (s: string) =>
            escape(s)
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/`(.*?)`/g, "<code>$1</code>");

        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            const trimmed = line.trim();

            // Table: header row followed by separator |---|
            if (trimmed.startsWith("|") && i + 1 < lines.length && /^\|[\s\-|:]+\|/.test(lines[i + 1].trim())) {
                if (inList) { out.push("</ul>"); inList = false; }
                const thStyle = 'style="background:#0070f2;color:#fff;text-align:left;padding:6px 10px;font-weight:600;white-space:nowrap"';
                const headers = trimmed.split("|").filter(c => c.trim())
                    .map(c => `<th ${thStyle}>${inline(c.trim())}</th>`).join("");
                out.push(`<table style="border-collapse:collapse;width:100%;margin:8px 0;font-size:0.875rem"><thead><tr>${headers}</tr></thead><tbody>`);
                i += 2; // skip separator row
                let rowIndex = 0;
                while (i < lines.length && lines[i].trim().startsWith("|")) {
                    const bg = rowIndex % 2 === 1 ? "background:#eef2fa;" : "";
                    const tdStyle = `style="${bg}border-bottom:1px solid #e0e5ee;padding:6px 10px;vertical-align:top"`;
                    const cells = lines[i].trim().split("|").filter(c => c.trim())
                        .map(c => `<td ${tdStyle}>${inline(c.trim())}</td>`).join("");
                    out.push(`<tr>${cells}</tr>`);
                    i++; rowIndex++;
                }
                out.push("</tbody></table>");
                continue;
            }

            // Headers (shift h1→h3, h2→h4, h3→h5 to avoid visual clash with page title)
            const hMatch = trimmed.match(/^(#{1,3}) (.+)/);
            if (hMatch) {
                if (inList) { out.push("</ul>"); inList = false; }
                const level = hMatch[1].length + 2;
                out.push(`<h${level}>${inline(hMatch[2])}</h${level}>`);
                i++; continue;
            }

            // Bullet / numbered list
            const bulletMatch = trimmed.match(/^[-*] (.+)/);
            const numMatch = trimmed.match(/^\d+\. (.+)/);
            if (bulletMatch || numMatch) {
                if (!inList) { out.push("<ul>"); inList = true; }
                out.push(`<li>${inline((bulletMatch ?? numMatch)![1])}</li>`);
                i++; continue;
            }

            // Close list
            if (inList) { out.push("</ul>"); inList = false; }

            // Empty line
            if (trimmed === "") { out.push("<br/>"); i++; continue; }

            // Plain paragraph
            out.push(`<p>${inline(trimmed)}</p>`);
            i++;
        }

        if (inList) out.push("</ul>");
        return out.join("");
    }

    private setSendEnabled(enabled: boolean): void {
        const model = this.getView()?.getModel() as JSONModel;
        model?.setProperty("/sendEnabled", enabled);
    }

    private scrollToBottom(): void {
        const scroll = this.byId("chatScrollContainer") as ScrollContainer;
        setTimeout(() => {
            const dom = scroll?.getDomRef();
            if (dom) dom.scrollTop = dom.scrollHeight;
        }, 100);
    }
}
