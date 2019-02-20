import { styled, Block } from "reakit";
import { theme } from "styled-tools";

const MainColumn = styled(Block)`
  max-width: ${theme("pageWidth")};
  margin: ${theme("spacing.normal")} auto;
`;

export default MainColumn;
