import Link from "next/link";
import styles from "../../styles/Main.module.css"

export const metadata = {
    title: "BookList",
}

const Url = "https://books-api.nomadcoders.workers.dev/lists";

async function getCategory() {
    const json = await fetch(Url).then((Response) => Response.json());
    return json;
}

export default async function homePage() {
    const categorys = await getCategory();
    const categoryList = categorys.results;
    return (
        <div>
            <h2 className={styles.title}>The New York Times Best Sellers</h2>
            <ul className={styles.categoryList}>
                {categoryList.map(book => (
                    <li key={book.list_name}>
                        <Link href={`/list/${book.list_name}`}>
                        {book.list_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}