describe('SudokuValues', function() {
    describe('endsWith()', function() {
        it('should return true when the value ends with the suffix', function() {
            assert.equal(true, endsWith("abcd", "cd"));
        });

        it('should return false when the value does not end with the suffix', function() {
            assert.equal(false, endsWith("abcd", "cde"));
        });
    });
});