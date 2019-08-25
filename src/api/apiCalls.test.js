import { fetchProjects } from '../api/apiCalls';


describe('apiCalls', () => {

  describe('fetchProjects', () => {
    let mockProject
    beforeEach( () => {
  
      mockProject = {projects: [{name: 'project'}]};
  
       window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve( {
          ok: true,
          json: () => Promise.resolve(mockProject)
        })
      })
    });
  
    it('fetchProjects should return a parsed response if status is ok', async () =>{
      const result = await fetchProjects();
      fetchProjects()
      expect(result).toEqual(mockProject.projects)
    })
  
    it('fetchProjects should return error if status is not ok', async () => {
      window.fetch = jest.fn().mockImplementationOnce(() => {
        return Promise.resolve( {
          ok: false,
        })
      })
      await expect(fetchProjects()).rejects.toEqual(Error('Cannot fetch projects'))
    })
  
    })
})