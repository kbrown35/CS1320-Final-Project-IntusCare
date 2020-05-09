// Javascript object that shows what the structure of answers 
// the results component expects to get when it renders a filled out form

export const sampleAnswers = {
    answers: [
        ['No', 'Yes', 'No', 'No', 'Yes', 'Yes'],
        ['No', 'No', 'Yes', 'No', 'No', 'No'],
        ['No', 'No', 'Yes', 'No', 'Yes', 'No'],
        ['Yes', 'No', 'No', 'Yes'],
        ['No', 'Yes', 'No', 'Yes', 'No']
    ],
    subAnswers: [
        // Section 1
        [
            // empty array means main question was answered as NO
            [],
            ['Yes', 'No', '3/5/2019'],
            [],
            [],
            ['Yes'],
            ['Yes', 'Moderate', 'No']

        ],
        // Section 2
        [
            [],
            [],
            ['Yes', 'No', 'Yes'],
            [],
            [],
            []
        ],
        // Section 3
        [
            [],
            [],
            ['Bachelor\'s', 'Yes'],
            [],
            ['Yes', 'Yes', 'Drive'],
            []
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
            [],
            ['Yes', 'Yes', 'Yes'],
            [],
            ['No', 'No'],
            []
        ]
    ]
};