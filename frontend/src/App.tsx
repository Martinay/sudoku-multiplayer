import './App.css'
import SudokuGrid from './components/sudoku/grid'
import { graphql } from './graphql/gql'
import { useMutation, useQuery } from 'urql'

const sudokuGetGameQueryDocument = graphql(`
query getGame($gameId : ID!){
  game(id: $gameId){
    id,
    board{
      row,
      column,
      value,
      isValid,
      isEditable
    }
  }
}
`)


const updateCellValueMutationDocument = graphql(`
mutation updateCellValue($gameId : ID!, $row: Int!, $column: Int!, $newValue: Int){
  updateCellValue(gameId: $gameId, row:$row, column: $column, value: $newValue)
}
  `)

function App() {  
  const [{ data }] = useQuery({
    query: sudokuGetGameQueryDocument,
    variables: {      
      gameId: '0196522b-409b-7000-873a-58035a88d516'
    }
  })
  const board = data?.game?.board;
  const [, updateCellValue] = useMutation(
    updateCellValueMutationDocument
  )

  async function onSudokuCellUpdated(row: number, column: number, value: number | null): void {
    await updateCellValue({
      gameId: '0196522b-409b-7000-873a-58035a88d516',
      row: row,
      column: column,
      newValue: value})
  }

  return (
    <div>
      {board && <SudokuGrid board={board} onCellUpdate={onSudokuCellUpdated}/>}
    </div>
  )
}

export default App
