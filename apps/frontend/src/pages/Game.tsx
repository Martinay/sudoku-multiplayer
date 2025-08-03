import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useSubscription } from "urql";
import { Box, Heading, Spinner, VStack, HStack, Button } from "@chakra-ui/react";
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
          isEditable,
          annotations {
            matrix
          }
        }
      }
    }
`);

const updateCellValueMutationDocument = graphql(`
    mutation updateCellValue($gameId : ID!, $row: Int!, $column: Int!, $newValue: Int){
        updateCellValue(gameId: $gameId, row:$row, column: $column, value: $newValue)
    }
`);

const updateCellAnnotationsMutationDocument = graphql(`
    mutation updateCellAnnotations($gameId : ID!, $row: Int!, $column: Int!, $annotations: SudokuCellAnnotationsInput!){
        updateCellAnnotations(gameId: $gameId, row:$row, column: $column, annotations: $annotations)
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

export default function Game() {
  const { gameId } = useParams();
  if (!gameId) throw new Error("Game ID is required in the route");

  const [{ data, fetching }] = useQuery({
    query: sudokuGetGameQueryDocument,
    variables: { gameId: gameId },
  });
  const [, updateCellValue] = useMutation(updateCellValueMutationDocument);
  const [, updateCellAnnotations] = useMutation(updateCellAnnotationsMutationDocument);
  const [{ data: subscriptionData }] = useSubscription(
    { query: subscribeToCellChangesDocument, variables: { gameId } },
    (_, res) => res
  );
  const [{ data: annotationSubscriptionData }] = useSubscription(
    { query: subscribeToAnnotationChangesDocument, variables: { gameId } },
    (_, res) => res
  );

  const [selected, setSelected] = useState<{ row: number; column: number } | null>(null);
  const [sudokuCells, setSudokuCells] = useState<SudokuCell[] | null>(null);
  const [mode, setMode] = useState<'value' | 'annotation'>('value');

  useEffect(() => {
    if (data?.game?.board) {
      setSudokuCells(data.game.board.map(cell => cell as SudokuCell));
    }
  }, [data]);

  const handleNumberClick = (value: number) => {
    if (selected && gameId) {
      if (mode === 'value') {
        updateCellValue({
          gameId,
          row: selected.row,
          column: selected.column,
          newValue: value === 0 ? null : value,
        });
      } else {
        const cell = sudokuCells?.find(c => c.row === selected.row && c.column === selected.column);
        
        if (cell && value !== 0) {
          const currentAnnotations = cell.annotations?.matrix || [];
          const newAnnotations = currentAnnotations.includes(value)
            ? currentAnnotations.filter(a => a !== value)
            : [...currentAnnotations, value].sort();
          
          updateCellAnnotations({
            gameId,
            row: selected.row,
            column: selected.column,
            annotations: { matrix: newAnnotations },
          });
        }
      }
    }
  };

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

  const game = data?.game;

  if (fetching || !game || sudokuCells === null) return (
    <Box textAlign="center" mt={20}>
      <Spinner size="lg" color="blue.500" />
    </Box>
  );

  return (
    <Box 
      textAlign="center" 
      p={3} 
      maxH="100vh"
      bg="rgba(255, 255, 255, 0.95)"
      borderRadius="xl"
      boxShadow="lg"
      maxW="600px"
      mx="auto"
    >
      <VStack gap={3}>
        <Heading size="lg" color="blue.600">
          Sudoku - Difficulty {game.difficulty}
        </Heading>
        
        <HStack gap={3}>
          <Button 
            bg={mode === 'value' ? 'blue.500' : 'transparent'}
            color={mode === 'value' ? 'white' : 'blue.500'}
            border="2px solid"
            borderColor="blue.500"
            onClick={() => setMode('value')}
            _hover={{ bg: mode === 'value' ? 'blue.600' : 'blue.50' }}
          >
            Value Mode
          </Button>
          <Button 
            bg={mode === 'annotation' ? 'green.500' : 'transparent'}
            color={mode === 'annotation' ? 'white' : 'green.500'}
            border="2px solid"
            borderColor="green.500"
            onClick={() => setMode('annotation')}
            _hover={{ bg: mode === 'annotation' ? 'green.600' : 'green.50' }}
          >
            Annotation Mode
          </Button>
        </HStack>
        
        <SudokuGrid 
          board={sudokuCells} 
          selected={selected} 
          onSelect={(row, column) => setSelected({ row: row, column: column })} 
        />
        
        <NumberPad onClick={handleNumberClick} mode={mode} />
      </VStack>
    </Box>
  );
}
