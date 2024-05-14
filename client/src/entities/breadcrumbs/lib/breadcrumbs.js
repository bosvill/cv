export const breadcrumbs=id =>{
 const links = [
		{ to: `cv/${id}/template`, label: 'Template', step: 1 },
		{ to: `cv/${id}/profile`, label: 'Summary', step: 2 },
		{ to: `cv/${id}/info`, label: 'Details', step: 3 },
		{ to: `cv/${id}/education`, label: 'Education', step: 4 },
		{ to: `cv/${id}/work`, label: 'Experience', step: 5 },
		{ to: `cv/${id}/hardskills`, label: 'Hardskills', step: 6 },
		{ to: `cv/${id}/softskills`, label: 'Softskills', step: 7 },
		{ to: `cv/${id}/languages`, label: 'Languages', step: 8 },
    { to: `cv/${id}/preview`, label: 'Preview', step: 9 }
 ]
return links
}
