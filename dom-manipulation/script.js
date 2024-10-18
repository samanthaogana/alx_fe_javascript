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

function displayrandomQuote() {
    const quoteList = document.getElementById('quotelist');
    quoteList.innerHTML = '';

    quotes.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = `"${quote.text}" - ${quote.category}`;
        quoteList.appendChild(listItem);
    });

    function createAddQuoteForm() {
        const form = document.createElement('div');
        
        const inputText = document.createElement('input');
        inputText.id = 'newQuoteText';
        inputText.type = 'text';
        inputText.placeholder = 'Enter a new quote';
        
        const inputCategory = document.createElement('input');
        inputCategory.id = 'newQuoteCategory';
        inputCategory.type = 'text';
        inputCategory.placeholder = 'Enter quote category';
    
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Quote';
        addButton.onclick = addQuote;
    
        form.appendChild(inputText);
        form.appendChild(inputCategory);
        form.appendChild(addButton);
    
        document.body.appendChild(form);
    }
    
}