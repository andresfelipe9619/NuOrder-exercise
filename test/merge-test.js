const recursiveMerge = require("../app").default;
const expect = require("chai").expect;

describe("Merge two objects recursively", () => {

    it('Should throw an error if no objects were sent as argument', () => {
        expect(() => recursiveMerge()).to.throw('Please provide two valid objects!');
    });

    it("Shuld merge two objects", function () {
        expect(recursiveMerge(a, b)).to.deep.include(result)
    });
});


const a = {
    first_name: 'Bob',
    last_name: 'Joness',

    email: 'bob@gmail.com',

    address: {
        line_1: '1234 Main St',
        line_2: 'Apt 413',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90048'
    },

    logins: [
        { date: '10/22/2012', ip: '192.168.0.1' },
        { date: '10/21/2012', ip: '192.168.0.1' }
    ],

    photos: [
        'IMG-1985.jpg',
        'IMG-1987.jpg'
    ]
}

const b = {
    last_name: 'Jones',
    active: true,

    address: {
        line_1: '2143 South Main St',
        line_2: undefined
    },

    logins: { date: '10/23/2012', ip: '192.168.0.1' },

    photos: undefined
}

const result = {
    first_name: 'Bob',
    last_name: 'Jones',

    active: true,
    email: 'bob@gmail.com',

    address: {
        line_1: '2143 South Main St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90048'
    },

    logins: [
        { date: '10/22/2012', ip: '192.168.0.1' },
        { date: '10/21/2012', ip: '192.168.0.1' },
        { date: '10/23/2012', ip: '192.168.0.1' }
    ],

    photos: []
}
