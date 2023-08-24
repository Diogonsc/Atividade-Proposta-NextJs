import React, { useState } from "react";
import styles from './styles.module.css';
import ChartBars from "@/components/ChartBars";
import ChartPie from "@/components/ChartPie";
import { Navbar } from "@/components/Navbar";

export default function index() {

  return (
    <main >
      <Navbar />
      <div className={styles.container}>
      <ChartPie />
      <ChartBars />
      </div>
    
    </main>
  );
}
