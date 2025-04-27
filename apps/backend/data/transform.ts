import fs from 'fs';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const main = async (): Promise<number> => {
  // Open (or create) the SQLite database
  const db = await open({
    filename: './mydatabase.db', // Database file path
    driver: sqlite3.Database,
  });

  // Create the puzzles table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS puzzles (
      id INTEGER PRIMARY KEY,
      puzzle TEXT,
      solution TEXT,
      clues INTEGER,
      difficulty REAL
    );
  `);

  // Read the CSV file "abc.csv" (assumed to be in the same directory as the script)
  const csvFilePath = path.join('data', 'sudoku-3m.csv');
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');
  const lines = csvData.trim().split('\n');

  // Remove header line
  const header = lines.shift();
  if (!header) {
    console.error('CSV file is empty or missing header.');
    return 1;
  }

  // Process each line and insert into the database
  for (const line of lines) {
    // Split line by comma
    // Note: This simple parser assumes that field values do not contain commas.
    const [id, puzzle, solution, clues, difficulty] = line.split(',');

    await db.run(
      `INSERT INTO puzzles (id, puzzle, solution, clues, difficulty)
       VALUES (?, ?, ?, ?, ?)`,
      [
        parseInt(id ?? '', 10),
        puzzle,
        solution,
        parseInt(clues ?? '', 10),
        parseFloat(difficulty ?? ''),
      ]
    );
  }

  console.log('CSV data imported successfully.');
  await db.close();
  return 0;
};

main().catch((error) => {
  console.error('Error importing CSV data:', error);
  process.exit(1);
});
