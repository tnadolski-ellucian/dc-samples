module.exports = {
    name: 'PW-DC-Samples',
    publisher: 'automation',
    cards: [{
        type: 'SamplesCard',
        source: './src/cards/SamplesCard',
        title: 'DC - Samples Card',
        displayCardType: 'Samples Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        configuration: {
            server: [{
                key: 'ethosApiKey',
                label: 'ethos api key',
                type: 'text',
                required: true
            }]
        }
    }]
};