import { Box } from "@mui/material"
import RecipeEnhancedTable from "./table/RecipeEnhancedTable"

function Recipe() {
  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
      <RecipeEnhancedTable />
    </Box>
  )
}

export default Recipe
