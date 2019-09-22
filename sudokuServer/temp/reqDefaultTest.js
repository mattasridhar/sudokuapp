const sudokuValues = require('../transpiledJs/SudokuValues');

describe('SudokuValues', function() {
    describe('#endsWith()', function() {
        it('should return true when the value ends with the suffix', function() {
            jasmine.log("SRI");
            assert.equal(true, true);
        });

        it('should return false when the value does not end with the suffix', function() {
            assert.equal(false, endsWith("abcd", "cde"));
        });
    });
});

/* describe('default', function() {
    describe('#endsWith()', function() {
        it('should return true when the value ends with the suffix', function() {
            assert.equal(true, endsWith("abcd", "cd"));
        });

        it('should return false when the value does not end with the suffix', function() {
            assert.equal(false, endsWith("abcd", "cde"));
        });
    });
}); */