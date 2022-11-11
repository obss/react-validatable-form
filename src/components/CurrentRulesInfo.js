import './CurrentRulesInfo.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const stringifyWithFunction = (obj) => {
    const placeholder = '____PLACEHOLDER____';
    const fns = [];
    let json = JSON.stringify(
        obj,
        function (key, value) {
            if (typeof value === 'function') {
                fns.push(value);
                return placeholder;
            }
            if (value instanceof RegExp) {
                fns.push('/' + value.source + '/');
                return placeholder;
            }
            return value;
        },
        2
    );
    json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function () {
        return fns.shift();
    });
    return json;
};

const CurrentRulesInfo = ({ currentRules, header = 'Current Rules' }) => {
    return (
        <div className={'currentRuleInfoDiv'}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <span className={'currentRuleLabel'}>{header}</span>
                </AccordionSummary>
                <AccordionDetails>
                    <span className={'currentRuleString'}>{stringifyWithFunction(currentRules)}</span>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CurrentRulesInfo;
