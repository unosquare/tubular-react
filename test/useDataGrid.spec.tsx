import { renderHook } from '@testing-library/react-hooks';
import { useTbTable } from 'tubular-react-common';
import { LocalStorage } from 'tubular-common';
import { validColumnsSample } from './utils/columns';
import { localData } from './utils/localData';

const SUPPRESSED_PREFIXES = [
    'Warning: Do not await the result of calling ReactTestUtils.act(...)',
    'Warning: An update to %s inside a test was not wrapped in act(...)',
];

function isSuppressedErrorMessage(message: string): boolean {
    return SUPPRESSED_PREFIXES.some(sp => message.startsWith(sp));
}

const oldError = window.console.error;
window.console.error = (...args: any[]) => {
    if (!isSuppressedErrorMessage(args[0])) {
        oldError(...args);
    }
};

describe('useTbTable', () => {
    // TODO: complete this suite
    describe('api interaction directly (no DOM)', () => {
        test('it should navigate over pages properly', async () => {
            // NOTE: Using renderHook() from https://react-hooks-testing-library.com/
            // simply focus on the hook itself, meaning that side effects are not triggered
            // that's why I need to update page manually and then call processRequest
            const { result } = renderHook(() =>
                useTbTable(validColumnsSample, localData, {
                    storage: new LocalStorage(),
                }),
            );

            expect(result.current).toBeDefined();
            await result.current.api.processRequest();

            expect(result.current.state.data.length).toBe(10);

            result.current.api.goToPage(1);
            await result.current.api.processRequest();

            expect(result.current.state.data.length).toBe(10);

            result.current.api.goToPage(2);
            await result.current.api.processRequest();

            expect(result.current.state.data.length).toBe(2);
        });
    });
});
