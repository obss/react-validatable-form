import { act } from '@testing-library/react-hooks';
import { testBuilder } from '../TestUtils';

test('custom translations missing test', () => {
    const initialFormData = {
        val: '',
    };
    const rules = [{ path: 'val', ruleSet: ['required'] }];
    const result = testBuilder(rules, initialFormData, {}, { translations: customTranslations, lang: 'de' });
    expect(result.current.getError('val')).toStrictEqual('This field is really required');
    act(() => {
        result.current.setPathValue('val', 'some value');
    });
    expect(result.current.getError('val')).toBeUndefined();
});

const customTranslations = {
    en: {
        required: 'This field is really required',
    },
    de: {},
};
