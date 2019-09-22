const expect = require('chai').expect;
const request = require('supertest');

const app = require('../index');

describe('GET', ()=>{
    it('OK testWorks', (done) => {
        request(app).get('/sudoku/board/9')
        .then((res)=>{
            console.log("res.body: "+ res);//JSON.stringify(res.body));
            console.log("body: "+ JSON.stringify(res.body.board));
            expect(res.body.length).to.equals(0);
            done();
        })
        .catch((err) => done(err));
    });
})
/* describe('nonDefault', function() {
    describe('#endsWith()', function() {
        it('should return true when the value ends with the suffix', function() {
            assert.equal(true, endsWith("abcd", "cd"));
        });

        it('should return false when the value does not end with the suffix', function() {
            assert.equal(false, endsWith("abcd", "cde"));
        });
    });
}); */