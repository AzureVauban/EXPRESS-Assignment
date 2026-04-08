// Run in terminal: npm init -y && npm install express
const express = require("express");
const app = express();
const PORT = 3003;

app.use(express.json());

// Add minimal CORS handler as specified [5]
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  );
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

//? Initialize the book inventory array with the provided data
let books = [
  {
    id: "1",
    title: "Reactions in REACT",
    author: "Ben Dover",
    publisher: "Random House",
    isbn: "978-3-16-148410-0",
    avail: true,
    who: "",
    due: "",
  },
  {
    id: "2",
    title: "Express-sions",
    author: "Frieda Livery",
    publisher: "Chaotic House",
    isbn: "978-3-16-148410-2",
    avail: true,
    who: "",
    due: "",
  },
  {
    id: "3",
    title: "Restful REST",
    author: "Al Gorithm",
    publisher: "ACM",
    isbn: "978-3-16-143310-1",
    avail: true,
    who: "",
    due: "",
  },
  {
    id: "4",
    title: "See Essess",
    author: "Anna Log",
    publisher: "O'Reilly",
    isbn: "987-6-54-148220-1",
    avail: false,
    who: "Homer",
    due: "1/1/23",
  },
  {
    id: "5",
    title: "Scripting in JS",
    author: "Dee Gital",
    publisher: "IEEE",
    isbn: "987-6-54-321123-1",
    avail: false,
    who: "Marge",
    due: "1/2/23",
  },
  {
    id: "6",
    title: "Be An HTML Hero",
    author: "Jen Neric",
    publisher: "Coders-R-Us",
    isbn: "987-6-54-321123-2",
    avail: false,
    who: "Lisa",
    due: "1/3/23",
  },
];

// GET /books - returns list of all books (title & id)
app.get("/books", (req, res) => {
  const avail = req.query.avail;

  if (avail === "true") {
    // Return only available books
    const availableBooks = books.filter((book) => book.avail === true);
    res.json(
      availableBooks.map((book) => ({ id: book.id, title: book.title })),
    );
  } else if (avail === "false") {
    // Return only checked out books
    const checkedOutBooks = books.filter((book) => book.avail === false);
    res.json(
      checkedOutBooks.map((book) => ({ id: book.id, title: book.title })),
    );
  } else {
    // Return all books
    res.json(books.map((book) => ({ id: book.id, title: book.title })));
  }
});

// GET /books/:id - returns all details for a specific book
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// POST /books - add a new book
app.post("/books", (req, res) => {
  const { id, title, author, publisher, isbn, avail, who, due } = req.body;

  // Check if book with this id already exists
  if (books.find((b) => b.id === id)) {
    res.status(403).json({ error: "Book with this id already exists" });
    return;
  }

  const newBook = {
    id: id || "",
    title: title || "",
    author: author || "",
    publisher: publisher || "",
    isbn: isbn || "",
    avail: avail !== undefined ? avail : true,
    who: who || "",
    due: due || "",
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update a book
app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  // Update only the provided fields
  if (req.body.title !== undefined) book.title = req.body.title;
  if (req.body.author !== undefined) book.author = req.body.author;
  if (req.body.publisher !== undefined) book.publisher = req.body.publisher;
  if (req.body.isbn !== undefined) book.isbn = req.body.isbn;
  if (req.body.avail !== undefined) book.avail = req.body.avail;
  if (req.body.who !== undefined) book.who = req.body.who;
  if (req.body.due !== undefined) book.due = req.body.due;

  res.status(200).json(book);
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === req.params.id);

  if (index === -1) {
    res.status(204).send();
    return;
  }

  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
