import './ValidationResult.css';

const ValidationResult = ({ isValid }) => {
    let imgSrc = import.meta.env.BASE_URL + '/';
    let validationResultText = '';
    if (isValid) {
        imgSrc += 'valid.png';
        validationResultText = 'valid';
    } else {
        imgSrc += 'invalid.png';
        validationResultText = 'invalid';
    }

    return (
        <div className={'validationResultDiv'}>
            <span>Validation Result: </span>
            <img src={imgSrc} alt="validationresult" className={'validationResultIcon'} />
            <span className={isValid ? 'validationResultInfoSuccess' : 'validationResultInfoFail'}>
                {validationResultText}
            </span>
        </div>
    );
};

export default ValidationResult;
