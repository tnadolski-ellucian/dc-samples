import { Dropdown, makeStyles, CircularProgress } from '@ellucian/react-design-system/core';
import { useData, useCardInfo } from '@ellucian/experience-extension-utils';
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles(() => ({
    card: { margin: '2px 1rem 0' }
}));

const pipelines = [{
    name: 'exp-automation-with-card-config',
    version: 4
}, {
    name: 'exp-automation-all-persons',
    version: 1
}, {
    name: 'exp-automation-my-person-holds',
    version: 1
}, {
    name: 'exp-automation-with-query-param?dummyParam=Ruby',
    version: 1
}, {
    name: 'bpapi/cats',
    version: 1
}];


function Card() {
    const [selectedPipeline, setSelectedPipeline] = useState(pipelines[0].name);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const classes = useStyles();
    const { serverConfigContext: { cardPrefix }, cardId } = useCardInfo();
    const { authenticatedEthosFetch } = useData();

    // move async function out of useEffect, remove useEffect, and change onChange of DropDown to handleInvoke if not wanting to invoke onmount
    useEffect(() => {

        async function handleInvoke(name) {
            setIsLoading(true);
            let endpoint = name;

            if (name == 'exp-automation-with-card-config') {
                if (cardPrefix) {
                    endpoint = name + '?cardId=' + cardId + '&cardPrefix=' + cardPrefix;
                } else {
                    endpoint = name + '?cardId=' + cardId;
                }
            }

            const version = pipelines.find(x => x.name === name).version;

            try {
                const resp = await authenticatedEthosFetch(endpoint, { headers: { Accept: `application/vnd.hedtech.integration.v${version}+json`}});
                setData(await resp.json());
            } catch (error) {
                setData(error);
                console.error('error: ', error);
            } finally {
                setIsLoading(false);
            }
        }

        handleInvoke(selectedPipeline);
    }, [authenticatedEthosFetch, cardId, cardPrefix, selectedPipeline]);

    return (
        <div className={classes.card}>
            <Dropdown required native value={selectedPipeline} onChange={event => setSelectedPipeline(event.target.value)} label="Pipeline Selection" id="exp-dc-automation-example">
                {pipelines.map(pipeline => {
                    return (
                        <option key={`${pipeline} - key`} value={pipeline.name} id={pipeline.name}>
                            {pipeline.name}
                        </option>
                    );
                })}
            </Dropdown>
            {isLoading ? <CircularProgress style={{ marginTop: '1rem' }} /> : data ? <pre data-testid="dc-samples-output">{JSON.stringify(data, null, 3)}</pre> : <div>No data</div>}
        </div>
    );
}

export default Card;