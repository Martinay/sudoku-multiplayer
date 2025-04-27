import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useSubscription } from "urql";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { SudokuGrid } from "../components/SudokuGrid";
import { NumberPad } from "../components/NumberPad";
import { graphql } from "../graphql/gql";
import { SudokuCell } from "../graphql/graphql";

const sudokuGetGameQueryDocument = graphql(`
    query getGame($gameId : ID!){
      game(id: $gameId){
        id,
        difficulty,
        board{
          row,
          column,
          value,
          isValid,
          isEditable
        }
      }
    }
`);

const updateCellValueMutationDocument = graphql(`
    mutation updateCellValue($gameId : ID!, $row: Int!, $column: Int!, $newValue: Int){
        updateCellValue(gameId: $gameId, row:$row, column: $column, value: $newValue)
    }
`);

const subscribeToCellChangesDocument = graphql(`
subscription onCellValueUpdated($gameId: ID!){
  onCellValueUpdated(gameId: $gameId){
    row,
    column,
    value
  }
}
`);

export default function Game() {
  const { gameId } = useParams();
  if (!gameId) throw new Error("Game ID is required in the route");

  const [{ data, fetching }] = useQuery({
    query: sudokuGetGameQueryDocument,
    variables: { gameId: gameId },
  });
  const [, updateCellValue] = useMutation(updateCellValueMutationDocument);
  const [{ data: subscriptionData }] = useSubscription(
    { query: subscribeToCellChangesDocument, variables: { gameId } },
    (prev, res) => res
  );

  const [selected, setSelected] = useState<{ row: number; column: number } | null>(null);
  const [sudokuCells, setSudokuCells] = useState<SudokuCell[] | null>(null);

  useEffect(() => {
    if (data?.game?.board) {
      setSudokuCells(data.game.board.map(cell => cell as SudokuCell));
    }
  }, [data]);

  const handleNumberClick = (value: number) => {
    if (selected && gameId) {
      updateCellValue({
        gameId,
        row: selected.row,
        column: selected.column,
        newValue: value === 0 ? null : value,
      });
    }
  };

  useEffect(() => {
    console.log("Subscription data:", subscriptionData);
    if (subscriptionData?.onCellValueUpdated) {
      const { row, column, value } = subscriptionData.onCellValueUpdated;
      setSudokuCells(prevBoard =>
        prevBoard &&
        prevBoard.map(cell => {
          if (cell?.row === row && cell?.column === column) {
            return { ...cell, value };
          }
          return cell;
        })
      );
    }
  }, [subscriptionData]);

  const game = data?.game;

  if (fetching || !game || sudokuCells === null) return <Spinner mt={40} size="xl" color="orange.500" />;

  return (
    <Box textAlign="center" mt={10}>
      <Heading mb={6}>Game #{game.id}</Heading>
      <Text>Difficulty: {game.difficulty} / 10 </Text>
      <SudokuGrid board={sudokuCells} selected={selected} onSelect={(row, column) => setSelected({ row: row, column: column })} />
      <NumberPad onClick={handleNumberClick} />
    </Box>
  );
}
