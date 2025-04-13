import styles from "../../../../styles/BookList.module.css";
import type { Metadata } from "next";

const Url = "https://books-api.nomadcoders.workers.dev/list?name=";

export async function generateMetadata({ params }) {
  const category = decodeURIComponent(params.category);
  return {
    title: category,
  };
}

async function getBookList(category: string) {
  const res = await fetch(`${Url}${category}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Page({ params }) {
  const category = decodeURIComponent(params.category);
  const bookList = await getBookList(category);
  const books = bookList.results.books;

  return (
    <div>
      <h2 className={styles.title}>{category}</h2>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <li key={book.title}>
            {book.book_image ? (
              <img src={book.book_image} alt={book.title} />
            ) : (
              <div className={styles.noImg}>NO IMAGE</div>
            )}
            <div className={styles.title}>{book.title}</div>
            <div className={styles.author}>Author : {book.author}</div>
            <div className={styles.publisher}>Publisher : {book.publisher}</div>
            <span className={styles.linkTitle}>Buy Links</span>
            <div className={styles.links}>
              {book.buy_links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
