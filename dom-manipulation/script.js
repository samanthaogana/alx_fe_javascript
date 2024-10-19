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
        addButton.addEventListener('click', function() {
        const newQuoteText = document.getElementById('newQuoteText').value;
        const newQuoteCategory = document.getElementById('newQuoteCategory').value;

        const exportButton = document.createElement('button');
        exportButton.textContent = 'Export Quotes';
        exportButton.addEventListener('click', exportQuotes);

        const importFileInput = document.createElement('input');
        importFileInput.type = 'file';
        importFileInput.id = 'importFile';
        importFileInput.accept = '.json';
        importFileInput.addEventListener('change', importFromJsonFile);
        });

        form.appendChild(inputText);
        form.appendChild(inputCategory);
        form.appendChild(addButton);
    
        document.body.appendChild(form);
    }
    
    function populateCategories() {
        const categoryFilter = document.getElementById('categoryFilter');
        const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

        
     categoryFilter.innerHTML = '<option value="all">All Categories</option>'

     uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    
      categoryFilter.value = loadFilterFromLocalStorage();
    }

    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value;
        const newQuoteCategory = document.getElementById('newQuoteCategory').value;
      
        if (newQuoteText.trim() !== '' && newQuoteCategory.trim() !== '') {
          const newQuote = { text: newQuoteText, category: newQuoteCategory };
          quotes.push(newQuote);
          saveQuotesToLocalStorage();
      
          
          const categories = [...new Set(quotes.map(quote => quote.category))];  
          saveCategoriesToLocalStorage(categories);  
          populateCategories();  
          filterQuotes();  
         
      
          document.getElementById('newQuoteText').value = '';
          document.getElementById('newQuoteCategory').value = '';
        } else {
          alert('Please fill out both fields.');
        }
      }
      

    }

    function quoteDisplay(filteredQuotes) {
      const quoteList = document.getElementById('quoteList');
      quoteList.innerHTML = '';
      filteredQuotes.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = `"${quote.text}" - ${quote.category}`;
        quoteList.appendChild(listItem);
      });
    }
    
    function filterQuotes() {
      const selectedCategory = document.getElementById('categoryFilter').value;
      saveFilterToLocalStorage(selectedCategory);
    
      if (selectedCategory === 'all') {
        quoteDisplay(quotes);
      } else {
        const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
        quoteDisplay(filteredQuotes);
      }  


    const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Working hard for something you hate is called stress. Working hard for something you love is called passion.", category: "Motivational" },
    { text: "One of the greatest regrets in life is being what others would want you to be, rather than being yourself.", category: "Inspirational" },
    { text: "Life moves pretty fast. If you don't stop and look around for a while, you could miss it.", category: "Life" }
    ];

    function saveQuotesToLocalStorage() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function saveFilterToLocalStorage(filter) {
        localStorage.setItem('selectedFilter', filter);
      }
      
      function loadFilterFromLocalStorage() {
        return localStorage.getItem('selectedFilter') || 'all';
      }

    function exportQuotes() {
        const dataStr = JSON.stringify(quotes);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'quotes.json';
        downloadLink.click();

  URL.revokeObjectURL(url); 
}
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
}