const Generator = require('..');
const path = require('path');

const tenth = require(path.join(__dirname, '..', 'data', 'en.json'))["10"];

describe('Generator', () => {

    describe('constructor', () => {
        it('should throw for incorrect language', () => {
            expect(() => new Generator('all', '_')).toThrowError('Language "_" is not available. You can contribute to add it.');
            expect(() => new Generator('all', '')).toThrowError('Language "" is not available. You can contribute to add it.');
        });

        it('should not throw for correct language', () => {
            expect(() => new Generator('all', 'en')).not.toThrowError('Language "en" is not available. You can contribute to add it.');
            expect(() => new Generator('all')).not.toThrowError('Language "en" is not available. You can contribute to add it.');
        });

        it('should throw for incorrect doctors', () => {
            expect(() => new Generator({})).toThrowError();
            expect(() => new Generator([-10, 11])).toThrowError();
        });

        it('should not throw for correct doctors', () => {
            expect(() => new Generator('all')).not.toThrowError();
            expect(() => new Generator([10, 11])).not.toThrowError();
        });
    });

    describe('random', () => {
        it('should output a random companion name', () => {
            const d = new Generator();
            const v = d.random();

            expect(v).toBeDefined();
            expect(typeof v).toBe('string');
            expect(v.length).toBeGreaterThan(0);
        });

        it('should output a random for a given doctor', () => {
            const d = new Generator([10], 'en');

            for (let i = 0; i < 20; i++) {
                const v = d.random();
                expect(tenth).toContain(v);
            }
        });
    });

    describe('all', () => {
        it('should output an array of companions', () => {
            const d = new Generator();
            const v = d.all();

            expect(v).toBeDefined();
            expect(Array.isArray(v)).toBe(true);
            expect(v.length).toBeGreaterThan(0);
        });

        it('should output an array of all companions for a given doctor', () => {
            const d = new Generator([10], 'en');
            const v = d.all();

            expect(v.sort()).toEqual(tenth.sort());
        });
    });

    describe('get', () => {
        it('should get one companion name with no arguments', () => {
            const d = new Generator();
            const v = d.get();

            expect(v).toBeDefined();
            expect(Array.isArray(v)).toBe(true);
            expect(v.length).toEqual(1);
        });

        it('should get one companion name with no arguments for a given doctor', () => {
            const d = new Generator([10], 'en');

            for (let i = 0; i < 20; i++) {
                const v = d.get();
                expect(tenth).toContain(v[0]);
            }
        });

        it('should get 2 companions with get(2)', () => {
            const d = new Generator();
            const v = d.get(2);

            expect(v).toBeDefined();
            expect(Array.isArray(v)).toBe(true);
            expect(v.length).toEqual(2);
        });

        it('should get all companions with .get(n)', () => {
            const d = new Generator();
            const a = d.all();
            const v = d.get(a.length);

            expect(v).toBeDefined();
            expect(Array.isArray(v)).toBe(true);
            expect(v.length).toEqual(a.length);
            expect(v.sort()).toEqual(a.sort());
        });

        it('should throw for incorrect count in .get(count)', () => {
            const d = new Generator();
            const a = d.all();

            expect(() => d.get(a.length + 1)).toThrowError(`Not enough values to retrieve ${a.length + 1} unique items.`);
            expect(() => d.get(-1)).toThrowError('Count must be greater than 0. Received -1.')
        });
    });
});
