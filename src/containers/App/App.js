import React, { Component } from 'react';
import Background from '../../components/Background';
import PaletteGenerator from '../PaletteGenerator/PaletteGenerator';
import { setProjects } from '../../actions';
import { fetchProjects, fetchAddPalette, fetchPalettes, fetchUpdatePalette } from '../../api/apiCalls';
import Projects from '../Projects/Projects';
import Palettes from '../Palettes/Palettes';
import { connect } from 'react-redux';
import './App.css';
import {projectSelected, setPalettes } from '../../actions';

export class App extends Component {

  componentDidMount() {
      this.props.handleSetProjects()
  }

  getUpdatedProject = () => {
    this.props.handleSetProjects();
    this.handleFetchPalettes()
  }

  addAndUpdatePalette = (name) => {

    const {colors, selectedProject, openPaletteGen} = this.props;
    const newPalette = {
      name,
      color_1: colors[0],
      color_2: colors[1],
      color_3: colors[2],
      color_4: colors[3],
      color_5: colors[4],
    }

    if (openPaletteGen.type === 'Add') {
      fetchAddPalette(selectedProject, newPalette).then(() =>
        this.getPalettes(selectedProject)
      )
    } else {
      fetchUpdatePalette(openPaletteGen.paletteUpdatingId, newPalette).then(() =>
        this.getPalettes(selectedProject)
      )
    }
    
  }

  getPalettes = id => {
    this.props.handleProjectSelected(id)
    this.handleFetchPalettes(id)
  }

  handleFetchPalettes = (id) => {
    fetchPalettes(id).then(data => {
      if (data === 'Cannot fetch palettes') {
        this.setState({hasPalettes: false})
        this.props.handleSetPalettes([{error: 'No palettes under this project'}])
      } else {
        this.setState({hasPalettes: true})
        this.props.handleSetPalettes(data)
      }
    })
  }
  
  render() {
    const { colors } = this.props;
    return (
      <div className="app">
        <header>
          <h1>Palette Picker</h1>
        </header>
        <PaletteGenerator addAndUpdatePalette={this.addAndUpdatePalette}/>
        <Palettes handleFetchPalettes={this.handleFetchPalettes} />
        <Projects getUpdatedProject={this.getUpdatedProject} getPalettes={this.getPalettes}/>
        {/* <Background 
          color_1={colors[0]}
          color_2={colors[1]}
          color_3={colors[2]}
          color_4={colors[3]}
          color_5={colors[4]} /> */}
      </div>
    );
  }
}


export const mapStateToProps = (state) => ({
  colors: state.colors,
  selectedProject: state.selectedProject,
  openPaletteGen: state.openPaletteGen
});

export const mapDispatchToProps = dispatch => ({
  handleSetProjects: async () => dispatch(setProjects( await fetchProjects())),
  handleProjectSelected: selected => dispatch(projectSelected(selected)),
  handleSetPalettes: palettes => dispatch(setPalettes(palettes))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(App);
