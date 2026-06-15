export type ParsedCommit = {
    hash: string;
    type: string;
    scope?: string;
    message: string;
};
export declare function parseLogLine(line: string): ParsedCommit | null;
export declare function groupByType(commits: ParsedCommit[]): Map<string, ParsedCommit[]>;
export declare function formatChangelog(groups: Map<string, ParsedCommit[]>, options?: {
    title?: string;
    from?: string;
}): string;
//# sourceMappingURL=changelog.d.ts.map