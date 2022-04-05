import { Box, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './Installation.css';
import { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const npmCommand = 'npm install react-validatable-form';
const yarnCommand = 'yarn add react-validatable-form';

const Home = () => {
    const [npmCopied, setNpmCopied] = useState(false);
    const [yarnCopied, setYarnCopied] = useState(false);

    const handleNpmCopy = () => {
        setYarnCopied(false);
        setNpmCopied(true);
        navigator.clipboard.writeText(npmCommand);
        setTimeout(() => {
            setNpmCopied(false);
        }, 1000);
    };

    const handleYarnCopy = () => {
        setNpmCopied(false);
        setYarnCopied(true);
        navigator.clipboard.writeText(yarnCommand);
        setTimeout(() => {
            setYarnCopied(false);
        }, 1000);
    };

    return (
        <Box
            className={'homeContainer'}
            display={'flex'}
            textAlign={'center'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            rowGap={5}
            pt={2}
        >
            <img width={'200px'} src={process.env.PUBLIC_URL + '/logo.png'} alt={'logo'} />
            <Typography variant={'h3'}> react-validatable-form </Typography>
            <Typography variant={'h6'}>
                {' '}
                <a
                    className="outsideUrlSpan"
                    href={'https://www.npmjs.com/package/react-validatable-form'}
                    target="_blank"
                    rel="noreferrer"
                >
                    react-validatable-form
                </a>{' '}
                is a{' '}
                <a
                    className="outsideUrlSpan"
                    href={'https://reactjs.org/docs/hooks-intro.html'}
                    target="_blank"
                    rel="noreferrer"
                >
                    React hook
                </a>{' '}
                that is used to create dynamic client side validations on React forms.{' '}
            </Typography>
            <Box display={'flex'} flexWrap={'wrap'} flexDirection={'row'} gap={1}>
                <Tooltip className={'copyButtons'} open={npmCopied} placement="top" title="copied!">
                    <Button variant="outlined" onClick={handleNpmCopy}>
                        <div className="commandBox">
                            <p className="commandText">{npmCommand}</p>
                        </div>
                        <span className="installButtonIcon">
                            {npmCopied ? <DoneOutlineIcon /> : <ContentCopyIcon />}
                        </span>
                    </Button>
                </Tooltip>
                <Tooltip className={'copyButtons'} open={yarnCopied} placement="bottom" title="copied!">
                    <Button variant="outlined" onClick={handleYarnCopy}>
                        <div className="commandBox">
                            <p className="commandText">{yarnCommand}</p>
                        </div>
                        <span className="installButtonIcon">
                            {yarnCopied ? <DoneOutlineIcon /> : <ContentCopyIcon />}
                        </span>
                    </Button>
                </Tooltip>
            </Box>
            <Box display={'flex'} gap={1} flexWrap={'wrap'} py={1}>
                <a href={'https://www.npmjs.com/package/react-validatable-form'} target={'_blank'} rel="noreferrer">
                    <img
                        src={'https://img.shields.io/npm/v/react-validatable-form?label=npm%20%7C%20web'}
                        alt={'npm'}
                    />
                </a>
                <a
                    href={'https://github.com/obss/react-validatable-form/blob/master/LICENSE'}
                    target={'_blank'}
                    rel="noreferrer"
                >
                    <img
                        src={'https://img.shields.io/github/license/obss/react-validatable-form.svg'}
                        alt={'license'}
                    />
                </a>
                <a
                    href={'https://github.com/obss/react-validatable-form/graphs/contributors'}
                    target={'_blank'}
                    rel="noreferrer"
                >
                    <img
                        src={'https://img.shields.io/github/contributors/obss/react-validatable-form'}
                        alt={'github'}
                    />
                </a>
                <a href={'https://github.com/obss/react-validatable-form/issues'} target={'_blank'} rel="noreferrer">
                    <img src={'https://img.shields.io/github/issues/obss/react-validatable-form.svg'} alt={'issue'} />
                </a>
                <a href={'https://github.com/obss/react-validatable-form'} target={'_blank'} rel="noreferrer">
                    <img
                        src={'https://img.shields.io/snyk/vulnerabilities/github/obss/react-validatable-form'}
                        alt={'vulnerabilities'}
                    />
                </a>
                <a href={'https://www.npmjs.com/package/react-validatable-form'} target={'_blank'} rel="noreferrer">
                    <img src={'https://img.shields.io/npm/dw/react-validatable-form.svg'} alt={'download'} />
                </a>
                <a href={'https://www.npmjs.com/package/react-validatable-form'} target={'_blank'} rel="noreferrer">
                    <img src={'https://img.shields.io/bundlephobia/min/react-validatable-form'} alt={'size'} />
                </a>
            </Box>
            <Box display={'flex'} flexWrap={'wrap'} gap={1} justifyContent={'center'} py={1}>
                <Button
                    size={'large'}
                    href={'https://github.com/obss/react-validatable-form'}
                    target={'_blank'}
                    variant={'outlined'}
                    sx={{ borderRadius: '30px' }}
                >
                    GitHub
                </Button>
                <Link to={'/getting-started/installation'}>
                    <Button size={'large'} variant={'contained'} sx={{ borderRadius: '30px' }}>
                        Get Started
                    </Button>
                </Link>
                <Button
                    size={'large'}
                    href={'https://github.com/obss/react-validatable-form/issues'}
                    target={'_blank'}
                    variant={'outlined'}
                    sx={{ borderRadius: '30px' }}
                >
                    Contact Us
                </Button>
            </Box>
            <video width={'500px'} autoPlay loop playsInline muted>
                <source src={process.env.PUBLIC_URL + '/example_video.mp4'} type={'video/mp4'} />
            </video>
        </Box>
    );
};

export default Home;
