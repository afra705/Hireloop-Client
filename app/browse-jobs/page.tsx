import React from 'react';

const BrowseJobsPage = async({searchParams}:{searchParams:Promise<{[key:string]: string | string[] | undefined}>}) => {

    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const quary = urlSearch.toString()
    console.log(quary);
    

    return (
        <div className='text-white'>
            sadff
        </div>
    );
};

export default BrowseJobsPage;