'use client';


import Button from "./components/Button";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard/TaskCard";
import TodoList from "./components/TodoList";
import styles from "./page.module.scss";
import { Inter_Tight } from "next/font/google";

const inter_tight = Inter_Tight({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`${inter_tight.className} ${styles.container}`}>
      <Header />
      <TodoList />
    </main>
  );
}
