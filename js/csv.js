class CSV {
    static _VALUE_SPLITER_REGEXP = /"((?:(?<=\\)"|[^"])*)"(?:,|$)/g;
    static _ROW_SPLITTER_REGEXP = /\r?\n|\r\n?/g;

    /**
     * @param {string} data
     * @return {string[][]}
     */
    static parse(data) {};
    /**
     * @param {string} data
     * @param {false} header
     * @return {string[][]}
     */
    static parse(data, header) {};
    /**
     * @param {string} data
     * @param {true} header
     * @return {{header: string[]; data: string[][]}}}
     */
    static parse(data, header) {};
    /**
     * @template T
     * @param {string} data
     * @param {false} header
     * @param {(line: string[]) => T} transformer
     * @return {T[]}
     */
    static parse(data, header, transformer) {};
    /**
     * @template T
     * @param {string} data
     * @param {true} header
     * @param {(line: string[]) => T} transformer
     * @return {{header: string[]; data: T[]}}}
     */
    static parse(data, header, transformer) {};
    /**
     * @template T
     * @param {string} data 
     * @param {boolean} [header]
     * @param {(line: string[]) => T} [transformer]
     * @returns {string[][] | T[] | {header: string[]; data: string[][] | T[]}}}
     */
    static parse(data, header = false, transformer) {        
        const lines = data.split(CSV._ROW_SPLITTER_REGEXP);
        let parsedHeader = [];
        const parsed = [];
        let idx = 0;
        if (header) {
            for (const regRes of lines[idx++].matchAll(CSV._VALUE_SPLITER_REGEXP)){
                parsedHeader.push(regRes[1]);
            }
        }
        for (; idx < lines.length; ++idx) {
            const line = [];
            for (const regRes of lines[idx].matchAll(CSV._VALUE_SPLITER_REGEXP)){
                line.push(regRes[1]);
            }
            parsed.push(line);
        }
        return parsedHeader ? { header: parsedHeader, data: parsed } : parsed;
    }
}