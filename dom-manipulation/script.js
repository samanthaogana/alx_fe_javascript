const quotes = [
    { text: "Working hard for something you hate is called stress. Working hard for something you love is called passion.", category: "Motivational" },
    { text: "One of the greatest regrets in life is being what others would want you to be, rather than being yourself.", category: "Inspirational" },
    { text: "Life moves pretty fast. If you don't stop and look around for a while, you could miss it.", category: "Life" }
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    console.log(`"${randomQuote.text}" - ${randomQuote.category}`);

    
}

