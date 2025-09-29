import { useCategoryGetAll } from "@/service/category/queries"
import { styled, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router"
import { useCategoryToggle } from "@/service/category/mutation"
import { IconButton } from "./components/IconButton"

export const Item = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isDeleted",
})(({ theme, isDeleted }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: isDeleted ? "white" : theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
  cursor: "pointer",
  position: "relative",
  transition: "background-color 0.3s ease",
  backgroundColor: isDeleted ? theme.palette.error.light : "transparent",
  "&:hover": {
    color: "white",
    backgroundColor: isDeleted ? theme.palette.error.main : theme.palette.primary.main,
    transition: "all 0.3s ease",
  },
}))

function Category() {
  const navigate = useNavigate()
  const { data } = useCategoryGetAll()
  const toggleMutation = useCategoryToggle()

  const handleDeleteCategory = async (id) => {
    try {
      await toggleMutation.mutateAsync(id)
    } catch (error) {
      console.log(error)
    }
  }

  const goToUpdatePage = (id) => {
    navigate(`/category/${id}/update`)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h5"
        p={2}
      >
        Danh sách thể loại
      </Typography>
      <Grid spacing={2}>
        <Grid size={4}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr 1fr 1fr 1fr 1fr" },
              gap: 2,
            }}
          >
            {data?.map((cate) => (
              <Item
                key={cate.id}
                isDeleted={cate.isDeleted}
                onClick={() => goToUpdatePage(cate.id)}
              >
                {cate.name}
                <IconButton
                  isDeleted={cate.isDeleted}
                  onClick={() => handleDeleteCategory(cate.id)}
                />
              </Item>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Category
