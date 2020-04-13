import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Projects.css';
import ProjectForm from '../ProjectForm/ProjectForm';
import { fetchDeleteProject, fetchUpdateProject } from '../../api/apiCalls';

export class Projects extends Component {

  state = {
    hasPalettes: false,
    updateProjectOpen: false,
    defaultName: '',
    updateProjectId: 0
  }

  handleGetPalettes = e => {
    const id = parseInt(e.target.parentElement.id);
    this.props.getPalettes(id)
  }

  handleDeleteProject = e => {
    const id = parseInt(e.target.parentElement.id)
    fetchDeleteProject(id).then(() => 
      this.props.getUpdatedProject()
    ) 
  }

  handleUpdateProjectOpening = e => {
    const id = parseInt(e.target.parentElement.id);
    const projectName = this.props.projects.find(project => project.id === id).name
    this.setState({updateProjectOpen: true, defaultName: projectName, updateProjectId: id})
  }

  handleUpdateProject = e => {
    e.preventDefault();
    this.setState({updateProjectOpen: false})
    const { updateProjectId, defaultName} = this.state;
    fetchUpdateProject(updateProjectId, {name: defaultName}).then(() => 
      this.props.getUpdatedProject()
    ) 
  }

  handleChange = e => {
    this.setState({defaultName: e.target.value})
  }

  handleCancelUpdateProject = () => {
    this.setState({updateProjectOpen: false})
  }


  generateProjects = () => {
    const  {projects, selectedProject}  = this.props;
    console.log('hey projects', projects)
    
    if(projects) {return projects.map((project, i) => {
      const selectedstyle = (project.id === selectedProject) ? {background: '#385894'} : null;
      return (
        <div key={i} id={project.id} className="project-container">
          <h4  className="project-name" onDoubleClick={this.handleUpdateProjectOpening} style={selectedstyle} onClick={this.handleGetPalettes}>{project.name}</h4>
          <button onClick={this.handleDeleteProject} className="delete-project-btn">&#xd7;</button>
        </div>
      )
    })} else {
      return <p className="no-palletes">No projects are available. You can add one using the below form, then click on your new project to add a new palette.</p>
    }
  }
  render() {

    return (
      <div className="projects-body">
        <div className="projects-container">
          <h3 className="project-title">Projects</h3>
        {this.generateProjects()}
        <ProjectForm getUpdatedProject={this.props.getUpdatedProject}/> 
        </div>
        {this.state.updateProjectOpen && <form className="update-project-form">
        <h5 className="update-project-name-title">Update Project Name</h5>
          <input type="text" className="updated-name-input" defaultValue={this.state.defaultName} maxLength="30" onChange={this.handleChange}/>
          <div className="updat-project-btn-container">
            <button className="update-project-btn" onClick={this.handleUpdateProject}>Update</button>
            <button className="cancel-project-btn" onClick={this.handleCancelUpdateProject}>Cancel</button>
          </div>
        </form>}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  projects: state.projects,
  selectedProject: state.selectedProject
})



export default connect(mapStateToProps, null)(Projects)