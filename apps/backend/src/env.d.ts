declare module 'bun' {
  type Env = {
    SUDOKU_GAMES_FILE_PATH: string | undefined;
    FRONTEND_DIRECTORY: string | undefined;
  };
}
