import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const BrowseJobsPage = async({searchParams}:{searchParams:Promise<{[key:string]: string | string[] | undefined}>}) => {

    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const quary = urlSearch.toString()
    console.log(quary);
    
    const jobs = await getJobs(quary)

    return (
        <div className='text-white'>
            {jobs.map((job)=>(
                <li key={job._id}>{job.jobTitle}</li>
            ))}
        </div>
    );
};

export default BrowseJobsPage;