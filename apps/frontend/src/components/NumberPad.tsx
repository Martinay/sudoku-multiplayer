import { HStack, Button } from "@chakra-ui/react";

type Props = {
  onClick: (value: number) => void;
};

export const NumberPad = ({ onClick }: Props) => (
  <HStack spaceX={2} spaceY={2} mt={4} justify="center">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
      <Button key={n} onClick={() => onClick(n)}>{n}</Button>
    ))}
    <Button colorScheme="red" onClick={() => onClick(0)}>Clear</Button>
  </HStack>
);
