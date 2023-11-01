import './ApiInfo.css';

const ApiInfo = ({ apiInfoList }) => {
    const apiInfoListJsx = apiInfoList.map((api, index) => {
        const apiLabel = api.label;
        const apiDesc = api.desc;
        const apiIndent = api.indent || 0;
        const pLeft = 20 * apiIndent + 10;
        const leftIndentStyle = { paddingLeft: pLeft + 'px' };
        if (apiIndent) {
            leftIndentStyle.borderTop = '1px dashed black';
        }
        return (
            <div key={index} style={leftIndentStyle} className="apiInfo">
                <div className={'apiLabel'}>{apiLabel}</div>
                <div className={'apiDesc'}>{apiDesc}</div>
            </div>
        );
    });

    return <div className={'apiInfoWrapper'}>{apiInfoListJsx}</div>;
};

export default ApiInfo;
