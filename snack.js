const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];

/* Snack 1 - Filtra e Modifica
    Crea un array (longBooks) con i libri che hanno più di 300 pagine;
    Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
    Stampa in console ogni titolo nella console.
*/

const longBooks = books.filter(book => book.pages > 300)
const longBooksTitles = longBooks.map(book => book.title)

console.log('Libri lunghi:', longBooks)
console.log('Titoli dei libri:', longBooksTitles)


/* Snack 2 - Il primo libro scontato
    Creare un array (availableBooks) che contiene tutti i libri disponibili.
    Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
    Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).
*/

const availableBooks = books.filter(book => book.available === true)
const discountedBooks = availableBooks.map(book => {
    const price = parseFloat(book.price)
    const discount = (price * 20 / 100)
    return (price - discount).toFixed(2)
})

const fullPricedBook = discountedBooks.find(book => Number.isInteger(parseFloat(book)))

console.log('Libri disponibili:', availableBooks)
console.log('Libri scontati:', discountedBooks)
console.log('Libro a prezzo intero:', fullPricedBook)


/* Snack 3 - Ordinare gli Autori
    Creare un array (authors) che contiene gli autori dei libri.
    Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
    Ordina l’array authors in base all’età, senza creare un nuovo array.
    (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
*/

const authors = books.map(book => book.author)
const areAuthorsAdults = authors.every(author => author.age >= 18)
authors.sort((a, b) => a.age < b.age)

console.log('Autori per età decrescente:', authors)
console.log('Autori tutti maggiorenni?:', areAuthorsAdults)


/* Snack 4 - Calcola l’età media
    Creare un array (ages) che contiene le età degli autori dei libri.
    Calcola la somma delle età (agesSum) usando reduce.
    Stampa in console l’età media degli autori dei libri.
*/

const ages = books.map(book => book.author.age)
const agesSum = ages.reduce((acc, curr) => acc + curr, 0)
const agesAverage = agesSum / ages.length

console.log('Età degli autori:', ages)
console.log('Somma delle età:', agesSum)
console.log('Età media degli autori:', agesAverage)


/* Snack 5 (Bonus) - Raccogli i libri
Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} 
// usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) 
// che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
Testala con l’array [2, 13, 7, 21, 19] .
*/

async function getBooks(ids) {
    // Aspetto che tutte le operazioni siano completate
    const books = await Promise.all(
        // Async perchè map , non aspetta il completamento delle operazioni asincrone
        ids.map(async id => {
            try {
                // Aspetto tutte le risposte HTTP
                const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/books/${id}`)
                if (!res.ok) throw new Error(`Errore nel recupero del libro con id ${id}`)
                // Aspetto che tutti i risultatoi siano convertiti in JSON
                return await res.json();
            } catch (err) {
                console.error(`Errore per il libro con id ${id}:`, err.message)
            }
        })
    );
    return books
}

getBooks([2, 13, 7, 21, 19]).then(books => console.log(books))


/* Snack 6 (Bonus) - Ordina i libri
    Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
    Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
    Ordina l’array booksByPrice in base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.
*/

const areThereAvailableBooks = books.some(book => book.available === true)
const booksByPrice = books.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
booksByPrice.sort((a, b) => b.available - a.available)

console.log('Almeno un libro è disponibile?:', areThereAvailableBooks)
console.log('Libri ordinati per prezzo in base a disponibilità:', booksByPrice)


/* Snack 7 (Bonus) - Analizza i tag
Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.
*/

const tagCounts = books.reduce((acc, book) => {
    book.tags.forEach(tag => {
        if (acc[tag]) {
            acc[tag]++
        } else {
            acc[tag] = 1
        }
    })
    return acc
}, {})

console.log('Conteggio dei tag:', tagCounts)