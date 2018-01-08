const expect  = require('chai').expect;
const request = require('request');
const bloglight = require('./../');


describe("Homepage test", function() {
    before(function (done) {
        bloglight.createBlog('/', {username: 'admin@site.com', password: 'pass'}).then((blog) => {
            blog.listen(80, () => {
                done();
            });
        });
    });
    it('Main page content', function(done) {
        request('http://localhost:80' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
            process.exit();
        });
    });
});
