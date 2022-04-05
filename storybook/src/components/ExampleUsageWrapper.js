import './ExampleUsageWrapper.css';

const ExampleUsageWrapper = (props) => {
    const wrapperClassName = props.wrapperClassName || 'examplesUsageWrapperDiv';

    return (
        <div className={wrapperClassName}>
            <span className="pageTitle">{props.header}</span>
            <div className="mainWrapperDiv">{props.children}</div>
        </div>
    );
};

export default ExampleUsageWrapper;
