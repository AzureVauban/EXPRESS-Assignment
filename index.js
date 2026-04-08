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

//? Implement GET /books to retrieve all books [5]
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

//?Implement GET /books/:id to retrieve a specific book [5]
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.status(200).json(book);
});

//? Implement POST /books to create a new book [5]
app.post("/books", (req, res) => {
  const { id, title, author, publisher, isbn, avail, who, due } = req.body;
  if (books.some((b) => b.id === id))
    return res.status(403).json({ error: "Book already exists" });

  const newBook = { id, title, author, publisher, isbn, avail, who, due };
  books.push(newBook);
  res.status(201).json(newBook);
});

//?Implement PUT /books/:id to update a book [5]
app.put("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books[index] = { ...books[index], ...req.body };
  res.status(200).json(books[index]);
});

//? Implement DELETE /books/:id to remove a book [5]
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.status(204).send();

  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
