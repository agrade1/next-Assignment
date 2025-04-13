import styles from "../../styles/About.module.css"

export const metadata = {
    title: "About",
}
export default function homePage() {
    return (
        <div>
            <h2 className={styles.title}>About us</h2>
            <p className={styles.text}>Welcome to the official explorer for The New York Times Best Seller list explorer. </p>
            <p className={styles.text}>We hope you enjoy your stay!</p>
        </div>
    )
}