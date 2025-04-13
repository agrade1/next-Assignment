"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/Navigation.module.css"

export default function Navigation(){
    const path = usePathname();

    return(
        <nav className={styles.gnb}>
            <ul className={styles.nav}>
                <li>
                    <Link href="/">Home</Link>    
                </li>
                <li>
                    <Link href="/about">About Us</Link>   
                </li>
            </ul>
        </nav>
    )
}