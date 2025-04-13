import styles from "../../../../styles/BookList.module.css"

const Url = "https://books-api.nomadcoders.workers.dev/list?name=";

interface Book {
    title: string;
    author: string;
    publisher: string;
    book_image: string;
    description: string;
    buy_links: {
        name: string;
        url: string;
    }[];
}

interface Props {
    params: {
        category: string;
    };
}

export async function generateMetadata(props: Props) {
    const category = decodeURIComponent(props.params.category);
    return {
      title: category,
    };
  }

async function getBookList(category: string) {
    const json = await fetch(`${Url}${category}`).then((Response) => Response.json());
    return json;
}

export default async function BookCategoryPage({ params }: Props) {
    const category = decodeURIComponent(params.category);
    const bookList = await getBookList(category);
    const books = bookList.results.books;

    return (
        <div>
            <h2 className={styles.title}>{decodeURIComponent(category)}</h2>
            <ul className={styles.bookList}>
                {books.map((book: Book) => (
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