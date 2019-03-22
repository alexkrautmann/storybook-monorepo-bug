import { foo } from './'

describe('biz', () => {
    it('exists', async () => {
        expect(foo).toEqual('foo');
    });
});
