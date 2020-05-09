// Javascript object that represents answers of a not-yet filled out form

export const emptyAnswers = {
    answers: [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '', '']
    ],
    subAnswers: [
        // Section 1
        [
            // empty array means main question was answered as NO
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            [''],
            [''],
            ['', '', '']

        ],
        // Section 2
        [
            ['', '', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', '', '', ''],
            ['', '', '']
        ],
        // Section 3
        [
            ['', ''],
            ['', '', ''],
            ['', ''],
            ['', ''],
            ['', '', ''],
            ['', '', '']
        ],
        // Section 4
        [
            [],
            [],
            [],
            []
        ],
        // Section 5
        [
            [''],
            ['', '', ''],
            ['', '', ''],
            ['', ''],
            ['', '']
        ]
    ]
};