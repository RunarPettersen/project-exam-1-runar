export function truncateText(text, limit) {
    if (text.length <= limit) {
        return text;
    }

    const truncated = text.substring(0, limit);

    const lastSentenceEnd = Math.max(
        truncated.lastIndexOf('.'),
        truncated.lastIndexOf('!'),
        truncated.lastIndexOf('?')
    );

    if (lastSentenceEnd > 0) {
        return truncated.substring(0, lastSentenceEnd + 1) + '';
    } else {
        return truncated + '...';
    }
}