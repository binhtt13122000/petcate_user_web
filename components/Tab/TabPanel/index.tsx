import { Container } from "@mui/material";
import { Box } from "@mui/system";
export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Container
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            maxWidth="xl"
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Container>
    );
};

export default TabPanel;
