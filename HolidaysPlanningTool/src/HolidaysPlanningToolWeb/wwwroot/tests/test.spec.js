"use strict";
var Hero_1 = require('./Hero');
describe('Hero', function () {
    it('has name given in the constructor', function () {
        var hero = new Hero_1.Hero(1, 'Super Cat');
        expect(hero.name).toEqual('Super Cat');
    });
    it('has the id given in the constructor', function () {
        var hero = new Hero_1.Hero(1, 'Super Cat');
        expect(hero.id).toEqual(1);
    });
});
//# sourceMappingURL=test.spec.js.map