import { ReactNode } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { generateUrlFromBasename } from "../utils/url";

export default function FormCard({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const theme = useTheme();
  return (
    <Container>
      <Box sx={{ py: "2rem" }}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: "24rem",
            mx: "auto",
            overflow: "visible",
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              background: theme.palette.primary.dark,
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img src={generateUrlFromBasename("/account-manager.svg")} />
          </Avatar>
          <CardContent sx={{ py: 4 }}>
            {title && (
              <Typography variant="h6" textAlign="center" mb={1}>
                {title}
              </Typography>
            )}
            {children}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
