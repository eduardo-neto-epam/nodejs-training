/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

module.exports = {
    up: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: '3TDZRreq5hu',
                    login: 'Valina',
                    password: 'nzpaDxTTqK',
                    age: 35,
                    is_deleted: false,
                    created_at: '2021-09-08T20:56:24Z',
                    updated_at: '2021-10-16T10:13:29Z',
                },
                {
                    id: 'uq9rdoPcu',
                    login: 'Boyd',
                    password: 'apo7ggIcYH',
                    age: 42,
                    is_deleted: false,
                    created_at: '2021-07-12T18:22:01Z',
                    updated_at: '2021-06-22T17:35:35Z',
                },
                {
                    id: 'j87BDFeCX',
                    login: 'Briggs',
                    password: 'g9iFgR',
                    age: 49,
                    is_deleted: false,
                    created_at: '2021-07-14T17:21:07Z',
                    updated_at: '2021-05-04T11:24:08Z',
                },
                {
                    id: 'GhRRUaJxg',
                    login: 'Ollie',
                    password: 'bZNsyQLM5r',
                    age: 50,
                    is_deleted: false,
                    created_at: '2021-08-01T13:31:48Z',
                    updated_at: '2021-01-02T15:20:38Z',
                },
                {
                    id: 'ygnamjUdn',
                    login: 'Bronny',
                    password: 'ROVyn0',
                    age: 39,
                    is_deleted: false,
                    created_at: '2021-03-10T22:29:18Z',
                    updated_at: '2021-07-11T04:04:13Z',
                },
                {
                    id: 'wIGomoM',
                    login: 'Freeman',
                    password: 'EGB58l5',
                    age: 50,
                    is_deleted: false,
                    created_at: '2021-02-03T20:55:07Z',
                    updated_at: '2021-10-06T03:50:11Z',
                },
                {
                    id: 'jWRZfOvJo3e',
                    login: 'Rana',
                    password: 'QX72AqoOiRTj',
                    age: 20,
                    is_deleted: false,
                    created_at: '2021-07-01T02:39:41Z',
                    updated_at: '2021-04-14T03:12:29Z',
                },
                {
                    id: 'rO3uyYY5Xyem',
                    login: 'Byrle',
                    password: 'abkb9o',
                    age: 42,
                    is_deleted: false,
                    created_at: '2021-06-01T03:11:19Z',
                    updated_at: '2021-08-27T08:28:01Z',
                },
                {
                    id: 'YJN7mpmFgpz',
                    login: 'Esra',
                    password: 'OBFDh1',
                    age: 9,
                    is_deleted: false,
                    created_at: '2021-07-08T21:12:53Z',
                    updated_at: '2021-04-25T12:03:09Z',
                },
                {
                    id: 'Kx9oPZ',
                    login: 'Edy',
                    password: 'YHis2f2',
                    age: 37,
                    is_deleted: false,
                    created_at: '2021-10-03T08:10:24Z',
                    updated_at: '2021-08-04T03:04:13Z',
                },
                {
                    id: '7Okb3uz',
                    login: 'Moira',
                    password: 'N8gBHSi',
                    age: 26,
                    is_deleted: false,
                    created_at: '2021-07-07T16:17:12Z',
                    updated_at: '2021-01-15T19:37:24Z',
                },
                {
                    id: 'u5VJw7gI',
                    login: 'Bendix',
                    password: 'MpPmVa',
                    age: 31,
                    is_deleted: false,
                    created_at: '2021-02-12T16:28:36Z',
                    updated_at: '2021-08-29T17:44:35Z',
                },
                {
                    id: 'ryLO5h',
                    login: 'Kelby',
                    password: 'pz1DzCTG8fw',
                    age: 30,
                    is_deleted: false,
                    created_at: '2021-09-14T01:04:46Z',
                    updated_at: '2021-06-06T03:25:14Z',
                },
                {
                    id: 'p5XTfTN5uOzY',
                    login: 'Haleigh',
                    password: 'wdzVrvlg',
                    age: 47,
                    is_deleted: false,
                    created_at: '2021-08-21T08:32:21Z',
                    updated_at: '2021-05-13T21:53:37Z',
                },
                {
                    id: 'wuN1s6Z',
                    login: 'Yves',
                    password: 'JMm5O4zGy',
                    age: 26,
                    is_deleted: false,
                    created_at: '2021-04-20T12:14:03Z',
                    updated_at: '2021-04-01T20:11:36Z',
                },
                {
                    id: 'YKu07G',
                    login: 'Calvin',
                    password: 'imi08NWdB',
                    age: 48,
                    is_deleted: false,
                    created_at: '2021-08-12T16:47:22Z',
                    updated_at: '2021-10-19T20:53:41Z',
                },
                {
                    id: 'OeW04FD',
                    login: 'Anabel',
                    password: '4yfGk003px',
                    age: 9,
                    is_deleted: false,
                    created_at: '2021-01-07T19:37:48Z',
                    updated_at: '2021-10-04T09:05:52Z',
                },
                {
                    id: 'UUKHWu0',
                    login: 'Tedie',
                    password: 'qlrQ5T',
                    age: 42,
                    is_deleted: false,
                    created_at: '2020-12-19T09:20:32Z',
                    updated_at: '2021-06-20T03:27:25Z',
                },
                {
                    id: 'l5wBOIx',
                    login: 'Derrik',
                    password: 'lBdsFtTIL',
                    age: 23,
                    is_deleted: false,
                    created_at: '2020-12-12T20:22:41Z',
                    updated_at: '2021-07-23T03:09:02Z',
                },
                {
                    id: '7Lqvn7c',
                    login: 'Karna',
                    password: 'SslF7G2jwwh',
                    age: 26,
                    is_deleted: false,
                    created_at: '2021-06-04T21:29:32Z',
                    updated_at: '2021-04-26T23:44:20Z',
                },
                {
                    id: 'by89Az0',
                    login: 'Lorry',
                    password: 'LywmpkrHVkv',
                    age: 39,
                    is_deleted: false,
                    created_at: '2021-10-09T22:54:11Z',
                    updated_at: '2021-07-23T12:00:44Z',
                },
                {
                    id: 'JwBkTWrrUJ1d',
                    login: 'Randal',
                    password: 'uhBqzeq',
                    age: 45,
                    is_deleted: false,
                    created_at: '2021-10-20T17:30:20Z',
                    updated_at: '2021-05-16T00:45:05Z',
                },
                {
                    id: 'iTJpFlkXf',
                    login: 'Torrey',
                    password: 'e7IeIsp1',
                    age: 28,
                    is_deleted: false,
                    created_at: '2020-12-22T05:10:45Z',
                    updated_at: '2021-09-06T21:22:47Z',
                },
                {
                    id: 'bCJ2QoHz',
                    login: 'Odilia',
                    password: '5PsFIoR4As',
                    age: 48,
                    is_deleted: false,
                    created_at: '2021-04-28T09:22:43Z',
                    updated_at: '2021-03-23T23:46:10Z',
                },
                {
                    id: 'AK3XfJqPEL',
                    login: 'Vite',
                    password: '3lHRBmIC',
                    age: 10,
                    is_deleted: false,
                    created_at: '2021-06-16T19:32:32Z',
                    updated_at: '2021-07-12T18:54:14Z',
                },
                {
                    id: 'Q1mNcAAfA',
                    login: 'Gene',
                    password: 'llVVJw691zT9',
                    age: 38,
                    is_deleted: false,
                    created_at: '2021-02-22T19:59:03Z',
                    updated_at: '2021-05-29T07:56:04Z',
                },
                {
                    id: 'q4xEohN',
                    login: 'Richard',
                    password: 'GRbUEI',
                    age: 29,
                    is_deleted: false,
                    created_at: '2020-11-27T01:21:03Z',
                    updated_at: '2021-10-02T23:21:40Z',
                },
                {
                    id: 'ciyK3Q',
                    login: 'Thelma',
                    password: '01sfsJR',
                    age: 39,
                    is_deleted: false,
                    created_at: '2020-12-13T02:58:41Z',
                    updated_at: '2020-11-24T23:57:47Z',
                },
                {
                    id: 'S49GN3QW',
                    login: 'Francis',
                    password: 'IZNm6O',
                    age: 32,
                    is_deleted: false,
                    created_at: '2021-08-04T09:32:14Z',
                    updated_at: '2021-05-03T11:51:23Z',
                },
                {
                    id: '9v8oRHet',
                    login: 'Vlad',
                    password: 'dmZK3ZPmz6J',
                    age: 28,
                    is_deleted: false,
                    created_at: '2021-08-08T03:13:15Z',
                    updated_at: '2021-09-24T14:13:19Z',
                },
                {
                    id: 'MHJVZW7GfN08',
                    login: 'Car',
                    password: 'kDX1EFmt',
                    age: 22,
                    is_deleted: false,
                    created_at: '2021-05-03T16:04:02Z',
                    updated_at: '2021-05-31T12:41:42Z',
                },
                {
                    id: 'U7CYKJV',
                    login: 'Gilberta',
                    password: 'gxB15B',
                    age: 46,
                    is_deleted: false,
                    created_at: '2020-12-31T19:44:31Z',
                    updated_at: '2021-04-03T19:41:43Z',
                },
                {
                    id: 'Xzb8io0',
                    login: 'Una',
                    password: 'fNBDB1',
                    age: 13,
                    is_deleted: false,
                    created_at: '2021-05-01T07:25:32Z',
                    updated_at: '2021-02-20T06:29:23Z',
                },
                {
                    id: 'e5pCdd0d',
                    login: 'Viviene',
                    password: 'wQDPMI2Xa',
                    age: 12,
                    is_deleted: false,
                    created_at: '2021-05-27T21:56:09Z',
                    updated_at: '2021-08-15T08:38:15Z',
                },
                {
                    id: '8RjVJ3jQ',
                    login: 'Didi',
                    password: 'pvOflD',
                    age: 20,
                    is_deleted: false,
                    created_at: '2020-11-25T21:11:22Z',
                    updated_at: '2021-02-06T07:08:41Z',
                },
                {
                    id: 'rP8os2Z',
                    login: 'Vivia',
                    password: 'hUbgjtq',
                    age: 39,
                    is_deleted: false,
                    created_at: '2021-01-25T00:52:42Z',
                    updated_at: '2021-03-30T05:13:02Z',
                },
                {
                    id: '6i66Yq',
                    login: 'Van',
                    password: 'sneqnmPnFpxP',
                    age: 12,
                    is_deleted: false,
                    created_at: '2021-03-09T11:50:49Z',
                    updated_at: '2021-08-23T16:05:15Z',
                },
                {
                    id: 'P8Ra3FQYZLxQ',
                    login: 'Shel',
                    password: 'yvog83oag',
                    age: 8,
                    is_deleted: false,
                    created_at: '2021-05-29T09:08:04Z',
                    updated_at: '2021-04-11T03:26:25Z',
                },
                {
                    id: 'OOgnhtILS65M',
                    login: 'Barbra',
                    password: 'kwoo6M0ZJ',
                    age: 18,
                    is_deleted: false,
                    created_at: '2021-01-11T19:30:12Z',
                    updated_at: '2021-06-27T12:18:26Z',
                },
                {
                    id: 'DLTaVcDi',
                    login: 'Marline',
                    password: 'AJV6UH',
                    age: 21,
                    is_deleted: false,
                    created_at: '2021-05-31T14:13:41Z',
                    updated_at: '2021-04-29T08:44:34Z',
                },
                {
                    id: 'LtKvAj8yjOd3',
                    login: 'Klaus',
                    password: 'WgXvaju8UfI',
                    age: 25,
                    is_deleted: false,
                    created_at: '2021-07-25T12:51:13Z',
                    updated_at: '2021-04-12T14:29:29Z',
                },
                {
                    id: 'cvViDItri4E',
                    login: 'Emelita',
                    password: 'trE9LbLA9KvK',
                    age: 42,
                    is_deleted: false,
                    created_at: '2020-11-26T09:32:36Z',
                    updated_at: '2021-02-23T05:50:49Z',
                },
                {
                    id: 'tb1TxbBhf0',
                    login: 'Enriqueta',
                    password: 'LCsEWPV',
                    age: 34,
                    is_deleted: false,
                    created_at: '2021-01-04T11:40:17Z',
                    updated_at: '2021-05-17T16:40:47Z',
                },
                {
                    id: 'EKTTpbB',
                    login: 'Hagen',
                    password: 'zSmXtN07a7u6',
                    age: 47,
                    is_deleted: false,
                    created_at: '2021-07-22T19:21:36Z',
                    updated_at: '2021-01-03T17:47:33Z',
                },
                {
                    id: 'yplh7p4fXLo',
                    login: 'Linnet',
                    password: '8nEkszjzI',
                    age: 44,
                    is_deleted: false,
                    created_at: '2021-07-16T11:16:48Z',
                    updated_at: '2021-10-06T17:06:20Z',
                },
                {
                    id: 'DeISOV5',
                    login: 'Zorine',
                    password: 'TrDQQZ',
                    age: 46,
                    is_deleted: false,
                    created_at: '2021-07-22T14:44:11Z',
                    updated_at: '2021-07-13T14:29:35Z',
                },
                {
                    id: 'nLCJQdM8q',
                    login: 'Janna',
                    password: 'x8uFlwj8bk',
                    age: 27,
                    is_deleted: false,
                    created_at: '2020-12-02T15:36:52Z',
                    updated_at: '2021-10-21T06:36:58Z',
                },
                {
                    id: 'ctZCyIRXIv',
                    login: 'Klemens',
                    password: 'MxCe8nhJei',
                    age: 41,
                    is_deleted: false,
                    created_at: '2021-10-20T06:38:26Z',
                    updated_at: '2021-01-27T15:47:59Z',
                },
                {
                    id: 'znVfDxo',
                    login: 'Alexa',
                    password: 'wS49RxZqLq',
                    age: 23,
                    is_deleted: false,
                    created_at: '2021-06-13T14:35:22Z',
                    updated_at: '2021-05-21T12:59:28Z',
                },
                {
                    id: 'ZbCGLzmplKnj',
                    login: 'Lalo',
                    password: 'Ln3zJS',
                    age: 37,
                    is_deleted: false,
                    created_at: '2021-07-30T19:09:14Z',
                    updated_at: '2021-05-04T22:48:53Z',
                },
                {
                    id: 'uMntiH8j',
                    login: 'Nina',
                    password: 'XugCN6B',
                    age: 42,
                    is_deleted: false,
                    created_at: '2021-08-24T02:15:55Z',
                    updated_at: '2020-11-09T14:46:44Z',
                },
                {
                    id: 'Qhca8f565gcQ',
                    login: 'Crystie',
                    password: '2B51httcD',
                    age: 38,
                    is_deleted: false,
                    created_at: '2020-11-27T01:33:09Z',
                    updated_at: '2020-12-23T11:13:15Z',
                },
                {
                    id: 'EJjnjTFOmY1',
                    login: 'Austina',
                    password: 'o1j3HUXZv4gA',
                    age: 46,
                    is_deleted: false,
                    created_at: '2021-03-05T20:53:33Z',
                    updated_at: '2021-06-23T22:19:29Z',
                },
                {
                    id: 'SRV54pPrR3TL',
                    login: 'Clareta',
                    password: 'HfCfaBBtNP0',
                    age: 8,
                    is_deleted: false,
                    created_at: '2020-11-21T02:04:02Z',
                    updated_at: '2021-05-14T23:32:57Z',
                },
                {
                    id: 'zIWUO8jUiNw',
                    login: 'Rossy',
                    password: 'd3klLCE6xy',
                    age: 28,
                    is_deleted: false,
                    created_at: '2021-08-25T22:49:05Z',
                    updated_at: '2020-11-22T11:05:35Z',
                },
                {
                    id: 'zumi2qk3lGEo',
                    login: 'Brynna',
                    password: 'bwFf9lz',
                    age: 17,
                    is_deleted: false,
                    created_at: '2020-11-05T03:12:27Z',
                    updated_at: '2021-07-16T16:30:44Z',
                },
                {
                    id: 'R3wuH2',
                    login: 'Hugh',
                    password: 'S7D5uOqz31',
                    age: 10,
                    is_deleted: false,
                    created_at: '2021-09-30T17:07:44Z',
                    updated_at: '2021-05-22T18:51:50Z',
                },
                {
                    id: 'eEHbMhSCCJr3',
                    login: 'Dyna',
                    password: 'Kvn6se9Nv',
                    age: 39,
                    is_deleted: false,
                    created_at: '2021-07-25T09:01:27Z',
                    updated_at: '2021-03-17T15:47:42Z',
                },
                {
                    id: 'UH4SRo',
                    login: 'Leonerd',
                    password: '8Ad7yr',
                    age: 29,
                    is_deleted: false,
                    created_at: '2021-10-29T13:13:43Z',
                    updated_at: '2021-09-01T11:39:02Z',
                },
                {
                    id: 'qT9krg',
                    login: 'Alisa',
                    password: 'GMVAzEk5hHCD',
                    age: 42,
                    is_deleted: false,
                    created_at: '2021-04-11T10:22:23Z',
                    updated_at: '2021-08-22T15:29:34Z',
                },
                {
                    id: 'VEKm5q0',
                    login: 'Whitney',
                    password: 'ibyCXZ8ijM8O',
                    age: 39,
                    is_deleted: false,
                    created_at: '2021-09-18T14:07:56Z',
                    updated_at: '2021-01-09T02:12:47Z',
                },
                {
                    id: 'cNESaKV',
                    login: 'Harris',
                    password: 'Jj6Jh7OOzn',
                    age: 26,
                    is_deleted: false,
                    created_at: '2021-09-01T14:01:42Z',
                    updated_at: '2021-05-26T23:54:32Z',
                },
                {
                    id: 'p7kGlda',
                    login: 'Levey',
                    password: 'PIVsMnsydX6V',
                    age: 45,
                    is_deleted: false,
                    created_at: '2021-10-09T15:18:08Z',
                    updated_at: '2021-09-03T08:11:28Z',
                },
                {
                    id: 'n7lYih6rFfR',
                    login: 'Jade',
                    password: '2pcbjLFuH',
                    age: 32,
                    is_deleted: false,
                    created_at: '2021-10-15T05:06:21Z',
                    updated_at: '2021-02-20T09:20:07Z',
                },
                {
                    id: 'M9HgUIR',
                    login: 'Rosalind',
                    password: 'gR5NyGOf65',
                    age: 11,
                    is_deleted: false,
                    created_at: '2021-02-19T01:06:45Z',
                    updated_at: '2021-03-10T18:14:45Z',
                },
                {
                    id: 'Ei9Bvy',
                    login: 'Elsie',
                    password: 'NdLqSeNY',
                    age: 24,
                    is_deleted: false,
                    created_at: '2021-02-14T03:22:06Z',
                    updated_at: '2021-06-18T16:21:48Z',
                },
                {
                    id: 'Muhzt9Q',
                    login: 'Charlena',
                    password: 'wdEneMI',
                    age: 37,
                    is_deleted: false,
                    created_at: '2021-04-05T05:46:28Z',
                    updated_at: '2021-07-05T01:22:47Z',
                },
                {
                    id: 'CObQUWRn7',
                    login: 'Henrik',
                    password: 'kEG2uqFCjsKY',
                    age: 16,
                    is_deleted: false,
                    created_at: '2021-03-08T13:04:39Z',
                    updated_at: '2021-09-22T19:06:58Z',
                },
                {
                    id: 'GasoqFmZ',
                    login: 'Margeaux',
                    password: 'nbaYD7lt5',
                    age: 11,
                    is_deleted: false,
                    created_at: '2021-09-24T02:02:31Z',
                    updated_at: '2021-08-14T21:59:49Z',
                },
                {
                    id: 'ri8AkxAcob',
                    login: 'Lucie',
                    password: 'OOYaEF',
                    age: 43,
                    is_deleted: false,
                    created_at: '2021-01-15T07:38:12Z',
                    updated_at: '2021-02-03T23:24:42Z',
                },
                {
                    id: 'bA9Jqks0F',
                    login: 'Teddie',
                    password: 'CZvScIqMXmvg',
                    age: 36,
                    is_deleted: false,
                    created_at: '2021-10-06T14:18:32Z',
                    updated_at: '2021-09-26T08:07:50Z',
                },
                {
                    id: 'mSFsylEJV',
                    login: 'Lesya',
                    password: 'OqHy1v',
                    age: 46,
                    is_deleted: false,
                    created_at: '2021-05-27T04:43:47Z',
                    updated_at: '2021-01-07T09:59:39Z',
                },
                {
                    id: 'BfBMEVHVSV9s',
                    login: 'Bernadina',
                    password: 'seTKEnf0e',
                    age: 20,
                    is_deleted: false,
                    created_at: '2021-04-12T15:36:29Z',
                    updated_at: '2021-03-26T01:39:54Z',
                },
                {
                    id: '0f4YVqHC',
                    login: 'Jilleen',
                    password: '7063nB3RyGc',
                    age: 23,
                    is_deleted: false,
                    created_at: '2021-04-07T01:25:58Z',
                    updated_at: '2020-12-21T04:57:21Z',
                },
                {
                    id: '6FG3nmk',
                    login: 'Baryram',
                    password: 'HW2wncMUYt',
                    age: 13,
                    is_deleted: false,
                    created_at: '2021-05-13T14:51:13Z',
                    updated_at: '2020-11-30T23:18:25Z',
                },
                {
                    id: 'xcwpl5kpR',
                    login: 'Alaster',
                    password: 'I50KGb9woPE',
                    age: 29,
                    is_deleted: false,
                    created_at: '2020-12-07T16:33:13Z',
                    updated_at: '2021-04-30T21:29:55Z',
                },
                {
                    id: 'mYNJqUkXkSI9',
                    login: 'Flori',
                    password: 'cDKu1l',
                    age: 8,
                    is_deleted: false,
                    created_at: '2021-05-07T00:46:39Z',
                    updated_at: '2021-04-11T01:35:03Z',
                },
                {
                    id: 'MzoOEsZvPTUN',
                    login: 'Natala',
                    password: 'SuyOsZuq1e',
                    age: 18,
                    is_deleted: false,
                    created_at: '2021-06-11T23:53:32Z',
                    updated_at: '2021-05-03T11:35:45Z',
                },
                {
                    id: 'gqBlKQpuUof',
                    login: 'Lorrin',
                    password: 'c30wih',
                    age: 26,
                    is_deleted: false,
                    created_at: '2020-12-09T03:20:16Z',
                    updated_at: '2021-03-10T02:29:36Z',
                },
                {
                    id: 'p1nl01',
                    login: 'Giffy',
                    password: 'OdzAmppwfXle',
                    age: 43,
                    is_deleted: false,
                    created_at: '2021-05-15T12:23:46Z',
                    updated_at: '2021-01-05T03:11:20Z',
                },
                {
                    id: 'Aar1CtINOb',
                    login: 'Delcina',
                    password: 'R9PfJGmkE',
                    age: 28,
                    is_deleted: false,
                    created_at: '2021-07-29T08:43:12Z',
                    updated_at: '2021-06-09T18:50:38Z',
                },
                {
                    id: 'xuAlx5oWQckZ',
                    login: 'Jone',
                    password: 'rnoNHqaZ',
                    age: 29,
                    is_deleted: false,
                    created_at: '2021-06-10T04:20:09Z',
                    updated_at: '2021-02-06T17:44:24Z',
                },
                {
                    id: 'xAI8Z1WkAzB0',
                    login: 'Caitrin',
                    password: '8zZKVQW',
                    age: 23,
                    is_deleted: false,
                    created_at: '2020-11-21T23:24:50Z',
                    updated_at: '2021-07-18T22:23:41Z',
                },
                {
                    id: 'YH4E0Us704',
                    login: 'Ermina',
                    password: 'T0fW54K',
                    age: 9,
                    is_deleted: false,
                    created_at: '2020-12-21T03:16:01Z',
                    updated_at: '2021-03-07T06:30:12Z',
                },
                {
                    id: 'BTuBpw',
                    login: 'Burton',
                    password: 'BuA37xFbQbb',
                    age: 50,
                    is_deleted: false,
                    created_at: '2021-06-03T06:38:13Z',
                    updated_at: '2021-08-27T17:01:44Z',
                },
                {
                    id: 'dtS29z60HPD',
                    login: 'Fergus',
                    password: 'pZovOz',
                    age: 21,
                    is_deleted: false,
                    created_at: '2021-09-30T17:21:19Z',
                    updated_at: '2021-01-14T22:03:19Z',
                },
                {
                    id: 'zOSCS5fN4C6',
                    login: 'Sidonnie',
                    password: 'TvTg6AX6pzCb',
                    age: 16,
                    is_deleted: false,
                    created_at: '2021-08-25T04:12:53Z',
                    updated_at: '2021-01-12T00:48:41Z',
                },
                {
                    id: 'tVXvoUqJS5',
                    login: 'Lulita',
                    password: 'G3seWbXRFY',
                    age: 28,
                    is_deleted: false,
                    created_at: '2020-11-30T00:50:51Z',
                    updated_at: '2021-08-15T17:45:16Z',
                },
                {
                    id: '3pvPBaPfO7',
                    login: 'Sigismund',
                    password: '1or5YLf',
                    age: 14,
                    is_deleted: false,
                    created_at: '2020-11-09T19:22:13Z',
                    updated_at: '2021-06-19T20:06:13Z',
                },
                {
                    id: 'Mghm3QrQz01l',
                    login: 'Philippe',
                    password: 'v3iiFNwHt',
                    age: 39,
                    is_deleted: false,
                    created_at: '2021-08-09T08:59:26Z',
                    updated_at: '2021-01-22T06:02:22Z',
                },
                {
                    id: 'jXkwMB',
                    login: 'Danni',
                    password: 'V6rahgGLOE',
                    age: 44,
                    is_deleted: false,
                    created_at: '2021-09-26T07:02:46Z',
                    updated_at: '2020-12-18T16:18:17Z',
                },
                {
                    id: 'GclSGaJ',
                    login: 'Alard',
                    password: '755biuU0CAE',
                    age: 24,
                    is_deleted: false,
                    created_at: '2021-02-07T23:47:39Z',
                    updated_at: '2021-07-30T13:00:31Z',
                },
                {
                    id: 'EJPKc6Fy',
                    login: 'Tomi',
                    password: 'EFc8OeyTnK',
                    age: 35,
                    is_deleted: false,
                    created_at: '2021-06-30T16:07:17Z',
                    updated_at: '2021-08-04T17:22:45Z',
                },
                {
                    id: 'qV2Cs7gDQ9g',
                    login: 'Deck',
                    password: 'ctu6n166qy5',
                    age: 12,
                    is_deleted: false,
                    created_at: '2021-03-28T17:57:19Z',
                    updated_at: '2021-01-26T11:48:58Z',
                },
                {
                    id: 'D1rwZrqQ',
                    login: 'Farlay',
                    password: 'PipqXn',
                    age: 50,
                    is_deleted: false,
                    created_at: '2021-08-20T07:55:52Z',
                    updated_at: '2021-06-21T18:59:47Z',
                },
                {
                    id: 'loBIwCnA',
                    login: 'Tabina',
                    password: 'bzUyyK',
                    age: 23,
                    is_deleted: false,
                    created_at: '2020-12-08T19:14:22Z',
                    updated_at: '2021-05-16T04:42:06Z',
                },
                {
                    id: '9ViTenh',
                    login: 'Marcile',
                    password: 'JUQR6CUk5EK',
                    age: 46,
                    is_deleted: false,
                    created_at: '2021-01-19T13:47:07Z',
                    updated_at: '2021-05-19T14:42:35Z',
                },
                {
                    id: 'bqbP2B5',
                    login: 'Willy',
                    password: 'qXbWWhzEc',
                    age: 23,
                    is_deleted: false,
                    created_at: '2021-08-07T10:40:31Z',
                    updated_at: '2021-10-05T06:09:49Z',
                },
                {
                    id: 'F7kLEdNFksf',
                    login: 'Jolynn',
                    password: 'cwPzUCz77mz',
                    age: 36,
                    is_deleted: false,
                    created_at: '2021-05-17T16:02:51Z',
                    updated_at: '2021-08-24T00:59:15Z',
                },
                {
                    id: 'ZatdzOQGeF',
                    login: 'Jessamine',
                    password: 'pxMirbApcmEK',
                    age: 20,
                    is_deleted: false,
                    created_at: '2020-12-18T14:49:57Z',
                    updated_at: '2021-06-14T06:51:29Z',
                },
            ],
            {},
        );
    },

    down: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    },
};
