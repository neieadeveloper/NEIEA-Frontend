// Regex se links identify karke clickable <a> banayenge
export default function renderWithLinks(inputText) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return inputText.split(urlRegex).map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-medium hover:text-blue-800"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
}