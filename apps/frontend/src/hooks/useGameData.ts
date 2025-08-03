import { useEffect, useState } from "react";
import { useQuery, useSubscription } from "urql";
import { SudokuCell } from "../graphql/graphql";
import { SudokuCellData } from "../types/game";
import { graphql } from "../graphql/gql";

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
          isEditable,
          annotations {
            matrix
          }
        }
      }
    }
`);

const subscribeToCellChangesDocument = graphql(`
subscription onCellValueUpdated($gameId: ID!){
  onCellValueUpdated(gameId: $gameId){
    row,
    column,
    value,
    isValid
  }
}
`);

const subscribeToAnnotationChangesDocument = graphql(`
subscription onCellAnnotationsUpdated($gameId: ID!){
  onCellAnnotationsUpdated(gameId: $gameId){
    row,
    column,
    annotations {
      matrix
    }
  }
}
`);

export const useGameData = (gameId: string) => {
  const [sudokuCells, setSudokuCells] = useState<SudokuCellData[] | null>(null);

  const [{ data, fetching, error }] = useQuery({
    query: sudokuGetGameQueryDocument,
    variables: { gameId },
  });

  const [{ data: subscriptionData }] = useSubscription(
    { query: subscribeToCellChangesDocument, variables: { gameId } },
    (_, res) => res
  );

  const [{ data: annotationSubscriptionData }] = useSubscription(
    { query: subscribeToAnnotationChangesDocument, variables: { gameId } },
    (_, res) => res
  );

  useEffect(() => {
    if (data?.game?.board) {
      setSudokuCells(data.game.board.map((cell: any) => cell as SudokuCell));
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData?.onCellValueUpdated) {
      const { row, column, value, isValid } = subscriptionData.onCellValueUpdated;
      setSudokuCells(prevBoard =>
        prevBoard &&
        prevBoard.map(cell => {
          if (cell?.row === row && cell?.column === column) {
            return { ...cell, value, isValid };
          }
          return cell;
        })
      );
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (annotationSubscriptionData?.onCellAnnotationsUpdated) {
      const { row, column, annotations } = annotationSubscriptionData.onCellAnnotationsUpdated;
      setSudokuCells(prevBoard =>
        prevBoard &&
        prevBoard.map(cell => {
          if (cell?.row === row && cell?.column === column) {
            return { ...cell, annotations };
          }
          return cell;
        })
      );
    }
  }, [annotationSubscriptionData]);

  return {
    game: data?.game || null,
    sudokuCells,
    loading: fetching,
    error: error || null,
  };
};