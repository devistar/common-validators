'use strict';

const expect = require('chai').expect;
const validators = require('../src/common-validators');

describe('equalFileSizeAllAll', function() {
    const fileList1 = {
        0: {
            lastModified: 1459437496451,
            lastModifiedDate: 'Thu Mar 31 2016 18:18:16 GMT+0300 (MSK)',
            name: '0123456789.png',
            size: '1000',
            type: 'image/png'
        },
        1: {
            lastModified: 1459437496459,
            lastModifiedDate: 'Thu Mar 31 2016 18:18:16 GMT+0300 (MSK)',
            name: '01234567890123456789.jpeg',
            size: '1000',
            type: 'image/jpeg'
        },
        length: 2
    };

    const fileList2 = {
        0: {
            lastModified: 1459437496451,
            lastModifiedDate: 'Thu Mar 31 2016 18:18:16 GMT+0300 (MSK)',
            name: '0123456789.png',
            size: '1000',
            type: 'image/png'
        },
        1: {
            lastModified: 1459437496459,
            lastModifiedDate: 'Thu Mar 31 2016 18:18:16 GMT+0300 (MSK)',
            name: '01234567890123456789.jpeg',
            size: '2000',
            type: 'image/jpeg'
        },
        length: 2
    };

    it('empty is valid', function() {
        expect(validators.equalFileSizeAll(undefined, 1000)).to.be.undefined;
    });

    it('total files size equal equalFileSizeAll is valid', function() {
        expect(validators.equalFileSizeAll(fileList1, 2000)).to.be.undefined;
    });

    it('total files size doesn\'t equal equalFileSizeAll is invalid', function() {
        expect(validators.equalFileSizeAll(fileList2, 2000)).to.have.property('error');
    });
});