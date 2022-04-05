import './ExampleUsageWrapper.css';

const CODE_BASE_URL = 'https://github.com/obss/react-validatable-form-demo/blob/master/src/';

const ExampleUsageWrapper = (props) => {
    let urlsJsx = null;

    if (props.codeUrl) {
        let urls = [];
        if (Array.isArray(props.codeUrl)) {
            urls = [...props.codeUrl];
        } else {
            urls.push(props.codeUrl);
        }
        urlsJsx = urls.map((url) => {
            const pageCodeUrl = CODE_BASE_URL + url;
            return (
                <span key={url} className="pageCodeUrlSpan">
                    <a href={pageCodeUrl} target="_blank" rel="noreferrer">
                        View on GitHub
                    </a>
                </span>
            );
        });
    }

    const wrapperClassName = props.wrapperClassName || 'examplesUsageWrapperDiv';

    return (
        <div className={wrapperClassName}>
            <span className="pageTitle">{props.header}</span>
            {urlsJsx}
            <div className="mainWrapperDiv">{props.children}</div>
        </div>
    );
};

export default ExampleUsageWrapper;
