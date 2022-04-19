import './CodeAccordion.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CodeAccordion = ({ code }) => {
    return (
        <div className={'codeExampleDiv'}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <span className={'codeExampleLabel'}>Example Source Code</span>
                </AccordionSummary>
                <AccordionDetails>
                    <span className={'codeExample'}>{code}</span>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CodeAccordion;
