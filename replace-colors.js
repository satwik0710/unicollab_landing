const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk(componentsDir, function (filePath) {
    if (filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content
            .replace(/\btext-white\b/g, 'text-[var(--white)]')
            .replace(/\btext-slate-[234]00\b/g, 'text-[var(--text-muted)]')
            .replace(/\btext-slate-500\b/g, 'text-[var(--text-muted)]')
            .replace(/\bbg-white\/10\b/g, 'bg-[var(--text-main)]/10')
            .replace(/\bbg-white\/20\b/g, 'bg-[var(--text-main)]/20')
            .replace(/\bbg-white\/5\b/g, 'bg-[var(--text-main)]/5')
            .replace(/\bbg-black\/20\b/g, 'bg-[var(--bg-page)]/80')
            .replace(/\bbg-black\/40\b/g, 'bg-[var(--bg-page)]/80')
            .replace(/\bbg-slate-900\/80\b/g, 'bg-[var(--bg-card)]/80')
            .replace(/\bborder-white\/10\b/g, 'border-[var(--text-main)]/10')
            .replace(/\bborder-white\/20\b/g, 'border-[var(--text-main)]/20')
            .replace(/\bg-[var(--white)]\/10\b/g, 'bg-[var(--text-main)]/10');

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
