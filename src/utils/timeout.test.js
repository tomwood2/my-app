import timeout from './timeout';

describe('test secondsTicker', () => {

    it('promise is resolved', async () => {

        // arrange

        // act
        await timeout(10);

        // assert
        expect(true).toBeTruthy();
    });

});