export const fetchProjects = () => {

  return  fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/projects`)
		.then(res => {
		  if (res.ok) {
		   return res.json()
		  } else {
			return []
		  }
		}).then(data =>  {
			if(data.projects) {
				return data.projects

			}else {
				return null
			}
		})
}

export const fetchAddProject = projectName => {
	return  fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/projects', {
		method: 'POST',
		headers: {'Content-type' : 'application/json'},
		body: JSON.stringify({name: projectName})
	})
	.then(res => {
	  if (res.ok) {
	   return res.json()
	  } else {
		throw new Error('Cannot add project')
	  }
	}).then(data =>  data.project)
  }


  export const fetchDeleteProject = id => {
	return  fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`, {
		method: 'DELETE'
	})
	.then(res => {
	  if (res.ok) {
	   return res.json()
	  } else {
		throw new Error('Cannot delete project')
	  }
	}).then(data =>  data.project)
  }


  export const fetchPalettes = id => {
	return  fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}/palettes`)
			  .then(res => {
				if (res.ok) {
				return res.json()
				} else {
				  return {palettes: 'Cannot fetch palettes'}
				}
			  }).then(data =>  (data.palettes))
  }

  export const fetchAddPalette = (id, newPalette) => {
	return  fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`, {
		method: 'POST',
		headers: {'Content-type' : 'application/json'},
		body: JSON.stringify({ ...newPalette })
	})
	.then(res => {
	  if (res.ok) {
	   return res.json()
	  } else {
		throw new Error('Cannot add palette')
	  }
	}).then(data =>  data.palette)
  }

  export const fetchDeletePalette = id => {
	return  fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/palettes/${id}`, {
		method: 'DELETE'
	})
	.then(res => {
	  if (res.ok) {
	   return res.json()
	  } else {
		throw new Error('Cannot delete palette')
	  }
	  
	}).then(data =>  data.palette)
  }

  export const fetchUpdateProject = (id, updatedProject) => {

	return  fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`, {
		method: 'PATCH',
		headers: {'Content-type' : 'application/json'},
		body: JSON.stringify({ ...updatedProject})
	})
	.then(res => {
	  if (res.ok) {
	   return res.json()
	  } else {
		throw new Error('Cannot update project')
	  }
	  
	}).then(data =>  data.project)
  }


  export const fetchUpdatePalette = (id, updatedPalette) => {

	return  fetch(process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/palettes/${id}`, {
		method: 'PATCH',
		headers: {'Content-type' : 'application/json'},
		body: JSON.stringify({ ...updatedPalette})
	})
	.then(res => {
	  if (res.ok) {
	   return res.json()
	  } else {
		throw new Error('Cannot update palette')
	  }
	  
	}).then(data =>  data.palette)
  }